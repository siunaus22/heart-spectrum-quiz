import { useEffect, useState } from 'react';
import {
  ARCHETYPES,
  QUIZ_QUESTIONS,
  calculateDiagnosis,
  type DiagnosisResult,
  type QuizOption,
} from './data/quizData';
import {
  initBilibiliToySdk,
  loadDiagnosisFromCloud,
  saveDiagnosisToCloud,
  syncGlobalArchetypeStats,
  type GlobalArchetypeStats,
  type ToyCloudSaveRecord,
} from './services/bilibiliToySdk';
import { CoverPage } from './components/CoverPage';
import { QuizPage } from './components/QuizPage';
import { AnalyzingPage } from './components/AnalyzingPage';
import { ResultPage } from './components/ResultPage';

type Stage = 'cover' | 'quiz' | 'analyzing' | 'result';

export function App() {
  const [stage, setStage] = useState<Stage>('cover');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<QuizOption[]>([]);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [savedRecord, setSavedRecord] = useState<ToyCloudSaveRecord | null>(null);
  const [globalStats, setGlobalStats] = useState<GlobalArchetypeStats | null>(null);
  const [cloudSynced, setCloudSynced] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      await initBilibiliToySdk('heart-spectrum-quiz');
      const prev = await loadDiagnosisFromCloud();
      if (active && prev) {
        setSavedRecord(prev);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleStart = () => {
    setAnswers([]);
    setCurrentIdx(0);
    setResult(null);
    setStage('quiz');
  };

  const handleSelectOption = (option: QuizOption) => {
    const nextAnswers = [...answers];
    nextAnswers[currentIdx] = option;
    setAnswers(nextAnswers);

    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      window.setTimeout(() => {
        setCurrentIdx((prev) => prev + 1);
      }, 180);
    } else {
      setStage('analyzing');
      const diagnosis = calculateDiagnosis(nextAnswers);

      window.setTimeout(async () => {
        setResult(diagnosis);
        const record: ToyCloudSaveRecord = {
          archetypeId: diagnosis.archetype.id,
          archetypeTitle: diagnosis.archetype.title,
          dimensions: diagnosis.dimensions,
          heartRateBpm: diagnosis.heartRateBpm,
          updatedAt: new Date().toISOString(),
        };

        const [saveRes, stats] = await Promise.all([
          saveDiagnosisToCloud(record),
          syncGlobalArchetypeStats(diagnosis.archetype.id),
        ]);

        setSavedRecord(record);
        setCloudSynced(saveRes.ok);
        setGlobalStats(stats);
        setStage('result');
      }, 2200);
    }
  };

  const handleBack = () => {
    if (currentIdx === 0) {
      setStage('cover');
    } else {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleRestoreSaved = async () => {
    if (!savedRecord) return;
    const arch = ARCHETYPES.find((a) => a.id === savedRecord.archetypeId) ?? ARCHETYPES[0];
    const restored: DiagnosisResult = {
      archetype: arch,
      dimensions: savedRecord.dimensions,
      ingredients: arch.ingredients,
      heartRateBpm: savedRecord.heartRateBpm,
      matchScore: 95,
    };
    setResult(restored);
    const stats = await syncGlobalArchetypeStats(arch.id);
    setGlobalStats(stats);
    setCloudSynced(true);
    setStage('result');
  };

  if (stage === 'cover') {
    return (
      <CoverPage
        onStart={handleStart}
        savedRecord={savedRecord}
        onRestoreSaved={handleRestoreSaved}
      />
    );
  }

  if (stage === 'quiz') {
    return (
      <QuizPage
        question={QUIZ_QUESTIONS[currentIdx]}
        currentIndex={currentIdx}
        total={QUIZ_QUESTIONS.length}
        selectedOptionId={answers[currentIdx]?.id}
        onSelect={handleSelectOption}
        onBack={handleBack}
      />
    );
  }

  if (stage === 'analyzing') {
    return <AnalyzingPage />;
  }

  if (stage === 'result' && result) {
    return (
      <ResultPage
        result={result}
        globalStats={globalStats}
        cloudSynced={cloudSynced}
        onRestart={handleStart}
      />
    );
  }

  return null;
}

export default App;
