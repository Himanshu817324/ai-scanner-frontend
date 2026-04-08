import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Web Vulnerability Scanner",
  description: "Advanced web vulnerability scanning powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen flex flex-col bg-slate-950 text-slate-50">
        <header className="border-b border-white/10 p-6 flex items-center justify-between bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-primary-500/30">
              AI
            </div>
            <h1 className="text-xl font-semibold tracking-tight">VulnScanner</h1>
          </div>
        </header>
        <main className="flex-grow flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
