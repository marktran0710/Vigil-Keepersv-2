import React from "react";
import {
  ArrowRight,
  Bell,
  Building2,
  Coins,
  Database,
  HandHeart,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { BrandLogo } from "../components/BrandLogo";
import { useLanguage } from "../context/LanguageContext";

const serviceImages = [
  "/images/service-monitoring.jpg",
  "/images/service-donation.jpg",
  "/images/service-legacy.jpg",
];

const serviceIcons = [HeartPulse, Coins, Database];
const stepIcons = [HandHeart, Coins, ShieldCheck, HeartPulse];
const partnerIcons = [Building2, Users, ShieldCheck, Bell];

export function Presentation() {
  const { t } = useLanguage();

  const services = [
    { icon: serviceIcons[0], title: t("s1Title"), desc: t("s1Desc"), img: serviceImages[0] },
    { icon: serviceIcons[1], title: t("s2Title"), desc: t("s2Desc"), img: serviceImages[1] },
    { icon: serviceIcons[2], title: t("s3Title"), desc: t("s3Desc"), img: serviceImages[2] },
  ];

  const steps = [
    { step: "01", icon: stepIcons[0], title: t("step1Title"), desc: t("step1Desc") },
    { step: "02", icon: stepIcons[1], title: t("step2Title"), desc: t("step2Desc") },
    { step: "03", icon: stepIcons[2], title: t("step3Title"), desc: t("step3Desc") },
    { step: "04", icon: stepIcons[3], title: t("step4Title"), desc: t("step4Desc") },
  ];

  const partners = [
    { icon: partnerIcons[0], name: t("p1Name"), note: t("p1Note") },
    { icon: partnerIcons[1], name: t("p2Name"), note: t("p2Note") },
    { icon: partnerIcons[2], name: t("p3Name"), note: t("p3Note") },
    { icon: partnerIcons[3], name: t("p4Name"), note: t("p4Note") },
  ];

  const commitments = [t("c1"), t("c2"), t("c3"), t("c4")];

  const stats = [
    { value: t("statsAreaValue"), label: t("statsAreaLabel") },
    { value: t("statsDeviceValue"), label: t("statsDeviceLabel") },
    { value: t("statsPrivacyValue"), label: t("statsPrivacyLabel") },
    { value: t("statsDiscountValue"), label: t("statsDiscountLabel") },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <BrandLogo compact />
          <div className="flex items-center gap-2">
            <Link to="/login/elder">
              <Button variant="ghost" size="sm">{t("elderPortal")}</Button>
            </Link>
            <Link to="/login/family">
              <Button variant="ghost" size="sm">{t("familyPortal")}</Button>
            </Link>
            <Link to="/login/admin" className="hidden md:block">
              <Button variant="ghost" size="sm">{t("admin")}</Button>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-6xl px-6 py-14 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
                  {t("heroTag")}
                </span>
                <h1 className="mt-5 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  {t("heroTitle")}
                </h1>
                <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
                  {t("heroDesc")}
                </p>
                <div className="mt-7 flex gap-3">
                  <Link to="/login/elder">
                    <Button className="bg-emerald-700 hover:bg-emerald-800 px-5">
                      {t("elderEntry")}
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                  <Link to="/login/family">
                    <Button variant="outline" className="px-5">{t("familyDashboard")}</Button>
                  </Link>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <img
                  src="/images/hero.jpg"
                  alt="Elder with family at home"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-3xl font-bold text-emerald-700">{value}</div>
                  <div className="mt-1 text-sm text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="border-b border-slate-100 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t("servicesTitle")}</h2>
              <p className="mt-3 text-slate-500">{t("servicesSubtitle")}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {services.map((s) => (
                <div key={s.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="aspect-[16/9] w-full object-contain bg-slate-50"
                  />
                  <div className="p-5">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                      <s.icon className="size-5" />
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-slate-900">{s.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t("stepsTitle")}</h2>
                <p className="mt-3 text-slate-500">{t("stepsSubtitle")}</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {steps.map((s) => (
                    <div key={s.step} className="rounded-xl border border-slate-200 bg-white p-5">
                      <div className="text-2xl font-bold text-slate-200">{s.step}</div>
                      <div className="mt-2 flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                        <s.icon className="size-4" />
                      </div>
                      <h3 className="mt-3 text-sm font-semibold text-slate-900">{s.title}</h3>
                      <p className="mt-1 text-xs leading-6 text-slate-500">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <img
                  src="/images/steps-care.jpg"
                  alt="Family care coordination"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="border-b border-slate-100 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t("partnersTitle")}</h2>
              <p className="mt-3 text-slate-500">{t("partnersSubtitle")}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {partners.map((p) => (
                <div key={p.name} className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    <p.icon className="size-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                    <div className="mt-0.5 text-xs text-slate-500">{p.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitments */}
        <section className="border-b border-slate-100 bg-emerald-700 py-14 text-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">{t("commitTitle")}</h2>
                <p className="mt-3 text-emerald-100">{t("commitDesc")}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {commitments.map((c) => (
                  <div key={c} className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3">
                    <ShieldCheck className="size-4 shrink-0 text-emerald-200" />
                    <span className="text-sm text-white">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <BrandLogo />
                <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500">{t("footerDesc")}</p>
              </div>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-emerald-700" />
                  <span>+886 3 1234 5678</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-emerald-700" />
                  <span>hello@vigilkeepers.tw</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="size-4 shrink-0 text-emerald-700" />
                  <span>{t("address")}</span>
                </div>
              </div>
            </div>
            <div className="mt-10 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
              {t("footerCopy")}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
