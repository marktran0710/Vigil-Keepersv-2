import React from "react";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  HeartPulse,
  Home,
  LogOut,
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

export function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const operations = [
    {
      label: t("activeElders"),
      value: "128",
      detail: t("activeEldersDetail"),
      icon: HeartPulse,
      tone: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    {
      label: t("careWorkers"),
      value: "24",
      detail: t("careWorkersDetail"),
      icon: Users,
      tone: "bg-blue-50 text-blue-700 border-blue-100",
    },
    {
      label: t("openRequests"),
      value: "17",
      detail: t("openRequestsDetail"),
      icon: ClipboardList,
      tone: "bg-amber-50 text-amber-700 border-amber-100",
    },
  ];

  const queue = [
    [t("priorityHigh"), t("queueIssue1"), t("queueElder1"), t("queueAction1")],
    [t("priorityMedium"), t("queueIssue2"), t("queueElder2"), t("queueAction2")],
    [t("priorityLow"), t("queueIssue3"), t("queueElder3"), t("queueAction3")],
  ];

  const schedule = [
    ["09:30", t("scheduleTask1"), t("scheduleLoc1"), t("scheduleStatus1")],
    ["11:00", t("scheduleTask2"), t("scheduleLoc2"), t("scheduleStatus2")],
    ["14:30", t("scheduleTask3"), t("scheduleLoc3"), t("scheduleStatus3")],
  ];

  const handleLogout = () => {
    logout();
    navigate("/login/admin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-slate-100 text-slate-800 ring-1 ring-slate-200">
              <ShieldCheck className="size-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold leading-tight">
                {t("adminConsoleTitle")}
              </h1>
              <p className="text-sm text-slate-500">
                {t("adminConsoleDesc")}
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
        <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">
                {t("adminModeBadge")}
              </Badge>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                {t("adminHeroTitle")}
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                {t("adminHeroDesc")}
              </p>
            </div>
            <Button className="h-12 bg-slate-950 px-5 text-base hover:bg-slate-800">
              <CalendarClock className="size-5" />
              {t("reviewSchedule")}
            </Button>
          </div>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          {operations.map((item) => (
            <Card key={item.label} className={`border shadow-sm ${item.tone}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium opacity-80">{item.label}</p>
                    <p className="mt-2 text-4xl font-semibold">{item.value}</p>
                    <p className="mt-2 text-sm opacity-80">{item.detail}</p>
                  </div>
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-white/80">
                    <item.icon className="size-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="size-5 text-amber-600" />
                {t("careRequestQueue")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {queue.map(([priority, issue, elder, action]) => (
                <div
                  key={`${issue}-${elder}`}
                  className="grid gap-3 rounded-2xl border border-slate-200 p-4 sm:grid-cols-[90px_1fr_auto]"
                >
                  <Badge
                    className={
                      priority === t("priorityHigh")
                        ? "w-fit bg-rose-100 text-rose-700 hover:bg-rose-100"
                        : priority === t("priorityMedium")
                          ? "w-fit bg-amber-100 text-amber-700 hover:bg-amber-100"
                          : "w-fit bg-slate-100 text-slate-700 hover:bg-slate-100"
                    }
                  >
                    {priority}
                  </Badge>
                  <div>
                    <p className="font-medium text-slate-950">{issue}</p>
                    <p className="text-sm text-slate-500">{elder}</p>
                  </div>
                  <Button variant="outline" className="bg-white">
                    {action}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-600" />
                {t("todayScheduleTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {schedule.map(([time, task, location, status]) => (
                <div key={`${time}-${task}`} className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-slate-950">{time}</p>
                    <Badge className="bg-white text-slate-600 hover:bg-white">
                      {status}
                    </Badge>
                  </div>
                  <p className="mt-2 font-medium">{task}</p>
                  <p className="text-sm text-slate-500">{location}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
