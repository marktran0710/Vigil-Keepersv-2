import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonLabel: string;
  borderColor: string;
  buttonColor: string;
  hoverButtonColor: string;
  gradientFrom: string;
  iconColor: string;
  onAction?: () => void;
}

export function ActionCard({
  icon: Icon,
  title,
  description,
  buttonLabel,
  borderColor,
  buttonColor,
  hoverButtonColor,
  gradientFrom,
  iconColor,
  onAction,
}: ActionCardProps) {
  return (
    <Card
      className={`p-5 sm:p-8 md:p-12 ${borderColor} border-2 sm:border-4 shadow-lg hover:shadow-2xl transition-shadow cursor-pointer ${gradientFrom} to-white`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onAction) {
          onAction();
        }
      }}
    >
      <div className="mb-5 flex items-center gap-4 sm:mb-6 sm:gap-5 md:gap-6">
        <Icon className={`size-10 sm:size-12 md:size-16 ${iconColor}`} strokeWidth={2.5} />
        <h2 className="text-2xl font-medium leading-tight text-gray-800 sm:text-3xl md:text-4xl">
          {title}
        </h2>
      </div>
      <p className="mb-6 text-lg text-gray-600 sm:mb-8 sm:text-xl md:text-2xl">
        {description}
      </p>
      <Button
        size="lg"
        className={`h-12 w-full text-lg sm:h-14 sm:text-xl md:h-16 md:text-2xl ${buttonColor} ${hoverButtonColor}`}
        onClick={onAction}
        aria-label={`${buttonLabel} - ${title}`}
      >
        {buttonLabel}
      </Button>
    </Card>
  );
}
