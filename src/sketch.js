import { p } from "p5"
import Config from "../conf/Config"

var mapImg;
const MAP_WIDTH = 1024;
const MAP_HEIGHT = 512;

var centerLat = 0;
var centerLong = 0;
var zoom = 1;

// Shanghai
var latitude = 31.2304;
var longitude = 121.4737;

function preload(){

    var imgUrl = "https://api.mapbox.com";
    imgUrl += "/v4/mapbox.dark/";
    imgUrl += `${centerLat},${centerLong},${zoom},0/${MAP_WIDTH}x${MAP_HEIGHT}.png`;
    imgUrl += `?access_token=${Config.MAPBOX_ACCESS_TOKEN}`;
    mapImg = p.loadImage(imgUrl);
}

function mercX(longitude){
    var a = (128/Math.PI) * Math.pow(2, zoom);
    var b = longitude + Math.PI;
    return a * b;
}

function mercY(latitude){
    var a = (128/Math.PI) * Math.pow(2, zoom);
    var b = Math.tan(Math.PI/4 + latitude/2);
    var c = Math.PI - Math.log(b);
    return a * c;
}

function setup(){
    document.createCanvas(MAP_WIDTH, MAP_HEIGHT);
}
