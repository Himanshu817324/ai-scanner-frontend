import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Cta() {
  return (
    <section className="py-24 px-6 border-t border-[#222] bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Start your first scan</h2>
        <p className="text-gray-400 mb-8 text-lg">Ready to audit your application? Head over to the scanner dashboard.</p>
        <Link href="/scanner" className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-200 text-black rounded-lg font-medium transition-colors">
          Launch Scanner
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
