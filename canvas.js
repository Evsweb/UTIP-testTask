
const canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

//подключаем события
canvas.onmousedown = startDraw;
canvas.onmouseup = stopDraw;
canvas.onmouseout = stopDraw;
canvas.onmousemove = draw;
// параметры по умолчанию
context.strokeStyle = 'red';
context.lineWidth = 8;

//Смена цвета
function changeColor(color) {
  context.strokeStyle = color;
  document.getElementById('color-now').style.backgroundColor = color;
}

//Смена толщины
function changeThickness(width) {
  context.lineWidth = width;
  document.getElementById('thickness-now').style.width = width * 2 + 'px';
  document.getElementById('thickness-now').style.height = width * 2 + 'px';
}

// если в хранилище есть сохраненный рисунок - отрисовывает его
if (localStorage.getItem('utip-test') !== null) {
  let lastSave = localStorage.getItem('utip-test');
  let img = new Image();
  img.src = lastSave;
  img.onload = function () {
    context.drawImage(img, 0, 0);
  };
}

//переменная рисования определена заранее, чтобы избежать ошибки при проведении без нажатия
let isDrawing = false;

function startDraw(e) {
  //если нажата ЛЕВАЯ кнопка
  if (e.which == 1) {
    isDrawing = true;
    context.beginPath();
    context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
  }
}

function draw(e) {
  if (isDrawing == true) {
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;
    context.lineTo(x, y);
    context.stroke();
  }
}

function stopDraw() {
  isDrawing = false;
}

function clearDesk() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function saveDesk() {
  localStorage.setItem('utip-test', canvas.toDataURL());
}