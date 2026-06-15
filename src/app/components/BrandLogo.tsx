import React from "react";

type BrandLogoProps = {
  compact?: boolean;
  showText?: boolean;
  className?: string;
};

export function BrandLogo({
  compact = false,
  className = "",
}: BrandLogoProps) {
  const size = compact ? "h-14" : "h-24";

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/images/logo.png"
        alt="樂齡家 logo"
        className={`${size} w-auto shrink-0 object-contain`}
      />
    </div>
  );
}
