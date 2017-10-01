import p5 from "p5"
import Config from "../conf/Config"

const MAP_WIDTH = 1024;
const MAP_HEIGHT = 512;

var centerLat = 0;
var centerLong = 0;
var zoom = 1;
var mapImage;

// Shanghai
var latitude = 31.2304;
var longitude = 121.4737;

document.addEventListener("DOMContentLoaded", () => {
    new p5((p) => {
        p.preload = () => {
            let imgUrl = "https://api.mapbox.com";
            imgUrl += "/v4/mapbox.dark/";
            imgUrl += `${centerLat},${centerLong},${zoom},0/${MAP_WIDTH}x${MAP_HEIGHT}.png`;
            imgUrl += `?access_token=${Config.MAPBOX_ACCESS_TOKEN}`;
            mapImage = p.loadImage(imgUrl);
        }
        p.setup = () => {
            p.createCanvas(MAP_WIDTH, MAP_HEIGHT);
            p.image(mapImage, 0, 0);
        }
    });
});


function mercX(longitude){
    let a = (128/Math.PI) * Math.pow(2, zoom);
    let b = longitude + Math.PI;
    return a * b;
}

function mercY(latitude){
    let a = (128/Math.PI) * Math.pow(2, zoom);
    let b = Math.tan(Math.PI/4 + latitude/2);
    let c = Math.PI - Math.log(b);
    return a * c;
}