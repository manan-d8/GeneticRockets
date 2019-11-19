class Brain{

  constructor(size){
    this.size = size
    this.directions = [];
    this.step = 0;
    for(let i=0;i<this.size;i++)
    {
      let rand = random(2*PI);
      this.directions[i] = p5.Vector.fromAngle(rand);
    }
  }
  clone() {
    let clone = new Brain(this.directions.length);
    for (let i = 0; i < this.directions.length; i++) {
      clone.directions[i] = this.directions[i].copy();
    }
    return clone;
  }
  mutate(){
    let mutationRate = 0.01;
    
    for (let i =0; i< this.directions.length; i++) {
      let rand = random(1);
      if (rand < mutationRate) {
        //set this direction as a random direction 
        let randomAngle = random(2*PI);
        this.directions[i] = p5.Vector.fromAngle(randomAngle);
      }
    }
  }
  
}