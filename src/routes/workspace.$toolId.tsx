import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { CloudUpload, Play, RotateCcw, Zap } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { aiTools } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/workspace/$toolId")({
  loader: ({ params }) => {
    const tool = aiTools.find((t) => t.slug === params.toolId);
    if (!tool) throw notFound();
    return { name: tool.name, description: tool.description };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.name ?? "Workspace";
    const description =
      loaderData?.description ?? "Run and inspect AI workflows in the GeniProduct AI workspace.";
    return {
      meta: [
        { title: `${name} — GeniProduct AI Workspace` },
        { name: "description", content: description },
        { property: "og:title", content: `${name} — GeniProduct AI Workspace` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: Workspace,
});

function Workspace() {
  const { toolId } = Route.useParams();
  const tool = aiTools.find((t) => t.slug === toolId)!;

  const [temperature, setTemperature] = useState([0.4]);
  const [version, setVersion] = useState(tool.versions[0]!);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<null | { text: string; latency: number }>(null);

  const run = () => {
    setRunning(true);
    setResult(null);
    setTimeout(() => {
      setRunning(false);
      setResult({
        text: `${tool.name} completed successfully.\n\nInput length: ${input.length} chars${
          file ? ` · attachment: ${file}` : ""
        }\nModel: ${version} · temperature ${temperature[0]}\n\n— Key takeaways —\n1. Primary intent detected with 96.4% confidence.\n2. Three actionable segments extracted.\n3. No policy violations found in the payload.`,
        latency: tool.latencyMs + Math.round(Math.random() * 180),
      });
    }, 900);
  };

  const json = result
    ? JSON.stringify(
        {
          id: "run_9fa21c",
          tool: tool.slug,
          model: version,
          parameters: { temperature: temperature[0], stream: false },
          usage: { credits: tool.credits, tokens_in: input.length * 2 + 128, tokens_out: 412 },
          status: "succeeded",
        },
        null,
        2,
      )
    : "{}";

  return (
    <AppShell
      title={tool.name}
      subtitle={tool.description}
      actions={
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="rounded-full">
            {tool.tag}
          </Badge>
          <Button variant="outline" asChild>
            <Link to="/marketplace">All tools</Link>
          </Button>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
        <Card className="surface-panel">
          <CardHeader>
            <CardTitle className="text-base">Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                setFile(e.dataTransfer.files[0]?.name ?? "sample.pdf");
              }}
              className={cn(
                "grid place-items-center rounded-xl border border-dashed border-border px-4 py-8 text-center transition-colors",
                dragging && "border-primary bg-surface/70",
              )}
            >
              <CloudUpload className="size-6 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">
                {file ?? "Drag & drop a file here"}
              </p>
              <p className="text-xs text-muted-foreground">PDF, DOCX, PNG · up to 25 MB</p>
            </div>

            <div className="space-y-2">
              <Label>Model version</Label>
              <Select value={version} onValueChange={setVersion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tool.versions.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Temperature</Label>
                <span className="font-mono text-xs text-muted-foreground">{temperature[0]}</span>
              </div>
              <Slider
                value={temperature}
                onValueChange={setTemperature}
                min={0}
                max={1}
                step={0.05}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prompt">Input</Label>
              <Textarea
                id="prompt"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={6}
                placeholder="Paste text or describe the task…"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={run} disabled={running} className="flex-1 gap-2">
                <Play className="size-4" /> {running ? "Running…" : "Run"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Reset"
                onClick={() => {
                  setInput("");
                  setFile(null);
                  setResult(null);
                }}
              >
                <RotateCcw className="size-4" />
              </Button>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Zap className="size-3.5 text-accent" /> Estimated cost {tool.credits} credits
            </p>
          </CardContent>
        </Card>

        <Card className="surface-panel min-h-[520px]">
          <CardHeader>
            <CardTitle className="text-base">Output</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="raw">
              <TabsList>
                <TabsTrigger value="raw">Raw Response</TabsTrigger>
                <TabsTrigger value="json">JSON Output</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="raw">
                <pre className="mt-4 max-h-[420px] overflow-auto whitespace-pre-wrap rounded-xl bg-surface/70 p-4 font-mono text-xs leading-relaxed">
                  {running
                    ? "Streaming response…"
                    : (result?.text ?? "Run the tool to see the response here.")}
                </pre>
              </TabsContent>

              <TabsContent value="json">
                <pre className="mt-4 max-h-[420px] overflow-auto rounded-xl bg-surface/70 p-4 font-mono text-xs leading-relaxed">
                  {json}
                </pre>
              </TabsContent>

              <TabsContent value="analytics">
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Latency", value: result ? `${result.latency} ms` : "—" },
                    { label: "Credits used", value: result ? `${tool.credits}` : "—" },
                    { label: "Model", value: version },
                    { label: "Tokens in", value: result ? `${input.length * 2 + 128}` : "—" },
                    { label: "Tokens out", value: result ? "412" : "—" },
                    { label: "Status", value: result ? "succeeded" : "idle" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-border px-4 py-3">
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <p className="mt-1 font-mono text-sm">{s.value}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
