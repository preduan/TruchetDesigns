function setup() {
  createCanvas(800, 800);
  angleMode(RADIANS);
  noFill();
  noLoop();
  stroke(0, 100);
  strokeWeight(2);
}

// probability (0..1) that a drawn star will include the smaller duplicate inside
const INNER_STAR_PROB = 0.5;
// scale for an outer slightly larger star drawn around the main star
const OUTER_STAR_SCALE = 1.25;
// probability (0..1) that a drawn star will include the outer halo
const OUTER_STAR_PROB = 0.5;

function draw() {
  background(255);
  
  let tileSize = 100;
  let cols = width / tileSize;
  let rows = height / tileSize;
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // base position of each tile center
      let px = x * tileSize + tileSize / 2;
      let py = y * tileSize + tileSize / 2;
      
      push();
      // add slight random offset so stars cross into neighbor tiles
      let jitterX = random(-tileSize * 0.4, tileSize * 0.4);
      let jitterY = random(-tileSize * 0.4, tileSize * 0.4);
      translate(px + jitterX, py + jitterY);
      
      rotate(HALF_PI * floor(random(4))); // random rotation for Truchet-like variety
      
      let rOuter = random(tileSize * 0.3, tileSize * 0.6);
      // decide per-star whether to draw the smaller inner duplicate and outer halo
      let includeInner = random() < INNER_STAR_PROB;
      let includeOuter = random() < OUTER_STAR_PROB;
      drawNinePointStar(rOuter, includeInner, includeOuter);
      pop();
    }
  }
}

function drawNinePointStar(rOuter, doInner = false, doOuter = false) {
  let rInner = rOuter * 0.4;
  let points = 9;
  let angleStep = TWO_PI / (points * 2);
  
  beginShape();
  for (let i = 0; i < points * 2; i++) {
    let r = (i % 2 === 0) ? rOuter : rInner;
    let x = cos(i * angleStep) * r;
    let y = sin(i * angleStep) * r;
    vertex(x, y);
  }
  endShape(CLOSE);
  // optionally draw a slightly larger outer star (drawn behind the main star)
  if (doOuter && OUTER_STAR_SCALE > 1.0) {
    let rOuterOut = rOuter * OUTER_STAR_SCALE;
    let rInnerOut = rInner * OUTER_STAR_SCALE;
    beginShape();
    for (let i = 0; i < points * 2; i++) {
      let r = (i % 2 === 0) ? rOuterOut : rInnerOut;
      let x = cos(i * angleStep) * r;
      let y = sin(i * angleStep) * r;
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  // optionally draw a smaller duplicate star inside the main one
  if (doInner) {
    // kept the same rotation and center; tweak innerScale to change size
    let innerScale = 0.45;
    let rOuter2 = rOuter * innerScale;
    let rInner2 = rInner * innerScale;

    beginShape();
    for (let i = 0; i < points * 2; i++) {
      let r = (i % 2 === 0) ? rOuter2 : rInner2;
      let x = cos(i * angleStep) * r;
      let y = sin(i * angleStep) * r;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
