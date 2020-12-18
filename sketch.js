let width = 600;
let height = 500;
let noise_x_offset = 0;
let noise_y_offset = 0;

function IX(x, y) {
  return x * mapY + y;
}

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function getVertex(x, y, scale) {
  h = slider_height.value();
  noise_vertex = noise((x + noise_x_offset) / 15, (y + noise_y_offset) / 15);
  if (slider_texture.value() == 1) {
    fill(map_range(noise_vertex, 0, 1, 20, 150));
  }
  vertex(x * scale, y * scale, map_range(noise_vertex, 0, 1, -h, h));
}

function setup() {
  createCanvas(1920, 900, WEBGL);
  createSpan("X Speed : ");
  slider_x_offset = createSlider(0, 1, 0.25, 0.01);
  createSpan("| Y Speed : ");
  slider_y_offset = createSlider(0, 1, 0.15, 0.01);
  createSpan("| Height : ");
  slider_height = createSlider(-100, 100, 25, 1);
  createSpan("| Scale : ");
  slider_scale = createSlider(2, 10, 3.7, 0.05);
  createSpan("| Apply texture : ");
  slider_texture = createSlider(0, 1, 1, 1);
}

function draw() {
  let scale = slider_scale.value();
  let mapX = width / scale;
  let mapY = height / scale;
  background(0);
  if (slider_texture.value() == 0) {
    noFill();
    stroke(255);
  } else {
    noStroke();
  }
  translate(1000, 200);
  rotateX(PI / 3.1);
  translate(-1300, -110, 360);
  for (x = 0; x < mapX - 1; x++) {
    beginShape(TRIANGLE_STRIP);
    for (y = 0; y < mapY; y++) {
      getVertex(x, y, scale);
      getVertex(x + 1, y, scale);
    }
    endShape();
  }
  noise_x_offset += slider_x_offset.value();
  noise_y_offset += slider_y_offset.value();
}
