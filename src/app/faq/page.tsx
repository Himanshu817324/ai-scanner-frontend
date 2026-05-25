"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      category: "General",
      items: [
        { q: "What is VulnScan AI?", a: "VulnScan AI is a modern web vulnerability scanner that actively probes your web applications for security flaws, categorizes them by risk, and uses Gemini AI to provide actionable remediation steps." },
        { q: "Is there a cost to use the scanner?", a: "Currently, VulnScan AI is a free project built for demonstration purposes. It utilizes the free tiers of APIs like Gemini for AI analysis." }
      ]
    },
    {
      category: "Security & Safety",
      items: [
        { q: "Can I use this on production environments?", a: "While the payloads are designed to be non-destructive, active scanning always carries a risk of unintended side-effects. We strongly recommend using this tool only in staging, local, or explicitly authorized environments." },
        { q: "Are my scan results stored?", a: "Scan results are processed in real-time. Depending on the backend configuration, results may be temporarily stored in a database for report generation, but we do not track or sell vulnerability data." }
      ]
    },
    {
      category: "Technical Capabilities",
      items: [
        { q: "What types of vulnerabilities does it detect?", a: "The tool tests for a subset of the OWASP Top 10, specifically focusing on Injection flaws (SQLi), Cross-Site Scripting (XSS), Security Misconfigurations (Headers, CORS), and Directory Exposures." },
        { q: "How are false positives handled?", a: "We utilize deep heuristic checks combined with AI-assisted analysis to verify the context of a vulnerability. If an anomaly is found, the AI cross-references it with known safe behaviors to significantly reduce the noise of false positives." },
        { q: "Do I need to install agents on my server?", a: "No. VulnScan AI operates externally. As long as the target URL is accessible over the internet or your local network, the scanner can probe it." }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  let flatIndex = -1;

  return (
    <div className="relative bg-[#0A0A0A] min-h-screen selection:bg-blue-500/30 pt-32 pb-24 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">How can we help?</h1>
          <p className="text-xl text-gray-400 mb-8">Search our knowledge base or browse frequently asked questions below.</p>
          
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input 
              type="text" 
              placeholder="Search for answers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111] border border-[#333] rounded-xl py-4 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
            />
          </div>
        </div>

        {filteredFaqs.length > 0 ? (
          <div className="space-y-12">
            {filteredFaqs.map((category, catIdx) => (
              <div key={catIdx}>
                <h3 className="text-lg font-semibold text-white mb-4 border-b border-[#222] pb-2">{category.category}</h3>
                <div className="space-y-3">
                  {category.items.map((faq, itemIdx) => {
                    flatIndex++;
                    const currentIndex = flatIndex;
                    const isOpen = openIndex === currentIndex;
                    
                    return (
                      <div 
                        key={itemIdx} 
                        className={`border border-[#222] rounded-xl overflow-hidden transition-colors ${isOpen ? 'bg-[#111] border-[#444]' : 'bg-[#0A0A0A] hover:border-[#333]'}`}
                      >
                        <button 
                          onClick={() => setOpenIndex(isOpen ? null : currentIndex)}
                          className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                        >
                          <span className="font-medium text-gray-200">{faq.q}</span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
                          )}
                        </button>
                        
                        <div 
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          <div className="p-5 pt-0 text-gray-400 text-sm leading-relaxed border-t border-[#222]/50">
                            {faq.a}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#111] border border-[#222] rounded-xl">
            <MessageCircle className="w-10 h-10 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No results found</h3>
            <p className="text-gray-400">We couldn't find any FAQs matching "{searchQuery}".</p>
          </div>
        )}

        <div className="mt-20 p-8 rounded-xl bg-gradient-to-br from-[#111] to-[#0A0A0A] border border-[#333] text-center">
          <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-gray-400 mb-6">Can't find the answer you're looking for? Check out the scanner dashboard or view the project documentation.</p>
          <Link href="/scanner" className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-200 text-black rounded-lg font-medium transition-colors">
            Try the Scanner
          </Link>
        </div>
      </div>
    </div>
  );
}
