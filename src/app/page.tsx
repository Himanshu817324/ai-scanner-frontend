"use client";

import React, { useState } from 'react';
import { Search, ShieldAlert, Shield, AlertTriangle, AlertCircle, Info, ChevronRight, ChevronDown, Activity, Database, Code, FolderOpen, Server, Lock, Zap } from 'lucide-react';

export default function Dashboard() {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState("");
  const [scanStep, setScanStep] = useState("");
  const [scanProgress, setScanProgress] = useState(0);
  const [expandedVuln, setExpandedVuln] = useState<number | null>(null);

  const toggleVuln = (index: number) => {
    setExpandedVuln(expandedVuln === index ? null : index);
  };

  const getVulnIcon = (title: string, severity: string) => {
    const t = title.toLowerCase();
    if (t.includes('sql')) return <Database className="w-5 h-5" />;
    if (t.includes('xss') || t.includes('scripting') || t.includes('cross-site')) return <Code className="w-5 h-5" />;
    if (t.includes('directory') || t.includes('exposure') || t.includes('file')) return <FolderOpen className="w-5 h-5" />;
    if (t.includes('header') || t.includes('misconfiguration')) return <Server className="w-5 h-5" />;
    if (t.includes('cookie') || t.includes('auth')) return <Lock className="w-5 h-5" />;

    if (severity === 'Critical' || severity === 'High') return <AlertTriangle className="w-5 h-5" />;
    if (severity === 'Medium') return <AlertCircle className="w-5 h-5" />;
    return <Info className="w-5 h-5" />;
  };

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsScanning(true);
    setResults(null);
    setError("");
    setScanProgress(0);
    setScanStep("Initializing connection...");
    setExpandedVuln(null);

    const steps = [
      "Analyzing target URL...",
      "Resolving DNS & verifying connectivity...",
      "Checking SQL Injection vulnerabilities...",
      "Testing for Cross-Site Scripting (XSS)...",
      "Analyzing security headers...",
      "Looking for directory exposures...",
      "Consolidating findings...",
      "Running AI analysis with Gemini...",
      "Generating final report..."
    ];

    let currentStepIndex = 0;
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        const next = prev + (Math.random() * 8 + 2);
        return next >= 95 ? 95 : next;
      });

      currentStepIndex = Math.min(currentStepIndex + 1, steps.length - 1);
      setScanStep(steps[currentStepIndex]);
    }, 1500);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        throw new Error("Failed to scan URL");
      }

      const data = await res.json();

      clearInterval(progressInterval);
      setScanProgress(100);
      setScanStep("Scan complete! Rendering results...");

      setTimeout(() => {
        setResults(data);
        setIsScanning(false);
      }, 500);
    } catch (err: any) {
      clearInterval(progressInterval);
      setError(err.message || "An error occurred during scan");
      setIsScanning(false);
      setScanProgress(0);
    }
  };

  const highCount = results?.vulnerabilities?.filter((v: any) => v.severity === 'High' || v.severity === 'Critical').length || 0;
  const mediumCount = results?.vulnerabilities?.filter((v: any) => v.severity === 'Medium').length || 0;
  const lowCount = results?.vulnerabilities?.filter((v: any) => v.severity === 'Low').length || 0;

  return (
    <>
      <div className="print:hidden min-h-screen bg-[#050505] text-gray-100 p-6 md:p-10 font-sans selection:bg-cyan-500/30 overflow-x-hidden relative">
        {/* Ambient Background Effects */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opactiy='0.5'/%3E%3C/svg%3E&quot;)] opacity-[0.04] pointer-events-none z-0 mix-blend-overlay"></div>

        <div className="max-w-6xl mx-auto space-y-10 relative z-10">

          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in-up">
            <div className="flex items-center gap-5">
              <div className="relative p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Shield className="w-8 h-8 text-white relative z-10" />
              </div>
              <div>
                <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight">
                  Vuln<span className="text-cyan-400">Scan</span> AI
                </h1>
                <p className="text-sm text-gray-400 mt-1 font-medium tracking-wide">Next-Generation Security Analysis Engine</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full text-xs text-gray-400 font-medium tracking-wider backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              SYSTEM ONLINE
            </div>
          </header>

          {/* Input Section */}
          <section className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 relative overflow-hidden shadow-2xl">

            <form onSubmit={handleScan} className="relative z-10 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-500 group-focus-within:text-white transition-colors" />
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-lg text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all shadow-inner"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isScanning || !url}
                className="px-8 py-4 bg-white hover:bg-gray-200 text-black rounded-2xl font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[200px]"
              >
                {isScanning ? (
                  <>
                    <Activity className="w-5 h-5 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    Run Scan
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </section>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center animate-in fade-in zoom-in duration-300">
              {error}
            </div>
          )}

          {/* Loading State */}
          {isScanning && (
            <div className="flex flex-col items-center justify-center py-20 px-4 animate-in fade-in zoom-in duration-500 w-full max-w-2xl mx-auto">
              <div className="w-full space-y-8">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
                    <h3 className="text-xl font-medium text-white">{scanStep || "Analyzing target..."}</h3>
                  </div>
                  <span className="text-cyan-400 font-mono text-2xl font-bold">{Math.round(scanProgress)}%</span>
                </div>

                <div className="h-1 bg-white/10 rounded-full overflow-hidden relative">
                  <div
                    className="absolute top-0 left-0 h-full bg-cyan-400 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                    style={{ width: `${scanProgress}%` }}
                  >
                  </div>
                </div>

                <div className="relative h-px w-full overflow-hidden opacity-50 bg-white/5">
                  <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" style={{ animation: "scanLine 2s linear infinite" }} />
                </div>
                <style jsx>{`
                @keyframes shimmer {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(100%); }
                }
                @keyframes scanLine {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(100vw); }
                }
              `}</style>
              </div>
            </div>
          )}

          {/* Results State */}
          {results && !isScanning && (
            <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Risk Score Card */}
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden flex flex-col items-center justify-center min-h-[250px]">
                  <div className="absolute -right-6 -bottom-6 opacity-5 pointer-events-none">
                    <ShieldAlert className="w-64 h-64" />
                  </div>

                  <h3 className="text-gray-400 text-sm font-medium mb-6 uppercase tracking-wider w-full text-left">Overall Risk Score</h3>

                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="80" cy="80" r="70"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="12" fill="transparent"
                      />
                      <circle
                        cx="80" cy="80" r="70"
                        stroke="url(#riskGradient)"
                        strokeWidth="12" fill="transparent"
                        strokeDasharray={440}
                        strokeDashoffset={440 - (results.riskScore / 100) * 440}
                        className="transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={results.riskScore > 70 ? '#f43f5e' : results.riskScore > 40 ? '#fbbf24' : '#22d3ee'} />
                          <stop offset="100%" stopColor={results.riskScore > 70 ? '#e11d48' : results.riskScore > 40 ? '#f59e0b' : '#06b6d4'} />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold text-white tracking-tight">{results.riskScore}</span>
                      <span className="text-sm text-gray-500">/ 100</span>
                    </div>
                  </div>

                  <div className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${results.riskScore > 70 ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                    results.riskScore > 40 ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                    }`}>
                    {results.riskScore > 40 ? <ShieldAlert className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                    <span className="text-sm font-semibold">
                      {results.riskScore > 70 ? 'Critical Risk' : results.riskScore > 40 ? 'Medium Risk' : 'Low Risk'}
                    </span>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'High Severity', count: highCount, icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/20' },
                    { label: 'Medium Severity', count: mediumCount, icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
                    { label: 'Low Severity', count: lowCount, icon: Info, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-center text-center relative overflow-hidden">
                      <div className={`mx-auto p-4 rounded-2xl mb-4 border ${stat.bg} ${stat.border}`}>
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">{stat.count}</div>
                      <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Vulnerability List */}
                <div className="lg:col-span-2 bg-white/[0.02] border border-white/[0.05] rounded-3xl backdrop-blur-xl overflow-hidden flex flex-col">
                  <div className="p-8 border-b border-white/[0.05] flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      Vulnerabilities Found
                    </h3>
                    <span className="text-xs bg-white/5 px-3 py-1 rounded-full text-gray-400 border border-white/10">{results.vulnerabilities?.length || 0} Total</span>
                  </div>
                  <div className="p-4 space-y-2">
                    {results.vulnerabilities?.length > 0 ? (
                      results.vulnerabilities.map((vuln: any, i: number) => {
                        const isExpanded = expandedVuln === i;
                        return (
                          <div key={i} onClick={() => toggleVuln(i)} className={`p-4 sm:p-5 rounded-2xl transition-all cursor-pointer border group ${isExpanded ? 'bg-white/[0.04] border-white/10' : 'border-transparent hover:bg-white/[0.04] hover:border-white/[0.05]'}`}>
                            <div className="flex items-start sm:items-center gap-4">
                              <div className={`mt-0.5 sm:mt-0 rounded-xl p-2.5 ${vuln.severity === 'Critical' || vuln.severity === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                vuln.severity === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                  'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                } `}>
                                {getVulnIcon(vuln.title, vuln.severity)}
                              </div>
                              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                                <div>
                                  <h4 className="text-gray-200 font-medium group-hover:text-white transition-colors capitalize">{vuln.title}</h4>
                                  <div className="flex items-center gap-3 mt-2">
                                    <span className="text-xs text-gray-500 font-medium">{vuln.severity} Severity</span>
                                    {!isExpanded && (
                                      <>
                                        <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                                        <span className="text-xs text-gray-400 line-clamp-1 flex-1 max-w-[200px] sm:max-w-xs">{vuln.description}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="bg-white/5 p-2 rounded-full">
                                    {isExpanded ? <ChevronDown className="w-4 h-4 text-white" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {isExpanded && (
                              <div className="mt-4 pt-4 border-t border-white/10 text-sm text-gray-300">
                                <p className="mb-2 leading-relaxed text-gray-400">{vuln.description}</p>
                                {vuln.evidence && (
                                  <div className="bg-black/30 p-3 rounded-lg border border-white/5 font-mono text-xs overflow-x-auto text-rose-300 mt-3">
                                    <code>{vuln.evidence}</code>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      })
                    ) : (
                      <div className="p-10 text-center text-gray-500">No vulnerabilities detected. Excellent!</div>
                    )}
                  </div>
                </div>

                {/* AI Report Card */}
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 relative overflow-hidden flex flex-col">

                  {results.aiAnalysis ? (
                    <>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10">
                          <div className="absolute w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            AI Summary
                          </h3>
                          <span className={`text-xs font-semibold ${results.aiAnalysis.riskLevel === 'Critical' || results.aiAnalysis.riskLevel === 'High' ? 'text-rose-400' :
                            results.aiAnalysis.riskLevel === 'Medium' ? 'text-amber-400' : 'text-cyan-400'
                            }`}>
                            {results.aiAnalysis.riskLevel} Risk
                          </span>
                        </div>
                      </div>

                      <div className="space-y-6 text-sm text-gray-300 leading-relaxed font-light flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <p className="text-gray-300 text-base">
                          {results.aiAnalysis.explanation}
                        </p>

                        <div>
                          <h4 className="text-white font-medium mb-1 text-sm">Real-World Impact</h4>
                          <p className="text-gray-400 text-sm">{results.aiAnalysis.impact}</p>
                        </div>

                        {results.aiAnalysis.suggestedFixes?.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-white font-medium mb-3 uppercase tracking-wider text-xs">Suggested Fixes</h4>
                            <ul className="space-y-3">
                              {results.aiAnalysis.suggestedFixes.map((fix: string, idx: number) => (
                                <li key={idx} className="flex gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0" />
                                  <span className="text-gray-400 text-sm">{fix}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <Shield className="w-12 h-12 text-gray-600 mb-4" />
                      <p className="text-gray-500">AI Analysis not available.</p>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-4 shrink-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Powered by</span>
                      <span className="text-xs font-semibold text-white">Gemini AI Engine</span>
                    </div>
                    <button onClick={() => window.print()} className="w-full py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-xl transition-colors border border-white/10 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      Download Full Report PDF
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* Printable Report (Only visible when printing) */}
      {results && (
        <div className="hidden print:block text-black bg-white min-h-screen p-8 text-sm">
          <div className="border-b-2 border-gray-800 pb-4 mb-6">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 border-none m-0 p-0">Security Assessment Report</h1>
                <p className="text-gray-600 mt-1">Generated by AntiGravity AI Engine</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">Target: {url}</p>
                <p className="text-gray-500 text-xs">Date: {new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="mb-8 flex gap-6">
            <div className="w-1/3">
              <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">Risk Overview</h2>
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
                <div className="text-sm font-medium text-gray-500 uppercase">Overall Risk Score</div>
                <div className={`text-5xl font-bold my-2 ${results.riskScore > 70 ? 'text-red-600' :
                  results.riskScore > 40 ? 'text-orange-500' : 'text-blue-600'
                  }`}>
                  {results.riskScore}
                </div>
                <div className="text-sm font-bold block mt-2">
                  {results.riskScore > 70 ? 'Critical Risk' : results.riskScore > 40 ? 'Medium Risk' : 'Low Risk'}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between border-b pb-1"><span>High Severity:</span> <span className="font-bold text-red-600">{highCount}</span></div>
                <div className="flex justify-between border-b pb-1"><span>Medium Severity:</span> <span className="font-bold text-orange-500">{mediumCount}</span></div>
                <div className="flex justify-between border-b pb-1"><span>Low Severity:</span> <span className="font-bold text-blue-600">{lowCount}</span></div>
              </div>
            </div>

            <div className="w-2/3">
              <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">AI Analysis & Summary</h2>
              <div className="prose prose-sm text-gray-800 max-w-none">
                <p className="font-medium text-gray-900 mb-2">Risk Level: {results.aiAnalysis?.riskLevel || "N/A"}</p>
                <p className="whitespace-pre-line leading-relaxed mb-4">{results.aiAnalysis?.explanation || "No AI explanation available."}</p>
                <div className="bg-gray-50 border-l-4 border-gray-800 p-3 mt-4">
                  <h4 className="font-bold text-gray-900 m-0">Real-World Impact</h4>
                  <p className="m-0 text-gray-700 mt-1">{results.aiAnalysis?.impact || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vulnerabilities Detail */}
          <div className="mb-6">
            <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">Identified Vulnerabilities</h2>
            {results.vulnerabilities?.length > 0 ? (
              <div className="space-y-4">
                {results.vulnerabilities.map((vuln: any, i: number) => (
                  <div key={i} className="border border-gray-200 rounded p-4 break-inside-avoid">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg m-0">{vuln.title}</h3>
                      <span className={`px-2 py-1 text-xs font-bold rounded ${vuln.severity === 'Critical' || vuln.severity === 'High' ? 'bg-red-100 text-red-800' :
                        vuln.severity === 'Medium' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                        {vuln.severity}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{vuln.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic">No vulnerabilities found.</p>
            )}
          </div>

          {/* Recommendations */}
          <div className="break-inside-avoid">
            <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">Recommendations & Remediation</h2>
            {results.aiAnalysis?.suggestedFixes?.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2 text-gray-800">
                {results.aiAnalysis.suggestedFixes.map((fix: string, idx: number) => (
                  <li key={idx} className="leading-relaxed">{fix}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 italic">No specific recommendations provided.</p>
            )}
          </div>

          <div className="mt-12 text-center text-xs text-gray-400 border-t pt-4">
            End of the Report - Generated by AI Vulnerability Scanner
          </div>
        </div>
      )}
    </>
  );
}
