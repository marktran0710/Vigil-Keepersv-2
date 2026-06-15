import React from "react";
import { Globe } from "lucide-react";
import { useLanguage, Language } from "../context/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const languageOptions: { code: Language; label: string; native: string }[] = [
  { code: "zh-TW", label: "Chinese", native: "繁體中文" },
  { code: "en", label: "English", native: "English" },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const current = languageOptions.find((o) => o.code === language) ?? languageOptions[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-white/90">
          <Globe className="size-4" />
          {current.native}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.code}
            onClick={() => setLanguage(option.code)}
            className={language === option.code ? "font-semibold" : ""}
          >
            <span className="mr-2">{option.native}</span>
            <span className="text-slate-400 text-xs">{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
