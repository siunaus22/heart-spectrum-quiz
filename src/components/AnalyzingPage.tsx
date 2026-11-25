import React, { useEffect, useState } from 'react';

const STATUS_MESSAGES = [
  '正在采集你的心动微表情波形…',
  '解析直球度与慢热频段共振…',
  '匹配二次元宿命恋爱人格档案…',
  '正在冲印你的专属拍立得诊断书…',
];

export const AnalyzingPage: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 550);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm journal-paper polaroid-shadow rounded-3xl p-8 border border-white text-center animate-fade-up">
        {/* 跳动爱心 */}
        <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[#ffe8f0] to-[#efe7fb] flex items-center justify-center mb-5 animate-pulse-heart shadow-inner">
          <svg viewBox="0 0 64 64" className="w-11 h-11" fill="none">
            <path
              d="M32 53 C32 53 10 38.5 10 23 C10 15.5 16 10 23 10 C27.5 10 30.8 12.5 32 15.5 C33.2 12.5 36.5 10 41 10 C48 10 54 15.5 54 23 C54 38.5 32 53 32 53 Z"
              fill="#F28BA8"
            />
          </svg>
        </div>

        {/* 心电图波形 SVG */}
        <div className="w-full h-16 mb-5 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 300 60" className="w-full h-full" fill="none">
            <path
              d="M0 32 H65 L78 32 L88 12 L98 48 L109 22 L118 32 H175 L186 16 L196 44 L206 26 L214 32 H300"
              stroke="url(#ecgGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-ecg"
            />
            <defs>
              <linearGradient id="ecgGrad" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F28BA8" />
                <stop offset="0.5" stopColor="#A78BFA" />
                <stop offset="1" stopColor="#7CB5D9" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h2 className="font-hand text-2xl font-bold text-[#3d313f] mb-2">
          心跳频谱解析中
        </h2>
        <p className="text-sm text-[#7f6d82] min-h-[24px] transition-opacity duration-300">
          {STATUS_MESSAGES[msgIndex]}
        </p>
      </div>
    </div>
  );
};
