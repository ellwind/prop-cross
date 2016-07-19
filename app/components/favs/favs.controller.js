export default class FavsController {
    constructor($state) {
        this.state = $state;
        this.favsList = JSON.parse(localStorage.getItem('favorites'));
    }

    preview (item) {
        this.state.go('preview', {property: item})
    }
}