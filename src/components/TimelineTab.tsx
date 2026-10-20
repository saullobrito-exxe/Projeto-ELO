import React, { useState } from 'react';
import { ManagementMilestone } from '../types';
import {
  Calendar,
  Search,
  Video,
  Play,
  ExternalLink,
  TrendingUp,
  Clock,
  Layers,
  CheckCircle2,
  Filter,
} from 'lucide-react';

interface TimelineTabProps {
  milestones: ManagementMilestone[];
  onOpenVideo: (title: string, videoUrl: string, duration?: string, synopsis?: string) => void;
}

// Macro-pilares claros para navegação objetiva (substitui as 15 categorias fragmentadas)
const TIMELINE_PILLARS = [
  { id: 'all', label: 'Todos os Marcos Relevantes' },
  { id: 'fiscal', label: 'Propag & Finanças Públicas' },
  { id: 'reforma', label: 'Reforma & Gestão' },
  { id: 'seguranca', label: 'Segurança & Justiça' },
  { id: 'social', label: 'Saúde & Servidores' },
];

export const TimelineTab: React.FC<TimelineTabProps> = ({ milestones, onOpenVideo }) => {
  const [selectedPillar, setSelectedPillar] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtra e prioriza os marcos mais relevantes da gestão
  const relevantMilestones = milestones.filter((ms) => {
    // Filtro por pilar
    if (selectedPillar === 'fiscal') {
      if (!['arrecadacao', 'economia'].includes(ms.category)) return false;
    } else if (selectedPillar === 'reforma') {
      if (!['administracao', 'transparencia', 'cedae'].includes(ms.category)) return false;
    } else if (selectedPillar === 'seguranca') {
      if (!['seguranca', 'pge'].includes(ms.category)) return false;
    } else if (selectedPillar === 'social') {
      if (!['saude', 'servidor', 'ciencia'].includes(ms.category)) return false;
    }

    // Busca textual
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ms.title.toLowerCase().includes(q);
      const matchSummary = ms.summary.toLowerCase().includes(q);
      const matchTags = ms.tags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchSummary || matchTags;
    }

    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header Conciso */}
      <div className="border-b border-stone-200 pb-5 mb-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans mb-1">
          <span>Marcos da Gestão Governamental</span>
          <span aria-hidden="true">/</span>
          <span>Cronologia de Resultados</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Linha do Tempo dos Marcos Estruturantes
          </h2>
          <span className="text-xs font-mono text-stone-500">
            {relevantMilestones.length} marcos em destaque
          </span>
        </div>
        <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed font-serif">
          Curadoria dos fatos mais decisivos: adesão ao Propag (-R$ 42,1 bi), choque fiscal (6,5 mil exonerações), combate à sonegação da Refit, ICMS recorde (+17,8%), 10,6 mil fuzis e expansão da saúde pública.
        </p>

        {/* 4 Métricas de Maior Impacto (Strip Limpa e Direta) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-stone-100">
          <div className="p-3 bg-white border border-stone-200 rounded-lg">
            <span className="text-[10px] text-stone-500 uppercase block font-sans">Dívida / Propag:</span>
            <span className="font-mono text-base font-bold text-emerald-800 tabular-nums">
              -R$ 42,1 bi
            </span>
          </div>

          <div className="p-3 bg-white border border-stone-200 rounded-lg">
            <span className="text-[10px] text-stone-500 uppercase block font-sans">Economia em Folha:</span>
            <span className="font-mono text-base font-bold text-stone-900 tabular-nums">
              R$ 311 mi
            </span>
          </div>

          <div className="p-3 bg-white border border-stone-200 rounded-lg">
            <span className="text-[10px] text-stone-500 uppercase block font-sans">Alta no ICMS:</span>
            <span className="font-mono text-base font-bold text-amber-800 tabular-nums">
              +17,8% (R$ 36,7 bi)
            </span>
          </div>

          <div className="p-3 bg-white border border-stone-200 rounded-lg">
            <span className="text-[10px] text-stone-500 uppercase block font-sans">Armamento Policial:</span>
            <span className="font-mono text-base font-bold text-stone-900 tabular-nums">
              10.600 fuzis
            </span>
          </div>
        </div>
      </div>

      {/* Barra de Filtros Objetiva */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6">
        {/* Pilares Temáticos */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {TIMELINE_PILLARS.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => setSelectedPillar(pillar.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                selectedPillar === pillar.id
                  ? 'bg-amber-900 text-amber-50 border-amber-900 shadow-xs'
                  : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
              }`}
            >
              {pillar.label}
            </button>
          ))}
        </div>

        {/* Busca rápida */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por termo..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-stone-200 focus:outline-none focus:border-stone-400 text-stone-900"
          />
        </div>
      </div>

      {/* Lista de Marcos em Linha do Tempo Sóbria */}
      <div className="relative border-l-2 border-amber-800/20 pl-5 sm:pl-7 space-y-6 ml-2 sm:ml-3">
        {relevantMilestones.map((ms) => (
          <div key={ms.id} className="relative group">
            {/* Ponto na timeline */}
            <div className="absolute -left-[27px] sm:-left-[35px] top-4 w-3.5 h-3.5 rounded-full bg-amber-900 border-2 border-[#FBF9F5] shadow-xs group-hover:scale-125 transition-transform" />

            <div className="bg-white border border-stone-200 hover:border-amber-400/80 rounded-xl p-5 sm:p-6 transition-all shadow-2xs space-y-3">
              {/* Topo do Marco com Data e Métrica */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-stone-100 text-stone-700">
                    {ms.categoryLabel}
                  </span>
                  <span className="text-stone-300">·</span>
                  <span className="text-xs font-mono font-semibold text-stone-600">
                    {ms.period}
                  </span>
                </div>

                {ms.impactMetric && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-950 font-semibold text-xs">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
                    <span>{ms.impactMetric.value}</span>
                    <span className="text-[11px] font-normal text-amber-800 hidden sm:inline">
                      — {ms.impactMetric.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Título do Marco */}
              <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                {ms.title}
              </h3>

              {/* Resumo Factual */}
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-serif">
                {ms.summary}
              </p>

              {/* Ações: Assistir Vídeo no Player do Site & Fonte Oficial */}
              <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  {ms.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] font-mono"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {ms.videoUrl && (
                    <button
                      onClick={() =>
                        onOpenVideo(
                          ms.title,
                          ms.videoUrl!,
                          ms.videoDuration,
                          ms.summary
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                      <Play className="w-3 h-3 fill-current text-amber-400" />
                      <span>Assistir Vídeo ({ms.videoDuration || 'Player'})</span>
                    </button>
                  )}

                  {ms.sources.length > 0 && ms.sources[0].url && (
                    <a
                      href={ms.sources[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-600 hover:text-stone-900 inline-flex items-center gap-1 text-xs py-1"
                    >
                      <span>{ms.sources[0].outlet}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
