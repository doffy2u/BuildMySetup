"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { logger } from "@/core/lib/logger";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Universal safe catch-all React Error Boundary component.
 * Intercepts components compilation / render cycles crashes and registers them down to internal telemetry.
 */
export class RootErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error({ error, errorInfo }, "Root React component boundary capture.");
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.fallbackRender()
      );
    }

    return this.childrenRender();
  }

  private fallbackRender() {
    return (
      this.props.fallback || (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Something went wrong</h2>
          <p className="mt-2 text-muted-foreground max-w-md">
            Our systems failed to compile or process this view safely. If this keeps happening, reach out.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/95 transition-colors"
          >
            Reload Page
          </button>
        </div>
      )
    );
  }

  private childrenRender() {
    return this.props.children;
  }
}
