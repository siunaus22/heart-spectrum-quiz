import React from 'react';
import type { SymbolType } from '../data/quizData';

interface SymbolProps {
  type: SymbolType;
  className?: string;
}

export const ArchetypeSvgSymbol: React.FC<SymbolProps> = ({ type, className = 'w-28 h-28' }) => {
  switch (type) {
    case 'sakura-ring':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="48" fill="#FFF0F5" stroke="#F4B8CC" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* 结绳与双环 */}
          <circle cx="52" cy="66" r="20" stroke="#E57A9E" strokeWidth="4" />
          <circle cx="68" cy="66" r="20" stroke="#9C7AD6" strokeWidth="3.5" strokeOpacity="0.85" />
          {/* 樱花 */}
          <g transform="translate(60, 32)">
            <path d="M0 -14 C5 -8, 10 -2, 0 4 C-10 -2, -5 -8, 0 -14 Z" fill="#F8A5C2" />
            <path d="M13 -4 C10 3, 4 7, -1 2 C4 -5, 10 -6, 13 -4 Z" fill="#F8A5C2" />
            <path d="M8 12 C1 12, -4 7, 0 1 C6 3, 10 8, 8 12 Z" fill="#F593B5" />
            <path d="M-8 12 C-10 8, -6 3, 0 1 C4 7, -1 12, -8 12 Z" fill="#F593B5" />
            <path d="M-13 -4 C-10 -6, -4 -5, 1 2 C-4 7, -10 3, -13 -4 Z" fill="#F8A5C2" />
            <circle cx="0" cy="1" r="3" fill="#FFE082" />
          </g>
          <circle cx="26" cy="36" r="2.5" fill="#F8A5C2" />
          <circle cx="94" cy="40" r="2" fill="#B8A4E3" />
        </svg>
      );

    case 'tsundere-ribbon':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="48" fill="#FFF2F6" stroke="#F3B4C7" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* 双马尾蝴蝶结 */}
          <path d="M60 58 C42 40, 22 42, 24 60 C26 74, 46 70, 60 58 Z" fill="#F28BA8" stroke="#D96B8A" strokeWidth="2.5" />
          <path d="M60 58 C78 40, 98 42, 96 60 C94 74, 74 70, 60 58 Z" fill="#F28BA8" stroke="#D96B8A" strokeWidth="2.5" />
          <path d="M54 64 L40 92 L52 86 L58 66 Z" fill="#E57A9E" />
          <path d="M66 64 L80 92 L68 86 L62 66 Z" fill="#E57A9E" />
          <circle cx="60" cy="59" r="8" fill="#FFD6E4" stroke="#D96B8A" strokeWidth="2.5" />
          {/* 傲娇小火花 */}
          <path d="M88 28 L91 34 L97 37 L91 40 L88 46 L85 40 L79 37 L85 34 Z" fill="#F4A261" />
          <path d="M30 28 L32 32 L36 34 L32 36 L30 40 L28 36 L24 34 L28 32 Z" fill="#F28BA8" />
        </svg>
      );

    case 'kaguya-letter':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="48" fill="#F6F1FC" stroke="#CBB7EC" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* 情书信封 */}
          <rect x="26" y="42" width="68" height="44" rx="6" fill="#FFFFFF" stroke="#9C7AD6" strokeWidth="2.5" />
          <path d="M27 44 L60 68 L93 44" stroke="#9C7AD6" strokeWidth="2.5" strokeLinejoin="round" />
          {/* 爱心火漆印 */}
          <path
            d="M60 74 C60 74 51 68 51 62 C51 58.5 54 56 57 56 C58.8 56 59.8 57.2 60 58.2 C60.2 57.2 61.2 56 63 56 C66 56 69 58.5 69 62 C69 68 60 74 60 74 Z"
            fill="#F28BA8"
          />
          {/* 暗藏的心动电波 */}
          <path d="M32 30 L42 30 L46 22 L52 36 L57 26 L61 30 L88 30" stroke="#B79CED" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'sunny-star':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="48" fill="#FFF6EE" stroke="#F8C89C" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* 小太阳光芒 */}
          <circle cx="60" cy="60" r="24" fill="#FFD89B" stroke="#EB9257" strokeWidth="2.5" />
          <path d="M60 22 V30 M60 90 V98 M22 60 H30 M90 60 H98 M33 33 L39 39 M81 81 L87 87 M87 33 L81 39 M39 81 L33 87" stroke="#EB9257" strokeWidth="3" strokeLinecap="round" />
          {/* 可爱笑脸/星星眼 */}
          <circle cx="52" cy="57" r="2.6" fill="#7A4928" />
          <circle cx="68" cy="57" r="2.6" fill="#7A4928" />
          <path d="M54 65 Q60 71 66 65" stroke="#7A4928" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="46" cy="63" r="3" fill="#F28BA8" fillOpacity="0.55" />
          <circle cx="74" cy="63" r="3" fill="#F28BA8" fillOpacity="0.55" />
        </svg>
      );

    case 'cat-teacup':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="48" fill="#EFF6FB" stroke="#A9CBE4" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* 猫耳轮廓 */}
          <path d="M36 52 L42 32 L54 46 Z" fill="#FFFFFF" stroke="#679EC4" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M84 52 L78 32 L66 46 Z" fill="#FFFFFF" stroke="#679EC4" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M40 49 L43 38 L50 46 Z" fill="#F5B7CA" />
          <path d="M80 49 L77 38 L70 46 Z" fill="#F5B7CA" />
          {/* 猫咪茶杯 */}
          <path d="M34 52 H86 V68 C86 82 74 90 60 90 C46 90 34 82 34 68 V52 Z" fill="#FFFFFF" stroke="#679EC4" strokeWidth="2.5" />
          <path d="M86 58 C95 58 95 72 85 74" stroke="#679EC4" strokeWidth="2.5" strokeLinecap="round" />
          {/* 猫咪小表情 */}
          <circle cx="50" cy="66" r="2.2" fill="#4C7491" />
          <circle cx="70" cy="66" r="2.2" fill="#4C7491" />
          <path d="M56 71 Q60 75 60 71 Q60 75 64 71" stroke="#4C7491" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'bocchi-pick':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="48" fill="#FDF0F8" stroke="#EBB5D6" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* 吉他拨片 */}
          <path
            d="M60 28 C80 28 92 42 86 64 C81 82 67 94 60 94 C53 94 39 82 34 64 C28 42 40 28 60 28 Z"
            fill="#F9C6E0"
            stroke="#D668A8"
            strokeWidth="2.5"
          />
          {/* 孤独小方块发饰 */}
          <rect x="72" y="34" width="9" height="9" rx="2" fill="#7CC6FE" stroke="#4B8BBE" strokeWidth="1.5" />
          <rect x="72" y="45" width="9" height="9" rx="2" fill="#FFE066" stroke="#D4A72C" strokeWidth="1.5" />
          {/* 脑内气泡 */}
          <circle cx="44" cy="56" r="3" fill="#FFFFFF" />
          <circle cx="52" cy="48" r="4.5" fill="#FFFFFF" />
          <path d="M51 68 Q60 62 69 68" stroke="#B04B85" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case 'knight-brooch':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="48" fill="#EEF2F9" stroke="#AEBEDE" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* 翡翠胸针 */}
          <ellipse cx="60" cy="60" rx="22" ry="28" fill="#FFFDF9" stroke="#C5A869" strokeWidth="3.5" />
          <ellipse cx="60" cy="60" rx="14" ry="20" fill="#6EB59B" stroke="#4D8A74" strokeWidth="2" />
          <path d="M55 48 L65 48 L60 62 Z" fill="#A5E1CA" fillOpacity="0.65" />
          {/* 守护羽毛 */}
          <path d="M32 82 C40 70 46 60 44 46" stroke="#6985B5" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M88 82 C80 70 74 60 76 46" stroke="#6985B5" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'anya-peanut':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="48" fill="#FFF4EF" stroke="#F4BEAA" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* 花生造型 */}
          <path
            d="M46 36 C56 26 70 30 72 42 C73 48 69 54 74 60 C82 68 80 84 68 88 C56 92 44 84 44 72 C44 65 48 59 44 53 C38 46 40 40 46 36 Z"
            fill="#F6D198"
            stroke="#C98A4B"
            strokeWidth="2.5"
          />
          {/* 星星闪耀 */}
          <path d="M86 30 L89 37 L96 39 L89 41 L86 48 L83 41 L76 39 L83 37 Z" fill="#F28BA8" />
          {/* 经典呵表情眼 */}
          <path d="M51 52 L57 54 L51 56" stroke="#6A452C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M67 52 L61 54 L67 56" stroke="#6A452C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M55 64 Q60 67 65 64" stroke="#6A452C" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'clover-note':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="48" fill="#EFF9F5" stroke="#A6DBC6" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* 四叶草 */}
          <circle cx="50" cy="48" r="12" fill="#8CD4B8" />
          <circle cx="70" cy="48" r="12" fill="#8CD4B8" />
          <circle cx="50" cy="68" r="12" fill="#6EB59B" />
          <circle cx="70" cy="68" r="12" fill="#6EB59B" />
          <path d="M60 62 Q62 82 54 94" stroke="#4D8A74" strokeWidth="3" strokeLinecap="round" />
          {/* 音符 */}
          <path d="M78 30 V48" stroke="#E57A9E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M78 30 L90 27 V34 L78 37" fill="#E57A9E" />
          <circle cx="74" cy="49" r="4.5" fill="#E57A9E" />
        </svg>
      );
  }
};

export const SakuraPetalSvg: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 4 C22 10, 26 18, 16 28 C6 18, 10 10, 16 4 Z"
      fill="#F9B8CE"
      fillOpacity="0.72"
    />
    <path d="M16 4 L14 9 L16 7 L18 9 Z" fill="#FFF7F8" />
  </svg>
);

export const SparkleSvg: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2 L14.2 9.8 L22 12 L14.2 14.2 L12 22 L9.8 14.2 L2 12 L9.8 9.8 Z"
      fill="#D7B4F3"
      fillOpacity="0.8"
    />
  </svg>
);
