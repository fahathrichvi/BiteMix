import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function WhatsAppIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.16-1.5A9.93 9.93 0 1 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.07.9.92-3-.2-.31a8.2 8.2 0 1 1 6.85 3.74Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.73 6.73 0 0 1-3.35-2.93c-.25-.44.25-.4.72-1.34.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.77 2.77 0 0 0-.86 2.06 4.8 4.8 0 0 0 1 2.55 11 11 0 0 0 4.2 3.72c1.57.68 2.18.73 2.97.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
    </Svg>
  );
}

export function FacebookIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.55V4.47A20.6 20.6 0 0 0 14.3 4.3c-2.24 0-3.8 1.37-3.8 3.9v2.3H8v3h2.5V21h3Z" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 4h3.5l1.5 4-2 1.3a11 11 0 0 0 6.7 6.7L16 14l4 1.5V19a2 2 0 0 1-2.2 2A17 17 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
    </Svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 19C5 10 10 5 20 4c0 10-5 15-13 15" />
      <path d="M5 19c3-5 6-8 10-10" />
    </Svg>
  );
}

export function HomeHeartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M12 17.5s-3-1.8-3-3.8a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 2-3 3.8-3 3.8Z" />
    </Svg>
  );
}

export function FlameIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21c4 0 7-2.7 7-6.6 0-3.3-2.2-5.3-3.6-7.4-.5 2-1.6 3-2.8 3.4C13 7.6 11.7 5 9 3c.3 3.6-4 6-4 11.2C5 18.2 8 21 12 21Z" />
      <path d="M12 21c-1.8 0-3-1.3-3-3 0-2 1.7-3 2.3-4.8 1.7 1 3.7 2.8 3.7 4.8 0 1.7-1.2 3-3 3Z" />
    </Svg>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m8.8 12.2 2.2 2.2 4.3-4.6" />
    </Svg>
  );
}

export function BasketIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 10h18l-1.8 9.2a2 2 0 0 1-2 1.8H6.8a2 2 0 0 1-2-1.8L3 10Z" />
      <path d="m8 10 3-6M16 10l-3-6M9 14v3M15 14v3M12 14v3" />
    </Svg>
  );
}

export function PotIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 10h16v3a8 8 0 0 1-16 0v-3Z" />
      <path d="M2.5 10h19M9 6c0-1 1-1.5 1-2.5M13 6c0-1 1-1.5 1-2.5" />
    </Svg>
  );
}

export function HeartHandIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 11.5s-4-2.4-4-5a2.2 2.2 0 0 1 4-1.2 2.2 2.2 0 0 1 4 1.2c0 2.6-4 5-4 5Z" />
      <path d="M3 15h3l4 2.5h4a1.5 1.5 0 0 0 0-3h-2.5M6 15v5l2 .5 6.5 1 6-3.5a1.5 1.5 0 0 0-1.5-2.6l-4.2 2" />
    </Svg>
  );
}

export function WheatIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21V9" />
      <path d="M12 9c-2.5 0-4-1.7-4-4 2.5 0 4 1.7 4 4Zm0 0c2.5 0 4-1.7 4-4-2.5 0-4 1.7-4 4ZM12 14c-2.5 0-4-1.7-4-4 2.5 0 4 1.7 4 4Zm0 0c2.5 0 4-1.7 4-4-2.5 0-4 1.7-4 4Z" />
    </Svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2 6h11v10H2zM13 10h4.5L21 13.5V16h-8" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </Svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 5h16v11H9l-5 4V5Z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </Svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function StarIcon({ filled = true, size = 18, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path
        d="m12 3 2.7 5.6 6.1.8-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.8L12 3Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </Svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  );
}

/** Decorative hand-drawn curry leaf used around the page. */
export function DecoLeaf({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 60 120" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M30 118C8 90 4 50 30 4c26 46 22 86 0 114Z" fill="currentColor" />
      <path d="M30 112V14M30 40l-10-8M30 60l-13-10M30 80l-12-9M30 40l10-8M30 60l13-10M30 80l12-9" stroke="rgba(255,255,255,.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
