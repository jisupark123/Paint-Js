const canvasColors = [
  'black',
  'white',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  '#0579FF',
  '#F6F9FC',
];

const $controlsColors = $('.controls__color');
$controlsColors.each(function (i) {
  $(this).css({ backgroundColor: canvasColors[i] });
});

//-----------------------------------------------  main  -------------------------------------------------------------

const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colorbtns = document.querySelectorAll('.jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = 'black';
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

const stopPainting = () => {
  painting = false;
};

const startPainting = () => {
  painting = true;
};

const onMouseMove = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

const handleColorClick = (event) => {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

const handleRangeChange = (event) => {
  const size = event.target.value;
  ctx.lineWidth = size;
};

const handleModeClick = () => {
  if (filling === true) {
    filling = false;
    mode.innerText = 'fill';
  } else {
    filling = true;
    mode.innerText = 'Paint';
  }
};

const handleCanvasClick = () => {
  if (filling === true) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
};

const handleCM = (event) => {
  event.preventDefault();
};

const handleSaveClick = () => {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJs';
  link.click();
};

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM);
}

if (colorbtns) {
  Array.from(colorbtns).forEach((colorbtn) =>
    colorbtn.addEventListener('click', handleColorClick)
  );
}

if (range) {
  range.addEventListener('input', handleRangeChange);
}

if (mode) {
  mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick);
}
