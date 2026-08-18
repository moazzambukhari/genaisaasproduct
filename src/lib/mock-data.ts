import {
  FileText,
  Code2,
  ImageIcon,
  Gauge,
  Mic,
  Languages,
  ShieldCheck,
  Database,
  type LucideIcon,
} from "lucide-react";

export type AiTool = {
  slug: string;
  name: string;
  tag: string;
  description: string;
  credits: number;
  icon: LucideIcon;
  latencyMs: number;
  versions: string[];
};

export const aiTools: AiTool[] = [
  {
    slug: "document-summarizer",
    name: "Document Summarizer",
    tag: "NLP",
    description: "Condense long contracts, reports and research into structured briefs.",
    credits: 12,
    icon: FileText,
    latencyMs: 840,
    versions: ["gp-summarize-3.1", "gp-summarize-2.4"],
  },
  {
    slug: "code-refactor-ai",
    name: "Code Refactor AI",
    tag: "Developer",
    description: "Modernise legacy code, enforce style guides and surface risky patterns.",
    credits: 20,
    icon: Code2,
    latencyMs: 1240,
    versions: ["gp-code-4.0", "gp-code-3.2"],
  },
  {
    slug: "image-enhancer",
    name: "Image Enhancer",
    tag: "Vision",
    description: "Upscale, denoise and relight product imagery at batch scale.",
    credits: 30,
    icon: ImageIcon,
    latencyMs: 2100,
    versions: ["gp-vision-2.0", "gp-vision-1.6"],
  },
  {
    slug: "sentiment-analyzer",
    name: "Sentiment Analyzer",
    tag: "Analytics",
    description: "Score tone, intent and churn risk across support and review streams.",
    credits: 8,
    icon: Gauge,
    latencyMs: 420,
    versions: ["gp-sentiment-2.2", "gp-sentiment-1.9"],
  },
  {
    slug: "speech-to-insight",
    name: "Speech to Insight",
    tag: "Audio",
    description: "Transcribe calls and extract action items with speaker attribution.",
    credits: 18,
    icon: Mic,
    latencyMs: 1650,
    versions: ["gp-audio-3.0"],
  },
  {
    slug: "neural-translate",
    name: "Neural Translate",
    tag: "NLP",
    description: "Domain-tuned translation across 42 languages with glossary control.",
    credits: 10,
    icon: Languages,
    latencyMs: 610,
    versions: ["gp-translate-4.1", "gp-translate-3.5"],
  },
  {
    slug: "policy-guard",
    name: "Policy Guard",
    tag: "Safety",
    description: "Real-time PII redaction and compliance checks on every payload.",
    credits: 6,
    icon: ShieldCheck,
    latencyMs: 260,
    versions: ["gp-guard-1.4"],
  },
  {
    slug: "schema-synth",
    name: "Schema Synth",
    tag: "Data",
    description: "Turn messy spreadsheets into typed schemas and clean records.",
    credits: 15,
    icon: Database,
    latencyMs: 980,
    versions: ["gp-schema-2.1", "gp-schema-1.8"],
  },
];

export const usageSeries = [
  { day: "Aug 01", tokens: 182000, requests: 4200 },
  { day: "Aug 02", tokens: 164500, requests: 3810 },
  { day: "Aug 03", tokens: 201300, requests: 4630 },
  { day: "Aug 04", tokens: 246800, requests: 5290 },
  { day: "Aug 05", tokens: 228400, requests: 5010 },
  { day: "Aug 06", tokens: 275900, requests: 6120 },
  { day: "Aug 07", tokens: 312500, requests: 6890 },
  { day: "Aug 08", tokens: 288100, requests: 6320 },
  { day: "Aug 09", tokens: 254700, requests: 5740 },
  { day: "Aug 10", tokens: 331200, requests: 7180 },
  { day: "Aug 11", tokens: 358600, requests: 7620 },
  { day: "Aug 12", tokens: 342900, requests: 7340 },
  { day: "Aug 13", tokens: 389400, requests: 8110 },
  { day: "Aug 14", tokens: 412700, requests: 8590 },
];

export const notifications = [
  {
    title: "Model gp-code-4.0 deployed",
    body: "Rollout finished across 3 regions.",
    time: "6m ago",
    tone: "success" as const,
  },
  {
    title: "Credit threshold at 72%",
    body: "You have used 1,450 of 2,000 monthly credits.",
    time: "1h ago",
    tone: "warning" as const,
  },
  {
    title: "Latency spike resolved",
    body: "Image Enhancer p95 back under 2.4s.",
    time: "4h ago",
    tone: "default" as const,
  },
];

export const creditState = { used: 1450, total: 2000 };
