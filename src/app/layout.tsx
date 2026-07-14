import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/core/providers/theme-provider";
import { RootErrorBoundary } from "@/core/components/feedback/error-boundary";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuildSetup AI - Build Your Perfect Setup",
  description: "Configure and generate tailored workstation designs utilizing adaptive artificial intelligence metrics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RootErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </RootErrorBoundary>
      </body>
    </html>
  );
}
