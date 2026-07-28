import { Trophy, RotateCcw, Home, CheckCircle2, XCircle } from 'lucide-react';
import type { Quiz } from '@/types/quiz';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  answers: Record<number, string | null>;
  quizzes: Quiz[];
  onRestart: () => void;
  onReview: () => void;
}

export default function ResultScreen({
  score,
  totalQuestions,
  answers,
  quizzes,
  onRestart,
  onReview,
}: ResultScreenProps) {
  const percent = Math.round((score / totalQuestions) * 100);
  const passed = percent >= 70;
  const circumference = 2 * Math.PI * 52;
  const dashOffset = circumference - (percent / 100) * circumference;

  const getVerdict = () => {
    if (percent === 100) return { title: 'Sempurna!', desc: 'Anda menguasai materi ini dengan luar biasa.' };
    if (percent >= 70) return { title: 'Selamat, Lulus!', desc: 'Pengetahuan teknis Anda sangat baik.' };
    if (percent >= 50) return { title: 'Cukup Baik', desc: 'Masih ada ruang untuk peningkatan.' };
    return { title: 'Perlu Belajar Lagi', desc: 'Tinjau kembali materinya dan coba lagi.' };
  };

  const verdict = getVerdict();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="animate-scale-in relative overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-8 sm:p-10 text-center shadow-2xl shadow-black/40">
        <div
          className={[
            'absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl',
            passed ? 'bg-emerald-500/20' : 'bg-amber-500/20',
          ].join(' ')}
        />

        <div className="relative">
          {/* Score ring */}
          <div className="relative mx-auto mb-6 h-36 w-36">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-700/60"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{
                  transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={passed ? '#34d399' : '#fbbf24'} />
                  <stop offset="100%" stopColor={passed ? '#0ea5e9' : '#f97316'} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-4xl font-bold text-white">{percent}%</span>
              <span className="text-xs font-medium text-slate-400">Skor</span>
            </div>
          </div>

          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg">
            <Trophy className="h-6 w-6 text-white" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            {verdict.title}
          </h2>
          <p className="mt-2 text-slate-300">{verdict.desc}</p>

          {/* Stats */}
          <div className="mt-7 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-400" />
              <div className="text-left">
                <div className="font-display text-xl font-bold text-white">{score}</div>
                <div className="text-xs text-slate-400">Benar</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4">
              <XCircle className="h-6 w-6 shrink-0 text-rose-400" />
              <div className="text-left">
                <div className="font-display text-xl font-bold text-white">
                  {totalQuestions - score}
                </div>
                <div className="text-xs text-slate-400">Salah</div>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-slate-700/60 bg-slate-900/40 p-4 text-sm text-slate-300">
            Total {totalQuestions} soal · {quizzes.length} materi diperiksa
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onReview}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-800/50 px-6 py-3 text-sm font-semibold text-slate-200 transition-all hover:bg-slate-700/60"
            >
              Tinjau Jawaban
            </button>
            <button
              onClick={onRestart}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.99]"
            >
              <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-180" />
              Ulangi Kuis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReviewScreen({
  quizzes,
  answers,
  onBack,
  onHome,
}: {
  quizzes: Quiz[];
  answers: Record<number, string | null>;
  onBack: () => void;
  onHome: () => void;
}) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200"
        >
          <Home className="h-4 w-4" />
          Kembali ke Hasil
        </button>
        <h2 className="font-display text-xl font-bold text-white">Tinjau Jawaban</h2>
        <span className="w-28" />
      </div>

      <div className="space-y-4">
        {quizzes.map((quiz, idx) => {
          const userAnswer = answers[quiz.question_id] ?? null;
          const correctOption = quiz.options.find((o) => o.is_correct) ?? null;
          const isCorrect = !!userAnswer && quiz.options.some((o) => o.id === userAnswer && o.is_correct);
          const skipped = userAnswer === null;
          const userOption = quiz.options.find((o) => o.id === userAnswer) ?? null;

          return (
            <div
              key={quiz.question_id}
              className="animate-fade-in-up rounded-2xl border border-slate-700/60 bg-slate-800/40 p-5"
              style={{ animationDelay: `${Math.min(idx * 50, 400)}ms` }}
            >
              <div className="flex items-start gap-3">
                <span
                  className={[
                    'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold',
                    isCorrect
                      ? 'bg-emerald-500 text-white'
                      : skipped
                        ? 'bg-slate-600 text-slate-200'
                        : 'bg-rose-500 text-white',
                  ].join(' ')}
                >
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-white leading-relaxed">{quiz.question}</p>

                  <div className="mt-3 space-y-2 text-sm">
                    {quiz.options.map((option) => {
                      const isUser = option.id === userAnswer;
                      const isRight = option.is_correct;
                      return (
                        <div
                          key={option.id}
                          className={[
                            'flex flex-col gap-1 rounded-lg border px-3 py-2',
                            isRight
                              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100'
                              : isUser
                                ? 'border-rose-500/40 bg-rose-500/10 text-rose-100'
                                : 'border-slate-700/40 bg-slate-900/30 text-slate-400',
                          ].join(' ')}
                        >
                          <div className="flex items-start gap-2">
                            <span className="mt-0.5">
                              {isRight ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                              ) : isUser ? (
                                <XCircle className="h-4 w-4 text-rose-400" />
                              ) : (
                                <span className="inline-block h-4 w-4" />
                              )}
                            </span>
                            <span>{option.text}</span>
                            {isUser && !isRight && (
                              <span className="ml-auto text-xs font-medium text-rose-300">
                                Jawaban Anda
                              </span>
                            )}
                          </div>
                          {isUser && !isRight && option.explanation && (
                            <p className="ml-6 text-xs leading-relaxed text-rose-200/80">
                              {option.explanation}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {isCorrect && correctOption?.explanation && (
                    <p className="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 text-xs leading-relaxed text-emerald-100/90">
                      <span className="font-semibold text-emerald-300">Penjelasan: </span>
                      {correctOption.explanation}
                    </p>
                  )}
                  {!isCorrect && !skipped && userOption?.explanation && (
                    <p className="mt-3 rounded-lg border border-slate-700/50 bg-slate-900/40 p-3 text-xs leading-relaxed text-slate-400">
                      <span className="font-semibold text-slate-300">Penjelasan: </span>
                      {userOption.explanation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onHome}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:shadow-xl hover:scale-[1.02]"
        >
          <Home className="h-4 w-4" />
          Selesai
        </button>
      </div>
    </div>
  );
}
