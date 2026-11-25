/**
 * @bilibili/toy-sdk 适配与云存档 / 共享数据统计封装
 *
 * 说明：
 * 1. 在 Bilibili Toy 宿主环境中，平台会注入全局 `window.ToySDK` / `window.toy`，
 *    或通过 `@bilibili/toy-sdk` 包提供能力。
 * 2. 在本地开发或独立静态部署预览时，自动降级为 localStorage 兜底，
 *    确保无后端依赖也能流畅体验云存档与全站统计效果。
 */

import type { DimensionScores } from '../data/quizData';

export interface ToyCloudSaveRecord {
  archetypeId: string;
  archetypeTitle: string;
  dimensions: DimensionScores;
  heartRateBpm: number;
  updatedAt: string;
}

export interface GlobalArchetypeStats {
  totalTested: number;
  counts: Record<string, number>;
  source: 'bilibili-toy-cloud' | 'local-fallback';
}

interface BilibiliToySdkLike {
  init?: (config: { appId: string }) => Promise<void>;
  saveStorage?: (params: { key: string; value: string }) => Promise<void>;
  loadStorage?: (params: { key: string }) => Promise<{ value?: string } | null>;
  saveSharedStorage?: (params: { key: string; value: string }) => Promise<void>;
  loadSharedStorage?: (params: { key: string }) => Promise<{ value?: string } | null>;
  getUserInfo?: () => Promise<{ uname?: string; face?: string }>;
}

declare global {
  interface Window {
    ToySDK?: BilibiliToySdkLike;
    toy?: BilibiliToySdkLike;
  }
}

const USER_SAVE_KEY = 'heart_spectrum_user_diagnosis_v1';
const SHARED_STATS_KEY = 'heart_spectrum_global_stats_v1';

// 初始基线数据（用于首次冷启动展示更自然的二次元分布比例）
const DEFAULT_GLOBAL_COUNTS: Record<string, number> = {
  'pure-warrior': 248,
  tsundere: 215,
  'calm-inside-you': 194,
  'sunny-puppy': 182,
  'cool-cat': 167,
  'mind-theater': 231,
  'knight-guardian': 149,
  'meme-lover': 206,
  'gentle-healer': 173,
};

function getNativeSdk(): BilibiliToySdkLike | null {
  if (typeof window === 'undefined') return null;
  return window.ToySDK ?? window.toy ?? null;
}

let sdkInitialized = false;

export async function initBilibiliToySdk(appId = 'heart-spectrum-quiz'): Promise<{
  connected: boolean;
  mode: 'bilibili-toy-cloud' | 'local-fallback';
}> {
  const sdk = getNativeSdk();
  if (sdk?.init && !sdkInitialized) {
    try {
      await sdk.init({ appId });
      sdkInitialized = true;
      return { connected: true, mode: 'bilibili-toy-cloud' };
    } catch {
      return { connected: false, mode: 'local-fallback' };
    }
  }
  if (sdk) {
    return { connected: true, mode: 'bilibili-toy-cloud' };
  }
  return { connected: false, mode: 'local-fallback' };
}

/**
 * 保存当前用户的恋爱诊断结果到 B 站云存档（带本地兜底）
 */
export async function saveDiagnosisToCloud(
  record: ToyCloudSaveRecord
): Promise<{ ok: boolean; mode: 'bilibili-toy-cloud' | 'local-fallback' }> {
  const serialized = JSON.stringify(record);

  try {
    localStorage.setItem(USER_SAVE_KEY, serialized);
  } catch {
    // ignore storage quota errors
  }

  const sdk = getNativeSdk();
  if (sdk?.saveStorage) {
    try {
      await sdk.saveStorage({ key: USER_SAVE_KEY, value: serialized });
      return { ok: true, mode: 'bilibili-toy-cloud' };
    } catch {
      return { ok: true, mode: 'local-fallback' };
    }
  }

  return { ok: true, mode: 'local-fallback' };
}

/**
 * 读取用户历史云存档
 */
export async function loadDiagnosisFromCloud(): Promise<ToyCloudSaveRecord | null> {
  const sdk = getNativeSdk();
  if (sdk?.loadStorage) {
    try {
      const res = await sdk.loadStorage({ key: USER_SAVE_KEY });
      if (res?.value) {
        return JSON.parse(res.value) as ToyCloudSaveRecord;
      }
    } catch {
      // fall back to localStorage
    }
  }

  try {
    const local = localStorage.getItem(USER_SAVE_KEY);
    return local ? (JSON.parse(local) as ToyCloudSaveRecord) : null;
  } catch {
    return null;
  }
}

/**
 * 记录并拉取全站共享统计数据（用于展示同频旅人比例）
 */
export async function syncGlobalArchetypeStats(
  archetypeId: string
): Promise<GlobalArchetypeStats> {
  const sdk = getNativeSdk();

  if (sdk?.loadSharedStorage && sdk?.saveSharedStorage) {
    try {
      const res = await sdk.loadSharedStorage({ key: SHARED_STATS_KEY });
      const counts: Record<string, number> = res?.value
        ? JSON.parse(res.value)
        : { ...DEFAULT_GLOBAL_COUNTS };
      counts[archetypeId] = (counts[archetypeId] ?? 0) + 1;

      await sdk.saveSharedStorage({
        key: SHARED_STATS_KEY,
        value: JSON.stringify(counts),
      });

      const totalTested = Object.values(counts).reduce((a, b) => a + b, 0);
      return { totalTested, counts, source: 'bilibili-toy-cloud' };
    } catch {
      // fall back to local
    }
  }

  let counts: Record<string, number> = { ...DEFAULT_GLOBAL_COUNTS };
  try {
    const localRaw = localStorage.getItem(SHARED_STATS_KEY);
    if (localRaw) {
      counts = { ...DEFAULT_GLOBAL_COUNTS, ...JSON.parse(localRaw) };
    }
    counts[archetypeId] = (counts[archetypeId] ?? 0) + 1;
    localStorage.setItem(SHARED_STATS_KEY, JSON.stringify(counts));
  } catch {
    counts[archetypeId] = (counts[archetypeId] ?? 0) + 1;
  }

  const totalTested = Object.values(counts).reduce((a, b) => a + b, 0);
  return { totalTested, counts, source: 'local-fallback' };
}
