const particles = [];

// call to create particle explosion
// tip: call multiple times with differnt colours
function particle_fx(x0, y0, a=100, c="#fff") {
  for (let i = 0; i < 20; i++) {
    particles.push(new Particle(x0, y0, a, c));
  }
}

// call every frame
function do_particles(dt) {
  for (let p of particles) {
    p.update(dt);
    p.show();
  }
}

class Particle {
  constructor(x, y, a, c="#fff") {
    this.x = x;
    this.y = y;
    this.radius = random(3, 8);
    this.vx = random(-1, 1) * 0.5;
    this.vy = random(-1, 1) * 0.5;
    this.age = random(1, 2) * a;
    this.c = c;
  }
  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.age -= dt;
    if (this.age < 0) this.remove();
  }
  show() {
    noStroke(); fill(this.c);
    circle(this.x, this.y, this.age * 0.1);
  }
  remove() {
    particles.splice(particles.indexOf(this), 1);
  }
}
