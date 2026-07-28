import { useMemo, useState } from 'react';
import { Cpu } from 'lucide-react';
import quizData from '@/data/quizzes.json';
import type { Quiz } from '@/types/quiz';
import StartScreen from '@/components/StartScreen';
import QuestionCard from '@/components/QuestionCard';
import ResultScreen, { ReviewScreen } from '@/components/ResultScreen';

type Phase = 'start' | 'quiz' | 'result' | 'review';

const quizzes = quizData as Quiz[];

export default function App() {
  const [phase, setPhase] = useState<Phase>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | null>>({});

  const currentQuiz = quizzes[currentIndex];
  const selectedAnswer = answers[currentQuiz?.question_id ?? 0] ?? null;
  const isAnswered = selectedAnswer !== null;

  const isOptionCorrect = (quiz: Quiz, optionId: string | null) =>
    !!optionId && quiz.options.some((o) => o.id === optionId && o.is_correct);

  const score = useMemo(
    () => quizzes.reduce((acc, q) => (isOptionCorrect(q, answers[q.question_id] ?? null) ? acc + 1 : acc), 0),
    [answers],
  );

  const handleStart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setPhase('quiz');
  };

  const handleSelect = (optionId: string) => {
    if (isAnswered) return;
    setAnswers((prev) => ({ ...prev, [currentQuiz.question_id]: optionId }));
  };

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setPhase('result');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const handleSkip = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setPhase('result');
    }
  };

  const handleFinish = () => {
    setPhase('result');
  };

  const handleRetryQuestion = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuiz.question_id];
      return next;
    });
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setPhase('start');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 shadow-md shadow-cyan-500/20">
            <Cpu className="h-5 w-5 text-white" strokeWidth={2.2} />
          </div>
          <span className="font-display text-sm font-bold tracking-tight text-white sm:text-base">
            TechRepair Quiz
          </span>
        </div>

        {phase === 'quiz' && (
          <span className="rounded-full border border-slate-700/60 bg-slate-800/40 px-3 py-1 text-xs font-medium text-slate-300">
            Skor: <span className="font-semibold text-cyan-300">{score}</span>
            <span className="text-slate-500"> / {quizzes.length}</span>
          </span>
        )}
      </header>

      {/* Main */}
      <main className="relative z-10 flex min-h-[calc(100vh-68px)] items-center justify-center px-4 py-6 sm:px-6 sm:py-8">
        {phase === 'start' && (
          <StartScreen totalQuestions={quizzes.length} onStart={handleStart} />
        )}

        {phase === 'quiz' && currentQuiz && (
          <QuestionCard
            quiz={currentQuiz}
            questionNumber={currentIndex + 1}
            totalQuestions={quizzes.length}
            selectedAnswer={selectedAnswer}
            isAnswered={isAnswered}
            onSelect={handleSelect}
            onNext={handleNext}
            onPrev={handlePrev}
            onSkip={handleSkip}
            onFinish={handleFinish}
            onRetryQuestion={handleRetryQuestion}
            canGoPrev={currentIndex > 0}
          />
        )}
        {/* keep QuestionCard props below aligned with the new dataset shape */}

        {phase === 'result' && (
          <ResultScreen
            score={score}
            totalQuestions={quizzes.length}
            answers={answers}
            quizzes={quizzes}
            onRestart={handleRestart}
            onReview={() => setPhase('review')}
          />
        )}

        {phase === 'review' && (
          <ReviewScreen
            quizzes={quizzes}
            answers={answers}
            onBack={() => setPhase('result')}
            onHome={handleRestart}
          />
        )}
      </main>
    </div>
  );
}
