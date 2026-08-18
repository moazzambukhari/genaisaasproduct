import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Search, Zap } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { aiTools } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "AI Tools Marketplace — GeniProduct AI" },
      {
        name: "description",
        content:
          "Browse production-ready AI products: summarization, code refactoring, image enhancement, sentiment analysis and more.",
      },
      { property: "og:title", content: "AI Tools Marketplace — GeniProduct AI" },
      {
        property: "og:description",
        content: "Launch enterprise AI tools with transparent per-run credit pricing.",
      },
    ],
  }),
  component: Marketplace,
});

function Marketplace() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");

  const tags = useMemo(() => ["All", ...new Set(aiTools.map((t) => t.tag))], []);
  const filtered = aiTools.filter(
    (t) =>
      (tag === "All" || t.tag === tag) &&
      (t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <AppShell
      title="AI Tools"
      subtitle="Deploy vetted AI products into your workflows in a single click."
    >
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools"
            className="h-10 rounded-xl pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={cn(
                "rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors",
                tag === t
                  ? "bg-surface text-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((tool) => (
          <Card key={tool.slug} className="surface-panel group transition-shadow hover:shadow-glow">
            <CardContent className="flex h-full flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-gradient text-primary-foreground">
                  <tool.icon className="size-5" />
                </span>
                <Badge variant="outline" className="rounded-full text-[11px]">
                  {tool.tag}
                </Badge>
              </div>
              <h3 className="mt-4 text-base font-semibold">{tool.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{tool.description}</p>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  <Zap className="size-3.5 text-accent" />
                  {tool.credits} credits / run
                </span>
                <Button asChild size="sm" className="gap-1.5">
                  <Link to="/workspace/$toolId" params={{ toolId: tool.slug }}>
                    <Play className="size-3.5" /> Launch
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No tools match that search.
        </p>
      ) : null}
    </AppShell>
  );
}
