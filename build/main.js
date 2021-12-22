"use strict";
var canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
var context = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
var output = document.getElementById("output");
var frame = 0;
var x = 0;
var id = 0;
var endLoop = false;
var drawRect = function (y) {
    context === null || context === void 0 ? void 0 : context.save();
    context.translate(500, y + 350);
    context.rotate((-x * Math.PI) / 180);
    context.fillStyle = "red";
    context.strokeRect(-50, -50, 100, 100);
    context === null || context === void 0 ? void 0 : context.restore();
    //context!.translate(0, 0);
    x = x + 1;
};
addEventListener("keypress", function (e) {
    window.cancelAnimationFrame(id);
});
var eventLoop = function (ts) {
    setTimeout(function () {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        drawRect(0);
        drawRect(150);
        id = window.requestAnimationFrame(eventLoop);
        if (endLoop)
            window.cancelAnimationFrame(id);
    }, 1000 / 30);
};
addEventListener("keypress", function (e) {
    if (endLoop == false) {
        endLoop = true;
    }
    else {
        endLoop = false;
        eventLoop(null);
    }
});
eventLoop(null);
