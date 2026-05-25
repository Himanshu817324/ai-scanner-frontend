import Link from 'next/link';
import { ArrowRight, ChevronRight, Shield, Database, Code, Server, Info, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-36 px-6 overflow-hidden">
      
      {/* Background Spotlight Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center flex flex-col items-center">
        
        {/* Banner Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/20 mb-8 transition-all hover:bg-blue-500/10 hover:scale-[1.02] cursor-pointer shadow-lg shadow-blue-500/5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-blue-300 uppercase">AI-Driven Engine v2.5</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          <span className="text-xs text-gray-400 font-medium">Fully Automated Fuzzing</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
        </div>
        
        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-white">
          Securing Web Applications <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-200 to-gray-500">
            Powered by Gemini AI
          </span>
        </h1>
        
        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed font-normal">
          An advanced vulnerability scanner that actively crawling DOM structures, probes inputs for SQLi & XSS, and analyzes security postures dynamically with intelligent local summaries.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-24">
          <Link href="/scanner" className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-100 text-black rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10 hover:scale-[1.03] active:scale-[0.98]">
            Launch Free Scan
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/features" className="w-full sm:w-auto px-8 py-3.5 bg-[#0f0f0f] hover:bg-[#151515] border border-[#222] text-gray-300 hover:text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 hover:border-[#333] hover:scale-[1.03] active:scale-[0.98]">
            Explore Features
          </Link>
        </div>
        
        {/* High-Fidelity Interactive Dashboard Mockup */}
        <div className="w-full rounded-2xl border border-[#222] bg-[#0E0E0E]/90 shadow-3xl shadow-blue-500/5 overflow-hidden p-1 backdrop-blur-md relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/5 opacity-30 group-hover:opacity-40 transition-opacity pointer-events-none rounded-2xl" />
          
          <div className="rounded-xl overflow-hidden border border-[#1a1a1a] bg-[#0A0A0A]">
            
            {/* Mock Browser Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#181818] bg-[#0d0d0d]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]/20 border border-[#ef4444]/40"></div>
                <div className="w-3 h-3 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b]/40"></div>
                <div className="w-3 h-3 rounded-full bg-[#10b981]/20 border border-[#10b981]/40"></div>
              </div>
              <div className="bg-[#050505] border border-[#1c1c1c] rounded-lg px-6 py-1.5 text-xs text-gray-500 flex items-center gap-2 w-full max-w-sm mx-auto shadow-inner">
                <Shield className="w-3.5 h-3.5 text-blue-500" />
                <span className="truncate font-mono text-[10px] text-gray-400">vulnscan.ai/scanner?target=https://targetsite.com</span>
              </div>
              <div className="w-10"></div> {/* Spacer */}
            </div>

            {/* Mock Dashboard Content */}
            <div className="p-6 md:p-8 bg-[#070707] text-left space-y-6">
              
              {/* Upper stats widgets row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Score Widget */}
                <div className="bg-[#0E0E0E] border border-[#1c1c1c] rounded-xl p-4 flex items-center gap-4">
                  <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#181818" strokeWidth="4.5" fill="transparent" />
                      <circle cx="32" cy="32" r="28" stroke="#f59e0b" strokeWidth="4.5" fill="transparent" strokeDasharray={176} strokeDashoffset={176 - (35 / 100) * 176} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-bold text-white leading-none">35</span>
                      <span className="text-[8px] text-gray-500 mt-0.5">/100</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Overall Risk</h4>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 inline-block mt-1">Medium Risk</span>
                  </div>
                </div>

                {/* Vulnerability Counts Widget */}
                <div className="col-span-2 bg-[#0E0E0E] border border-[#1c1c1c] rounded-xl p-4 grid grid-cols-3 gap-2">
                  {[
                    { label: "High", count: "1", color: "text-red-500", bg: "bg-red-500/10 border-red-500/20" },
                    { label: "Medium", count: "1", color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20" },
                    { label: "Low", count: "0", color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" }
                  ].map((w, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center bg-[#070707] border border-[#161616] rounded-lg p-2">
                      <span className="text-xl font-bold text-white">{w.count}</span>
                      <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded border ${w.color} ${w.bg} mt-1`}>{w.label}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Lower results detail split layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Findings List (2/3 col) */}
                <div className="lg:col-span-2 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#1c1c1c]">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Security Findings</span>
                    <span className="text-[10px] text-gray-500 bg-[#0e0e0e] border border-[#1a1a1a] px-2 py-0.5 rounded">2 Active Flaws</span>
                  </div>

                  {/* Finding Item 1 */}
                  <div className="p-3.5 bg-[#0d0d0d] border border-red-500/10 rounded-lg hover:border-red-500/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-md">
                        <Code className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-xs font-semibold text-gray-200">Reflected Cross-Site Scripting (XSS)</h4>
                          <span className="text-[8px] font-bold text-red-500 uppercase">High</span>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1">Payload echoed back unescaped inside active search input field.</p>
                        <div className="bg-[#050505] p-2 rounded border border-[#161616] font-mono text-[9px] text-red-400 mt-2 overflow-x-auto">
                          <code>{"\"><svg/onload=console.log('vuln_scan_xss')>"}</code>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Finding Item 2 */}
                  <div className="p-3.5 bg-[#0d0d0d] border border-amber-500/10 rounded-lg hover:border-amber-500/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-md">
                        <Server className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-xs font-semibold text-gray-200">Inadequate Security Headers</h4>
                          <span className="text-[8px] font-bold text-amber-500 uppercase">Medium</span>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1">Missing critical protection configurations: Content-Security-Policy (CSP), Strict-Transport-Security (HSTS).</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* AI Executive Summary Card (1/3 col) */}
                <div className="bg-[#0e0e0e] border border-[#1c1c1c] rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#1c1c1c] mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">AI security synthesis</span>
                      <span className="text-[8px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">Medium Risk</span>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-relaxed">
                      The target demonstrates a moderate security exposure. A reflected XSS injection was confirmed on query parameter inputs, representing a direct vector for script hijack. 
                    </p>
                    <p className="text-[10px] text-gray-400 leading-relaxed mt-2">
                      Additionally, server header omissions weaken defenses against frame-embedding clickjacking.
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-[#1c1c1c] space-y-1">
                    <h5 className="text-[9px] uppercase tracking-wider font-bold text-gray-500">Key Fix</h5>
                    <div className="flex gap-2 text-[9px] text-gray-400">
                      <div className="w-1 h-1 rounded-full bg-blue-500 mt-1 shrink-0" />
                      <span>Implement HTML context encoding.</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

