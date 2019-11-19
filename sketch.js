let goal;
let p;
let startper = false;
//let fitness = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  p = new Population(500);
  goal = createVector(width/2, 15);
  
  button = createButton('Start');
  button.position(width - 70, 10);
  button.mousePressed(start);
  // slider = createSlider(0, 255, 100);
  // slider.position(width - 70, 50);
  // slider.style('width', '60px');
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
}
function start() {
  print("start");
  startper = true;
}

function showGoal() {
  noStroke();
  fill(255, 0, 0);
  ellipse(goal.x, goal.y, 20, 20);
  fill(0, 0, 255);
  ellipse(goal.x, goal.y, 16, 16);
  fill(0, 255, 0);
  ellipse(goal.x, goal.y, 8, 8);
  stroke(1);

}

function draw() {
  // let val = slider.value();
  // background(val);
  background(40);
  // if (locked) {
  //   rect(posi1.x, posi1.y, mouseX - posi1.x, mouseY - posi1.y);
  //   //redraw();
  // }
  
  showGoal();
  if (p.allDotDead()) {
    //genetic algorithm
    p.calculateFitness();
    p.naturalSelection();
    p.mutateDemBabies();
  } else {

    if (startper) {
      p.update();
    }
    p.show();
  }
}