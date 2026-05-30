"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function USFlag() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 480"
      className="size-4 shrink-0 rounded-sm"
    >
      <rect width="640" height="480" fill="#bd3d44" />
      <rect width="640" height="36.9" y="36.9" fill="#fff" />
      <rect width="640" height="36.9" y="110.8" fill="#fff" />
      <rect width="640" height="36.9" y="184.6" fill="#fff" />
      <rect width="640" height="36.9" y="258.5" fill="#fff" />
      <rect width="640" height="36.9" y="332.3" fill="#fff" />
      <rect width="640" height="36.9" y="406.2" fill="#fff" />
      <rect width="299" height="221.5" fill="#192f5d" />
      {Array.from({ length: 50 }).map((_, i) => (
        <rect
          key={i}
          x={i % 6 === 0 ? 0 : (i % 6) * 49.8 + 4.2}
          y={Math.floor(i / 6) * 18.5 + 3.7}
          width="9.2"
          height="9.2"
          fill="#fff"
        />
      ))}
    </svg>
  );
}

function DZFlag() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 480"
      className="size-4 shrink-0 rounded-sm"
    >
      <rect width="320" height="480" fill="#006233" />
      <rect x="320" width="320" height="480" fill="#fff" />
      <g transform="translate(320, 240)">
        <circle r="96" fill="#d21034" />
        <circle r="84" fill="#fff" />
        <path d="M 0,-84 A 84,84 0 0,1 0,84 A 64,64 0 0,0 0,-84 Z" fill="#d21034" />
        <circle cx="-24" cy="0" r="96" fill="#006233" />
      </g>
    </svg>
  );
}

export function LocaleToggle() {
  const locale = useLocale();
  const router = useRouter();

  const toggleLocale = () => {
    const next = locale === "en" ? "ar" : "en";
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=${60 * 60 * 24 * 365}`;
    router.refresh();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="h-8 gap-1.5 px-2 text-xs font-medium"
      aria-label={locale === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
    >
      {locale === "en" ? (
        <>
          <DZFlag />
          AR
        </>
      ) : (
        <>
          <USFlag />
          EN
        </>
      )}
    </Button>
  );
}
