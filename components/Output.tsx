"use client";

import { useState } from "react";

type Platform = "instagram" | "tiktok" | "twitter" | "facebook" | "linkedin" | "pinterest";

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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="copy"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      }}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function Output({ data }: { data: GenerateOutput }) {
  const entries = Object.entries(data.byPlatform) as [Platform, PlatformOutput][];
  return (
    <div>
      {entries.map(([platform, item]) => (
        <div key={platform} className="outputItem">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 700, textTransform: 'capitalize' }}>{platform}</div>
            <CopyButton text={`${item.title ? item.title + "\n\n" : ""}${item.content}\n\n${item.hashtags.join(' ')}`.trim()} />
          </div>
          {item.title && (
            <div style={{ marginTop: 8, fontWeight: 600 }}>{item.title}</div>
          )}
          <div style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>{item.content}</div>
          {item.cta && (
            <div style={{ marginTop: 8 }}><span className="small">CTA:</span> {item.cta}</div>
          )}
          {item.altText && (
            <div style={{ marginTop: 8 }}><span className="small">Alt text:</span> {item.altText}</div>
          )}
          {item.hashtags?.length > 0 && (
            <div style={{ marginTop: 10, color: '#cfd3e6' }}>{item.hashtags.join(' ')}</div>
          )}
        </div>
      ))}

      {data.universal.keywords?.length > 0 && (
        <div className="outputItem">
          <div style={{ fontWeight: 700 }}>Keywords</div>
          <div className="small" style={{ marginTop: 6 }}>{data.universal.keywords.join(', ')}</div>
        </div>
      )}
    </div>
  );
}
