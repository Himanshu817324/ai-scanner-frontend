import { Search, Zap, Shield, Server, Code, Activity, Sparkles } from 'lucide-react';

export default function Features() {
  return (
    <section className="relative py-28 px-6 border-t border-[#1c1c1c] bg-[#070707] overflow-hidden">
      
      {/* Background Accent Grid / Glows */}
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#111] border border-[#222] text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Engine Capabilities
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Audit & Inspect Safely
            </h2>
          </div>
          <p className="text-gray-400 max-w-lg text-base md:text-lg leading-relaxed">
            Everything you need to audit, inspect, and patch security issues in your web applications, built into a single responsive system.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Search, title: "Payload Injection", desc: "Test for vulnerabilities like SQLi and XSS using a set of dynamic, safe error-based payloads." },
            { icon: Zap, title: "Intelligent DOM Crawling", desc: "Optimized parsing extracts query parameters and form input tags from link targets automatically." },
            { icon: Shield, title: "Risk Grading Metrics", desc: "Automated scoring helps you prioritize which security weaknesses need immediate patching." },
            { icon: Server, title: "Directory Exposures", desc: "Scan and detect misconfigured file structures, admin routes, and sensitive configuration leaks." },
            { icon: Code, title: "Response Evidence", desc: "Inspect HTML snippets, matching headers, and parameters that triggered alerts." },
            { icon: Activity, title: "Exportable PDF Reports", desc: "Generate professional print-ready assessment reports for offline code submission and logs." },
          ].map((feature, idx) => (
            <div 
              key={idx} 
              className="p-8 rounded-2xl bg-[#0b0b0b] border border-[#161616] hover:border-blue-500/30 hover:bg-[#0e0e0e] hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#111] border border-[#222] group-hover:bg-blue-500/10 group-hover:border-blue-500/20 flex items-center justify-center mb-6 text-gray-400 group-hover:text-blue-400 transition-colors">
                <feature.icon className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 tracking-tight group-hover:text-blue-300 transition-colors">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-normal">{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

