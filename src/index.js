import p5 from "p5"
import Config from "../conf/Config"

const MAP_WIDTH = 1024;
const MAP_HEIGHT = 512;

const CENTER_LAT = 0;
const CENTER_LONG = 0;
var zoom = 1;
var mapImage;

var earthquakes;

var testLat = "45.5231";
var testLong = "-122.6765";

document.addEventListener("DOMContentLoaded", () => {
    new p5((p) => {
        p.preload = () => {
            let imgUrl = getImageUrl();
            mapImage = p.loadImage(imgUrl);
            earthquakes = p.loadStrings("data/quakes.csv");
        }
        p.setup = () => {
            p.createCanvas(MAP_WIDTH, MAP_HEIGHT);
            p.translate(p.width/2, p.height/2);
            p.imageMode('center');
            p.image(mapImage, 0, 0);

            drawCircle(p, testLat, testLong);

            for(var i = 1; i < earthquakes.length; i++){ // skip header line
                let data = earthquakes[i].split(/,/);
                let latitude = data[1];
                let longitude = data[2];

                drawCircle(p, latitude, longitude);
            }
        }
    });
});

function getImageUrl(){
    let imgUrl = "https://api.mapbox.com";
    imgUrl += "/styles/v1/mapbox/dark-v9/static/";
    imgUrl += `${CENTER_LONG},${CENTER_LAT},${zoom}/${MAP_WIDTH}x${MAP_HEIGHT}`;
    imgUrl += `?access_token=${Config.MAPBOX_ACCESS_TOKEN}`;
    return imgUrl;
}

function drawCircle(p, latitude, longitude){
    let centerX = mercX(p, CENTER_LONG);
    let centerY = mercY(p, CENTER_LAT);

    let x = mercX(p, longitude) - centerX;
    let y = mercY(p, latitude) - centerY;

    p.fill(255, 0, 255, 200);
    p.ellipse(x, y, 20, 20);
}

function mercX(p, longitude){
    longitude = p.radians(longitude);
    // 256 because MapBox uses 512 x 512 tiles
    let a = (256 / p.PI) * p.pow(2, zoom);
    let b = longitude + p.PI;
    let result = a * b;
    return result;
}

function mercY(p, latitude){
    latitude = p.radians(latitude);
    // 256 because MapBox uses 512 x 512 tiles
    let a = (256 / p.PI) * p.pow(2, zoom);
    let b = p.tan(p.PI / 4 + latitude / 2);
    let c = p.PI - p.log(b);
    let result = a * c;
    return result;
}