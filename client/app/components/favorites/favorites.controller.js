export default class FavoritesController {
  constructor($state, storageService) {
    'ngInject';
    Object.assign(this, {$state, storageService});
    this.favoritesList = storageService.getFavorites();
  }

  preview (item) {
    this.$state.go('property', {item: item})
  }
}
