// Customize these...
var n = 300,
    speed = 5,//速度定义
    startSize = rand(100, 300);//大小定义

// ...not these
var c = document.getElementById("c"),
    ctx = c.getContext("2d"),
    cw = (c.width = window.innerWidth),
    ch = (c.height = window.innerHeight),
    mousePos = { x: "", y: "" },
    img = new Image(),
    particles = [],
    particleNumber = 0,
    Particle = function (index) {
        this.index = index;
        this.dur = (100 - rand(9, 90)) / speed;
        this.draw = function () {
            ctx.translate(this.x, this.y);
            ctx.globalAlpha = this.alpha;
            ctx.globalCompositeOperation = 'lighter';
            // if (index%1.5==0) ctx.globalCompositeOperation = 'overlay';
            if (index % 2 == 0) ctx.globalCompositeOperation = 'xor';
            ctx.drawImage(img, -this.size / 2, -this.size / 2, this.size, this.size);
            ctx.translate(-this.x, -this.y);
        }
    };

function setParticle(p, firstRun) {
    var _x = cw * rand(0, 1), _y = ch * rand(0, 1), _s = startSize;
    if (rand(0, 1) > 0.3 && mousePos.x != "") { //console.log(mousePos)
        _x = mousePos.x;
        _y = mousePos.y;
        _s = _s / 10;
    }
    var _tl = new TimelineMax()
        .fromTo(p, p.dur, {
            x: _x,
            y: _y,
            size: _s,
            alpha: 0
        }, {
            size: '+=' + String(rand(200, 400)),
            bezier: [{ alpha: rand(0.15, 0.65) }, { alpha: 0 }],
            ease: Power1.easeOut,//ease:Power0.easeNone,
            onComplete: function () { setParticle(p); }
        });

    if (firstRun) _tl.seek(p.dur * rand()); //fast-forward on first run
}


TweenMax.ticker.addEventListener("tick", function () {
    ctx.clearRect(0, 0, cw, ch);
    for (var i = 0; i < n; i++) particles[i].draw();
});


window.addEventListener('resize', doResize)
function doResize() {
    particleNumber = 0;
    cw = (c.width = window.innerWidth);
    ch = (c.height = window.innerHeight);
    for (var i = 0; i < n; i++) {
        TweenMax.killTweensOf(particles[i]);
        setParticle(particles[i], true);
    }
    TweenMax.fromTo(c, 0.3, { alpha: 0 }, { alpha: 1, ease: Power3.easeInOut });
}

// First run
for (var i = 0; i < n; i++) particles.push(new Particle(i));
doResize();


function rand(min, max) {
    (min) ? min = min : min = 0;
    (max) ? max = max : max = 1;
    return min + (max - min) * Math.random();
}

img.src = "./22.png"
