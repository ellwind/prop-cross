export default class FavsController {
    constructor($state) {
        this.state = $state;
        this.favsList = JSON.parse(localStorage.getItem('favorites'));
        console.log(this.favsList);
    }

    preview (item) {
        this.state.go('preview', {property: item})
    }
}