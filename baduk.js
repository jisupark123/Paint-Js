const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');

const margin = 30;
const LINE_COLOR = 'black';
const CANVAS_WIDTH = 300 + margin * 2;
const CANVAS_HEIGHT = 300 + margin * 2;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const row = 12; // 바둑판 칸 개수
const rowSize = 300 / row; // 바둑판 한 칸의 너비
const dolSize = 10; // 바둑돌 크기
let count = 0;

let board = new Array(Math.pow(row + 1, 2)).fill(-1);

// 바둑판 그리기
function draw() {
  // 바둑판 - 판
  ctx.fillStyle = '#e38d00';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // 바둑판 - 줄 (사각형을 12X12로 채우기)
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < row; y++) {
      const w = (CANVAS_WIDTH - margin * 2) / row; // 한칸의 너비
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 1;
      ctx.strokeRect(w * x + margin, w * y + margin, w, w);
    }
  }
  ctx.fillStyle = LINE_COLOR;
  ctx.lineWidth = 1;

  // 바둑판 - 화점

  function drawingDot(x, y) {
    ctx.fillStyle = LINE_COLOR;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, dolSize / 3, 0, Math.PI * 2);
    ctx.fill();
  }
  // 귀 화점
  for (let a = 0; a < 2; a++) {
    for (let b = 0; b < 2; b++) {
      drawingDot(
        (3 + a) * rowSize + margin + a * (row - 7) * rowSize,
        (3 + b) * rowSize + margin + b * (row - 7) * rowSize
      );
    }
  }
  // 변 화점

  // 중앙 화점
  drawingDot(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
}
draw();

canvas.addEventListener('mouseup', (event) => {
  console.log(event.offsetX, event.offsetY);
});
