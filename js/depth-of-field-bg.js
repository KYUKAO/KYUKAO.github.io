/**
 * 景深背景 —— 柔和粉色散景光斑
 * 全 bokeh 渲染，无实心圆点，淡雅粉系配色
 */
(function () {
  var canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');

  var width = 0;
  var height = 0;
  var time = 0;
  var focusZ = 5;

  var circles = [];
  var CIRCLE_COUNT = 100;
  var MAX_Z = 10;

  // 粉色系调色盘 —— 从冷粉到暖粉
  var PALETTE = [
    { h: 342, s: 55, l: 65 },  // 玫瑰粉
    { h: 350, s: 50, l: 68 },  // 淡胭脂
    { h: 335, s: 55, l: 63 },  // 品红粉
    { h: 355, s: 45, l: 70 },  // 暖粉
    { h: 328, s: 50, l: 66 },  // 紫粉
    { h: 345, s: 48, l: 67 },  // 经典粉
    { h: 8,  s: 40, l: 68 },   // 珊瑚粉
    { h: 338, s: 52, l: 64 },  // 蔷薇粉
  ];

  function pickColor() {
    return PALETTE[Math.floor(Math.random() * PALETTE.length)];
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initCircles();
  }

  function initCircles() {
    circles.length = 0;
    for (var i = 0; i < CIRCLE_COUNT; i++) {
      var color = pickColor();
      circles.push({
        x: (Math.random() - 0.5) * width * 1.8,
        y: (Math.random() - 0.5) * height * 1.8,
        z: 2 + Math.random() * (MAX_Z - 1),    // 远离相机，全部偏模糊
        radius: 30 + Math.random() * 55,         // 较大的光斑
        color: color,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.015,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function project(x, y, z) {
    var fov = 400;
    var scale = fov / (fov + z * 50);
    return {
      px: width / 2 + (x - width / 2 * 0.5) * scale,
      py: height / 2 + (y - height / 2 * 0.5) * scale,
      scale: scale
    };
  }

  function getBlur(z) {
    var distance = Math.abs(z - focusZ);
    return 3 + distance * 2.5;   // 最小也有 3，确保永远柔和
  }

  function drawBokeh(x, y, radius, blur, color, alpha) {
    var bokehRadius = radius + blur * 1.8;
    var gradient = ctx.createRadialGradient(x, y, 0, x, y, bokehRadius);
    var h = color.h;
    var s = color.s;
    var l = color.l;

    // 极度淡雅：整体 alpha 压得很低
    var a = alpha * 0.18;

    gradient.addColorStop(0, 'hsla(' + h + ', ' + s + '%, ' + (l + 10) + '%, ' + (a * 1.6) + ')');
    gradient.addColorStop(0.5, 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')');
    gradient.addColorStop(0.75, 'hsla(' + h + ', ' + (s - 10) + '%, ' + (l - 5) + '%, ' + (a * 0.5) + ')');
    gradient.addColorStop(1, 'hsla(' + h + ', ' + s + '%, ' + (l - 10) + '%, 0)');

    ctx.beginPath();
    ctx.arc(x, y, bokehRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  function animate() {
    time += 0.016;

    // 长拖尾让光斑极其柔和
    ctx.fillStyle = 'rgba(8, 8, 8, 0.35)';
    ctx.fillRect(0, 0, width, height);

    // 自动缓慢游移焦点
    focusZ = 4 + Math.sin(time * 0.25) * 3.5 + Math.cos(time * 0.15) * 2;

    for (var i = 0; i < circles.length; i++) {
      var c = circles[i];
      c.x += c.vx + Math.sin(time + c.phase) * 0.15;
      c.y += c.vy + Math.cos(time * 0.7 + c.phase) * 0.15;
      c.z += c.vz;

      if (c.z < 1) c.z = MAX_Z;
      if (c.z > MAX_Z) c.z = 1;

      var proj = project(c.x, c.y, c.z);
      if (proj.px < -150 || proj.px > width + 150) c.vx *= -1;
      if (proj.py < -150 || proj.py > height + 150) c.vy *= -1;
    }

    var sorted = circles.slice().sort(function (a, b) { return b.z - a.z; });

    for (var j = 0; j < sorted.length; j++) {
      var sc = sorted[j];
      var sp = project(sc.x, sc.y, sc.z);
      var sblur = getBlur(sc.z);
      var projRadius = sc.radius * sp.scale;
      var alpha = 0.3 + (1 - sc.z / MAX_Z) * 0.35;

      drawBokeh(sp.px, sp.py, projRadius, sblur, sc.color, alpha);
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
  animate();
})();
