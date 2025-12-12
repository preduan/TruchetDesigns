function setup() {
  createCanvas(800, 800);
  noFill();
  noLoop();
  stroke(0, 100); // light gray for soft line
  strokeWeight(2);
  angleMode(RADIANS);
}

function draw() {
  background(255);
  
  let tileSize = 100;
  let cols = width / tileSize;
  let rows = height / tileSize;
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let px = x * tileSize;
      let py = y * tileSize;
      
      push();
      translate(px + tileSize / 2, py + tileSize / 2);
      rotate(PI / 2 * floor(random(4))); // random 0°, 90°, 180°, or 270°
      drawSwirlyTile(tileSize);
      pop();
    }
  }
}

function drawSwirlyTile(s) {
  let r = s;
  let numArcs = 4; // number of layered arcs per tile
  
  for (let i = 0; i < numArcs; i++) {
    let offset = i * (s / 15);
    strokeWeight(map(i, 0, numArcs, 1, 3)); // vary thickness
    
    // draw two arcs per tile (like classic truchet, but layered)
    arc(-s/2 + offset, -s/2 + offset, r - offset, r - offset, 0, HALF_PI);
    arc(s/2 - offset, s/2 - offset, r - offset, r - offset, PI, 3 * HALF_PI);
  }
}

