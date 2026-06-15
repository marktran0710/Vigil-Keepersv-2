import React from "react";
import { Activity, ArrowLeft, CalendarCheck, HeartPulse, Pill, ShieldCheck } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useLanguage } from "../context/LanguageContext";

export function HealthPage() {
  const { t } = useLanguage();

  const metrics = [
    [t("hHeartRate"), t("hHeartRateValue"), t("hHeartRateDetail"), HeartPulse, "text-rose-600 bg-rose-50"],
    [t("hBloodPressure"), t("hBloodPressureValue"), t("hBloodPressureDetail"), Activity, "text-blue-600 bg-blue-50"],
    [t("hMedication"), t("hMedicationValue"), t("hMedicationDetail"), Pill, "text-amber-600 bg-amber-50"],
    [t("hCareVisit"), t("hCareVisitValue"), t("hCareVisitDetail"), CalendarCheck, "text-emerald-600 bg-emerald-50"],
  ];

  return (
    <div className="min-h-screen bg-[#f7faf8] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <main className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/elder">
            <Button variant="outline" className="bg-white">
              <ArrowLeft className="size-4" />
              {t("back")}
            </Button>
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-medium text-emerald-700">
            <ShieldCheck className="size-4" />
            {t("wellnessStatusStable")}
          </div>
        </div>

        <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
          <h1 className="text-4xl font-semibold sm:text-5xl">{t("todayWellness")}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            {t("todayWellnessDesc")}
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map(([label, value, detail, Icon, tone]) => (
            <Card key={label as string} className="border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className={`mb-5 flex size-12 items-center justify-center rounded-2xl ${tone as string}`}>
                  <Icon className="size-6" />
                </div>
                <p className="text-sm font-medium text-slate-500">{label as string}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">{value as string}</p>
                <p className="mt-2 text-slate-600">{detail as string}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
