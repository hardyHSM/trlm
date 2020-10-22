

ymaps.ready(function () {
    var myMap = new ymaps.Map("map", {
        center: [47.227929, 39.611513],
        zoom: 14,
        controls: ["zoomControl", "zoomControl", "fullscreenControl"]
    }, {
        searchControlProvider: 'yandex#search'
    }),
    myPlacemark = new ymaps.Placemark([47.227929, 39.611513], {
        // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
        balloonContentHeader: "Адресс нашего оффиса",
        balloonContentBody: "ул. 1-й км Автодороги Ростов-Новошахтинск, 3-й проезд, стр. 7/12. Территория 'Спектр'",
        balloonContentFooter: "",
        hintContent: "Наш адресс"
    });
    
    myMap.geoObjects.add(myPlacemark);
    

 

});


