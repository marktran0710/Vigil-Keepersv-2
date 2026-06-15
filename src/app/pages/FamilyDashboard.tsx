import React from "react";
import {
  Activity,
  Bell,
  CalendarCheck,
  Heart,
  Home,
  LogOut,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export function FamilyDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const overviewCards = [
    {
      icon: ShieldCheck,
      label: t("fCareStatus"),
      value: t("fCareStatusValue"),
      detail: t("fCareStatusDetail"),
      tone: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    {
      icon: Heart,
      label: t("fHeartRate"),
      value: t("fHeartRateValue"),
      detail: t("fHeartRateDetail"),
      tone: "bg-rose-50 text-rose-700 border-rose-100",
    },
    {
      icon: CalendarCheck,
      label: t("fNextVisit"),
      value: t("fNextVisitValue"),
      detail: t("fNextVisitDetail"),
      tone: "bg-blue-50 text-blue-700 border-blue-100",
    },
  ];

  const updates = [
    ["8:45 AM", t("update1Title"), t("update1Detail")],
    ["12:30 PM", t("update2Title"), t("update2Detail")],
    ["2:30 PM", t("update3Title"), t("update3Detail")],
  ];

  const responsibilities = [
    [t("resp1Task"), t("resp1Due"), t("resp1Owner")],
    [t("resp2Task"), t("resp2Due"), t("resp2Owner")],
    [t("resp3Task"), t("resp3Due"), t("resp3Owner")],
  ];

  const handleLogout = () => {
    logout();
    navigate("/login/family", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f7faf8] text-slate-950">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
              <Users className="size-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold leading-tight">
                {t("familyDashboardTitle")}
              </h1>
              <p className="text-sm text-slate-500">
                {t("familyDashboardDesc")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link to="/">
              <Button variant="outline" size="sm" className="bg-white">
                <Home className="size-4" />
                {t("home")}
              </Button>
            </Link>
            <LanguageSwitcher />
            <Button variant="outline" size="sm" className="bg-white" onClick={handleLogout}>
              <LogOut className="size-4" />
              {t("logout")}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-6 grid gap-5 lg:grid-cols-[1fr_0.72fr]">
          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-900/5 sm:p-8">
            <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50">
              {t("familyModeBadge")}
            </Badge>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              {t("familyHeroTitle")}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              {t("familyHeroDesc")}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button className="h-12 bg-blue-700 px-5 text-base hover:bg-blue-800">
                <MessageCircle className="size-5" />
                {t("messageElder")}
              </Button>
              <Button variant="outline" className="h-12 bg-white px-5 text-base">
                <Phone className="size-5" />
                {t("callCareTeam")}
              </Button>
            </div>
          </div>

          <Card className="border-slate-200 bg-white shadow-xl shadow-slate-900/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="size-5 text-amber-600" />
                {t("priorityNotice")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-slate-950">
                {t("medicationRefillNeeded")}
              </p>
              <p className="mt-3 leading-7 text-slate-600">
                {t("medicationRefillDesc")}
              </p>
              <Button variant="outline" className="mt-5 bg-white">
                {t("assignTask")}
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          {overviewCards.map((item) => (
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

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="size-5 text-emerald-600" />
                {t("todayCareTimeline")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {updates.map(([time, title, detail]) => (
                <div key={`${time}-${title}`} className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-sm font-medium text-blue-700">{time}</p>
                  <p className="mt-1 font-semibold text-slate-950">{title}</p>
                  <p className="mt-1 text-sm text-slate-500">{detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarCheck className="size-5 text-blue-600" />
                {t("sharedResponsibilities")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {responsibilities.map(([task, due, owner]) => (
                <div key={task} className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-950">{task}</p>
                      <p className="text-sm text-slate-500">{due}</p>
                    </div>
                    <Badge className="bg-white text-slate-600 hover:bg-white">
                      {owner}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
