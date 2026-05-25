import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "VulnScan AI - Next-Gen Web Vulnerability Scanner",
  description: "Advanced web vulnerability scanning powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col bg-[#0A0A0A] text-gray-100 font-sans selection:bg-blue-500/30">
        <header className="border-b border-[#222] px-6 py-4 flex items-center justify-between bg-[#0A0A0A]/90 backdrop-blur-md sticky top-0 z-50">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative p-1.5 bg-[#111] rounded-md border border-[#333] overflow-hidden">
              <Shield className="w-5 h-5 text-gray-300 relative z-10 group-hover:text-white transition-colors" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              VulnScan <span className="text-gray-500 font-normal">AI</span>
            </h1>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/scanner" className="px-4 py-2 bg-[#111] hover:bg-[#1a1a1a] text-white rounded-md text-sm font-medium transition-colors border border-[#333]">
              Launch Scanner
            </Link>
          </div>
        </header>

        <main className="flex-grow flex flex-col relative overflow-hidden">
          {children}
        </main>

        <footer className="border-t border-[#222] bg-[#0A0A0A] pt-16 pb-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-2">
                <Link href="/" className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <span className="text-lg font-bold text-white">VulnScan AI</span>
                </Link>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                  A modern, structural approach to web vulnerability analysis. Identify, categorize, and remediate security flaws with confidence.
                </p>
              </div>
              <div>
                <h4 className="text-white text-sm font-medium mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/scanner" className="hover:text-white transition-colors">Scanner</Link></li>
                  <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                  <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white text-sm font-medium mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-[#222] text-center text-sm text-gray-500">
              © {new Date().getFullYear()} VulnScan AI. Built for the final year project demonstration.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
