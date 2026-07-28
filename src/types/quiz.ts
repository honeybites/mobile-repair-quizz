export interface QuizOption {
  id: string;
  text: string;
  is_correct: boolean;
  explanation: string;
}

export interface Quiz {
  question_id: number;
  question: string;
  options: QuizOption[];
}
