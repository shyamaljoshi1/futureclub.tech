import React, { useState } from 'react';
import { Copy, Check, Sliders, Sparkles } from 'lucide-react';
import { trackPromptCopy } from '@/lib/analytics';

const PRESETS = [
  {
    id: 'linkedin',
    label: 'LinkedIn Hook and Post',
    model: 'ChatGPT / Claude',
    defaultTopic: 'Why 90% of automation projects fail before month 3',
    template: (topic: string, tone: string, length: string) =>
      `Act as a technology ghostwriter on LinkedIn.\n\nTopic: ${topic}\nTone: ${tone}\nTarget Length: ${length}\n\nGuidelines:\n1. Hook: Write a punchy opening line under 12 words challenging popular consensus.\n2. Story: Present the specific mistake or metric that caused this.\n3. Tactical: Give 3 clear action bullets.\n4. Call to action: End with a genuine question to invite peer debate.\n5. Avoid buzzwords and passive voice.`,
  },
  {
    id: 'code-review',
    label: 'Senior Architect Code Audit',
    model: 'Claude 3.5 Sonnet',
    defaultTopic: 'Audit React server components for memory leaks and race conditions',
    template: (topic: string, tone: string) =>
      `Act as a Principal Staff Software Architect.\n\nObjective: ${topic}\nTone: ${tone}\n\nReview Framework:\n1. Architectural Fit: Evaluate system scalability and failure modes.\n2. Security and Edge Cases: Identify memory leaks, race conditions, and unhandled null states.\n3. Algorithmic Complexity: Time and space analysis.\n4. Refactored Solution: Provide drop-in TypeScript implementation with comments.`,
  },
  {
    id: 'midjourney',
    label: '35mm Film Portrait',
    model: 'Midjourney v6.1',
    defaultTopic: 'architect in concrete studio wearing minimalist charcoal knit sweater',
    template: (topic: string, tone: string) =>
      `Candid editorial 35mm documentary portrait of ${topic}, photographed on Kodak Portra 400 with a Leica M6 and 50mm f/1.4 lens. Atmosphere: ${tone}. Authentic skin pores, fine film grain, natural window lighting, creamy bokeh --ar 4:5 --style raw --v 6.1`,
  },
];

