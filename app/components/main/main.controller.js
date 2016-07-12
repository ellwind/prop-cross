export default class MainController {
    constructor($scope, $http) {
        this.http = $http;
        this.name = 'test';
        var url = 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=leeds&callback=JSON_CALLBACK';

        this.http({
            method: 'JSONP',
            url: url,
            params: {
                format: 'jsonp',
                json_callback: 'JSON_CALLBACK'
            }
        }).then(function (response) {
            console.log(response.data)
        });

        // var xhr = new XMLHttpRequest();
        //
        // xhr.open('GET', url, false);
        // xhr.send();
        //
        // if (xhr.status != 200) {
        //     // обработать ошибку
        //     console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
        // } else {
        //     // вывести результат
        //     console.log( xhr.responseText ); // responseText -- текст ответа.
        // }
        // this.http = $http;
        // var headers = {
        //     'Access-Control-Allow-Origin' : '*',
        //     'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json'
        // };
        // $http({
        //     method: 'GET',
        //     headers: headers,
        //     url: 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=leeds'
        // }).then(function successCallback(response) {
        //     console.log(response);
        // }, function errorCallback(response) {
        // });
    }
}