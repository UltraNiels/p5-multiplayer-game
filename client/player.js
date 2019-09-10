class Player extends SolidRect {
  constructor(x, y, w, h, c, e, id, hit_list=[]) {
    super(x, y, w, h, c, hit_list);
    this.energy = e;
    this.id = id;
  }
  static from_obj(o) {
    const p = new Player(o.x, o.y, o.w, o.h, o.color, o.energy, o.id);
    p.join_time = o.join_time;
    p.username = o.username;
    p.dx = o.dx; p.dy = o.dy;
    return p;
  }
  move(dx, dy) {
    super.move(dx, dy);
    this.dx = Math.sign(dx);
    this.dy = Math.sign(dy);
  }

  show() {
    push();
    rectMode(CENTER);
    const w2 = this.w / 2, h2 = this.h / 2;
    translate(this.x + w2 , this.y + h2);
    // wobbly square
    let wob = sin((Date.now() - this.join_time) * 0.01) * 2;
    if (this.energy > 0) {
      noStroke(); fill(this.color);
    } else {
      noFill(); stroke(this.color);
      this.hit_list = [];
    }
    rect(0, 0, this.w + 2 * wob, this.h - 2 * wob, 8, 8);
    noFill(); stroke("#0006"); strokeWeight(3.0);
    circle((w2 + wob) * this.dx * 0.5, (h2 - wob) * this.dy * 0.5, w2 * 0.6);
    // health circle
    noFill(); strokeWeight(3.0);
    let c = "#0f08";
    if (this.energy < 67) c = "#ff08";
    if (this.energy < 25) c = "#f008";
    stroke(c);
    const r = this.energy * TAU / 100;
    if (r > 0) arc(0, 0, this.w * 2, this.h * 2, 1.5 * PI, 1.5 * PI + r);
    // username
    textAlign(CENTER);
    textFont(font, 24);
    fill(this.energy > 0 ? "#fffa" : "#fff6"); stroke("#0008"); strokeWeight(1.0);
    text(this.username, 0, h2 + 36);
    pop();
  }

  takeDamage(amount=20, rndm=false) {
    this.energy = max(0, this.energy - ((rndm ? random(-10, 10) : 0) + amount));
  }
}
