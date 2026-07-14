import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-background">
      <div className="max-w-2xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
          System Core Online
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          BuildSetup <span className="text-primary">AI</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Your full-scale architecture base is completely configured. Ready to support generation models, advanced custom profile caches, billing APIs, and native components.
        </p>
      </div>
    </main>
  );
}
