import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpRight,
  Boxes,
  CircleDollarSign,
  Cpu,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aiTools, usageSeries } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview — GeniProduct AI Console" },
      {
        name: "description",
        content:
          "Monitor API requests, deployed models, token usage and monthly spend across your GeniProduct AI workspace.",
      },
      { property: "og:title", content: "Overview — GeniProduct AI Console" },
      {
        property: "og:description",
        content: "Real-time metrics for your AI workflows, models and credit consumption.",
      },
    ],
  }),
  component: Dashboard,
});

const metrics = [
  {
    label: "API Requests Today",
    value: "8,592",
    delta: "+12.4%",
    icon: Activity,
    hint: "vs. yesterday",
  },
  { label: "Active Models Deployed", value: "14", delta: "+2", icon: Boxes, hint: "across 3 regions" },
  { label: "Tokens Used", value: "4.12M", delta: "+8.1%", icon: Cpu, hint: "this billing cycle" },
  {
    label: "Monthly Spend",
    value: "$3,284",
    delta: "-4.6%",
    icon: CircleDollarSign,
    hint: "forecast $4.1k",
  },
];

const ranges = ["7d", "14d", "30d"] as const;

function Dashboard() {
  const [range, setRange] = useState<(typeof ranges)[number]>("14d");
  const data = range === "7d" ? usageSeries.slice(-7) : usageSeries;

  return (
    <AppShell
      title="Overview"
      subtitle="Live health of your AI workloads across the Acme Corp workspace."
      actions={
        <Button asChild className="gap-2">
          <Link to="/marketplace">
            Browse AI tools <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label} className="surface-panel">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-surface text-primary">
                  <m.icon className="size-4.5" />
                </span>
                <Badge
                  variant="secondary"
                  className="font-mono text-[11px] text-muted-foreground"
                >
                  {m.delta}
                </Badge>
              </div>
              <p className="mt-4 font-display text-3xl font-semibold tracking-tight">{m.value}</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{m.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground/80">{m.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="surface-panel lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base">Daily token usage</CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                Aggregated across all deployed models
              </p>
            </div>
            <div className="flex rounded-lg border border-border p-0.5">
              {ranges.map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    range === r
                      ? "bg-surface text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="h-[300px] pr-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ left: -12, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="tokenFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    fontSize: 12,
                    color: "var(--color-popover-foreground)",
                  }}
                  formatter={(v: number) => [`${v.toLocaleString()} tokens`, "Usage"]}
                />
                <Area
                  type="monotone"
                  dataKey="tokens"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  fill="url(#tokenFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="surface-panel">
          <CardHeader>
            <CardTitle className="text-base">Top tools by spend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiTools.slice(0, 5).map((tool, i) => (
              <Link
                key={tool.slug}
                to="/workspace/$toolId"
                params={{ toolId: tool.slug }}
                className="flex items-center gap-3 rounded-xl border border-border/70 px-3 py-2.5 transition-colors hover:bg-surface/70"
              >
                <span className="grid size-9 place-items-center rounded-lg bg-surface text-accent">
                  <tool.icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{tool.name}</p>
                  <p className="text-xs text-muted-foreground">{tool.tag}</p>
                </div>
                <span className="ml-auto flex items-center gap-1 font-mono text-xs text-muted-foreground">
                  <TrendingUp className="size-3.5 text-success" />
                  {(1200 - i * 180).toLocaleString()} cr
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
