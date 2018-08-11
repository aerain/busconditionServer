const cheerio = require('cheerio');
const request = require('request');
var express = require('express');
var router = express.Router();
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

/* GET home page. */
router.get('/', function(req, res, next) {
    var busarsId = req.query.arsid;
    var businStationLink = 'http://ws.bus.go.kr/api/rest/stationinfo/getRouteByStation?serviceKey=60io4%2B%2BLsPCgnJcw%2B1%2FufoEFwxNyyxiYIL1j9eqjqmr6OclPIxkGFXsUt%2FkY2dvAtaWXh3KzyEns%2BLVujevEww%3D%3D&arsId=' + busarsId;
    var url = 'http://openapi.seoul.go.kr:8088/516e686e4b616c7336394b66777349/xml/CardBusTimeNew/1/1000/201806/';
    var busarr = [];
    var xhr = new XMLHttpRequest();
    xhr.open('GET', businStationLink, false);
    xhr.send(null);

    // if(xhr.status == 200)
    var busbody = xhr.responseText;
    bus = cheerio.load(busbody, { xmlMode: true, });
    bus('busRouteNm').each(function(i, elem) {
        busNum = bus(this).text();
        var busTmpUrl = encodeURI(url + busNum);
        xhr.open('GET', busTmpUrl, false);
        xhr.send(null);
        var busNumBody = xhr.responseText;
        busNuminfo = cheerio.load(busNumBody, { xmlMode: true, });
        tempjson = { busNum, busTimearr: [] };
        busNuminfo('row').each(function(j, element) {
            busNumjson = { station: busNuminfo(this).find('BUS_STA_NM').text(), busTime:[] };

            var month = new Date().getMonth + 1;
            switch(month) {
                case 0:
                    busNumjson.busTime.push(busNuminfo(this).find('MIDNIGHT_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('MIDNIGHT_ALIGHT_NUM').text());
                    break;
                case 1:
                    busNumjson.busTime.push(busNuminfo(this).find('ONE_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('ONE_ALIGHT_NUM').text());
                    break;
                case 2:
                    busNumjson.busTime.push(busNuminfo(this).find('TWO_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('TWO_ALIGHT_NUM').text());
                    break;
                case 3:
                    busNumjson.busTime.push(busNuminfo(this).find('THREE_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('THREE_ALIGHT_NUM').text());
                    break;
                case 4:
                    busNumjson.busTime.push(busNuminfo(this).find('FOUR_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('FOUR_ALIGHT_NUM').text());
                    break;
                case 5:
                    busNumjson.busTime.push(busNuminfo(this).find('FIVE_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('FIVE_ALIGHT_NUM').text());
                    break;
                case 6:
                    busNumjson.busTime.push(busNuminfo(this).find('SIX_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('SIX_ALIGHT_NUM').text());
                    break;
                case 7:
                    busNumjson.busTime.push(busNuminfo(this).find('SEVEN_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('SEVEN_ALIGHT_NUM').text());
                    break;
                case 8:
                    busNumjson.busTime.push(busNuminfo(this).find('EIGHT_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('EIGHT_ALIGHT_NUM').text());
                    break;
                case 9:
                    busNumjson.busTime.push(busNuminfo(this).find('NINE_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('NINE_ALIGHT_NUM').text());
                    break;
                case 10:
                    busNumjson.busTime.push(busNuminfo(this).find('TEN_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('TEN_ALIGHT_NUM').text());
                    break;
                case 11:
                    busNumjson.busTime.push(busNuminfo(this).find('ELEVEN_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('ELEVEN_ALIGHT_NUM').text());
                    break;
                case 12:
                    busNumjson.busTime.push(busNuminfo(this).find('TWELVE_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('TWELVE_ALIGHT_NUM').text());
                    break;
                case 13:
                    busNumjson.busTime.push(busNuminfo(this).find('THIRTEEN_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('THIRTEEN_ALIGHT_NUM').text());
                    break;
                case 14:
                    busNumjson.busTime.push(busNuminfo(this).find('FOURTEEN_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('FOURTEEN_ALIGHT_NUM').text());
                    break;
                case 15:
                    busNumjson.busTime.push(busNuminfo(this).find('FIFTEEN_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('FIFTEEN_ALIGHT_NUM').text());
                    break;
                case 16:
                    busNumjson.busTime.push(busNuminfo(this).find('SIXTEEN_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('SIXTEEN_ALIGHT_NUM').text());
                    break;
                case 17:
                    busNumjson.busTime.push(busNuminfo(this).find('SEVENTEEN_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('SEVENTEEN_ALIGHT_NUM').text());
                    break;
                case 18:
                    busNumjson.busTime.push(busNuminfo(this).find('EIGHTEEN_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('EIGHTEEN_ALIGHT_NUM').text());
                    break;
                case 19:
                    busNumjson.busTime.push(busNuminfo(this).find('NINETEEN_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('NINETEEN_ALIGHT_NUM').text());
                    break;
                case 20:
                    busNumjson.busTime.push(busNuminfo(this).find('TWENTY_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('TWENTY_ALIGHT_NUM').text());
                    break;
                case 21:
                    busNumjson.busTime.push(busNuminfo(this).find('TWENTY_ONE_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('TWENTY_ONE_ALIGHT_NUM').text());     
                    break;
                case 22:
                    busNumjson.busTime.push(busNuminfo(this).find('TWENTY_TWO_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('TWENTY_TWO_NUM').text());
                    break;
                case 23:
                    busNumjson.busTime.push(busNuminfo(this).find('TWENTY_THREE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('TWENTY_THREE_NUM').text());
                    break;
            }
            
            tempjson.busTimearr.push(busNumjson);
            
            
            
            
            
        })
        
        busarr.push(tempjson);
    });
        
    res.render('getBusTime' , { title: '너무 어려워..', data: { busRoute: busarr }, });



module.exports = router;