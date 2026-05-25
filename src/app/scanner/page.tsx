"use client";

import React, { useState } from 'react';
import { Search, ShieldAlert, Shield, AlertTriangle, AlertCircle, Info, ChevronRight, ChevronDown, Activity, Database, Code, FolderOpen, Server, Lock, Zap, Sparkles } from 'lucide-react';

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
      <div className="print:hidden min-h-screen bg-[#0A0A0A] text-gray-100 p-6 md:p-10 font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative p-2.5 bg-[#111] rounded-xl border border-[#333] overflow-hidden">
              <Shield className="w-6 h-6 text-gray-300 relative z-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Scanner Dashboard
              </h1>
              <p className="text-sm text-gray-400 mt-1 font-medium">Identify vulnerabilities across your web applications</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#111] border border-[#222] rounded-md text-xs text-gray-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Ready
          </div>
        </header>

        {/* Input Section */}
        <section className="bg-[#111] border border-[#222] rounded-xl p-6 md:p-8 relative overflow-hidden shadow-lg">
          
          <form onSubmit={handleScan} className="relative z-10 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500 transition-colors" />
              </div>
              <input 
                type="url" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg py-3 pl-12 pr-4 text-base text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-all shadow-inner"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={isScanning || !url}
              className="px-6 py-3 bg-white hover:bg-gray-200 text-black rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
            >
              {isScanning ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  Run Scan
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </section>

        {/* Welcome Guide (Only shown before scanning starts) */}
        {!results && !isScanning && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 animate-fade-in">
            {/* Quickstart Card */}
            <div className="lg:col-span-2 bg-[#111] border border-[#222] rounded-xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
              
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#161616] border border-[#262626] text-xs font-semibold text-gray-400 mb-6 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                  Quickstart Guide
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight">Ready to Audit Your Application?</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                  VulnScan AI crawls target DOM layouts, extracts parameters from forms and anchors, and runs active fuzzer modules to identify structural and input configuration errors.
                </p>
                
                <div className="space-y-4 text-sm text-gray-400">
                  <div className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#1c1c1c] border border-[#2a2a2a] flex items-center justify-center text-xs font-bold text-gray-300 font-mono shrink-0 mt-0.5">1</div>
                    <span>Enter a valid URL above (e.g. your local sandbox endpoint or authorized academic domain).</span>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#1c1c1c] border border-[#2a2a2a] flex items-center justify-center text-xs font-bold text-gray-300 font-mono shrink-0 mt-0.5">2</div>
                    <span>Major platform URLs (like ChatGPT or Google) will instantly resolve a simulated security compliance posture to respect external scopes.</span>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#1c1c1c] border border-[#2a2a2a] flex items-center justify-center text-xs font-bold text-gray-300 font-mono shrink-0 mt-0.5">3</div>
                    <span>Click **Run Scan** and inspect the real-time pipeline status, the AI security analysis, and download the print-ready PDF blueprint.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fuzzed Vectors Status Card */}
            <div className="bg-[#111] border border-[#222] rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-purple-500/5 rounded-full blur-[60px] pointer-events-none" />
              
              <div>
                <h3 className="text-base font-bold text-white mb-6 border-b border-[#222] pb-3 uppercase tracking-wider text-gray-400">Scanning Targets</h3>
                <div className="space-y-4">
                  {[
                    { title: "SQL Injection", desc: "Checks form fields and queries using error-based logic.", icon: Database, color: "text-red-500 bg-red-500/10 border-red-500/20" },
                    { title: "Cross-Site Scripting", desc: "Injects svg/onload scripts to test output reflections.", icon: Code, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
                    { title: "Configuration Audits", desc: "Probes for missing secure CSP/HSTS/Frame-Options headers and exposed paths.", icon: Server, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3.5 items-start p-3 rounded-lg bg-[#0c0c0c] border border-[#161616]">
                      <div className={`p-2 rounded-md border ${item.color} shrink-0`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-300">{item.title}</h4>
                        <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isScanning && (
          <div className="flex flex-col items-center justify-center py-16 px-4 w-full max-w-2xl mx-auto">
            <div className="w-full space-y-6">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-blue-500 animate-pulse" />
                  <h3 className="text-lg font-medium text-white">{scanStep || "Analyzing target..."}</h3>
                </div>
                <span className="text-blue-500 font-mono text-xl font-bold">{Math.round(scanProgress)}%</span>
              </div>
              
              <div className="h-2 bg-[#222] rounded-full overflow-hidden relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${scanProgress}%` }}
                >
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results State */}
        {results && !isScanning && (
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Risk Score Card */}
              <div className="bg-[#111] border border-[#222] rounded-xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[220px]">
                
                <h3 className="text-gray-400 text-xs font-semibold mb-6 uppercase tracking-wider w-full text-left">Overall Risk Score</h3>
                
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="72" cy="72" r="62" 
                      stroke="#222" 
                      strokeWidth="10" fill="transparent" 
                    />
                    <circle 
                      cx="72" cy="72" r="62" 
                      stroke={results.riskScore > 70 ? '#ef4444' : results.riskScore > 40 ? '#f59e0b' : '#3b82f6'} 
                      strokeWidth="10" fill="transparent" 
                      strokeDasharray={390} 
                      strokeDashoffset={390 - (results.riskScore / 100) * 390}
                      className="transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">{results.riskScore}</span>
                    <span className="text-xs text-gray-500 mt-1">/ 100</span>
                  </div>
                </div>

                <div className={`mt-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium ${
                  results.riskScore > 70 ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                  results.riskScore > 40 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                }`}>
                  {results.riskScore > 40 ? <ShieldAlert className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
                  <span>
                    {results.riskScore > 70 ? 'Critical Risk' : results.riskScore > 40 ? 'Medium Risk' : 'Low Risk'}
                  </span>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                 {[
                   { label: 'High Severity', count: highCount, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-[#0A0A0A]', border: 'border-[#222]' },
                   { label: 'Medium Severity', count: mediumCount, icon: AlertCircle, color: 'text-amber-500', bg: 'bg-[#0A0A0A]', border: 'border-[#222]' },
                   { label: 'Low Severity', count: lowCount, icon: Info, color: 'text-blue-500', bg: 'bg-[#0A0A0A]', border: 'border-[#222]' },
                 ].map((stat, i) => (
                    <div key={i} className="bg-[#111] border border-[#222] rounded-xl p-5 flex flex-col relative overflow-hidden">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-2.5 rounded-md border ${stat.bg} ${stat.border}`}>
                          <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">{stat.count}</div>
                      <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                    </div>
                 ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Vulnerability List */}
              <div className="lg:col-span-2 bg-[#111] border border-[#222] rounded-xl overflow-hidden flex flex-col">
                <div className="px-6 py-5 border-b border-[#222] flex items-center justify-between">
                  <h3 className="text-base font-semibold text-white">
                    Vulnerabilities Found
                  </h3>
                  <span className="text-xs bg-[#222] px-2.5 py-1 rounded-md text-gray-400">{results.vulnerabilities?.length || 0} Total</span>
                </div>
                <div className="p-4 space-y-2">
                  {results.vulnerabilities?.length > 0 ? (
                    results.vulnerabilities.map((vuln: any, i: number) => {
                      const isExpanded = expandedVuln === i;
                      return (
                      <div key={i} onClick={() => toggleVuln(i)} className={`p-4 rounded-lg transition-colors cursor-pointer border ${isExpanded ? 'bg-[#1a1a1a] border-[#333]' : 'border-transparent hover:bg-[#1a1a1a]'}`}>
                        <div className="flex items-start gap-4">
                          <div className={`mt-0.5 rounded-md p-2 border ${
                            vuln.severity === 'Critical' || vuln.severity === 'High' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                            vuln.severity === 'Medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                            'bg-blue-500/10 text-blue-500 border-blue-500/20'
                          } `}>
                             {getVulnIcon(vuln.title, vuln.severity)}
                          </div>
                          <div className="flex-1">
                             <div className="flex items-center justify-between">
                               <h4 className="text-gray-200 font-medium text-sm capitalize">{vuln.title}</h4>
                               <div className="bg-[#222] p-1 rounded">
                                 {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-500" />}
                               </div>
                             </div>
                             
                             {!isExpanded ? (
                               <div className="flex items-center gap-3 mt-1.5">
                                 <span className="text-xs text-gray-500 font-medium">{vuln.severity}</span>
                                 <div className="w-1 h-1 rounded-full bg-[#333]"></div>
                                 <span className="text-xs text-gray-500 line-clamp-1 flex-1">{vuln.description}</span>
                               </div>
                             ) : (
                               <div className="mt-3 text-sm text-gray-400">
                                 <p className="mb-3 leading-relaxed">{vuln.description}</p>
                                 {vuln.evidence && (
                                   <div className="bg-[#0A0A0A] p-3 rounded border border-[#222] font-mono text-xs overflow-x-auto text-red-400">
                                     <code>{vuln.evidence}</code>
                                   </div>
                                 )}
                               </div>
                             )}
                          </div>
                        </div>
                      </div>
                    )})
                  ) : (
                    <div className="p-10 text-center text-gray-500 text-sm">No vulnerabilities detected.</div>
                  )}
                </div>
              </div>

              {/* AI Report Card */}
              <div className="bg-[#111] border border-[#222] rounded-xl p-6 flex flex-col h-full">
                
                {results.aiAnalysis ? (
                  <>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-gray-400" />
                        <h3 className="text-base font-semibold text-white">
                          AI Summary
                        </h3>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded bg-[#0A0A0A] border ${
                        results.aiAnalysis.riskLevel === 'Critical' || results.aiAnalysis.riskLevel === 'High' ? 'text-red-500 border-[#222]' :
                        results.aiAnalysis.riskLevel === 'Medium' ? 'text-amber-500 border-[#222]' : 'text-blue-500 border-[#222]'
                      }`}>
                        {results.aiAnalysis.riskLevel}
                      </span>
                    </div>
                    
                    <div className="space-y-5 text-sm text-gray-400 leading-relaxed flex-1 overflow-y-auto">
                      <p className="text-gray-300">
                        {results.aiAnalysis.explanation}
                      </p>

                      <div>
                        <h4 className="text-white font-medium mb-1 text-xs uppercase tracking-wider">Real-World Impact</h4>
                        <p>{results.aiAnalysis.impact}</p>
                      </div>
                      
                      {results.aiAnalysis.suggestedFixes?.length > 0 && (
                        <div className="mt-2">
                          <h4 className="text-white font-medium mb-2 text-xs uppercase tracking-wider">Suggested Fixes</h4>
                          <ul className="space-y-2">
                            {results.aiAnalysis.suggestedFixes.map((fix: string, idx: number) => (
                              <li key={idx} className="flex gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#444] mt-1.5 flex-shrink-0" /> 
                                <span>{fix}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <Shield className="w-8 h-8 text-[#333] mb-3" />
                    <p className="text-gray-500 text-sm">AI Analysis unavailable.</p>
                  </div>
                )}

                <div className="mt-5 pt-5 border-t border-[#222] shrink-0">
                  <button onClick={() => window.print()} className="w-full py-2.5 bg-[#0A0A0A] hover:bg-[#1a1a1a] text-gray-300 text-sm font-medium rounded-lg transition-colors border border-[#222] flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Download PDF Report
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
                <div className={`text-5xl font-bold my-2 ${
                  results.riskScore > 70 ? 'text-red-600' :
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
                      <span className={`px-2 py-1 text-xs font-bold rounded ${
                        vuln.severity === 'Critical' || vuln.severity === 'High' ? 'bg-red-100 text-red-800' : 
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
