export default class {
  constructor($state, propertyRequestService) {
    "ngInject";
    Object.assign(this, {$state, propertyRequestService});
  }

  $onInit(){
    this.search = this.propertyRequestService.getLocation();
  }

  makeSearch(){
    this.$state.go('search', {makeSearch: this.search});
  }

  submit(event) {
    if(event.keyCode === 13) {
      this.makeSearch(this.search)
    }
  }
}
