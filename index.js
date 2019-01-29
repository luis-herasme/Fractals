import Complex from "./Complex";

/**
 *
 * TODO
 *
 * Add to options:
 *  Canvas resolution.
 *  Colors.
 *  N, Iterations
 *  N, Infinity
 *  Zoom
 */

const gpu = new GPU();
const c = new Complex(-1, 0);

document.getElementById("cambiar").addEventListener("click", () => {
  c.Re = Number(document.getElementById("real").value);
  c.Im = Number(document.getElementById("im").value);
});

const Fractal = gpu
  .createKernel(function(r, i, w, h, scale) {
    var y = scale * (this.thread.x / w) - scale / 2;
    var x = scale * (this.thread.y / h) - scale / 2;
    var temp1,
      temp2,
      n = 0;

    while (n < 100) {
      temp1 = x * x - y * y;
      temp2 = 2 * x * y;

      x = temp1 + i;
      y = temp2 + r;

      if (sqrt(pow(x, 2) + pow(y, 2)) > 100) break;
      n++;
    }
    n = n / 200;
    this.color(1 - n, 1 - n, 1 - n);
  })
  .setOutput([window.innerWidth, window.innerHeight])
  .setGraphical(true);

const canvas = Fractal.getCanvas();
document.getElementsByTagName("body")[0].appendChild(canvas);

let counter = 0;
setInterval(() => {
  counter += 0.006;
  c.Im = Math.cos(c.Im + counter);
  c.Re = Math.cos(c.Re + counter);
  Fractal(c.Re, c.Im, window.innerWidth, window.innerHeight, 2);
}, 1000 / 60);
