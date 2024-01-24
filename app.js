var color = document.querySelector("#color");
var eraser = document.querySelector("#eraser");
var sizeE = document.querySelector("#size");
var increase = document.querySelector("#increase");
var decrease = document.querySelector("#decrease");
var save = document.querySelector("#save");
var clear = document.querySelector("#clear");
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var currentPos = {
  x: 0,
  y: 0,
};

var currentPosAfter = {
  x: 0,
  y: 0,
};
//initialize

var isDrawing = false;
var colorPaint = "#000000";
var size = 5;
sizeE.innerText = size;

document.addEventListener("mousedown", function (e) {
  currentPos = {
    x: e.offsetX,
    y: e.offsetY,
  };
  isDrawing = true;
});

document.addEventListener("mousemove", function (e) {
  if (isDrawing) {
    currentPosAfter = {
      x: e.offsetX,
      y: e.offsetY,
    };
    //fill nét vẽ
    ctx.beginPath();
    ctx.arc(currentPos.x, currentPos.y, size, 0, 2 * Math.PI);
    ctx.fillStyle = colorPaint;
    ctx.fill();

    //vẽ outline
    ctx.beginPath();
    ctx.moveTo(currentPos.x, currentPos.y);
    ctx.lineTo(currentPosAfter.x, currentPosAfter.y);
    ctx.strokeStyle = colorPaint;
    ctx.lineWidth = size * 2;

    ctx.stroke();

    currentPos.x = currentPosAfter.x;
    currentPos.y = currentPosAfter.y;
  }
});

document.addEventListener("mouseup", function (e) {
  isDrawing = false;
});

color.addEventListener("change", function (e) {
  colorPaint = e.target.value;
});

eraser.addEventListener("click", function (e) {
  colorPaint = "#ffffff";
});

decrease.addEventListener("click", function (e) {
  size -= 5;
  size = size > 5 ? size : 5;
  sizeE.innerText = size;
});

increase.addEventListener("click", function (e) {
  size += 5;
  size = size < 30 ? size : 30;
  sizeE.innerText = size;
});

clear.addEventListener("click", function (e) {
  var canvasStart = canvas.getClientRects()[0];
  ctx.clearRect(0, 0, canvasStart.width, canvasStart.height);
});

save.addEventListener("click", function (e) {
  var output = canvas.toDataURL("image/png");
  save.setAttribute("href", output);
});
