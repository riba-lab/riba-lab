export interface LoyaltyLevel {
  icon: string;
  pct: number;
  from: number;
  to: number;
  add: number;
}

// 3% → первые 3 банки / 6% → след. 6 / 9% → след. 9 / 12% → след. 4 / с 22-й — 15% навсегда
export const LOYALTY_LEVELS: LoyaltyLevel[] = [
  { icon: '🧪', pct: 3, from: 1, to: 3, add: 3 },
  { icon: '🔬', pct: 6, from: 4, to: 9, add: 6 },
  { icon: '🏆', pct: 9, from: 10, to: 18, add: 9 },
  { icon: '👑', pct: 12, from: 19, to: 21, add: 4 },
  { icon: '⭐', pct: 15, from: 22, to: 99, add: 0 },
];

export const PROFESSOR_JARS = 21;
export const DEMO_JARS = 1;
