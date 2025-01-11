//get element to HTML
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')

const brushBtn = document.getElementById('brush');
const eraserBtn = document.getElementById('eraser');
const colorBtn = document.getElementById('colorPicker');
const clearBtn = document.getElementById('clear');

//set canvas size 
canvas.width = 800;
canvas.height = 500;

//variabel to store state tool
let painting = false;
let eraising =  false;
let curentColor = '#000000';
let lineWidht = 5;

//function to start positon painting
function startPosition(e){
    painting = true
    draw(e) //funtion to draw canvas
};

//function to end painting
function endPosition(e){
    painting = false
    ctx.beginPath()//start new path
};

//function to draw in canvas
function draw(e){
    if(!painting) return

    ctx.lineWidht = lineWidht
    ctx.lineCAp = 'round'
    ctx.strokeStyle = eraising ? '#ffffff' : curentColor

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
};

//function to brush
function selectBrush(){
    eraising = false;
    brushBtn.classList.add('active')
    eraserBtn.classList.remove('active')
};

//function to eraser
function selectEraser(){
    eraising = true
    eraserBtn.classList.add('active')
    brushBtn.classList.remove('active')
};

//function to clear canvas
function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
};

//function change color
function changeColor(e){
    curentColor = e.target.value
};

//addeventlistener to the tools
brushBtn.addEventListener('click', selectBrush);
eraserBtn.addEventListener('click', selectEraser);
clearBtn.addEventListener('click', clearCanvas);
colorBtn.addEventListener('input', changeColor);

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition)
canvas.addEventListener('mousemove', draw);
