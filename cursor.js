// ── GLOBAL ANIMATED CURSOR ──
(function () {
  // Skip on touch-only devices
  if (window.matchMedia('(hover: none)').matches) return;

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = -300, my = -300; // exact mouse pos
  let rx = -300, ry = -300; // ring lerp pos
  let shown = false;

  // Show/hide on enter/leave window
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
    shown = false;
  });
  document.addEventListener('mouseenter', () => {
    if (!shown) return;
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });

  // Click pulse
  document.addEventListener('mousedown', () => {
    ring.classList.add('is-clicking');
    dot.classList.add('is-clicking');
  });
  document.addEventListener('mouseup', () => {
    ring.classList.remove('is-clicking');
    dot.classList.remove('is-clicking');
  });

  function onMove(e) {
    mx = e.clientX; my = e.clientY;

    // First appearance
    if (!shown) {
      shown = true;
      rx = mx; ry = my; // snap ring instantly on first show
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    }

    // Snap dot to exact position
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';

    // Hover detection
    const isHover = !!e.target.closest('a, button, [role="button"], input, textarea, select, label, [tabindex]');
    ring.classList.toggle('is-hovering', isHover);
    dot.classList.toggle('is-hovering',  isHover);
  }

  // Ring follows mouse with a slight lag (lerp)
  function loop() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  }
  loop();
})();
