import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Github, Sparkles, Chrome, ArrowRight, Cpu, Waves, Activity } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — GeniProduct AI" },
      {
        name: "description",
        content:
          "Sign in or create your GeniProduct AI account to deploy, monitor and scale custom AI workflows.",
      },
      { property: "og:title", content: "Sign in — GeniProduct AI" },
      {
        property: "og:description",
        content: "Access the GeniProduct AI enterprise workspace and AI product marketplace.",
      },
    ],
  }),
  component: AuthPage,
});

const showcase = [
  { icon: Cpu, label: "gp-code-4.0", detail: "Refactored 12,840 files this week" },
  { icon: Waves, label: "gp-audio-3.0", detail: "Streaming transcription at 210ms" },
  { icon: Activity, label: "gp-sentiment-2.2", detail: "98.2% intent accuracy" },
];

function AuthPage() {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setTimeout(() => navigate({ to: "/" }), 500);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-mesh bg-sidebar p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-gradient text-primary-foreground">
            <Sparkles className="size-4.5" />
          </span>
          <span className="font-display text-lg font-semibold">GeniProduct AI</span>
        </div>

        <div className="max-w-lg">
          <h2 className="font-display text-4xl font-semibold leading-tight">
            Ship AI products, <span className="text-gradient">not infrastructure.</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            One control plane for running, deploying and monitoring custom AI workflows across
            your organisation.
          </p>

          <div className="mt-8 space-y-3">
            {showcase.map((item, i) => (
              <div
                key={item.label}
                className="surface-panel flex items-center gap-3 rounded-2xl px-4 py-3 animate-in fade-in slide-in-from-bottom-3"
                style={{ animationDelay: `${i * 140}ms`, animationFillMode: "both" }}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface text-accent">
                  <item.icon className="size-4" />
                </span>
                <div>
                  <p className="font-mono text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium">{item.detail}</p>
                </div>
                <span className="ml-auto size-2 animate-pulse rounded-full bg-success" />
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          SOC 2 Type II · GDPR ready · Private VPC deployments
        </p>
      </div>

      <div className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-2xl font-semibold">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Use your work account to access the workspace.
          </p>

          <div className="mt-6 grid gap-2">
            <Button variant="outline" className="h-11 justify-center gap-2">
              <Chrome className="size-4" /> Continue with Google
            </Button>
            <Button variant="outline" className="h-11 justify-center gap-2">
              <Github className="size-4" /> Continue with GitHub
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or with email
            <span className="h-px flex-1 bg-border" />
          </div>

          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form className="mt-4 space-y-4" onSubmit={submit}>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Work email</Label>
                  <Input id="email" type="email" placeholder="you@company.com" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" className="h-11 w-full gap-2" disabled={pending}>
                  {pending ? "Signing in…" : "Sign in"} <ArrowRight className="size-4" />
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form className="mt-4 space-y-4" onSubmit={submit}>
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" placeholder="Ada Lovelace" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="remail">Work email</Label>
                  <Input id="remail" type="email" placeholder="you@company.com" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rpassword">Password</Label>
                  <Input id="rpassword" type="password" placeholder="At least 12 characters" required />
                </div>
                <Button type="submit" className="h-11 w-full gap-2" disabled={pending}>
                  {pending ? "Creating…" : "Create account"} <ArrowRight className="size-4" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
