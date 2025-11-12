"use client";

import { useMemo, useState } from "react";
import Output from "./Output";

type Platform = "instagram" | "tiktok" | "twitter" | "facebook" | "linkedin" | "pinterest";

type GenerateInput = {
  destination: string;
  tone: "elegant" | "playful" | "adventurous" | "romantic" | "minimal";
  audience: "affluent" | "honeymooners" | "family" | "solo" | "business";
  platforms: Platform[];
  length: "short" | "medium" | "long";
  brandName?: string;
  includeEmojis?: boolean;
  includeHashtags?: boolean;
  link?: string;
};

type PlatformOutput = {
  title: string;
  content: string;
  hashtags: string[];
  altText?: string;
  cta?: string;
};

type GenerateOutput = {
  byPlatform: Record<Platform, PlatformOutput>;
  universal: { keywords: string[] };
};

const allPlatforms: Platform[] = [
  "instagram",
  "tiktok",
  "twitter",
  "facebook",
  "linkedin",
  "pinterest",
];

export default function ContentForm() {
  const [destination, setDestination] = useState("");
  const [tone, setTone] = useState<GenerateInput["tone"]>("elegant");
  const [audience, setAudience] = useState<GenerateInput["audience"]>("affluent");
  const [platforms, setPlatforms] = useState<Platform[]>(["instagram"]);
  const [length, setLength] = useState<GenerateInput["length"]>("medium");
  const [brandName, setBrandName] = useState("");
  const [link, setLink] = useState("");
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => destination.trim().length > 1 && platforms.length > 0, [destination, platforms]);

  const togglePlatform = (p: Platform) => {
    setPlatforms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const payload: GenerateInput = {
      destination: destination.trim(),
      tone,
      audience,
      platforms,
      length,
      brandName: brandName.trim() || undefined,
      includeEmojis,
      includeHashtags,
      link: link.trim() || undefined,
    };

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = (await res.json()) as GenerateOutput;
      setResult(data);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="label">Destination or Experience</div>
      <input className="input" placeholder="e.g. Amalfi Coast private yacht, Kyoto ryokan, Maldives overwater villa" value={destination} onChange={(e) => setDestination(e.target.value)} />

      <div className="row" style={{ marginTop: 12 }}>
        <div style={{ flex: 1 }}>
          <div className="label">Tone</div>
          <select className="select" value={tone} onChange={(e) => setTone(e.target.value as any)}>
            <option value="elegant">Elegant</option>
            <option value="playful">Playful</option>
            <option value="adventurous">Adventurous</option>
            <option value="romantic">Romantic</option>
            <option value="minimal">Minimal</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <div className="label">Audience</div>
          <select className="select" value={audience} onChange={(e) => setAudience(e.target.value as any)}>
            <option value="affluent">Affluent</option>
            <option value="honeymooners">Honeymooners</option>
            <option value="family">Family</option>
            <option value="solo">Solo</option>
            <option value="business">Business</option>
          </select>
        </div>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <div style={{ flex: 1 }}>
          <div className="label">Length</div>
          <select className="select" value={length} onChange={(e) => setLength(e.target.value as any)}>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <div className="label">Brand (optional)</div>
          <input className="input" placeholder="Your brand name" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
        </div>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <div style={{ flex: 1 }}>
          <div className="label">Link (optional)</div>
          <input className="input" placeholder="https://?" value={link} onChange={(e) => setLink(e.target.value)} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="label">Include</div>
          <div className="row">
            <div className="badge" data-active={includeEmojis} onClick={() => setIncludeEmojis((v) => !v)}>Emojis</div>
            <div className="badge" data-active={includeHashtags} onClick={() => setIncludeHashtags((v) => !v)}>Hashtags</div>
          </div>
        </div>
      </div>

      <div className="label" style={{ marginTop: 14 }}>Platforms</div>
      <div className="row">
        {allPlatforms.map((p) => (
          <div key={p} className="badge" data-active={platforms.includes(p)} onClick={() => togglePlatform(p)}>
            {p}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
        <button className="button" disabled={!canSubmit || loading} type="submit">
          {loading ? "Generating?" : "Generate Content"}
        </button>
        {error ? <span className="small" style={{ color: '#ff8080' }}>{error}</span> : <span className="small">Crafts tailored copy, CTAs, and hashtags.</span>}
      </div>

      {result && (
        <div className="output" style={{ marginTop: 18 }}>
          <Output data={result} />
        </div>
      )}
    </form>
  );
}
