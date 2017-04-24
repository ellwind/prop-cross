export default class {
  constructor($http, $q) {
    "ngInject";
    Object.assign(this, {$http, $q});

    this.location = '';
  }

  getList(location, page){
    this.location = location;
    var deferred = this.$q.defer();
    this.$http({
      method: 'JSONP',
      url: `http://api.nestoria.co.uk/api?country=uk&pretty=1&encoding=json&listing_type=buy&action=search_listings&callback=JSON_CALLBACK&place_name=${location}&page=${page}`,
      params: {
        format: 'jsonp',
        json_callback: 'JSON_CALLBACK'
      }
    }).then(function (resp) {
      deferred.resolve(resp.data.response);
    }).catch(function(err) {
      deferred.reject(err);
    });
    return deferred.promise;
  }
  getLocation(){
    return this.location;
  }
  resetLocation(){
    this.location = '';
  }
}
