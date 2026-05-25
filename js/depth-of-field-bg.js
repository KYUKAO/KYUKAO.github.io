/**
 * 景深背景 —— 粉色 Bokeh 粒子效果
 * 源自 WebFX depth-of-field demo，统一为粉色系，作为常驻背景
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
  var CIRCLE_COUNT = 120;
  var MAX_Z = 10;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initCircles();
  }

  function initCircles() {
    circles.length = 0;
    for (var i = 0; i < CIRCLE_COUNT; i++) {
      circles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * MAX_Z + 0.5,
        radius: 10 + Math.random() * 40,
        hue: 330 + Math.random() * 25,          // 粉色范围 330-355
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.02,
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
    return Math.min(20, distance * 3);
  }

  function drawBokeh(x, y, radius, blur, hue, alpha) {
    if (blur < 1) {
      // 清晰 —— 在焦点上
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + hue + ', 70%, 60%, ' + alpha + ')';
      ctx.fill();

      // 高亮核心
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + hue + ', 50%, 90%, ' + (alpha * 0.8) + ')';
      ctx.fill();
    } else {
      // Bokeh 光斑 —— 大而柔和的散景
      var bokehRadius = radius + blur * 2;
      var gradient = ctx.createRadialGradient(x, y, 0, x, y, bokehRadius);
      var outerAlpha = alpha * (0.3 / (1 + blur * 0.1));

      gradient.addColorStop(0, 'hsla(' + hue + ', 70%, 70%, ' + (outerAlpha * 2) + ')');
      gradient.addColorStop(0.7, 'hsla(' + hue + ', 60%, 55%, ' + outerAlpha + ')');
      gradient.addColorStop(0.85, 'hsla(' + hue + ', 60%, 55%, ' + (outerAlpha * 0.8) + ')');
      gradient.addColorStop(1, 'hsla(' + hue + ', 60%, 50%, 0)');

      ctx.beginPath();
      ctx.arc(x, y, bokehRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // 散景环
      if (blur > 5) {
        ctx.beginPath();
        ctx.arc(x, y, bokehRadius * 0.85, 0, Math.PI * 2);
        ctx.strokeStyle = 'hsla(' + hue + ', 70%, 65%, ' + (outerAlpha * 0.5) + ')';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }
  }

  function animate() {
    time += 0.016;

    // 匹配站点深色背景
    ctx.fillStyle = 'rgba(8, 8, 8, 0.4)';
    ctx.fillRect(0, 0, width, height);

    // 自动缓慢游移焦点
    focusZ = 3 + Math.sin(time * 0.3) * 3 + Math.cos(time * 0.17) * 2;

    for (var i = 0; i < circles.length; i++) {
      var c = circles[i];
      c.x += c.vx + Math.sin(time + c.phase) * 0.2;
      c.y += c.vy + Math.cos(time * 0.7 + c.phase) * 0.2;
      c.z += c.vz;

      if (c.z < 0.5) c.z = MAX_Z;
      if (c.z > MAX_Z) c.z = 0.5;

      var proj = project(c.x, c.y, c.z);
      if (proj.px < -100 || proj.px > width + 100) c.vx *= -1;
      if (proj.py < -100 || proj.py > height + 100) c.vy *= -1;
    }

    // 远到近排序
    var sorted = circles.slice().sort(function (a, b) { return b.z - a.z; });

    for (var j = 0; j < sorted.length; j++) {
      var sc = sorted[j];
      var sp = project(sc.x, sc.y, sc.z);
      var sblur = getBlur(sc.z);
      var projRadius = sc.radius * sp.scale;
      var alpha = 0.25 + (1 - sc.z / MAX_Z) * 0.45;

      // 色相在粉色范围内微幅振荡
      var hue = (sc.hue + Math.sin(time * 0.5 + sc.phase) * 12) % 360;

      drawBokeh(sp.px, sp.py, projRadius, sblur, hue, alpha);
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
  animate();
})();
