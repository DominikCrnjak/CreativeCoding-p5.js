let myMap;
let canvas;
let mappa = new Mappa("Leaflet");
let data;
let numRows;
let lng;
let lat;
let adresa;
let brUticnica;
let polygonCoordinates;
let boundary;

let options = {
  lat: 45.815,
  lng: 15.9819,
  zoom: 12,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
};

function preload() {
  data = loadTable("./elektricne_punionice.csv", "csv", "header");
  boundary = loadJSON("./map.geo.json");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  numRows = data.getRowCount();

  lng = data.getColumn("X");
  lat = data.getColumn("Y");
  adresa = data.getColumn("ADRESA");
  brUticnica = data.getColumn("BROJ_UTICNICA");

  myMap.overlay(canvas);
  myMap.onChange(callbackFunction);

  let x = 16.0562; // X koordinata unutar poligona
  let y = 45.8489; // Y koordinata unutar poligona
}

function draw() {
  myMap.overlay(canvas);
  myMap.onChange(callbackFunction);

  let lng = data.getColumn("X");
  let lat = data.getColumn("Y");
  let adresa = data.getColumn("ADRESA");
  let brUticnica = data.getColumn("BROJ_UTICNICA");

  for (let i = 0; i < numRows; i++) {
    let la = myMap.latLngToPixel(lat[i], lng[i]);

    if (
      mouseX < la.x + 10 &&
      mouseX > la.x - 10 &&
      mouseY > la.y - 10 &&
      mouseY < la.y + 10
    ) {
      fill(255);
      textSize(brUticnica[i] * 5);
      text(adresa[i], la.x - 10, la.y - 10);
    }
  }
}

function callbackFunction() {
  clear();

  for (let j = 0; j < boundary.features.length; j++) {
    polygonCoordinates = boundary.features[j].geometry.coordinates;

    let name = boundary.features[j].properties.name;

    let ukupanZbroj = 0;

    for (let i = 0; i < numRows; i++) {
      let y = lat[i];
      let x = lng[i];
      if (
        isTockaUnutarPoligona(x, y, boundary.features[j].geometry.coordinates)
      ) {
        ukupanZbroj = ukupanZbroj + Number(brUticnica[i]);
      }
    }

    let alpha = map(ukupanZbroj, 0, 30, 75, 255);
    let fillColor = color(0, 0, 128, alpha);

    fill(fillColor);

    stroke("#060606");
    beginShape();
    for (let i = 0; i < polygonCoordinates.length; i++) {
      let lon = polygonCoordinates[i][0];
      let lat = polygonCoordinates[i][1];

      let laPol = myMap.latLngToPixel(lat, lon);

      let x = laPol.x;
      let y = laPol.y;
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  for (let i = 0; i < numRows; i++) {
    let la = myMap.latLngToPixel(lat[i], lng[i]);

    if (brUticnica[i] <= 2) {
      fill(255, 0, 100, 100);
    }
    if (brUticnica[i] > 2 && brUticnica[i] < 4) {
      fill(255, 0, 50, 105);
    }
    if (brUticnica[i] >= 4) {
      fill(255, 0, 0, 110);
    }

    if (myMap.map.getBounds().contains({ lat: lat[i], lng: lng[i] })) {
      noStroke();
      ellipse(la.x, la.y, brUticnica[i] * 5, brUticnica[i] * 5);
    }
  }
}

function mouseClick() {
  // Provjera je li korisnik kliknuo na bilo koju elipsu (dodatna funkcija)

  let lng = data.getColumn("X");
  let lat = data.getColumn("Y");
  let adresa = data.getColumn("ADRESA");
  let brUticnica = data.getColumn("BROJ_UTICNICA");

  for (let i = 0; i < numRows; i++) {
    let la = myMap.latLngToPixel(lat[i], lng[i]);

    if (
      mouseX < la.x + 10 &&
      mouseX > la.x - 10 &&
      mouseY > la.y - 10 &&
      mouseY < la.y + 10
    ) {
      fill(255);
      textSize(brUticnica[i] * 5);
      text(adresa[i], la.x - 10, la.y - 10);
    }
  }
}

function isTockaUnutarPoligona(x, y, poligon) {
  let unutar = false;
  let j = poligon.length - 1;

  for (let i = 0; i < poligon.length; i++) {
    if (
      (poligon[i][1] < y && poligon[j][1] >= y) ||
      (poligon[j][1] < y && poligon[i][1] >= y)
    ) {
      if (
        poligon[i][0] +
          ((y - poligon[i][1]) / (poligon[j][1] - poligon[i][1])) *
            (poligon[j][0] - poligon[i][0]) <
        x
      ) {
        unutar = !unutar;
      }
    }
    j = i;
  }

  return unutar;
}
