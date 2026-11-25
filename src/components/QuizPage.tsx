import React from 'react';
import type { QuizOption, QuizQuestion } from '../data/quizData';

interface QuizPageProps {
  question: QuizQuestion;
  currentIndex: number;
  total: number;
  selectedOptionId?: string;
  onSelect: (option: QuizOption) => void;
  onBack: () => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  question,
  currentIndex,
  total,
  selectedOptionId,
  onSelect,
  onBack,
}) => {
  const progress = Math.round(((currentIndex + 1) / total) * 100);
  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6 sm:py-10">
      <div className="w-full max-w-md">
        {/* 顶部进度与返回 */}
        <div className="flex items-center justify-between mb-3 px-1">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1 text-xs text-[#7c6a7e] hover:text-[#3d313f] py-1.5 px-2.5 rounded-full bg-white/70 border border-white shadow-xs transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none">
              <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {currentIndex === 0 ? '返回封面' : '上一题'}
          </button>

          <div className="text-xs font-mono text-[#846f87] bg-white/75 px-3 py-1 rounded-full border border-white">
            SCENE {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
        </div>

        {/* 心动进度条 */}
        <div className="w-full h-2 bg-white/75 rounded-full overflow-hidden mb-5 p-0.5 border border-white/90">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#f28ba8] via-[#c799eb] to-[#7cb5d9] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 题目手账卡片 */}
        <div key={question.id} className="relative animate-fade-up">
          <div className="washi-tape-blue w-24 h-5 mx-auto -mb-2.5 relative z-10 rounded-sm rotate-1" />

          <div className="journal-paper polaroid-shadow rounded-3xl p-5 sm:p-7 border border-white/90">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4ecfa] text-[#8364b0] text-xs font-medium mb-3">
              <span>♡</span>
              <span>{question.sceneTag}</span>
            </div>

            <h2 className="font-hand text-xl sm:text-[22px] font-bold text-[#3d313f] leading-relaxed mb-5">
              {question.prompt}
            </h2>

            <div className="space-y-3">
              {question.options.map((opt, idx) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onSelect(opt)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer active:scale-[0.985] ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#fff0f5] to-[#f4ecfa] border-[#e57a9e] shadow-sm'
                        : 'bg-white/85 hover:bg-white border-[#efe3ec] hover:border-[#dfbed3]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? 'bg-[#e57a9e] text-white'
                            : 'bg-[#f8eff5] text-[#a0768f]'
                        }`}
                      >
                        {optionLetters[idx]}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#3d313f] leading-snug">
                          {opt.label}
                        </p>
                        <p className="text-xs text-[#8d7c8f] mt-1 leading-relaxed">
                          {opt.subtext}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
