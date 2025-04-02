import React, { useEffect, useRef } from 'react';

interface Logo {
  id: string;
  x: number;
  y: number;
  baseSize: number;
  scale: number;
  targetScale: number;
  draw: (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    isHovered: boolean
  ) => void;
}

// --- Drawing Functions ---

const drawJavaScriptLogo = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  isHovered: boolean
) => {
  ctx.save();
  ctx.font = `bold ${size}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const gradient = ctx.createLinearGradient(x, y, x + size, y + size);
  gradient.addColorStop(0, '#f0db4f');
  gradient.addColorStop(1, '#e5c100');
  ctx.fillStyle = gradient;
  if (isHovered) {
    ctx.shadowColor = '#f0db4f';
    ctx.shadowBlur = 10;
  }
  ctx.fillText('JS', x + size / 2, y + size / 2);
  ctx.restore();
};

const drawAngularLogo = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  isHovered: boolean
) => {
  ctx.save();
  ctx.translate(x + size / 2, y + size / 2);
  ctx.beginPath();
  ctx.moveTo(0, -size / 2);
  ctx.lineTo(size / 2, size / 2);
  ctx.lineTo(-size / 2, size / 2);
  ctx.closePath();
  const gradient = ctx.createLinearGradient(0, -size / 2, 0, size / 2);
  gradient.addColorStop(0, '#dd0031');
  gradient.addColorStop(1, '#ff5a5a');
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#fff';
  ctx.stroke();
  if (isHovered) {
    ctx.shadowColor = '#ff5a5a';
    ctx.shadowBlur = 10;
  }
  ctx.restore();
};

const drawReactLogo = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  isHovered: boolean
) => {
  ctx.save();
  ctx.translate(x + size / 2, y + size / 2);
  // Nucleus
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
  ctx.fillStyle = '#61dafb';
  ctx.fill();
  // Two simple elliptical orbits
  ctx.strokeStyle = '#61dafb';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.5, size * 0.25, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.5, size * 0.25, Math.PI / 2, 0, Math.PI * 2);
  ctx.stroke();
  if (isHovered) {
    ctx.shadowColor = '#61dafb';
    ctx.shadowBlur = 10;
  }
  ctx.restore();
};

const drawDotNetLogo = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  isHovered: boolean
) => {
  ctx.save();
  ctx.font = `bold ${size}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const gradient = ctx.createLinearGradient(x, y, x + size, y + size);
  gradient.addColorStop(0, '#512bd4');
  gradient.addColorStop(1, '#3c1a9e');
  ctx.fillStyle = gradient;
  if (isHovered) {
    ctx.shadowColor = '#512bd4';
    ctx.shadowBlur = 10;
  }
  ctx.fillText('.NET', x + size / 2, y + size / 2);
  ctx.restore();
};

// --- Logo Data ---
const logosData = [
  { id: 'javascript', draw: drawJavaScriptLogo },
  { id: 'angular', draw: drawAngularLogo },
  { id: 'react', draw: drawReactLogo },
  { id: 'dotnet', draw: drawDotNetLogo },
];

const SimpleInteractiveLogos: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logosRef = useRef<Logo[]>([]);
  const canvasWidth = 600;
  const canvasHeight = 150;
  const baseSize = 50;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;

    // Arrange logos side by side with equal spacing
    const initLogos = () => {
      const logos: Logo[] = [];
      const count = logosData.length;
      // Calculate horizontal margin between logos
      const margin = (canvasWidth - count * baseSize) / (count + 1);
      const y = (canvasHeight - baseSize) / 2;
      for (let i = 0; i < count; i++) {
        const x = margin + i * (baseSize + margin);
        logos.push({
          id: logosData[i].id,
          x,
          y,
          baseSize,
          scale: 1,
          targetScale: 1,
          draw: logosData[i].draw,
        });
      }
      logosRef.current = logos;
    };

    // Update target scale based on mouse proximity
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      logosRef.current.forEach(logo => {
        const logoCenterX = logo.x + (logo.baseSize * logo.scale) / 2;
        const logoCenterY = logo.y + (logo.baseSize * logo.scale) / 2;
        const dx = mouseX - logoCenterX;
        const dy = mouseY - logoCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        // Enlarge if cursor is within 40 pixels
        logo.targetScale = distance < 40 ? 1.4 : 1;
      });
    };

    // Smoothly update the current scale toward the target scale
    const updateScales = () => {
      logosRef.current.forEach(logo => {
        logo.scale += (logo.targetScale - logo.scale) * 0.1;
      });
    };

    // Draw logos on the canvas
    const drawLogos = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      logosRef.current.forEach(logo => {
        const isHovered = logo.targetScale > 1;
        logo.draw(ctx, logo.x, logo.y, logo.baseSize * logo.scale, isHovered);
      });
    };

    const animate = () => {
      updateScales();
      drawLogos();
      animationFrameId = requestAnimationFrame(animate);
    };

    initLogos();
    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasWidth, canvasHeight, baseSize]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      style={{ display: 'block', margin: '0 auto' }}
      data-testid="professional-interactive-logos-side-by-side"
    />
  );
};

export default SimpleInteractiveLogos;
