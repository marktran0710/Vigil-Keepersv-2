import React from "react";
import { ArrowRight, HeartPulse, ShieldCheck, Users } from "lucide-react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { UserRole, useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

function isUserRole(value: string | undefined): value is UserRole {
  return value === "admin" || value === "elder" || value === "family";
}

export function LoginPage() {
  const { role: roleParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, role: activeRole } = useAuth();
  const { t } = useLanguage();

  if (!isUserRole(roleParam)) {
    return <Navigate to="/" replace />;
  }

  const loginModes: Record<
    UserRole,
    { title: string; eyebrow: string; description: string; destination: string; icon: typeof ShieldCheck; accent: string; button: string }
  > = {
    admin: {
      title: t("adminLoginTitle"),
      eyebrow: t("adminEyebrow"),
      description: t("adminLoginDesc"),
      destination: "/admin",
      icon: ShieldCheck,
      accent: "bg-slate-100 text-slate-800 border-slate-200",
      button: t("adminButton"),
    },
    elder: {
      title: t("elderLoginTitle"),
      eyebrow: t("elderEyebrow"),
      description: t("elderLoginDesc"),
      destination: "/elder",
      icon: HeartPulse,
      accent: "bg-emerald-50 text-emerald-700 border-emerald-100",
      button: t("elderButton"),
    },
    family: {
      title: t("familyLoginTitle"),
      eyebrow: t("familyEyebrow"),
      description: t("familyLoginDesc"),
      destination: "/family",
      icon: Users,
      accent: "bg-blue-50 text-blue-700 border-blue-100",
      button: t("familyButton"),
    },
  };

  const mode = loginModes[roleParam];
  const Icon = mode.icon;
  const from = typeof location.state === "object" && location.state !== null && "from" in location.state
    ? String(location.state.from)
    : mode.destination;

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(roleParam);
    navigate(from.startsWith(mode.destination) ? from : mode.destination, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f7faf8] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[0.92fr_1fr] lg:items-center">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950">
              {t("backToWorkspace")}
            </Link>
            <Badge className={`mt-8 border ${mode.accent}`}>
              {mode.eyebrow}
            </Badge>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              {mode.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
              {mode.description}
            </p>
            {activeRole && activeRole !== roleParam ? (
              <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                {t("switchModeWarning")} {mode.eyebrow.toLowerCase()}.
              </p>
            ) : null}
          </div>

          <Card className="border-slate-200 bg-white shadow-2xl shadow-slate-900/8">
            <CardContent className="p-6 sm:p-8">
              <div className={`mb-6 flex size-14 items-center justify-center rounded-2xl border ${mode.accent}`}>
                <Icon className="size-7" />
              </div>

              <form className="space-y-5" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="user-id">{t("userId")}</Label>
                  <Input
                    id="user-id"
                    placeholder={`${roleParam}.demo`}
                    autoComplete="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t("password")}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={t("passwordPlaceholder")}
                    autoComplete="current-password"
                  />
                </div>

                <Button className="h-12 w-full bg-emerald-700 text-base hover:bg-emerald-800">
                  {mode.button}
                  <ArrowRight className="size-5" />
                </Button>
              </form>

              <p className="mt-5 text-sm leading-6 text-slate-500">
                {t("prototypeNote")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
