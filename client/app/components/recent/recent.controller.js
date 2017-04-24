export default class RecentController {
  constructor($timeout, $window, $state, storageService, propertyRequestService) {
    "ngInject";
    Object.assign(this, {$timeout, $window, $state, storageService, propertyRequestService});

    this.recentList = this.storageService.getRecent();
    this.propertyRequestService.resetLocation();
  }

  makeSearch(item){
    this.$state.go('search', {makeSearch: item});
  }
}
