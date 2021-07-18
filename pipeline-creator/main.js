const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pipeType = document.getElementById('type');
let dxSlider = document.getElementById('dx');
let dySlider = document.getElementById('dy');
let restart = document.getElementById('restart');
let downloadBtn = document.getElementById('download');

let radius = 30;
let x = randomNumFromInterval(radius, canvas.width - radius);
let y = randomNumFromInterval(radius, canvas.height - radius);
let dx = 1;
let dy = 1;

let h = 0;
let s = 30;
let l = 30;
function animate() {

  requestAnimationFrame(animate);
  // ctx.clearRect(0,0,innerWidth,innerHeight);
  ctx.beginPath();
  // ctx.strokeStyle = `hsl(${randomNum(360)}, ${randomNum(100)}%, ${randomNum(100)}%)`

  // ctx.strokeStyle = `hsl(${randomNum(360)}, 50%,50%)`

  // ctx.strokeStyle = `hsl(100, ${randomNum(100)}%, ${randomNum(100)}%)`
  h++;
  if (h > 360) h = 0;

  if (pipeType.value === 'stripped') {
    s++;
    l++;
    if (s > 100) s = 30;
    if (l > 100) l = 30;
  } else {
    s = l = 50;
  }

  ctx.strokeStyle = `hsl(${h}, ${s}%, ${l}%)`


  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.stroke();

  if (x + radius >= canvas.width || x - radius <= 0) dx = -dx;
  if (y + radius >= canvas.height || y - radius <= 0) dy = -dy;
  x += dx;
  y += dy;
  //console.log('dx: '+ dx+ ' , dy: '+ dy)
}
animate()

//Event Listeners
dxSlider.addEventListener('input', () => {
  dx = Number(dxSlider.value);
});

dySlider.addEventListener('input', () => {
  dy = Number(dySlider.value);
});

restart.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
});

downloadBtn.addEventListener('click', () => {
  let imgLink = document.createElement('a');
  imgLink.download = `prasant${Date.now()}.png`;
  imgLink.href = canvas.toDataURL()
  imgLink.click();
})

//lib
function randomNum(arg) {
  return Math.floor(Math.random() * arg);
}

function randomNumFromInterval(min, max) {
  return Math.random() * (max - min + 1) + min;
}