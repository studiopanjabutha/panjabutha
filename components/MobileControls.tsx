'use client';

import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface MobileControlsProps {
  onMove: (direction: 'forward' | 'backward' | 'left' | 'right', active: boolean) => void;
}

export default function MobileControls({ onMove }: MobileControlsProps) {
  const [activeButtons, setActiveButtons] = useState<Record<string, boolean>>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const buttonStyle = (direction: string) => ({
    width: '70px',
    height: '70px',
    backgroundColor: activeButtons[direction] ? 'rgba(147,51,234,0.6)' : 'rgba(0,0,0,0.7)',
    border: activeButtons[direction] ? '2px solid rgba(147,51,234,0.8)' : '2px solid rgba(255,255,255,0.4)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    cursor: 'pointer',
    userSelect: 'none' as const,
    touchAction: 'none',
    transition: 'all 0.15s',
    transform: activeButtons[direction] ? 'scale(0.92)' : 'scale(1)',
    boxShadow: activeButtons[direction] ? '0 0 20px rgba(147,51,234,0.5)' : '0 4px 12px rgba(0,0,0,0.4)',
    backdropFilter: 'blur(10px)',
  });

  const handleTouch = (direction: 'forward' | 'backward' | 'left' | 'right', active: boolean) => {
    setActiveButtons(prev => ({ ...prev, [direction]: active }));
    onMove(direction, active);
  };

  return (
    <div style={{
      position: 'absolute',  // CHANGED FROM fixed TO absolute!
      bottom: '40px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 70px)',
      gridTemplateRows: 'repeat(2, 70px)',
      gap: '16px',
    }}
    className="md:hidden"
    >
      {/* Forward */}
      <div
        style={{ ...buttonStyle('forward'), gridColumn: '2' }}
        onTouchStart={() => handleTouch('forward', true)}
        onTouchEnd={() => handleTouch('forward', false)}
        onMouseDown={() => handleTouch('forward', true)}
        onMouseUp={() => handleTouch('forward', false)}
        onMouseLeave={() => handleTouch('forward', false)}
      >
        <ArrowUp size={28} strokeWidth={2.5} />
      </div>

      {/* Left */}
      <div
        style={{ ...buttonStyle('left'), gridColumn: '1', gridRow: '2' }}
        onTouchStart={() => handleTouch('left', true)}
        onTouchEnd={() => handleTouch('left', false)}
        onMouseDown={() => handleTouch('left', true)}
        onMouseUp={() => handleTouch('left', false)}
        onMouseLeave={() => handleTouch('left', false)}
      >
        <ArrowLeft size={28} strokeWidth={2.5} />
      </div>

      {/* Backward */}
      <div
        style={{ ...buttonStyle('backward'), gridColumn: '2', gridRow: '2' }}
        onTouchStart={() => handleTouch('backward', true)}
        onTouchEnd={() => handleTouch('backward', false)}
        onMouseDown={() => handleTouch('backward', true)}
        onMouseUp={() => handleTouch('backward', false)}
        onMouseLeave={() => handleTouch('backward', false)}
      >
        <ArrowDown size={28} strokeWidth={2.5} />
      </div>

      {/* Right */}
      <div
        style={{ ...buttonStyle('right'), gridColumn: '3', gridRow: '2' }}
        onTouchStart={() => handleTouch('right', true)}
        onTouchEnd={() => handleTouch('right', false)}
        onMouseDown={() => handleTouch('right', true)}
        onMouseUp={() => handleTouch('right', false)}
        onMouseLeave={() => handleTouch('right', false)}
      >
        <ArrowRight size={28} strokeWidth={2.5} />
      </div>

      {/* Control hint text */}
      <div style={{
        gridColumn: '1 / 4',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.6)',
        fontSize: '12px',
        letterSpacing: '0.1em',
        marginTop: '8px',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
      }}>
        USE ARROWS TO MOVE
      </div>
    </div>
  );
}
