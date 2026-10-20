import { SentimentRecord, SentimentPolarity, SentimentChannel } from '../../types';

export interface SentimentCalculation {
  totalAnalyzed: number;
  pressBreakdown: {
    total: number;
    positivo: number;
    negativo: number;
    neutro: number;
    misto: number;
    indeterminado: number;
    positivoPct: number;
    negativoPct: number;
    neutroPct: number;
  };
  socialBreakdown: {
    total: number;
    positivo: number;
    negativo: number;
    neutro: number;
    misto: number;
    indeterminado: number;
    positivoPct: number;
    negativoPct: number;
    neutroPct: number;
  };
  institutionalCount: number;
  methodologicalNotes: string[];
}

export function calculateCalibratedSentiment(records: SentimentRecord[]): SentimentCalculation {
  const press = records.filter((r) => r.channel === 'imprensa');
  const social = records.filter((r) => r.channel === 'redes');
  const institutional = records.filter((r) => r.channel === 'institucional');

  const countByPolarity = (list: SentimentRecord[]) => {
    const counts = {
      positivo: 0,
      negativo: 0,
      neutro: 0,
      misto: 0,
      indeterminado: 0,
    };
    for (const item of list) {
      if (counts[item.polarity] !== undefined) {
        counts[item.polarity]++;
      } else {
        counts.indeterminado++;
      }
    }
    const total = list.length;
    return {
      total,
      ...counts,
      positivoPct: total > 0 ? Math.round((counts.positivo / total) * 100) : 0,
      negativoPct: total > 0 ? Math.round((counts.negativo / total) * 100) : 0,
      neutroPct: total > 0 ? Math.round((counts.neutro / total) * 100) : 0,
    };
  };

  return {
    totalAnalyzed: press.length + social.length,
    pressBreakdown: countByPolarity(press),
    socialBreakdown: countByPolarity(social),
    institutionalCount: institutional.length,
    methodologicalNotes: [
      'Fontes institucionais e atos de governo são tratados como posições oficiais e não compõem o balanço de sentimento externo.',
      'Imagens de ambientação, fachada e tomadas de drone são não-aplicáveis a sentimento e foram excluídas do denominador.',
      'Cada registro requer evidência textual explícita citada e alvo identificado (Governador, Governo ou Secretaria).',
      'Matérias factuais puramente descritivas são computadas como Neutro, distinguindo-se de editoriais ou colunas de opinião.',
    ],
  };
}

export const POLARITY_LABELS: Record<SentimentPolarity, { label: string; textClass: string; borderClass: string; bgClass: string }> = {
  positivo: {
    label: 'Positivo',
    textClass: 'text-emerald-800',
    borderClass: 'border-emerald-200',
    bgClass: 'bg-emerald-50/70',
  },
  negativo: {
    label: 'Negativo',
    textClass: 'text-rose-800',
    borderClass: 'border-rose-200',
    bgClass: 'bg-rose-50/70',
  },
  neutro: {
    label: 'Neutro (Factual)',
    textClass: 'text-stone-700',
    borderClass: 'border-stone-200',
    bgClass: 'bg-stone-50/70',
  },
  misto: {
    label: 'Misto / Polarizado',
    textClass: 'text-amber-800',
    borderClass: 'border-amber-200',
    bgClass: 'bg-amber-50/70',
  },
  indeterminado: {
    label: 'Indeterminado',
    textClass: 'text-stone-500',
    borderClass: 'border-stone-200',
    bgClass: 'bg-stone-50/40',
  },
};

export const CHANNEL_LABELS: Record<SentimentChannel, string> = {
  imprensa: 'Imprensa / Veículo Jornalístico',
  redes: 'Redes Sociais / Manifestação Popular',
  institucional: 'Comunicação Oficial / Institucional',
  declaracao_terceiro: 'Declaração Atribuída a Terceiro',
};
