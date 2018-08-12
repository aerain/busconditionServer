var cheerio = require('cheerio');
const express = require('express');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let router = express.Router();
const fetch = require('node-fetch');

let crawlByUrl = async (url) => {
    let body = "";
    res = await fetch(url);
    body = await res.text();
    return body;
}

let getStationsByRouteListURL = 'http://ws.bus.go.kr/api/rest/busRouteInfo/getStaionByRoute?serviceKey=60io4%2B%2BLsPCgnJcw%2B1%2FufoEFwxNyyxiYIL1j9eqjqmr6OclPIxkGFXsUt%2FkY2dvAtaWXh3KzyEns%2BLVujevEww%3D%3D&busRouteId=';

router.get('/', async (req, res, next) => {
    busRouteId = 100100076;
    getStationsBody = await crawlByUrl(getStationsByRouteListURL + busRouteId);
    getStations = await cheerio.load(getStationsBody, {xmlMode: true});
    stationList = [];

    console.log('비동기 시험');
    await getStations('msgBody > itemList').each(function (i, station) {
        stationName = getStations(this).find('stationNm').text();
        stationSeq = getStations(this).find('seq').text();
        stationList.push({ stationName, stationSeq });
    });

    next();
}, (req, res, next) => {
    data = { result : stationList }
    res.send(JSON.stringify(data));
});

module.exports = router;