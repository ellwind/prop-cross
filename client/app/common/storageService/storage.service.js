export default class {
  constructor() {}

  saveRecentSearch(searchData){
    var recentList = this.getRecent();

    if(!recentList){
      recentList.push(searchData);
    } else {
      recentList = recentList.filter(item => item.place.toLowerCase() !== searchData.place.toLowerCase());
      recentList.unshift(searchData);
    }
    if(recentList.length === 11){
      recentList.splice(10, 1);
    }
    localStorage.setItem('recentSearch', JSON.stringify(recentList));
  }

  getRecent(){
    return localStorage.getItem('recentSearch') && JSON.parse(localStorage.getItem('recentSearch')) || [];
  }

  getFavorites(){
    return localStorage.getItem('favorites') && JSON.parse(localStorage.getItem('favorites')) || [];
  }

  setFavorite(prop){
    var favs = this.getFavorites();

    if(!favs){
      localStorage.setItem('favorites', JSON.stringify(prop));
    } else {
      if (favs.find(item => item.img_url === prop.img_url)){
        favs = favs.filter(item => item.img_url !== prop.img_url);
      } else {
        favs.unshift(prop);
      }
      localStorage.setItem('favorites', JSON.stringify(favs));
    }
  }

  isFavorite(prop){
    return !!this.getFavorites().find(item => item.img_url === prop.img_url);
  }
}
