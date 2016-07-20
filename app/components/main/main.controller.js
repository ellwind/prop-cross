export default class MainController {
    constructor($state, $http, $window, $timeout) {
        this.http = $http;
        this.state = $state;
        this.$window = $window;
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

    resetSearch(value, loc) {
        this.filter = {
            page: 0,
            place_name: value || '',
            centre_point: loc || ''
        };
        this.errorMessage = '';
        this.errorLoadMore = '';
        this.loading = false;
    }

    searchLoc(page, value) {
        if (value) {
            this.filter.centre_point = '';
        }
        if ((value && !page) || this.filter.centre_point) {
            this.resetSearch(value, this.filter.centre_point);
            this.propList = {};
            this.locList = {};
        }

        this.errorLoadMore = '';

        if (this.filter.place_name || this.filter.centre_point) {
            if (page) {
                this.filter.page++;
            } else {
                this.filter.page = '1'
            }
        }

        this.url = 'http://api.nestoria.co.uk/api?country=uk&pretty=1&encoding=json&listing_type=buy&action=search_listings&callback=JSON_CALLBACK';

        if (this.filter.place_name || this.filter.centre_point) {
            if (this.filter.place_name && !this.filter.centre_point) {
                this.loading = true;
                angular.forEach(this.filter, (val, key) => {
                    if (val) {
                        this.url += '&' + key + '=' + val;
                    }
                });
            } else if (this.filter.centre_point) {
                this.filter.place_name = '';
                angular.forEach(this.filter, (val, key) => {
                    if (val) {
                        this.url += '&' + key + '=' + val;
                    }
                });
            }

            this.http({
                method: 'JSONP',
                url: this.url,
                params: {
                    format: 'jsonp',
                    json_callback: 'JSON_CALLBACK'
                }
            }).then((resp) => {
                if (resp.data.response.listings.length == 0) {
                    this.errorMessage = 'There were no properties found for the given location.';
                }
                if (resp.data.response.application_response_text == 'unknown location') {
                    this.errorMessage = 'The location given was not recognised.';
                }
                if (resp.data.response.application_response_code < 200){
                    if (this.propList.length > 0) {
                        this.propList = this.propList.concat(resp.data.response.listings);
                    } else {
                        this.propList = resp.data.response.listings;
                    }
                } else if (resp.data.response.application_response_code >= 200) {
                    this.locList = resp.data.response.locations;
                }
                this.totalResults = resp.data.response.total_results;
                this.loadMore = this.propList.length < resp.data.response.total_results;
                this.saveRecentSearch();
            })
                .catch(()=>{
                    if (this.propList.length == 0) {
                        this.errorMessage = 'An error occurred while searching. Please check your network connection and try again.';
                    } else {
                        this.errorLoadMore = 'An error occurred while searching. Please check your network connection and try again.';
                        this.filter.page--;
                    }
                })
                .finally(()=>{
                    this.loading = false;
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
        if (this.propList.length > 0 || this.locList > 0) {
            var resentList = localStorage.getItem('recentSearch') && JSON.parse(localStorage.getItem('recentSearch')) || [],
            searchData = {
                filter: this.filter,
                data: this.propList,
                locations: this.locList,
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
        if (previewData && previewData.state) {
            var resentList = JSON.parse(localStorage.getItem('recentSearch'));
            this.applySearch(resentList[0]);
            this.$timeout(()=>{
                window.scrollTo(0, previewData.offset);
            },10);
        }
    }

    myLoc() {
        navigator.geolocation.getCurrentPosition(position=> {
            this.filter.centre_point = position.coords.latitude + ',' + position.coords.longitude;
            this.searchLoc();
        });
    }

    locSearch(loc) {
        this.search = loc.place_name;
        this.searchLoc(false, loc.place_name);
    }
}
