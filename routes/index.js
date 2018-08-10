const cheerio = require('cheerio');
const request = require('request');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var url = 'http://ws.bus.go.kr/api/rest/stationinfo/getStationByName?serviceKey=60io4%2B%2BLsPCgnJcw%2B1%2FufoEFwxNyyxiYIL1j9eqjqmr6OclPIxkGFXsUt%2FkY2dvAtaWXh3KzyEns%2BLVujevEww%3D%3D&stSrch=%EA%B0%80%EA%B3%A1%EC%B4%88%EA%B5%90';
    
    request(url, function(err, response, body) {
        console.log(body);
        var jsonarr = cheeParse(body);
        res.render('index', { title: 'Express', body, jsonarr });
    });
});

function cheeParse(body) {
    const $ = cheerio.load(body, { xmlMode: true, });
    array = [];
    
    $('msgBody > itemList > tmX').each(function(i, element) {
            array.push($(this).text());
    })
        
    return array;
}



module.exports = router;
