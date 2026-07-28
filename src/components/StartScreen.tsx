import { Wrench, Zap, ArrowRight, ListChecks } from 'lucide-react';

interface StartScreenProps {
  totalQuestions: number;
  onStart: () => void;
}

export default function StartScreen({ totalQuestions, onStart }: StartScreenProps) {
  return (
    <div className="w-full max-w-2xl mx-auto animate-scale-in">
      <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-8 sm:p-12 text-center shadow-2xl shadow-black/40">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/30">
            <Wrench className="h-10 w-10 text-white" strokeWidth={2.2} />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            <Zap className="h-3.5 w-3.5" />
            Tes Pengetahuan
          </span>

          <h1 className="font-display mt-5 text-3xl sm:text-4xl font-bold text-white leading-tight">
            Servis &amp; Reparasi
            <br />
            Telepon Seluler
          </h1>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
            Uji pemahaman teknis Anda seputar perbaikan perangkat seluler — dari
            reballing BGA hingga analisis kerusakan software.
          </p>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-cyan-400" />
              <span>{totalQuestions} Soal</span>
            </div>
            <div className="h-4 w-px bg-slate-600" />
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              <span>Pilihan Ganda</span>
            </div>
          </div>

          <button
            onClick={onStart}
            className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Mulai Kuis
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
