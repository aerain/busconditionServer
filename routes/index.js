const cheerio = require('cheerio');
const request = require('request');
var express = require('express');
var router = express.Router();
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

/* GET home page. */
router.get('/', function(req, res, next) {
    var businStationLink = 'http://ws.bus.go.kr/api/rest/stationinfo/getRouteByStation?serviceKey=60io4%2B%2BLsPCgnJcw%2B1%2FufoEFwxNyyxiYIL1j9eqjqmr6OclPIxkGFXsUt%2FkY2dvAtaWXh3KzyEns%2BLVujevEww%3D%3D&arsId=21111';
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
            busNumjson.busTime.push(busNuminfo(this).find('MIDNIGHT_RIDE_NUM').text());
            tempjson.busTimearr.push(busNumjson);
            // tempjson.busTimearr.push(busNuminfo(this).find('MIDNIGHT_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('ONE_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('ONE_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('TWO_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('TWO_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('THREE_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('THREE_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('FOUR_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('FOUR_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('FIVE_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('FIVE_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('SIX_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('SIX_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('SEVEN_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('SEVEN_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('EIGHT_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('EIGHT_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('NINE_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('NINE_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('TEN_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('TEN_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('ELEVEN_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('ELEVEN_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('TWELVE_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('TWELVE_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('THIRTEEN_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('THIRTEEN_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('FOURTEEN_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('FOURTEEN_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('FIFTEEN_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('FIFTEEN_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('SIXTEEN_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('SIXTEEN_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('SEVENTEEN_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('SEVENTEEN_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('EIGHTEEN_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('EIGHTEEN_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('NINETEEN_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('NINETEEN_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('TWENTY_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('TWENTY_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('TWENTY_ONE_RIDE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('TWENTY_ONE_ALIGHT_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('TWENTY_TWO_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('TWENTY_TWO_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('TWENTY_THREE_NUM').text());
            // tempjson.busTimearr.push(busNuminfo(this).find('TWENTY_THREE_NUM').text());
        })
        
        busarr.push(tempjson);
    });
        
    res.render('index', { title: '너무 어려워..', data: { busRoute: busarr }, });
});

// function getbusarr() {
//     return new Promise(function(resolve, reject) {
        
        
//         request(businStationLink, function(err, busres, busbody) {
//             if(err) reject(err);
//             if(busres.statusCode != 200) {
//                 reject('Invalid status code: ' + busres.statusCode);
//             }
//             bus = cheerio.load(busbody, { xmlMode: true, });
//             busRouteList = bus('busRouteNm');
//             busarr = [];
           
//             for(var i = 0; busRouteList.length; i++) {
//                 var t = busRouteList.get(i);
//                 busnum = bus(t).text();
//                 tempurl = encodeURI(url + busnum);
//                 request(tempurl, function(temperr, tempres, tempbody) {
//                     if(temperr) reject(temperr);
//                     if(tempres.statusCode != 200) {
//                         reject('Invalid status code: ' + tempres.statusCode);
//                     }
//                     busNm = cheerio.load(tempbody, { xmlMode: true, });
//                     tempjson = { busTitle: busnum, busStationArr: []};
//                     busNmList = busNm('row');
//                     for(var j = 0; j < busNmList.length; j++) {
//                         var k = busNmList.get(j);
//                         busStation = busNm(k).find('BUS_STA_NM').text();
//                         console.log(busStation);
//                         tempjson.busStationArr.push(busStation);
//                     }
//                     busarr.push(tempjson);
//                 })
//             }
//           resolve(busarr);
//         });
//     });
    
    // request(businStationLink, function(err, busres, busbody) {
        
    //     bus('busRouteNm').each(function(i, element) {
    //         busnum = bus(this).text();
    //         tempurl = encodeURI(url + busnum);
    //         tempjson = { busTitle: busnum, busStationArr: [] };
    //         request(tempurl, function(temperr, tempres, tempbody) {
    //             busNm = cheerio.load(tempbody, { xmlMode: true, });
    //             busNm('row').each(function(j, elem) {
    //                 busStation = busNm(this).find('BUS_STA_NM').text();
    //                 tempjson.busStationArr.push(busStation);
    //             });
    //             busarr.push(tempjson);
    //         });
    //     });
    //     console.log(busarr);
    //     return busarr;
    // });

    
    // console.log(urlarr.toString());
    // urlarr.forEach(function(busurl) {
    //     console.log(busurl);
    //     busNuminfo = cheerio.load(busurl,{ xmlMode: true, });
    //     console.log(busNuminfo(this).text());
        // busNuminfo('row').each(function(j, elementbus) {
        //     console.log(busNuminfo(this).text());
            
        // });
    // });
    
// });

module.exports = router;