import { HelpCircle, Shield, Play } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="relative py-28 px-6 border-t border-[#1c1c1c] bg-[#070707]">
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 text-center max-w-xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#111] border border-[#222] text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wider">
            Assessment Flow
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-gray-400 mt-4 text-base md:text-lg">
            A secure, automated pipeline built for simple and fast security reviews.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-blue-500/10 via-blue-500/40 to-indigo-500/10 z-0" />

          {[
            { step: "01", title: "Target Analysis", desc: "Enter your URL. The engine crawls standard anchor directories and crawls DOM layouts to mapping parameters.", icon: HelpCircle },
            { step: "02", title: "Fuzzing Execution", desc: "Our engine executes active, safe probing payloads against discovered form inputs and query variables.", icon: Play },
            { step: "03", title: "AI Remediation", desc: "Analyze dynamic findings, review generated risk classifications, and export actionable PDF remediation blueprints.", icon: Shield }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="relative flex flex-col p-8 rounded-2xl border border-[#161616] bg-[#0b0b0b] hover:border-blue-500/20 hover:bg-[#0d0d0d] transition-all duration-300 z-10 group"
            >
              {/* Step indicator */}
              <div className="w-11 h-11 rounded-full bg-[#111] border border-[#222] text-gray-400 group-hover:text-blue-400 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 flex items-center justify-center text-xs font-bold font-mono mb-6 transition-all shadow-md group-hover:scale-105">
                {item.step}
              </div>
              
              <h3 className="text-lg font-bold text-white mb-3 tracking-tight group-hover:text-blue-200 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

