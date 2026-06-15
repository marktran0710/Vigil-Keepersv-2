import React from "react";
import {
  CalendarCheck,
  Heart,
  Home,
  LogOut,
  MessageCircle,
  Phone,
  Pill,
  Play,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { NavItem } from "../components/NavItem";
import { ActionCard } from "../components/ActionCard";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";
const IMAGE_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%23999' text-anchor='middle' dominant-baseline='middle'%3EImage not available%3C/text%3E%3C/svg%3E";

export function ElderHome() {
  const { t } = useLanguage();

  const todayCards = [
    {
      icon: ShieldCheck,
      label: t("elderCareStatus"),
      value: t("elderCareStatusValue"),
      detail: t("elderCareStatusDetail"),
      tone: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    {
      icon: Pill,
      label: t("elderMedication"),
      value: t("elderMedicationValue"),
      detail: t("elderMedicationDetail"),
      tone: "bg-amber-50 text-amber-700 border-amber-100",
    },
    {
      icon: CalendarCheck,
      label: t("elderVisit"),
      value: t("elderVisitValue"),
      detail: t("elderVisitDetail"),
      tone: "bg-blue-50 text-blue-700 border-blue-100",
    },
  ];
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login/elder", { replace: true });
  };

  return (
    <div className="relative min-h-screen bg-[#f7faf4] text-slate-950">

      <nav className="relative z-10 border-b border-emerald-100 bg-white/95 px-4 py-4 shadow-sm backdrop-blur sm:px-6 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:flex lg:gap-8"
            role="navigation"
            aria-label="Main navigation"
          >
            <NavItem
              icon={Home}
              label={t("home")}
              to="/elder"
              iconColor="text-emerald-600"
              hoverColor="hover:bg-emerald-50"
            />
            <NavItem
              icon={Heart}
              label={t("health")}
              to="/health"
              iconColor="text-rose-600"
              hoverColor="hover:bg-rose-50"
            />
            <NavItem
              icon={MessageCircle}
              label={t("message")}
              to="/messages"
              iconColor="text-blue-600"
              hoverColor="hover:bg-blue-50"
            />
          </div>
          <div className="flex justify-center lg:scale-110 lg:justify-end">
            <LanguageSwitcher />
            <Button
              variant="outline"
              size="sm"
              className="ml-2 bg-white"
              onClick={handleLogout}
            >
              <LogOut className="size-4" />
              {t("logout")}
            </Button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
        <section className="mb-6 grid gap-5 lg:grid-cols-[1fr_0.78fr] lg:items-stretch">
          <div className="rounded-3xl border border-emerald-100 bg-white/92 p-6 shadow-xl shadow-emerald-900/5 sm:p-8 md:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              <ShieldCheck className="size-4" />
              {t("personalCareCompanion")}
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl md:text-6xl">
              {t("welcomeBack")}
            </h1>
            <p className="mt-4 max-w-2xl text-xl leading-8 text-slate-600 sm:text-2xl">
              {t("todayFeeling")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                className="h-14 bg-emerald-700 px-6 text-lg hover:bg-emerald-800"
                onClick={() => navigate("/health")}
              >
                <Stethoscope className="size-5" />
                {t("checkWellnessBtn")}
              </Button>
              <Button
                variant="outline"
                className="h-14 bg-white px-6 text-lg"
                onClick={() => navigate("/messages")}
              >
                <Phone className="size-5" />
                {t("contactFamily")}
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
            <div className="relative">
              <img
                src={HERO_IMAGE}
                alt="Care assistant supporting an elder"
                className="h-64 w-full object-cover sm:h-80 lg:h-96"
                onError={(e) => {
                  e.currentTarget.src = IMAGE_FALLBACK;
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/25">
                <Button
                  size="lg"
                  className="h-14 bg-white px-5 text-base text-slate-950 shadow-2xl hover:bg-slate-100 sm:h-16 sm:text-lg"
                  onClick={() => console.log("Play guide")}
                  aria-label="Play care guide"
                >
                  <Play className="size-5 fill-current" />
                  {t("watchVideo")}
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          {todayCards.map((item) => (
            <Card key={item.label} className={`border p-5 shadow-sm ${item.tone}`}>
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/80">
                  <item.icon className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-80">{item.label}</p>
                  <p className="mt-1 text-2xl font-semibold leading-tight">{item.value}</p>
                  <p className="mt-2 text-sm opacity-80">{item.detail}</p>
                </div>
              </div>
            </Card>
          ))}
        </section>

        <section
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8"
          role="region"
          aria-label="Care service actions"
        >
          <ActionCard
            icon={Heart}
            title={t("health")}
            description={t("checkHealth")}
            buttonLabel={t("viewDetails")}
            borderColor="border-rose-100"
            buttonColor="bg-rose-600"
            hoverButtonColor="hover:bg-rose-700"
            gradientFrom="bg-linear-to-br from-rose-50"
            iconColor="text-rose-600"
            onAction={() => navigate("/health")}
          />

          <ActionCard
            icon={MessageCircle}
            title={t("message")}
            description={t("newMessages")}
            buttonLabel={t("viewDetails")}
            borderColor="border-blue-100"
            buttonColor="bg-blue-600"
            hoverButtonColor="hover:bg-blue-700"
            gradientFrom="bg-linear-to-br from-blue-50"
            iconColor="text-blue-600"
            onAction={() => navigate("/messages")}
          />
        </section>
      </main>
    </div>
  );
}
