export default class PreviewController {
    constructor($stateParams) {
        if($stateParams.property != null){
            sessionStorage.setItem('propPage', JSON.stringify($stateParams.property));
            this.property = $stateParams.property;
        } else {
            this.property = JSON.parse(sessionStorage.getItem('propPage'));
        }
    }


    isFavorite() {
        var isFavs = [];
        if (!localStorage.getItem('favorites')) {
            return false;
        } else {
            isFavs = isFavs.concat(JSON.parse(localStorage.getItem('favorites')));
            return !!isFavs.find(item => item.img_url == this.property.img_url)
        }
    }

    addToFavs() {
        var favs = localStorage.getItem('favorites') && JSON.parse(localStorage.getItem('favorites')) || [];

        if(!favs){
            localStorage.setItem('favorites', JSON.stringify(this.property));
        } else {
            if (favs.find(item => item.img_url == this.property.img_url)){
                favs = favs.filter(item => item.img_url != this.property.img_url);
            } else {
                favs.unshift(this.property);
            }
            localStorage.setItem('favorites', JSON.stringify(favs));
        }
    }
}