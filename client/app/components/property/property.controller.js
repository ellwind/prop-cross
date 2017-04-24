export default class {
  constructor($stateParams, $state, storageService) {
    'ngInject';
    Object.assign(this, {$stateParams, $state, storageService});
  }

  $onInit() {
    if(this.$stateParams.item){
      sessionStorage.setItem('propPage', JSON.stringify(this.$stateParams.item));
      this.property = this.$stateParams.item;
    } else {
      this.property = JSON.parse(sessionStorage.getItem('propPage'));
    }

    if(!this.property) {
      this.$state.go('recent');
    }
  }

  favText() {
    return this.storageService.isFavorite(this.property) ? 'Remove from' : 'Add to';
  }
}
