import React from 'react';
import { SakuraPetalSvg, SparkleSvg } from './SvgSymbols';
import type { ToyCloudSaveRecord } from '../services/bilibiliToySdk';

interface CoverPageProps {
  onStart: () => void;
  savedRecord: ToyCloudSaveRecord | null;
  onRestoreSaved: () => void;
}

export const CoverPage: React.FC<CoverPageProps> = ({
  onStart,
  savedRecord,
  onRestoreSaved,
}) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* 漂浮纯SVG装饰 */}
      <div className="pointer-events-none absolute top-10 left-6 animate-float-slow opacity-80">
        <SakuraPetalSvg className="w-8 h-8 rotate-12" />
      </div>
      <div
        className="pointer-events-none absolute top-24 right-8 animate-float-slow opacity-75"
        style={{ animationDelay: '1.2s' }}
      >
        <SparkleSvg className="w-6 h-6" />
      </div>
      <div
        className="pointer-events-none absolute bottom-20 left-8 animate-float-slow opacity-70"
        style={{ animationDelay: '2.1s' }}
      >
        <SparkleSvg className="w-5 h-5" />
      </div>
      <div
        className="pointer-events-none absolute bottom-14 right-6 animate-float-slow opacity-80"
        style={{ animationDelay: '0.7s' }}
      >
        <SakuraPetalSvg className="w-7 h-7 -rotate-45" />
      </div>

      {/* 主拍立得手账卡片 */}
      <div className="w-full max-w-md relative animate-fade-up">
        {/* 顶部和纸胶带 */}
        <div className="washi-tape w-28 h-6 mx-auto -mb-3 relative z-10 rounded-sm -rotate-2" />

        <div className="journal-paper polaroid-shadow rounded-3xl p-6 sm:p-8 border border-white/80 relative">
          {/* 顶部标签 */}
          <div className="flex items-center justify-between text-xs text-[#8f7c93] mb-5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fff0f5] text-[#d66d91] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e57a9e] animate-pulse" />
              Bilibili Toy 特别企划
            </span>
            <span className="font-mono tracking-wider opacity-80">NO.0520</span>
          </div>

          {/* 封面拍立得视窗 */}
          <div className="rounded-2xl bg-gradient-to-br from-[#ffeaf1] via-[#f4ecfb] to-[#e4f0fa] p-6 mb-6 border border-white shadow-inner text-center relative overflow-hidden">
            <div className="mx-auto w-24 h-24 rounded-full bg-white/80 flex items-center justify-center shadow-sm mb-3 animate-pulse-heart">
              <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none">
                <path
                  d="M40 66 C40 66 13 48 13 29 C13 19.5 20.5 13 29 13 C34.5 13 38.5 16 40 19.5 C41.5 16 45.5 13 51 13 C59.5 13 67 19.5 67 29 C67 48 40 66 40 66 Z"
                  fill="url(#heartGrad)"
                />
                <path
                  d="M21 38 H30 L34 29 L39 46 L44 33 L48 38 H59"
                  stroke="#FFFFFF"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="heartGrad" x1="13" y1="13" x2="67" y2="66" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F590B3" />
                    <stop offset="1" stopColor="#B394E8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <p className="text-[11px] tracking-[0.22em] uppercase text-[#8f7c93] mb-1">
              Heart Spectrum Diagnosis
            </p>
            <h1 className="font-hand text-3xl sm:text-[32px] font-bold text-[#3d313f] leading-snug">
              心动频谱
            </h1>
            <p className="font-hand text-base sm:text-lg text-[#7a647d] mt-1">
              你的恋爱类型与宿命动漫角色
            </p>
          </div>

          {/* 介绍文案 */}
          <p className="text-sm text-[#665768] leading-relaxed text-center mb-5">
            从深夜秒回的小鹿乱撞，到雨天共撑一伞的隐秘试探——
            <br className="hidden sm:inline" />
            用 <span className="font-semibold text-[#d66d91]">10 道恋爱微情景</span>，测出你的心动波形与二次元本命恋爱人格。
          </p>

          {/* 四大测评维度胶囊 */}
          <div className="grid grid-cols-2 gap-2 mb-6 text-xs">
            {[
              { label: '直球度', dot: '#F28BA8' },
              { label: '占有欲', dot: '#A78BFA' },
              { label: '慢热指数', dot: '#7CB5D9' },
              { label: '纯爱/乐子倾向', dot: '#F4A261' },
            ].map((dim) => (
              <div
                key={dim.label}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 border border-[#f1e5ee] text-[#5c4e5e]"
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: dim.dot }} />
                <span>{dim.label}</span>
              </div>
            ))}
          </div>

          {/* 开始按钮 */}
          <button
            type="button"
            onClick={onStart}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#f08aa9] via-[#d98ce2] to-[#8cb9e3] text-white font-semibold text-base shadow-md shadow-[#e5a8c4]/40 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
          >
            开启心动频率检测 ✨
          </button>

          {/* 如果有云存档/本地历史记录，展示快捷入口 */}
          {savedRecord && (
            <button
              type="button"
              onClick={onRestoreSaved}
              className="mt-3 w-full py-2.5 px-4 rounded-xl bg-[#faf5f8] hover:bg-[#f5ebf1] border border-[#ebd8e4] text-xs text-[#7c657e] transition-colors cursor-pointer"
            >
              读取上次云存档报告：【{savedRecord.archetypeTitle}】
            </button>
          )}

          <p className="mt-4 text-[11px] text-center text-[#9b8b9d]">
            纯前端本地运算 · 约需 1 分钟 · 可生成高清拍立得报告图
          </p>
        </div>
      </div>
    </div>
  );
};
