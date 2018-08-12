const cheerio = require('cheerio');
const request = require('request');
var express = require('express');
var router = express.Router();
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// 113000134
// 100100348

let crawlByUrl = (url) => {
    let body = "";
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    if(xhr.status == 200)
        body = xhr.responseText;
    return body;
}

/* GET home page. */
router.get('/', (req, res, next) => {
    busarsId = req.query.arsid;
    stId = req.query.stid;

    d = new Date();
    hour = d.getHours();

    businStationLink = 'http://ws.bus.go.kr/api/rest/stationinfo/getRouteByStation?serviceKey=60io4%2B%2BLsPCgnJcw%2B1%2FufoEFwxNyyxiYIL1j9eqjqmr6OclPIxkGFXsUt%2FkY2dvAtaWXh3KzyEns%2BLVujevEww%3D%3D&arsId=' + busarsId;
    url = 'http://openapi.seoul.go.kr:8088/516e686e4b616c7336394b66777349/xml/CardBusTimeNew/1/1000/201806/';
    getArrinfourl = 'http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRoute?serviceKey=60io4%2B%2BLsPCgnJcw%2B1%2FufoEFwxNyyxiYIL1j9eqjqmr6OclPIxkGFXsUt%2FkY2dvAtaWXh3KzyEns%2BLVujevEww%3D%3D&busRouteId=100100076';
    busarr = [];

    next();
}, async (req, res, next) => {
    bus = await cheerio.load(await crawlByUrl(businStationLink), { xmlMode: true, });

    await bus('itemList').each(function(i, elem) {
        busRouteId = bus(this).find('busRouteId').text();
        busNum = bus(this).find('busRouteNm').text();
        
        tempjson = { busRouteId, busNum, busCongetion : 0, busTimearr: [] };

        busNuminfo = cheerio.load(crawlByUrl(encodeURI(url + busNum)), { xmlMode: true, });
        busNuminfo('row').each(function(j, element) {

            busNumjson = { 
                station: busNuminfo(this).find('BUS_STA_NM').text(), 
                arsId: busNuminfo(this).find('BSST_ARS_NO').text(),
                busTime:[] };
            switch(hour) {
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
                    busNumjson.busTime.push(busNuminfo(this).find('TWENTY_TWO_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('TWENTY_TWO_ALIGHT_NUM').text());
                    break;
                case 23:
                    busNumjson.busTime.push(busNuminfo(this).find('TWENTY_THREE_RIDE_NUM').text());
                    busNumjson.busTime.push(busNuminfo(this).find('TWENTY_THREE_ALIGHT_NUM').text());
                    break;
            }
            
            tempjson.busTimearr.push(busNumjson);
        })
        busarr.push(tempjson);
    });
    
    next();
}, (req, res, next) => {
    let getStationsByRouteListURL = 'http://ws.bus.go.kr/api/rest/busRouteInfo/getStaionByRoute?serviceKey=60io4%2B%2BLsPCgnJcw%2B1%2FufoEFwxNyyxiYIL1j9eqjqmr6OclPIxkGFXsUt%2FkY2dvAtaWXh3KzyEns%2BLVujevEww%3D%3D&busRouteId=';

    for(i = 0; i < busarr.length; i++) {
        getsurl = getStationsByRouteListURL + busarr[i].busRouteId;
        sortedRouteList = [];
        station = cheerio.load(crawlByUrl(getsurl), { xmlMode: true, });

        routeSeqArr = station('arsId').toArray();
        if(busarr[i]["busTimearr"].length != 0) {
            for(var j = 0; j < routeSeqArr.length; j++) {
                index = busarr[i]["busTimearr"].map(x => x.arsId).indexOf(cheerio(routeSeqArr[j]).text());
                sortedRouteList.push(busarr[i]["busTimearr"][index]);
            }
            busarr[i]["busTimearr"] = sortedRouteList;
        }   
    }
    data = {size : busarr.length, busRoute: busarr, };
    res.send(JSON.stringify(data));
});

module.exports = router;