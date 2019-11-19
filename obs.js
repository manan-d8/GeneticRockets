let pos1;
let pos2;
class obs {
  constructor(x1, x2) {
    this.pos1 = x1;
    this.pos2 = x2;
    this.dir1 = false;
    this.dir2 = false;
    this.dir3 = false;
    
    if (this.pos1.x > this.pos2.x && this.pos1.y > this.pos2.y) {
      this.dir3 = true;
    }
    else if (this.pos1.y > this.pos2.y) {
      this.dir1 = true;
    }
    else if (this.pos1.x > this.pos2.x) {
      this.dir2 = true;
    }

  }
  show() {
    noStroke();
    fill(0, 150, 255);

    rect(this.pos1.x, this.pos1.y, this.pos2.x - this.pos1.x, this.pos2.y - this.pos1.y);
    stroke(1);
  }
  collideC(dot) {


    if (this.dir1) {
      if (dot.pos.x > this.pos1.x && dot.pos.y < this.pos1.y && dot.pos.x < this.pos2.x && dot.pos.y > this.pos2.y) {
        dot.dead = true;
      }
    } else if (this.dir2) {
      if (dot.pos.x < this.pos1.x && dot.pos.y > this.pos1.y && dot.pos.x > this.pos2.x && dot.pos.y < this.pos2.y) {
        dot.dead = true;
      }
    }
    else if (this.dir3) {
      if (dot.pos.x < this.pos1.x && dot.pos.y < this.pos1.y && dot.pos.x > this.pos2.x && dot.pos.y > this.pos2.y) {
        dot.dead = true;
      }
    }
    else {
      if (dot.pos.x > this.pos1.x && dot.pos.y > this.pos1.y && dot.pos.x < this.pos2.x && dot.pos.y < this.pos2.y) {
        dot.dead = true;
      }
    }
  }

}