"use client";

import { useEffect, useRef, useState } from "react";

export function LivingField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let frame = 0, width = 0, height = 0;
    const pointer = { x: 0.5, y: 0.5 };
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resize = () => {
      const ratio = Math.min(devicePixelRatio, 2);
      width = canvas.clientWidth; height = canvas.clientHeight;
      canvas.width = width * ratio; canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const move = (event: PointerEvent) => {
      pointer.x = event.clientX / innerWidth; pointer.y = event.clientY / innerHeight;
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    const scroll = () => setProgress(scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight));
    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      context.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--field").trim();
      context.lineWidth = 1;
      const cx = width * pointer.x, cy = height * pointer.y;
      for (let ring = 0; ring < 9; ring++) {
        context.beginPath();
        for (let point = 0; point <= 90; point++) {
          const angle = point / 90 * Math.PI * 2;
          const radius = 35 + ring * 24 + Math.sin(angle * 3 + time * 0.00035 + ring) * 13 + Math.sin(time * 0.0002 + ring) * 8;
          const x = cx + Math.cos(angle) * radius * (1 + ring * 0.035);
          const y = cy + Math.sin(angle) * radius * 0.72;
          if (point) context.lineTo(x, y); else context.moveTo(x, y);
        }
        context.closePath(); context.globalAlpha = 0.34 - ring * 0.025; context.stroke();
      }
      context.globalAlpha = 1;
      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };
    resize(); draw(); scroll();
    addEventListener("resize", resize); addEventListener("pointermove", move); addEventListener("scroll", scroll, { passive: true });
    return () => { cancelAnimationFrame(frame); removeEventListener("resize", resize); removeEventListener("pointermove", move); removeEventListener("scroll", scroll); };
  }, []);

  return <><canvas ref={canvasRef} className="living-field" aria-hidden="true" /><div className="scroll-meter" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div></>;
}
