import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Info, SkipForward, Flag } from 'lucide-react';
import type { Quiz, QuizOption } from '@/types/quiz';

interface QuestionCardProps {
  quiz: Quiz;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  isAnswered: boolean;
  onSelect: (answer: string) => void;
  onNext: () => void;
  onPrev?: () => void;
  onSkip?: () => void;
  onFinish?: () => void;
  onRetryQuestion: () => void;
  canGoPrev: boolean;
}

const optionLetters = ['A', 'B', 'C', 'D', 'E'];

export default function QuestionCard({
  quiz,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  isAnswered,
  onSelect,
  onNext,
  onPrev,
  onSkip,
  onFinish,
  onRetryQuestion,
  canGoPrev,
}: QuestionCardProps) {
  const progressPercent = (questionNumber / totalQuestions) * 100;

  const getOptionState = (option: QuizOption): 'default' | 'selected' | 'correct' | 'wrong' => {
    if (isAnswered) {
      if (option.is_correct) return 'correct';
      if (option.id === selectedAnswer && !option.is_correct) return 'wrong';
      return 'default';
    }
    if (option.id === selectedAnswer) return 'selected';
    return 'default';
  };

  const correctOption = quiz.options.find((o) => o.is_correct) ?? null;
  const selectedOption = quiz.options.find((o) => o.id === selectedAnswer) ?? null;
  const isCorrect = selectedOption?.is_correct ?? false;
  const explanation = isCorrect
    ? correctOption?.explanation ?? ''
    : selectedOption?.explanation ?? correctOption?.explanation ?? '';

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress header */}
      <div className="mb-4 sm:mb-6 animate-fade-in">
        <div className="mb-2.5 sm:mb-3 flex items-center justify-between text-xs sm:text-sm">
          <span className="font-display font-semibold text-cyan-300">
            Soal {questionNumber}
            <span className="text-slate-500"> / {totalQuestions}</span>
          </span>
          <span className="text-slate-400">{Math.round(progressPercent)}% selesai</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div
        key={quiz.question_id}
        className="animate-slide-in rounded-2xl sm:rounded-3xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-4 sm:p-6 md:p-8 shadow-2xl shadow-black/40"
      >
        <h2 className="font-display text-base sm:text-lg md:text-xl font-semibold text-white leading-relaxed">
          {quiz.question}
        </h2>

        <div className="mt-4 sm:mt-6 space-y-2.5 sm:space-y-3">
          {quiz.options.map((option, idx) => {
            const state = getOptionState(option);
            const letter = option.id || optionLetters[idx] || String(idx + 1);

            return (
              <button
                key={option.id}
                disabled={isAnswered}
                onClick={() => onSelect(option.id)}
                className={[
                  'group flex w-full items-center gap-3 sm:gap-4 rounded-xl border p-3 sm:p-4 text-left transition-all duration-200',
                  state === 'default' &&
                    'border-slate-700/60 bg-slate-900/30 hover:border-cyan-400/50 hover:bg-slate-800/60 active:scale-[0.99]',
                  state === 'selected' &&
                    'border-cyan-400 bg-cyan-400/10 ring-1 ring-cyan-400/40',
                  state === 'correct' &&
                    'border-emerald-500/70 bg-emerald-500/15 ring-1 ring-emerald-500/30',
                  state === 'wrong' &&
                    'border-rose-500/70 bg-rose-500/15 ring-1 ring-rose-500/30',
                  isAnswered ? 'cursor-default' : 'cursor-pointer',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <span
                  className={[
                    'flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg text-xs sm:text-sm font-bold transition-colors',
                    state === 'default' &&
                      'bg-slate-700/60 text-slate-300 group-hover:bg-slate-600 group-hover:text-white',
                    state === 'selected' && 'bg-cyan-400 text-slate-950',
                    state === 'correct' && 'bg-emerald-500 text-white',
                    state === 'wrong' && 'bg-rose-500 text-white',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {state === 'correct' ? (
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : state === 'wrong' ? (
                    <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    letter
                  )}
                </span>
                <span
                  className={[
                    'text-sm sm:text-base leading-relaxed',
                    state === 'correct'
                      ? 'text-emerald-100'
                      : state === 'wrong'
                        ? 'text-rose-100'
                        : 'text-slate-200',
                  ].join(' ')}
                >
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback + explanation — shown immediately when answered */}
        {isAnswered && (
          <div className="mt-4 sm:mt-6 animate-fade-in-up">
            <div
              className={[
                'flex items-start gap-3 rounded-xl border p-3.5 sm:p-4',
                isCorrect
                  ? 'border-emerald-500/40 bg-emerald-500/10'
                  : 'border-rose-500/40 bg-rose-500/10',
              ].join(' ')}
            >
              {isCorrect ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              ) : (
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
              )}
              <div className="flex-1">
                <p
                  className={[
                    'font-semibold text-sm sm:text-base',
                    isCorrect ? 'text-emerald-300' : 'text-rose-300',
                  ].join(' ')}
                >
                  {isCorrect ? 'Jawaban Benar!' : 'Jawaban Kurang Tepat'}
                </p>
                {!isCorrect && correctOption && (
                  <p className="mt-1 text-xs sm:text-sm text-slate-300">
                    Jawaban benar:{' '}
                    <span className="font-semibold text-emerald-300">{correctOption.text}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Explanation — auto-visible */}
            <div className="mt-3 animate-fade-in rounded-xl border border-slate-700/60 bg-slate-900/50 p-3.5 sm:p-4">
              <div className="flex items-center gap-2 text-cyan-300">
                <Info className="h-4 w-4 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold">Penjelasan</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
                {explanation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation — two stacked columns with bottom clearance for bolt badge */}
      <div className="mt-4 sm:mt-6 flex items-start justify-between gap-3 pb-16 sm:pb-6">
        {/* Left column: Back + Skip (+ Coba Lagi) */}
        <div className="flex flex-col gap-2 w-[calc(50%-0.375rem)] sm:w-auto">
          {onPrev && (
            <button
              onClick={onPrev}
              disabled={!canGoPrev}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/40 px-4 py-2.5 sm:py-3 text-sm font-medium text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw className="h-4 w-4" />
              Back
            </button>
          )}
          {onSkip && questionNumber < totalQuestions && (
            <button
              onClick={onSkip}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/40 px-4 py-2.5 sm:py-3 text-sm font-medium text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-800"
            >
              <SkipForward className="h-4 w-4" />
              Skip
            </button>
          )}
          {isAnswered && !isCorrect && (
            <button
              onClick={onRetryQuestion}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-2.5 sm:py-3 text-sm font-medium text-amber-300 transition-all hover:bg-amber-400/20"
            >
              <RotateCcw className="h-4 w-4" />
              Coba Lagi
            </button>
          )}
        </div>

        {/* Right column: Next + Selesai */}
        <div className="flex flex-col items-end gap-2 w-[calc(50%-0.375rem)] sm:w-auto">
          <button
            onClick={onNext}
            disabled={!isAnswered}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-700 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400 disabled:shadow-none disabled:hover:scale-100"
          >
            {questionNumber === totalQuestions ? 'Lihat Hasil' : 'Next'}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          {onFinish && (
            <button
              onClick={onFinish}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 sm:py-3 text-sm font-semibold text-emerald-200 transition-all hover:bg-emerald-500/20"
            >
              <Flag className="h-4 w-4" />
              Selesai
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
