"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Zap, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUERIES = [
  "Which industries are losing the most jobs?",
  "Where are the biggest labor shortages?",
  "What industries have the worst real wage growth?",
  "Where is government spending not translating to growth?",
  "What are the best opportunities in healthcare?",
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

      if (!res.ok) throw new Error("Failed to get response");

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error. Make sure the DeepSeek API key is configured in .env.local.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border/50 shrink-0">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-red-400" />
            <span className="text-xl font-bold tracking-tight">Faultline</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Industries
            </Link>
            <Link href="/explore" className="text-foreground">
              AI Explorer
            </Link>
          </nav>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="mx-auto max-w-3xl px-6 py-8">
            {messages.length === 0 ? (
              <div className="text-center py-16">
                <Bot className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Ask about industry fault lines</h1>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  I can analyze industry data from BLS, FRED, and Census Bureau to find
                  inefficiencies, pain points, and business opportunities.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTED_QUERIES.map((q) => (
                    <Badge
                      key={q}
                      variant="outline"
                      className="cursor-pointer hover:bg-muted transition-colors py-2 px-3"
                      onClick={() => handleSubmit(q)}
                    >
                      {q}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((msg, i) => (
                  <div key={i} className="flex gap-3">
                    <div
                      className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${msg.role === "user" ? "bg-muted" : "bg-red-500/20"}`}
                    >
                      {msg.role === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                    <Card className="flex-1">
                      <CardContent className="p-4">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {msg.content}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3">
                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/20">
                      <Bot className="h-4 w-4 text-red-400" />
                    </div>
                    <Card className="flex-1">
                      <CardContent className="p-4">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
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
      <div className="border-t border-border/50 shrink-0">
        <div className="mx-auto max-w-3xl px-6 py-4">
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
              placeholder="Ask about industry inefficiencies, opportunities, or trends..."
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" disabled={loading || !input.trim()} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="mt-2 text-xs text-muted-foreground text-center">
            Powered by DeepSeek + real BLS/FRED data
          </p>
        </div>
      </div>
    </div>
  );
}
