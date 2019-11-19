class Dot{
 
  constructor(){
    this.pos = createVector(width/2, height-20);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    
    this.goal = createVector(width/2, 15);
    
    this.brain = new Brain(400);
    this.dead = false;
    this.reachedGoal = false;
    
    this.isbest = false;
    //print(this.pos);
  }
  
  show(){
   if (this.isBest) {
      push()
     fill(0,255,0);
      translate(this.pos.x, this.pos.y);
      rotate(this.vel.heading());
      triangle(-5,-5,8,0,-5,5);
      //(-5,-5,10,0,-5,5)
      // noStroke();
      // fill(255,255,0,250);
      // rect(-6, 0, 6, 6);
      // stroke(0);
      pop()
    } else {
      stroke(250);
      fill(255,255,255,150);
      push()
      translate(this.pos.x, this.pos.y);
      rotate(this.vel.heading());
      triangle(-5,-5,10,0,-5,5);
      //(-5,-5,10,0,-5,5)
      // noStroke();
      // fill(255,255,0,250);
      // //ellipse(-6, 0, 4, 4);
      // stroke(0);
      pop()
      stroke(0);
    }
  }
  
  setisbesttrue(){
    this.isbest = true;
  }
  
  move(){
    
    if(this.brain.directions.length > this.brain.step){
      this.acc = this.brain.directions[this.brain.step];
      this.brain.step++;
    }
    else{
      this.dead = true;
    }
    //print(this.acc);
    this.vel.add(this.acc);
    this.vel.limit(15);
    this.pos.add(this.vel);
  }
  
  update() {
    if (!this.dead && !this.reachedGoal) {
      this.move();
      if (this.pos.x< 2|| this.pos.y<2 || this.pos.x>width-2 || this.pos.y>height -2) {//if near the edges of the window then kill it 
        this.dead = true;
      } 
      else if (dist(this.pos.x, this.pos.y, this.goal.x, this.goal.y) < 10) {//if reached goal
        this.reachedGoal = true;
      }
      
      
      // else if(this.pos.x> 100 && this.pos.y>300 && this.pos.x<500 && this.pos.y<320){
      //   this.dead = true;
      // }
    }
  }
  
  Fitnesscalculate(){
    if(this.reachedGoal){
      this.fitness = 1/16+10000/(this.brain.step * this.brain.step);
    
    }else{
    let distanceToGoal = dist(this.pos.x, this.pos.y, this.goal.x, this.goal.y);
    this.fitness = 1.0/(distanceToGoal * distanceToGoal); 
  }
}
  
  gimmeBaby() {
    let baby = new Dot();
    baby.brain = this.brain.clone();//babies have the same brain as their parents
    //print(baby.brain);
    return baby;
  }
  

}
