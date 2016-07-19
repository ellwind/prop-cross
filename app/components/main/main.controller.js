export default class MainController {
    constructor($scope, $state, $http, $window, $location, $anchorScroll, $timeout) {
        this.http = $http;
        this.state = $state;
        this.$scope = $scope;
        this.$window = $window;
        this.$location = $location;
        this.$anchorScroll = $anchorScroll;
        this.$timeout = $timeout;

        if(!this.propList){
            this.resetSearch();
        }
        this.recentSearchList = JSON.parse(localStorage.getItem('recentSearch'));
        this.checkPreviewed();
        window.onbeforeunload = ()=> {
            var previewState = {
                state: false,
                offset: 0
            };
            localStorage.setItem('previewed', JSON.stringify(previewState));
        };
    }

    resetSearch(value) {
        this.filter = {
            page: 0,
            place_name: value || '',
            centre_point: ''
        };
        this.loading = false;
    }

    searchLoc(page, value) {
        if(value && !page) {
            this.resetSearch(value);
            this.propList = {};
        }
        if (this.filter.place_name) {
            if(page){
                this.filter.page ++;
            } else {
                this.filter.page = '1'
            }
        }

        this.url = 'http://api.nestoria.co.uk/api?country=uk&pretty=1&encoding=json&listing_type=buy&action=search_listings&callback=JSON_CALLBACK';

        if(this.filter.place_name){
            this.loading = true;
            angular.forEach(this.filter, (val, key) => {
                if (val) {
                    this.url += '&' + key + '=' + val;
                }
            });

            this.http({
                method: 'JSONP',
                url: this.url,
                params: {
                    format: 'jsonp',
                    json_callback: 'JSON_CALLBACK'
                }
            }).then((resp) => {
                this.loading = false;
                if(this.propList.length > 0) {
                    this.propList = this.propList.concat(resp.data.response.listings);
                } else {
                    this.propList = resp.data.response.listings;
                }
                this.totalResults = resp.data.response.total_results;
                this.loadMore = this.propList.length < resp.data.response.total_results;
                this.saveRecentSearch();
            });
        }
    }

    preview (item) {
        var previewState = {
            state: true,
            offset: this.$window.pageYOffset
        };
        localStorage.setItem('previewed', JSON.stringify(previewState));

        this.state.go('preview', {property: item})
    }

    saveRecentSearch() {
        var resentList = localStorage.getItem('recentSearch') && JSON.parse(localStorage.getItem('recentSearch')) || [];
        var searchData = {
            filter: this.filter,
            data: this.propList,
            loadMore: this.loadMore,
            totalResults: this.totalResults
        };

        if(!resentList){
            resentList.push(searchData);
        } else {
            resentList = resentList.filter(item => item.filter.place_name.toLowerCase() != searchData.filter.place_name.toLowerCase());
            resentList.unshift(searchData);
        }
        localStorage.setItem('recentSearch', JSON.stringify(resentList));
    }

    applySearch(item){
        this.filter = item.filter;
        this.propList = item.data;
        this.loadMore = item.loadMore;
        this.totalResults = item.totalResults;
        this.saveRecentSearch();
    }

    checkPreviewed () {
        var previewData = JSON.parse(localStorage.getItem('previewed'));
        if (previewData.state) {
            var resentList = JSON.parse(localStorage.getItem('recentSearch'));
            this.applySearch(resentList[0]);
            this.$timeout(()=>{
                window.scrollTo(0, previewData.offset);
            },10);
        }
    }
}