export const PromptPlayground: React.FC = () => {
  const [activePreset, setActivePreset] = useState(PRESETS[0]);
  const [topic, setTopic] = useState(PRESETS[0].defaultTopic);
  const [tone, setTone] = useState('Pragmatic and direct');
  const [length, setLength] = useState('Short (under 180 words)');
  const [copied, setCopied] = useState(false);

  const generatedPrompt = activePreset.template(topic, tone, length);
  const wordCount = generatedPrompt.trim().split(/\s+/).length;
  const estimatedTokens = Math.round(wordCount * 1.35);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    trackPromptCopy(activePreset.id, activePreset.label);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePresetChange = (preset: typeof PRESETS[0]) => {
    setActivePreset(preset);
    setTopic(preset.defaultTopic);
  };

  return (
    <section aria-labelledby="live-optimizer-heading" className="my-16">
      <div data-ui="playground-box" className="rounded-lg bg-[#ffffff] dark:bg-[#141619] overflow-hidden">
        {/* Header bar */}
        <div className="px-6 py-4 bg-[#f4f4f0] dark:bg-[#101215] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded bg-[#1e3a8a] text-white dark:bg-[#3b82f6]">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 id="live-optimizer-heading" className="text-sm font-semibold text-[#111215] dark:text-[#f4f4f5]">
                Live Prompt Synthesizer and Token Calculator
              </h3>
              <p className="text-xs text-[#5e626d] dark:text-[#8e93a0]">
                Interactive testing workbench: adjust parameters to assemble a verified prompt
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs px-2 py-0.5 rounded bg-[#eaeae5] dark:bg-[#1c1f24] text-[#5e626d] dark:text-[#8e93a0]">
              ~{estimatedTokens} tokens
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#eaeae5] dark:bg-[#1c1f24] text-[#5e626d] dark:text-[#8e93a0]">
              {wordCount} words
            </span>
          </div>
        </div>

        {/* Content Body: Split controls + preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Controls Column */}
          <div className="lg:col-span-5 p-6 space-y-5 bg-[#ffffff] dark:bg-[#141619]">
            {/* Presets */}
            <div>
              <label className="block text-xs font-semibold text-[#5e626d] dark:text-[#8e93a0] mb-2">
                1. Select Workflow
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handlePresetChange(p)}
                    className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between ${
                      activePreset.id === p.id
                        ? 'bg-[#111215] text-white dark:bg-[#f4f4f5] dark:text-[#111215] font-medium'
                        : 'bg-[#f4f4f0] dark:bg-[#1c1f24] text-[#5e626d] dark:text-[#8e93a0] hover:text-[#111215] dark:hover:text-[#f4f4f5]'
                    }`}
                  >
                    <span>{p.label}</span>
                    <span className="text-[10px] opacity-75">{p.model}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Input */}
            <div>
              <label htmlFor="topic-input" className="block text-xs font-semibold text-[#5e626d] dark:text-[#8e93a0] mb-2">
                2. Specific Topic or Subject
              </label>
              <input
                id="topic-input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter custom context or subject..."
                className="w-full px-3 py-2 text-xs rounded bg-[#f4f4f0] dark:bg-[#0c0d0f] text-[#111215] dark:text-[#f4f4f5] focus:outline-none"
              />
            </div>

            {/* Tone Selector */}
            <div>
              <label htmlFor="tone-select" className="block text-xs font-semibold text-[#5e626d] dark:text-[#8e93a0] mb-2 flex items-center">
                <Sliders className="w-3 h-3 mr-1" />
                3. Desired Tone
              </label>
              <select
                id="tone-select"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded bg-[#f4f4f0] dark:bg-[#0c0d0f] text-[#111215] dark:text-[#f4f4f5] focus:outline-none"
              >
                <option value="Pragmatic and direct">Pragmatic and direct</option>
                <option value="Analytical and rigorous">Analytical and rigorous</option>
                <option value="Narrative and reflective">Narrative and reflective</option>
                <option value="Technical and concise">Technical and concise</option>
              </select>
            </div>

            {activePreset.id === 'linkedin' && (
              <div>
                <label htmlFor="length-select" className="block text-xs font-semibold text-[#5e626d] dark:text-[#8e93a0] mb-2">
                  4. Length Limit
                </label>
                <select
                  id="length-select"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded bg-[#f4f4f0] dark:bg-[#0c0d0f] text-[#111215] dark:text-[#f4f4f5] focus:outline-none"
                >
                  <option value="Short (under 150 words)">Short (under 150 words)</option>
                  <option value="Medium (200-250 words)">Medium (200-250 words)</option>
                  <option value="Long-form story (350 words)">Long-form story (350 words)</option>
                </select>
              </div>
            )}
          </div>

          {/* Generated Code / Prompt View */}
          <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-[#fbfbfa] dark:bg-[#0f1114]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#888d99] dark:text-[#636773]">
                  Ready prompt
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded bg-[#111215] text-[#ffffff] dark:bg-[#f4f4f5] dark:text-[#111215] hover:opacity-90 transition-opacity"
                  aria-label="Copy generated prompt"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1 text-green-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded bg-[#ffffff] dark:bg-[#16181d] text-xs sm:text-sm font-mono text-[#111215] dark:text-[#f4f4f5] whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[320px]">
                {generatedPrompt}
              </pre>
            </div>

            <p className="mt-4 text-xs text-[#888d99] dark:text-[#636773]">
              Tip: Paste into {activePreset.model} directly. You can edit the text before or after pasting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
