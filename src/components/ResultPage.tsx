import React, { useState } from 'react';
import {
  DIMENSION_LABELS,
  type DiagnosisResult,
  type DimensionKey,
} from '../data/quizData';
import type { GlobalArchetypeStats } from '../services/bilibiliToySdk';
import { ArchetypeSvgSymbol } from './SvgSymbols';
import { generateDiagnosisCardPng } from '../utils/exportResultCard';

interface ResultPageProps {
  result: DiagnosisResult;
  globalStats: GlobalArchetypeStats | null;
  cloudSynced: boolean;
  onRestart: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({
  result,
  globalStats,
  cloudSynced,
  onRestart,
}) => {
  const [exportPreviewUrl, setExportPreviewUrl] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [copiedInvite, setCopiedInvite] = useState(false);

  const { archetype, dimensions, ingredients, heartRateBpm, matchScore } = result;

  const sameTypeCount = globalStats?.counts[archetype.id] ?? 1;
  const totalTested = globalStats?.totalTested ?? 100;
  const sameTypePercent = Math.max(1, Math.round((sameTypeCount / totalTested) * 100));

  const handleExportPng = () => {
    setExporting(true);
    try {
      const dataUrl = generateDiagnosisCardPng(result, sameTypePercent);
      setExportPreviewUrl(dataUrl);

      // 同时尝试触发桌面端/支持的移动端直接下载
      const link = document.createElement('a');
      link.download = `心动频谱-${archetype.title}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setExporting(false);
    }
  };

  const handleCopyInvite = async () => {
    const shareUrl = window.location.href.split('#')[0];
    const text = `我刚在《心动频谱》测出了【${archetype.title}】（代表角色：${archetype.characters}）！宿命CP是【${archetype.destinedCp.typeName}】，快来测测你的心动频率吧：${shareUrl}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedInvite(true);
    window.setTimeout(() => setCopiedInvite(false), 2200);
  };

  const dimKeys: DimensionKey[] = ['directness', 'possessiveness', 'slowBurn', 'pureLove'];

  return (
    <div className="min-h-screen px-4 py-7 sm:py-10 flex flex-col items-center">
      <div className="w-full max-w-md space-y-5 animate-fade-up">
        {/* 拍立得主报告卡 */}
        <div className="relative">
          <div className="washi-tape w-28 h-6 mx-auto -mb-3 relative z-10 rounded-sm -rotate-1" />

          <div className="journal-paper polaroid-shadow rounded-3xl p-5 sm:p-7 border border-white/95">
            {/* 头部信息 */}
            <div className="flex items-center justify-between text-xs text-[#8f7c93] mb-4">
              <span className="font-mono tracking-wider">DIAGNOSIS REPORT</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fff0f5] text-[#d66d91] font-medium">
                ♥ {heartRateBpm} BPM · 契合度 {matchScore}%
              </span>
            </div>

            {/* 拍立得相框区 */}
            <div
              className="rounded-2xl p-5 text-center border border-white shadow-inner mb-5"
              style={{
                background: `linear-gradient(145deg, ${archetype.accentBg} 0%, #f5effc 100%)`,
              }}
            >
              <div className="flex justify-center mb-2">
                <ArchetypeSvgSymbol type={archetype.symbol} className="w-28 h-28" />
              </div>

              <span className="inline-block text-[11px] uppercase tracking-widest text-[#8f7c93] mb-1">
                {archetype.badge}
              </span>

              <h1 className="font-hand text-2xl sm:text-[28px] font-bold text-[#3d313f]">
                【{archetype.title}】
              </h1>

              <p className="text-sm font-semibold mt-1.5" style={{ color: archetype.themeColor }}>
                代表角色：{archetype.characters}
              </p>
              <p className="text-xs text-[#8b798f] mt-0.5">{archetype.animeSource}</p>
            </div>

            {/* 签语与性格解析 */}
            <blockquote
              className="font-hand text-base sm:text-lg leading-relaxed px-3.5 py-2.5 rounded-xl bg-white/80 border-l-4 mb-4"
              style={{ borderColor: archetype.themeColor, color: '#4c3d4f' }}
            >
              {archetype.tagline}
            </blockquote>

            <p className="text-sm text-[#5d4e60] leading-relaxed mb-6">
              {archetype.description}
            </p>

            {/* 四维恋爱频谱 */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#3d313f] mb-3 flex items-center gap-1.5">
                <span className="text-[#e57a9e]">♡</span> 四维恋爱频谱
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {dimKeys.map((key) => {
                  const meta = DIMENSION_LABELS[key];
                  const val = dimensions[key];
                  return (
                    <div key={key} className="bg-white/85 rounded-xl p-3 border border-[#f2e6ef]">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-[#4b3d4d]">{meta.name}</span>
                        <span className="font-mono font-semibold" style={{ color: meta.color }}>
                          {val}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[#f3ecf5] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${val}%`, backgroundColor: meta.color }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-[#9b8b9d] mt-1">
                        <span>{meta.lowLabel}</span>
                        <span>{meta.highLabel}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 恋爱成分表 */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#3d313f] mb-3 flex items-center gap-1.5">
                <span className="text-[#a78bfa]">♡</span> 恋爱成分表
              </h3>
              <div className="bg-white/85 rounded-2xl p-4 border border-[#f2e6ef] space-y-3">
                {ingredients.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-[#4f4052]">{item.name}</span>
                      <span className="font-mono text-[#7c6a7e]">{item.percent}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#f4edf6] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 专属攻略指南 */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#3d313f] mb-3 flex items-center gap-1.5">
                <span className="text-[#7cb5d9]">♡</span> 专属攻略指南 · 如何拿下你
              </h3>
              <div className="space-y-2.5">
                {archetype.strategyGuide.map((tip, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 bg-white/85 rounded-xl p-3 border border-[#f2e6ef]"
                  >
                    <span
                      className="w-5 h-5 rounded-full text-xs font-bold text-white flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: archetype.themeColor }}
                    >
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-[13px] text-[#564759] leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 宿命 CP 推荐 */}
            <div className="rounded-2xl bg-gradient-to-r from-[#fbf2fa] to-[#eff5fc] border border-[#ead9ec] p-4 mb-5">
              <div className="text-xs font-bold text-[#8a61a8] mb-1">
                ✦ 宿命 CP 推荐：【{archetype.destinedCp.typeName}】
              </div>
              <p className="text-xs sm:text-[13px] text-[#5c4d5e] leading-relaxed">
                {archetype.destinedCp.reason}
              </p>
            </div>

            {/* Bilibili Toy 云存档与同频统计 */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#8d7b90] pt-3 border-t border-dashed border-[#e8d9e6]">
              <span>
                全站已有 <strong className="text-[#d66d91]">{sameTypePercent}%</strong> 的旅人与你同频
              </span>
              <span className="inline-flex items-center gap-1">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    cloudSynced ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
                {globalStats?.source === 'bilibili-toy-cloud'
                  ? 'B站云存档已同步'
                  : '本地存档已保存'}
              </span>
            </div>

            <div className="mt-3 text-center text-[11px] tracking-wider text-[#9d8ca0]">
              Bilibili Toy · 心动频谱测试
            </div>
          </div>
        </div>

        {/* 底部操作按钮 */}
        <div className="space-y-3 pb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              disabled={exporting}
              onClick={handleExportPng}
              className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#f08aa9] via-[#d98ce2] to-[#8cb9e3] text-white font-semibold text-sm shadow-md shadow-[#e5a8c4]/40 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
            >
              {exporting ? '正在冲印高清拍立得…' : '保存高清诊断卡片 (PNG) 📸'}
            </button>

            <button
              type="button"
              onClick={onRestart}
              className="sm:w-36 py-3.5 px-5 rounded-2xl bg-white/85 hover:bg-white border border-[#ead9e6] text-[#6d5b70] font-medium text-sm active:scale-[0.98] transition-all cursor-pointer"
            >
              再测一次 ↻
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyInvite}
            className="w-full py-3 px-5 rounded-2xl bg-[#fff8fb] hover:bg-white border border-[#f0dce8] text-[#9b5b82] font-medium text-sm active:scale-[0.99] transition-all cursor-pointer"
          >
            {copiedInvite ? '已复制邀请文案与链接，快发给朋友吧 💌' : '复制邀请文案与链接 · 发给朋友一起测 🔗'}
          </button>
        </div>
      </div>

      {/* PNG 预览弹窗（方便移动端长按保存） */}
      {exportPreviewUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setExportPreviewUrl(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-4 shadow-2xl animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#5c4d5e]">
                已生成高清 PNG（手机端可长按图片保存）
              </span>
              <button
                type="button"
                onClick={() => setExportPreviewUrl(null)}
                className="text-xs px-2.5 py-1 rounded-full bg-[#f5eef6] text-[#7c6a7e] cursor-pointer"
              >
                关闭
              </button>
            </div>
            <div className="max-h-[72vh] overflow-y-auto rounded-2xl border border-[#f0e5ee]">
              <img
                src={exportPreviewUrl}
                alt="心动频谱诊断报告"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
