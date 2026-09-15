import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isPointer, setIsPointer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device supports fine cursor
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return;

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Target hover elements
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const hoverable = target.closest('[data-cursor]');
      const clickable = target.closest('a, button, input, select, textarea, [role="button"]');

      if (hoverable) {
        setIsHovered(true);
        setCursorText(hoverable.getAttribute('data-cursor') || '');
      } else if (clickable) {
        setIsHovered(true);
        setIsPointer(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setIsPointer(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Small Precision Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-[#C67C4E] rounded-full pointer-events-none z-[99999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 0 : 1})`,
        }}
      />

      {/* Large Magnetic Circle */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[99998] transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-button font-semibold text-[10px] tracking-wider uppercase ${
          cursorText
            ? 'w-20 h-20 bg-[#C67C4E] text-white backdrop-blur-sm shadow-xl scale-100'
            : isPointer
            ? 'w-12 h-12 border-2 border-[#C67C4E] bg-[#C67C4E]/10 scale-100'
            : 'w-8 h-8 border border-white/40 ring-1 ring-black/10 scale-100'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        {cursorText && <span className="animate-fade-in text-center px-1 leading-tight">{cursorText}</span>}
      </div>
    </>
  );
};
