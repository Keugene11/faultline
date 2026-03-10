"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "Which industry has the lowest tech adoption?",
  "Where are quit rates highest?",
  "Best niche for a first-time founder?",
  "Which industries are most recession-proof?",
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
        { role: "assistant", content: "Something went wrong. Check your API key." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Nav */}
      <header className="bg-[#FFFEFD]/90 backdrop-blur-md border-b border-gray-200 shrink-0">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            faultline
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-[#1A1A1A] transition-colors"
            >
              Industries
            </Link>
            <Link href="/explore" className="text-sm font-medium text-[#1A1A1A]">
              AI Explorer
            </Link>
          </div>
        </div>
      </header>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-6 py-8">
          {messages.length === 0 ? (
            <div className="pt-20 pb-8">
              <h1 className="text-2xl font-semibold tracking-tight text-[#1A1A1A] mb-2">
                Ask about any industry.
              </h1>
              <p className="text-gray-500 mb-10">
                I have real BLS and FRED data for 8 startup-ready industries.
              </p>
              <div className="space-y-2">
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSubmit(q)}
                    className="block w-full text-left rounded-2xl border border-gray-200 px-5 py-3.5 text-sm text-gray-600 hover:border-[#1A1A1A] transition-all duration-300"
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
                      <div className="rounded-2xl bg-[#1A1A1A] text-white px-5 py-3 max-w-[80%]">
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ) : (
                    <Card className="border-gray-200 rounded-2xl shadow-none">
                      <CardContent className="p-5">
                        <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                          {msg.content}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
              {loading && (
                <Card className="border-gray-200 rounded-2xl shadow-none">
                  <CardContent className="p-5">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-300" />
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white shrink-0">
        <div className="mx-auto max-w-2xl px-6 py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-2 focus-within:border-[#1A1A1A] transition-colors duration-300"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about industry data..."
              className="flex-1 bg-transparent text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A1A1A] text-white disabled:opacity-20 hover:opacity-80 transition-opacity"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
          <p className="mt-2 text-[11px] text-gray-400 text-center">
            Powered by DeepSeek + real BLS/FRED data
          </p>
        </div>
      </div>
    </div>
  );
}
