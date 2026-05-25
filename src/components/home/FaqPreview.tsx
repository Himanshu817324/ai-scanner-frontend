import Link from 'next/link';
import { Check } from 'lucide-react';

export default function FaqPreview() {
  return (
    <section className="py-24 px-6 border-t border-[#222] bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-lg">Quick answers to common questions about VulnScan AI.</p>
          </div>
          <Link href="/faq" className="text-sm text-gray-300 hover:text-white transition-colors border-b border-gray-600 pb-1">
            View all FAQs
          </Link>
        </div>
        
        <div className="grid gap-6">
          {[
            { q: "Can I use this on production environments?", a: "While the payloads are designed to be non-destructive, active scanning always carries a risk of unintended side-effects. We recommend using this tool only in staging or local environments." },
            { q: "What is covered in the scan?", a: "The tool tests for a subset of the OWASP Top 10, specifically focusing on Injection flaws, Cross-Site Scripting, and Security Misconfigurations." }
          ].map((faq, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-[#222] bg-[#111]">
              <h4 className="text-base font-medium text-white mb-3 flex items-start gap-3">
                <Check className="w-5 h-5 text-gray-500 shrink-0" />
                {faq.q}
              </h4>
              <p className="text-gray-400 text-sm pl-8 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
