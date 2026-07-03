const canvas = document.getElementById('displayCanvas');
const ctx = canvas.getContext("2d");
const mousePosLabel = document.getElementById('mousePos');
const rect = canvas.getBoundingClientRect();
const radius = 10;

let mouseX = 0;
let mouseY = 0;
let rects = [
    {x: 80, y: 80, width: radius, height: radius, fill: "#fc0303", isSelected: false},
    {x: 145, y: 20, width: radius, height: radius, fill: "#fc0303", isSelected: false},
    {x: 285, y: 215, width: radius, height: radius, fill: "#fc0303", isSelected: false},
    {x: 350, y: 70, width: radius, height: radius, fill: "#fc0303", isSelected: false}
]

var isDragging = false;
var startX;
var startY;

canvas.onmousedown = function(e) {
    isDragging = false;
    for (var i=0; i<rects.length; i++) {
        if (mouseX > rects[i].x && mouseX < rects[i].x + rects[i].width && mouseY > rects[i].y && mouseY < rects[i].y + rects[i].height) {
            isDragging = true;
            rects[i].isSelected = true;
        }
    }

    startX = mouseX;
    startY = mouseY;
};

canvas.onmouseup = function(e) {
    isDragging = false;

    for (var i=0; i<rects.length; i++) {
        rects[i].isSelected = false;
    }
};

canvas.onmousemove = function(e) {
    if (isDragging) {
        e.preventDefault();

        var dx = mouseX - startX;
        var dy = mouseY - startY;

        for (var i=0; i<rects.length; i++) {
            if (rects[i].isSelected) {
                rects[i].x += dx;
                rects[i].y += dy;
            }
        }

        draw();

        startX = mouseX;
        startY = mouseY;

    }
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.lineWidth = 5;
    ctx.strokeStyle = "blue";
    ctx.beginPath();

    ctx.moveTo(rects[0].x, rects[0].y);
    ctx.bezierCurveTo(rects[1].x, rects[1].y, rects[2].x, rects[2].y, rects[3].x, rects[3].y)

    ctx.stroke();
    ctx.closePath();
    
    ctx.fillStyle = "#FAF7F8";

    for (var i=0; i<rects.length; i++) {
        ctx.fillStyle = rects[i].fill;

        ctx.beginPath();
        ctx.arc(rects[i].x, rects[i].y, rects[i].width, 0, Math.PI * 2)
        ctx.fill();
        ctx.closePath();
    }
}

draw();


function getMousePos(e) {
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    mousePosLabel.innerText = `MOUSE POSITION: ${mouseX}, ${mouseY}`;
}

canvas.addEventListener('mousemove', getMousePos);