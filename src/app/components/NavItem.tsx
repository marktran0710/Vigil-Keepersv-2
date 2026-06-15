import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  iconColor: string;
  hoverColor: string;
}

export function NavItem({
  icon: Icon,
  label,
  to,
  iconColor,
  hoverColor,
}: NavItemProps) {
  return (
    <Link to={to}>
      <Button
        variant="ghost"
        size="lg"
        className={`flex h-auto min-h-20 w-full flex-col items-center gap-2 px-3 py-3 sm:min-h-24 sm:px-5 md:min-h-28 md:gap-3 md:px-8 md:py-4 ${hoverColor}`}
        aria-label={label}
      >
        <Icon className={`size-8 sm:size-10 md:size-12 ${iconColor}`} strokeWidth={2.5} />
        <span className="text-base font-medium leading-tight sm:text-xl md:text-2xl">
          {label}
        </span>
      </Button>
    </Link>
  );
}
