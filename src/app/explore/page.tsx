"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "Which industries are losing the most jobs?",
  "Where are the biggest labor shortages?",
  "What industries have the worst wage growth?",
  "Where is government spending failing?",
  "Best opportunities in healthcare?",
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
        { role: "assistant", content: "Something went wrong. Check your DeepSeek API key in .env.local." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Nav */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-stone-200/60 shrink-0">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-400 shadow-sm">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900">faultline</span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className="rounded-full px-4 py-2 text-sm font-medium text-stone-500 hover:bg-stone-50 transition-colors"
            >
              Industries
            </Link>
            <Link
              href="/explore"
              className="rounded-full bg-stone-100 px-4 py-2 text-sm font-medium text-stone-900"
            >
              AI Explorer
            </Link>
          </nav>
        </div>
      </header>

      {/* Chat */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="mx-auto max-w-2xl px-6 py-8">
            {messages.length === 0 ? (
              <div className="text-center py-20">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-500 to-orange-400 mx-auto mb-6 shadow-lg shadow-rose-200/50">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-stone-900 mb-2">
                  Ask about industry fault lines
                </h1>
                <p className="text-stone-400 mb-10 max-w-sm mx-auto">
                  I analyze real BLS, FRED, and Census data to find inefficiencies and opportunities.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTED.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSubmit(q)}
                      className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:border-rose-200 transition-all shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {messages.map((msg, i) => (
                  <div key={i} className="flex gap-3">
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl ${
                        msg.role === "user"
                          ? "bg-stone-100"
                          : "bg-gradient-to-br from-rose-500 to-orange-400 shadow-sm"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="h-4 w-4 text-stone-500" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <Card className={`flex-1 border-stone-200/60 shadow-sm ${msg.role === "assistant" ? "bg-white" : "bg-stone-50"}`}>
                      <CardContent className="p-4">
                        <p className="text-sm leading-relaxed text-stone-700 whitespace-pre-wrap">
                          {msg.content}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 shadow-sm">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <Card className="flex-1 border-stone-200/60 shadow-sm bg-white">
                      <CardContent className="p-4">
                        <Loader2 className="h-4 w-4 animate-spin text-stone-400" />
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input */}
      <div className="border-t border-stone-200/60 bg-white shrink-0">
        <div className="mx-auto max-w-2xl px-6 py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about industry data..."
              className="flex-1 rounded-full border-stone-200 bg-stone-50 px-5 focus-visible:ring-rose-300"
              disabled={loading}
            />
            <Button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-full bg-gradient-to-r from-rose-500 to-orange-400 hover:from-rose-600 hover:to-orange-500 shadow-sm h-10 w-10 p-0"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="mt-2 text-[11px] text-stone-400 text-center">
            Powered by DeepSeek + real BLS/FRED data
          </p>
        </div>
      </div>
    </div>
  );
}
