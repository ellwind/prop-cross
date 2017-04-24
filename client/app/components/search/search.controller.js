export default class {
  constructor($http, $state, $stateParams, propertyRequestService, storageService) {
    "ngInject";
    Object.assign(this, {$http, $state, $stateParams, propertyRequestService, storageService});

    this.errorLoadMore = '';
    this.errorMessage = '';
  }

  $onInit() {
    if(this.$stateParams.makeSearch) {
      sessionStorage.setItem('lastSearch', JSON.stringify(this.$stateParams.makeSearch));
      this.searchLoc(this.$stateParams.makeSearch);
    } else if (sessionStorage.getItem('lastSearch')) {
      this.searchLoc(JSON.parse(sessionStorage.getItem('lastSearch')));
    } else {
      this.$state.go('recent');
    }
  }

  preview (item) {
    this.$state.go('property', {item: item})
  }

  resetSearch(place_name) {
    this.page = 0;
    this.place_name = place_name;
    this.loading = false;
  }

  loadMoreMessage() {
    return this.loading ? "Loading" : "Load more";
  }

  searchLoc(value) {
    if (value) {
      this.resetSearch(value);
      this.propList = [];
    }

    this.errorLoadMore = '';
    this.errorMessage = '';

    if (this.place_name) {
      this.page++;
      this.loading = true;

      this.propertyRequestService.getList(this.place_name, this.page)
      .then(resp => {
        if (!resp.listings.length) {
          this.errorMessage = 'There were no properties found for the given location.';
        }

        if (resp.application_response_text === 'unknown location') {
          this.errorMessage = 'The location given was not recognised.';
        }

        if (resp.application_response_code < 200){
          this.propList = this.propList.concat(resp.listings);
        }

        this.totalResults = resp.total_results;
        this.loadMore = this.propList.length < resp.total_results;
        this.storageService.saveRecentSearch({place: this.place_name, total: resp.total_results});
      })
        .catch(()=>{
          if (this.propList.length === 0) {
            this.errorMessage = 'An error occurred while searching. Please check your network connection and try again.';
          } else {
            this.errorLoadMore = 'An error occurred while searching. Please check your network connection and try again.';
            this.page--;
          }
        })
        .finally(()=>{
          this.loading = false;
        });
    }
  }
}
