'use client';

import { useEffect, useRef } from 'react';

const SWARM = ['🍓', '🫐', '🍋', '🍑', '🥭', '🍒', '🍇', '🍊', '🌸', '🍯', '🍎', '🌿'];

function rnd(a: number, b: number) {
  return a + Math.random() * (b - a);
}

interface Props {
  count?: number;
  sizeMin?: number;
  sizeMax?: number;
  className?: string;
}

export default function ModalSwarm({ count = 10, sizeMin = 12, sizeMax = 20, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'swarm-f';
      s.textContent = SWARM[Math.floor(Math.random() * SWARM.length)];
      s.style.left = rnd(0, 100) + '%';
      s.style.fontSize = rnd(sizeMin, sizeMax) + 'px';
      const dur = rnd(7, 16);
      s.style.animationDuration = dur + 's';
      s.style.animationDelay = -rnd(0, dur) + 's';
      s.style.animationName = 'swarmFloatSm';
      el.appendChild(s);
    }
  }, [count, sizeMin, sizeMax]);

  return <div ref={ref} className={`modal-swarm ${className}`} />;
}
