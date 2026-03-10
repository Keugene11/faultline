"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "Which industry has the lowest tech adoption?",
  "Where are quit rates highest?",
  "Best niche for a first-time founder?",
  "Which industries survived COVID best?",
  "Compare auto repair vs home services",
];

export default function ExplorePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(query?: string) {
    const q = query || input;
    if (!q.trim() || loading) return;

    const userMsg: Message = { role: "user", content: q };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Check the API key." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-3xl mx-auto w-full shrink-0">
        <Link href="/" className="text-base font-semibold">
          faultline
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-black/50 hover:text-black transition-colors">Industries</Link>
          <Link href="/explore" className="text-black">Explorer</Link>
        </div>
      </nav>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-8">
          {messages.length === 0 ? (
            <div className="pt-16 pb-8 text-center">
              <h1 className="text-3xl font-semibold tracking-tight mb-3">
                Ask about any industry.
              </h1>
              <p className="text-black/50 mb-12">
                Real data from BLS and FRED across 8 startup-ready industries.
              </p>
              <div className="max-w-sm mx-auto space-y-2">
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSubmit(q)}
                    className="block w-full text-left rounded-2xl border border-gray-200 px-5 py-3.5 text-sm text-black/70 hover:border-black hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i}>
                  {msg.role === "user" ? (
                    <div className="flex justify-end">
                      <div className="rounded-2xl bg-black text-white px-5 py-3 max-w-[80%]">
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-gray-200 px-5 py-4">
                      <p className="text-sm leading-relaxed text-black/70 whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="rounded-2xl border border-gray-200 px-5 py-4">
                  <Loader2 className="h-4 w-4 animate-spin text-black/20" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white shrink-0">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex items-center gap-3 rounded-full border border-gray-200 px-5 py-2.5 focus-within:border-black transition-colors duration-300"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about industry data..."
              className="flex-1 bg-transparent text-sm placeholder:text-black/30 outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white disabled:opacity-20 transition-opacity"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
