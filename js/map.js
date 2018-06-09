 var map;
var image = 'img/sign.png'; //Изображение маркера
//Функция отрисовки карты
function initMap(town) {
    var geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17, //Масштаб карты
        scrollwheel: false, //Отключение скролла мыши над картой
        disableDefaultUI: true, //Отключение элементов управления
        mapTypeId:google.maps.MapTypeId.ROADMAP, //Отображение карты дорог
    });


    geocodeAddress(geocoder, map, town);
    
    
    /*
  	var marker = new google.maps.Marker({
    	map: map,
    	position: {lat: 50.285146, lng: 127.515564},
        animation: google.maps.Animation.DROP 
   	});
    */
    
}

//Определение адреса и установка туда маркера
function geocodeAddress(geocoder, resultsMap, address) {
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
           
            
            marker = new google.maps.Marker({
                animation: google.maps.Animation.DROP, //Красивая анимация установки маркера
                map: resultsMap,
                position: results[0].geometry.location,
                //icon: image //Ставим нашу картинку
            });
            
            
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}