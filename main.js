var canvas;
var context;
var circles = [];

function draw(colors) {
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    for (var i = 1; i < 1000; i++) {
        var randomX = Math.random() * canvasWidth;
        var randomY = Math.random() * canvasHeight;
        var randomSize = Math.random() * 15;
        var color = colors[Math.floor(Math.random() * colors.length)].value;

        var circle = new Circle(randomX, randomY, randomSize, color);
        circles.push(circle);
    }

    function Circle(x, y, r, color) {
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2, true);
        context.fillStyle = color;
        context.fill();
    }
}

function resize() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}

window.onresize = function (event) {
    resize();
};

window.onload = function (event) {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    resize();
    setInterval(function () {
        window.fetch('https://api.noopschallenge.com/hexbot?count=5')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                draw(data.colors);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, 1000);
};