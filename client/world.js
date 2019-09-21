class World {
  constructor(w) {
    this.players = [];
    this.walls = w.walls.map(wall => Rect.from_obj(wall));
    this.bullets = [];
    this.age = w.age;
    this.start_time = Date.now();
  }

  now() {return this.age + Date.now() - this.start_time;}

}
