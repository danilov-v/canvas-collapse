import { randomIntFromRange, randomColor, distance, resolveCollision } from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ["#2185C5", "#7ECEFD", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Particles
class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
      x: 0.08 * randomIntFromRange(-1, 1),
      y: 0.08 * randomIntFromRange(-1, 1),
    }
    this.mass = 1;
    this.alpha = 0.2;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.save()
    c.globalAlpha = this.alpha;
    c.fillStyle = this.color;
    c.fill();
    c.restore();
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath();
  }

  update(particles) {
    this.draw();

    const { x, y } = mouse
    if (distance(x, y, this.x, this.y) < 100) {
      this.alpha += 0.02;
    } else if (this.alpha > 0.2) {
      this.alpha -= 0.02; 
    }

    //collapsed effect
    particles.map((item, i) => {
      if( item === this) return item 

      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.velocity.x = -this.velocity.x;
      }

      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.velocity.y = -this.velocity.y;
      }

      if (distance(this.x, this.y, item.x, item.y) - this.radius * 2 < 0) {
        // console.log(1);
        resolveCollision(this, item)
      }
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    })
  }

  setPosition({ x, y }) {
    this.x = x;
    this.y = y;
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y
    };
  }
}

// Implementation
let particles;
function init() {
  const caordinates = [];

  const generateValidPosition = (x1, y1, radius1) => {
    const isValid = caordinates.reduce((valid, caord) => {
      const [x2, y2, radius2] = caord;
      
      if (distance(x1, y1, x2, y2) <= radius1 + radius2) {
        valid = false;
      }
      return valid;
    }, true);
    
    if (isValid) {
      caordinates.push([x1, y1, radius1]);
      
      return [x1, y1, radius1];
    } else {
      const x = randomIntFromRange(radius1, innerWidth - radius1);
      const y = randomIntFromRange(radius1, innerHeight - radius1);

      return generateValidPosition(x, y, radius1);
    }
  };

  particles = Array(50)
    .fill("")
    .map((item, i) => {
      const defaultRadius = 20; 

      const [x, y, radius] = generateValidPosition(
        randomIntFromRange(defaultRadius, innerWidth - defaultRadius),
        randomIntFromRange(100, innerHeight - defaultRadius),
        defaultRadius
      );
      
      return new Particle(
        x,
        y,
        radius,
        colors[randomIntFromRange(0, colors.length - 1)]
      );
    });
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((element, i, self ) => {
    element.update(self);
  });
}

init();
animate();