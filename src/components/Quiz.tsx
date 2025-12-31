"use client";

import { useState } from "react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  lessonId: number;
  questions: QuizQuestion[];
  onComplete?: (score: number) => void;
}

export default function Quiz({ lessonId, questions, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      const score = calculateScore();
      if (onComplete) {
        onComplete(score);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setShowExplanation(false);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setShowResults(false);
    setShowExplanation(false);
  };

  if (showResults) {
    const score = calculateScore();
    const passed = score >= 70;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">{passed ? "🎉" : "📚"}</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Quiz Tamamlandı!
          </h2>
          <div className="mb-6">
            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {score}%
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {questions.filter((q, i) => selectedAnswers[i] === q.correctAnswer).length} / {questions.length} doğru cevap
            </p>
          </div>

          {passed ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
              <p className="text-green-800 dark:text-green-300 font-medium">
                ✓ Tebrikler! Quiz'i başarıyla tamamladınız.
              </p>
            </div>
          ) : (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 dark:text-yellow-300 font-medium">
                Geçmek için en az %70 puan almanız gerekiyor. Tekrar deneyin!
              </p>
            </div>
          )}

          {/* Detailed Results */}
          <div className="text-left space-y-4 mb-6">
            {questions.map((question, index) => {
              const isCorrect = selectedAnswers[index] === question.correctAnswer;
              return (
                <div 
                  key={question.id}
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect 
                      ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
                      : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20"
                  }`}
                >
                  <p className="font-medium text-gray-900 dark:text-white mb-2">
                    {index + 1}. {question.question}
                  </p>
                  <p className={`text-sm ${isCorrect ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                    {isCorrect ? "✓ Doğru" : "✗ Yanlış"}
                  </p>
                  {!isCorrect && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Doğru cevap: {question.options[question.correctAnswer]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              🔄 Tekrar Dene
            </button>
            {passed && (
              <button
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                ✓ Sonraki Ders
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== -1;
  const isCorrect = selectedAnswers[currentQuestion] === question.correctAnswer;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Soru {currentQuestion + 1} / {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswers[currentQuestion] === index;
          const isCorrectOption = index === question.correctAnswer;
          
          let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all ";
          
          if (!isAnswered) {
            buttonClass += "border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20";
          } else {
            if (isSelected && isCorrect) {
              buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/20";
            } else if (isSelected && !isCorrect) {
              buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/20";
            } else if (isCorrectOption) {
              buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/20";
            } else {
              buttonClass += "border-gray-300 dark:border-gray-600 opacity-50";
            }
          }

          return (
            <button
              key={index}
              onClick={() => !isAnswered && handleAnswer(index)}
              disabled={isAnswered}
              className={buttonClass}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected 
                    ? isCorrect 
                      ? "border-green-500 bg-green-500"
                      : "border-red-500 bg-red-500"
                    : isAnswered && isCorrectOption
                    ? "border-green-500 bg-green-500"
                    : "border-gray-400 dark:border-gray-500"
                }`}>
                  {isSelected && (isCorrect ? "✓" : "✗")}
                  {!isSelected && isAnswered && isCorrectOption && "✓"}
                </div>
                <span className="text-gray-900 dark:text-white font-medium">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`p-4 rounded-lg mb-6 ${
          isCorrect 
            ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
            : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
        }`}>
          <p className={`font-medium mb-2 ${
            isCorrect ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"
          }`}>
            {isCorrect ? "✓ Doğru!" : "✗ Yanlış"}
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            {question.explanation}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Önceki
        </button>
        
        {isAnswered && (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? "Sonraki →" : "Sonuçları Gör"}
          </button>
        )}
      </div>
    </div>
  );
}

