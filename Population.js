let myobs = [];
let count = 0;
let locked = false;
let posi1;
let posi2;
function mousePressed() {
  locked = true;
  posi1 = new createVector(0,0);
  posi2 = new createVector(0,0);
  // if(count==0 && startper==true)
  //   count=1;
  // else
  posi1.x = mouseX;
  posi1.y = mouseY;
}
// function mouseDragged() {
//   if(locked){
//     rect(posi1.x,posi1.y,mouseX-posi1.x,mouseY-posi1.y);
//     redraw();
//   }
// }

function mouseReleased() {
  posi2.x = mouseX;
  posi2.y = mouseY;
  if(posi2.x>width)
    posi2.x = width;
  else if(posi2.x<0)
    posi2.x = 0;
  if(posi2.y>height)
    posi2.y = height;
  else if(posi2.y<0)
    posi2.y = 0;
  
  myobs.push(new obs(posi1,posi2));
  locked = false;
  //print(posi1,posi2);
}
class Population{
 
  constructor(size){
    this.dots = []
    this.gen = 1;
    this.fitnessSum = 0;
    this.bestDot = new Dot();
    this.bestDot.setisbesttrue();
    this.minStep = 500;
    this.lastminstep = 500;
    this.countsamecounter = 0;
    for(let i = 0 ;i < size ; i++){
      this.dots[i] = new Dot();
    }
  }
  
  show(){
    for(let i in myobs){
      myobs[i].show();
     }
    for(let i = 1; i< this.dots.length; i++){
        fill(0,0,0,150);
       this.dots[i].show();
    }
    noStroke();
    fill(0,255,0);
    this.dots[0].show();
    //textFont(inconsolata);
    textSize(20);
    fill(0, 202, 253, 251);
    text('Generation : '+this.gen, 5, 20);
    text('steps : '+this.minStep, 5, 45);
    stroke(0);
  }
  update(){
    
    for(let i in myobs){
      for(let j in this.dots){
        myobs[i].collideC(this.dots[j]);
      }
     }
    
    
    for(let i in this.dots){
      if ( this.dots[i].brain.step > this.minStep) {
         this.dots[i].dead = true;
      } else {
      
       this.dots[i].update();}
    }
  }
  calculateFitness(){
    for(let i in this.dots){
       this.dots[i].Fitnesscalculate();
    }
  }
  
  allDotDead(){
    for(let i in this.dots) {
      if (!this.dots[i].dead && !this.dots[i].reachedGoal) { 
        return false;
      }
    }
    return true;
  }
  naturalSelection() {
    let newDots = [];    //next gen
    
    this.setBestDot();
    this.calculateFitnessSum();

    //the champion lives on 
    //this.bestDot.setisbesttrue();
    newDots[0] = this.dots[this.bestDot].gimmeBaby();
    newDots[0].isBest = true;
    for(let i = 1; i< this.dots.length; i++) {
      //select parent based on fitness
      let parent = this.selectParent();

      //get baby from them
      newDots[i] = parent.gimmeBaby();
    }

    this.dots = newDots;
    this.gen ++;
  }

  calculateFitnessSum() {
    this.fitnessSum = 0;
    for(let i in this.dots) {
      this.fitnessSum += this.dots[i].fitness;
    }
  }


  selectParent() {
    let rand = random(this.fitnessSum);
    let runningSum = 0;
    for (let i = 0; i< this.dots.length; i++) {
      runningSum+= this.dots[i].fitness;
      if (runningSum > rand) {
        return this.dots[i];
      }
    }
    //should never get to this point
    print("error");
    return null;
  }
  
  
  mutateDemBabies() {
    for (let i = 1; i< this.dots.length; i++) {
      this.dots[i].brain.mutate();
    }
  }
  
  
  setBestDot() {
    let max = 0;
    let maxIndex = 0;
    for (let i = 0; i< this.dots.length; i++) {
      if (this.dots[i].fitness > max) {
        max = this.dots[i].fitness;
        maxIndex = i;
      }
    }
    this.bestDot = maxIndex;
    if (this.dots[this.bestDot].reachedGoal) {
      this.minStep = this.dots[this.bestDot].brain.step;
    }
    print("step:  "+this.minStep+"    Gen :   "+this.gen);
    
  }
}