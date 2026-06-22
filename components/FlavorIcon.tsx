import type { FlavorType, FlavorLevel } from '@/lib/products';

const SVG: Record<FlavorType, React.ReactNode> = {
  spice: (
    <svg className="fi-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 4c1.5 0 3 1 3.5 2.5C19 8 18 10 17 12c-1 2-3 4-5 5.5-2 1.5-4.5 2-7 2 .5-2.5 2-5 4-6.5 1.5-1.2 2.5-2.5 3.5-4 1-1.5 1.5-3 2.5-4.5z" fill="currentColor" fillOpacity=".25" />
      <path d="M15 4c-2 1-3.5 2-5 3.5-2 2-3 4-3.5 6.5-.5 2.5-.5 4 .5 5.5" />
      <path d="M15 4c.8-.8 1.8-1.3 3-1.5" />
      <path d="M17 3.5c.5-.3 1-.4 1.5-.3" />
    </svg>
  ),
  sweet: (
    <svg className="fi-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="9" height="9" rx="1" fill="currentColor" fillOpacity=".18" />
      <rect x="3" y="11" width="9" height="9" rx="1" />
      <rect x="12" y="11" width="9" height="9" rx="1" fill="currentColor" fillOpacity=".3" />
      <rect x="12" y="11" width="9" height="9" rx="1" />
      <rect x="7" y="3" width="9" height="9" rx="1" fill="currentColor" fillOpacity=".25" />
      <rect x="7" y="3" width="9" height="9" rx="1" />
    </svg>
  ),
  sour: (
    <svg className="fi-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="14" rx="6" ry="7.5" transform="rotate(-20 12 14)" fill="currentColor" fillOpacity=".3" />
      <ellipse cx="12" cy="14" rx="6" ry="7.5" transform="rotate(-20 12 14)" />
      <path d="M16 7c1-1 2.5-1.5 3.5-1 .5 1.5-.5 3-2 4" fill="currentColor" fillOpacity=".25" />
      <path d="M16 7c1-1 2.5-1.5 3.5-1 .5 1.5-.5 3-2 4" />
    </svg>
  ),
  tart: (
    <svg className="fi-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c-3 5-6 9-6 13a6 6 0 0 0 12 0c0-4-3-8-6-13z" fill="currentColor" fillOpacity=".25" />
      <path d="M12 3c-3 5-6 9-6 13a6 6 0 0 0 12 0c0-4-3-8-6-13z" />
      <ellipse cx="10" cy="14" rx="1.5" ry="2" fill="currentColor" fillOpacity=".6" stroke="none" />
    </svg>
  ),
  veg: (
    <svg className="fi-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 3c-2 6-5 10-9 12-4 2-8 2-9-1 0-3 2-7 6-9 4-2 8-2 12-2z" fill="currentColor" fillOpacity=".25" />
      <path d="M21 3c-2 6-5 10-9 12-4 2-8 2-9-1 0-3 2-7 6-9 4-2 8-2 12-2z" />
      <path d="M21 3c-3 4-6 7-10 9-2 1-4 2-6 3.5" strokeOpacity=".5" />
    </svg>
  ),
  herbs: (
    <svg className="fi-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21V8" />
      <ellipse cx="10" cy="14" rx="2.5" ry="1.2" transform="rotate(-30 10 14)" fill="currentColor" fillOpacity=".3" />
      <ellipse cx="14" cy="11" rx="2.5" ry="1.2" transform="rotate(30 14 11)" fill="currentColor" fillOpacity=".3" />
      <ellipse cx="10" cy="14" rx="2.5" ry="1.2" transform="rotate(-30 10 14)" />
      <ellipse cx="14" cy="11" rx="2.5" ry="1.2" transform="rotate(30 14 11)" />
      <circle cx="12" cy="6" r="2.5" fill="currentColor" fillOpacity=".35" />
      <circle cx="12" cy="6" r="2.5" />
    </svg>
  ),
};

export default function FlavorIcon({ type, level }: { type: FlavorType; level: FlavorLevel }) {
  return (
    <span className={`fi fi-${type} fi-l${level}`} title={type}>
      {SVG[type]}
    </span>
  );
}
