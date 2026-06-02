import Link from "next/link";

type LogoProps = {
  variant?: "full" | "mark" | "wordmark";
  theme?: "light" | "dark";
  size?: number;
  href?: string | null;
  className?: string;
};

function FlaskMark({ size = 56 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="RIBA Lab"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <radialGradient id="ribaBg" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#A88DBF" />
          <stop offset="100%" stopColor="#2D1B2E" />
        </radialGradient>
        <linearGradient id="ribaLiquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E04D77" />
          <stop offset="100%" stopColor="#7A1A38" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="47" fill="url(#ribaBg)" />
      <circle cx="50" cy="50" r="47" fill="none" stroke="#C9A045" strokeWidth="1.5" />
      <rect x="45" y="20" width="10" height="20" rx="1" fill="#FDF7F2" opacity=".95" />
      <rect x="43" y="19" width="14" height="4" rx="2" fill="#C9A045" />
      <path
        d="M45 38 L45 48 L32 72 Q30 77 35 77 L65 77 Q70 77 68 72 L55 48 L55 38 Z"
        fill="#FDF7F2"
        opacity=".95"
      />
      <path
        d="M41 56 L34 71 Q33 74 36 74 L64 74 Q67 74 66 71 L59 56 Q50 53 41 56 Z"
        fill="url(#ribaLiquid)"
      />
      <circle cx="46" cy="66" r="2" fill="rgba(255,255,255,.35)" />
      <circle cx="54" cy="69" r="1.5" fill="rgba(255,255,255,.3)" />
      <circle cx="50" cy="63" r="1" fill="rgba(255,255,255,.25)" />
      <line x1="57" y1="58" x2="60" y2="58" stroke="rgba(45,27,46,.25)" strokeWidth=".8" />
      <line x1="59" y1="63" x2="62" y2="63" stroke="rgba(45,27,46,.25)" strokeWidth=".8" />
      <path
        d="M38 68 Q40 60 44 54"
        stroke="rgba(255,255,255,.4)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Wordmark({ theme = "light" }: { theme?: "light" | "dark" }) {
  const ribaColor = theme === "dark" ? "#FDF7F2" : "#2D1B2E";
  const labColor = theme === "dark" ? "#E5C76B" : "#C9305A";
  const tagColor = theme === "dark" ? "rgba(253,247,242,.45)" : "#8B7484";
  return (
    <span style={{ display: "flex", flexDirection: "column", gap: "0.05rem", lineHeight: 0.95 }}>
      <span
        style={{
          fontFamily: "var(--font-marcellus), 'Marcellus', serif",
          fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
          letterSpacing: "-0.5px",
          color: ribaColor,
        }}
      >
        RIBA
      </span>
      <span
        style={{
          fontFamily: "var(--font-marcellus), 'Marcellus', serif",
          fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
          letterSpacing: "-0.5px",
          fontStyle: "italic",
          color: labColor,
        }}
      >
        Lab
      </span>
      <span
        style={{
          fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: tagColor,
          fontWeight: 600,
          marginTop: "0.3rem",
          textIndent: "0.4em",
        }}
      >
        Craft Jam
      </span>
    </span>
  );
}

export default function Logo({
  variant = "full",
  theme = "light",
  size = 56,
  href = "/",
  className = "",
}: LogoProps) {
  const content =
    variant === "mark" ? (
      <FlaskMark size={size} />
    ) : variant === "wordmark" ? (
      <Wordmark theme={theme} />
    ) : (
      <span style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
        <FlaskMark size={size} />
        <Wordmark theme={theme} />
      </span>
    );

  if (href) {
    return (
      <Link href={href} className={className} style={{ textDecoration: "none", display: "inline-flex" }}>
        {content}
      </Link>
    );
  }
  return <span className={className}>{content}</span>;
}
