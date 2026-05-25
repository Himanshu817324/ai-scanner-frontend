import { Search, Zap, Shield, Server, Code, Activity, Layers, Lock, FileText, CheckCircle2, Globe, Terminal, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function FeaturesPage() {
  return (
    <div className="relative bg-[#0A0A0A] min-h-screen selection:bg-blue-500/30 pt-32 pb-24 px-6 overflow-hidden">
      
      {/* Background Spotlight Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-28 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/5 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-6 uppercase tracking-wider shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            Security Core
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-none">
            Comprehensive Audit Features
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-normal">
            Explore the advanced multi-threaded fuzzing and automated threat assessment tools built into VulnScan AI.
          </p>
        </div>

        <div className="space-y-40">
          
          {/* Feature 1: Engine */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-md">
                <Zap className="w-5.5 h-5.5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Concurrent Scanning Engine</h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                Time is critical when auditing software. Our engine utilizes asynchronous requests and concurrent processing to scan multiple parameters and directory structures simultaneously without overloading the target host.
              </p>
              <ul className="space-y-3.5 text-gray-300 font-medium text-sm">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div> 
                  <span>Optimized Node.js backend using non-blocking I/O</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div> 
                  <span>Automatic DNS resolution and network timeouts (2000ms - 8000ms)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div> 
                  <span>Parallel payload injection across up to 5 parameters simultaneously</span>
                </li>
              </ul>
            </div>
            
            {/* High-Fidelity Scanning Thread Mockup */}
            <div className="flex-1 w-full">
              <div className="w-full rounded-2xl border border-[#222] bg-[#0E0E0E] p-1.5 shadow-2xl relative">
                <div className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-lg pointer-events-none" />
                <div className="rounded-xl overflow-hidden border border-[#1c1c1c] bg-[#070707] p-5 space-y-4">
                  
                  {/* Console Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#161616]">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
                      <Terminal className="w-3.5 h-3.5 text-blue-500" />
                      <span>Fuzzer Pipeline Status</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-semibold font-mono animate-pulse">
                      Active
                    </span>
                  </div>

                  {/* Thread List */}
                  <div className="space-y-3">
                    {[
                      { method: "GET", path: "/api/products?id=1'", status: "fuzzing SQLi", progress: 78, speed: "34ms", color: "from-blue-500 to-indigo-500" },
                      { method: "GET", path: "/search?q=\"><svg/onload=...>", status: "fuzzing XSS", progress: 42, speed: "81ms", color: "from-purple-500 to-pink-500" },
                      { method: "HEAD", path: "/.env", status: "checking directories", progress: 95, speed: "12ms", color: "from-emerald-500 to-teal-500" },
                    ].map((thread, idx) => (
                      <div key={idx} className="bg-[#0b0b0b] border border-[#161616] rounded-xl p-3.5 space-y-2">
                        <div className="flex justify-between items-center text-[10px]">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-400 font-mono">{thread.method}</span>
                            <span className="text-gray-500 truncate max-w-[180px] font-mono text-[9px]">{thread.path}</span>
                          </div>
                          <span className="text-[9px] text-gray-500 font-mono">{thread.speed}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 bg-[#1a1a1a] rounded-full flex-1 overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${thread.color} rounded-full`}
                              style={{ width: `${thread.progress}%` }}
                            />
                          </div>
                          <span className="text-[9px] font-mono text-gray-400 w-10 text-right">{thread.progress}%</span>
                        </div>
                        <div className="text-[9px] text-gray-500 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-ping"></span>
                          <span className="font-mono text-gray-400">{thread.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: AI */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-md">
                <Shield className="w-5.5 h-5.5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">AI-Powered Threat Evaluation</h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                Raw data is often noisy. We integrate with Gemini models to act as your virtual security analyst. It reviews active fuzzed vulnerabilities, checks context, and generates detailed descriptions, business impacts, and suggested fixes in structured JSON formats.
              </p>
              <ul className="space-y-3.5 text-gray-300 font-medium text-sm">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"></div>
                  <span>Automated threat grading and risk classification</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"></div>
                  <span>Detailed business and technical impact assessments</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"></div>
                  <span>Remediation blueprints containing secure coding examples</span>
                </li>
              </ul>
            </div>
            
            {/* High-Fidelity AI Report Mockup */}
            <div className="flex-1 w-full">
              <div className="w-full rounded-2xl border border-[#222] bg-[#0E0E0E] p-1.5 shadow-2xl relative">
                <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl blur-lg pointer-events-none" />
                <div className="rounded-xl overflow-hidden border border-[#1c1c1c] bg-[#070707] p-5 space-y-4">
                  
                  {/* Title Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#161616]">
                    <div className="flex items-center gap-2 text-[11px] text-gray-400">
                      <Shield className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="font-bold">AI Threat Analyst Panel</span>
                    </div>
                    <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-mono">
                      Gemini 2.5-Flash
                    </span>
                  </div>

                  {/* Threat Findings */}
                  <div className="space-y-3 text-xs">
                    
                    {/* Findings Card */}
                    <div className="p-3.5 bg-[#0b0b0b] border border-[#161616] rounded-xl space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500" />
                          <h4 className="font-bold text-gray-200">Critical SQL Injection Found</h4>
                        </div>
                        <span className="text-[9px] text-gray-500 font-mono">Severity: Critical</span>
                      </div>
                      
                      {/* Code trigger */}
                      <div className="bg-[#050505] p-2 rounded border border-[#121212] font-mono text-[9px] text-red-400 overflow-x-auto">
                        <code>{"SELECT * FROM users WHERE id = '1''"}</code>
                      </div>
                    </div>

                    {/* AI Assessment Panel */}
                    <div className="p-3.5 bg-[#0d0d0d] border border-emerald-500/15 rounded-xl space-y-3">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[10px] uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Summary Summary
                      </div>
                      
                      <p className="text-[10px] text-gray-400 leading-relaxed font-normal">
                        Input sanitization is absent on parameters, exposing the database to direct arbitrary query injection. An attacker could bypass application authentication logic to retrieve sensitive credentials.
                      </p>

                      <div className="space-y-1.5 border-t border-[#1a1a1a] pt-3">
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Suggested Fix</span>
                        <div className="flex items-start gap-2 text-[9px] text-gray-400 leading-normal">
                          <CheckCircle2 className="w-3 h-3 text-blue-500 mt-0.5 shrink-0" />
                          <span>Bind input using parameterized queries or prepared queries instead of SQL string concatenations.</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* All Features Grid */}
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-12 text-center tracking-tight">Full Scanning Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Search, title: "SQL Injection (SQLi)", desc: "Error-based and query parameters SQLi detection across URL query parameters and forms." },
                { icon: Code, title: "Cross-Site Scripting (XSS)", desc: "Reflected XSS testing utilizing context-aware event payloads to verify reflecting HTML." },
                { icon: Server, title: "Directory Exposures", desc: "Checks for sensitive configuration leaks including exposed .git, .env, and backend config files." },
                { icon: Lock, title: "HTTP Security Headers", desc: "Checks for the presence and configurations of vital defense headers like CSP, HSTS, and XSS protectors." },
                { icon: Layers, title: "CORS Misconfigurations", desc: "Scans backend CORS settings to detect permissive origins that leak API contents." },
                { icon: FileText, title: "Executive Report Exports", desc: "Export fuzzed findings and remediation recommendations into clean, structured printable PDF summaries." },
              ].map((feature, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-[#0b0b0b] border border-[#161616] hover:border-[#222] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#111] border border-[#1c1c1c] flex items-center justify-center mb-5 text-gray-400">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-normal">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        <div className="mt-36 text-center">
          <Link 
            href="/scanner" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-black rounded-lg font-bold transition-all text-base shadow-lg shadow-white/5 hover:scale-[1.03] active:scale-[0.98]"
          >
            Launch Vulnerability Scanner
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

