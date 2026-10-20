import React, { useState } from 'react';
import { ResearchTopic, TimelineEvent } from '../types';
import {
  Calendar,
  Layers,
  Search,
  ExternalLink,
  Video,
  FileText,
  Clock,
  ArrowRight,
  Sparkles,
  BarChart3,
  Quote,
} from 'lucide-react';
import { DRIVE_CONFIG } from '../lib/drive/config';
import { POLARITY_LABELS } from '../lib/sentiment';

interface PressSocialTabProps {
  topics: ResearchTopic[];
  events: TimelineEvent[];
  onSelectEvent: (event: TimelineEvent) => void;
  onSelectTopic: (topic: ResearchTopic) => void;
}

export const PressSocialTab: React.FC<PressSocialTabProps> = ({
  topics,
  events,
  onSelectEvent,
  onSelectTopic,
}) => {
  const [viewMode, setViewMode] = useState<'timeline' | 'topics' | 'sentiment'>('timeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('all');
  const [preambleOnly, setPreambleOnly] = useState(false);

  // Filtra eventos da timeline
  const filteredEvents = events.filter((evt) => {
    if (selectedTopicFilter !== 'all' && evt.topicId !== selectedTopicFilter) return false;
    if (preambleOnly && !evt.isPreambleRelated) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = evt.title.toLowerCase().includes(q);
      const matchSummary = evt.summary.toLowerCase().includes(q);
      const matchTags = evt.tags.some((t) => t.toLowerCase().includes(q));
      const matchPeople = evt.characters.some((c) => c.toLowerCase().includes(q));
      return matchTitle || matchSummary || matchTags || matchPeople;
    }

    return true;
  });

  // Filtra tópicos
  const filteredTopics = topics.filter((t) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.folderName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans mb-1.5">
          <span>Aba 02 · ID {DRIVE_CONFIG.tabs.imprensa_redes.id}</span>
          <span aria-hidden="true">/</span>
          <span>20 Pastas Temáticas Pesquisadas</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 mb-2">
              Redes Sociais e Imprensa
            </h2>
            <p className="text-stone-600 text-sm max-w-3xl leading-relaxed">
              Consolidação de 20 pesquisas temáticas sobre os 4 anos de mandato, integrando planilhas de monitoramento (com todas as abas lidas), notícias de veículos de imprensa, manifestações populares em redes sociais e vídeos apurados.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                viewMode === 'timeline'
                  ? 'bg-stone-900 text-stone-50 shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Linha do Tempo</span>
            </button>
            <button
              onClick={() => setViewMode('topics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                viewMode === 'topics'
                  ? 'bg-stone-900 text-stone-50 shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>20 Temas</span>
            </button>
            <button
              onClick={() => setViewMode('sentiment')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                viewMode === 'sentiment'
                  ? 'bg-stone-900 text-stone-50 shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Panorama de Sentimento</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search & Topic Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-3 rounded-lg border border-stone-200 mb-8">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por termo, manchete, personagem, instituição ou hashtag..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-transparent border-0 focus:outline-none focus:ring-0 text-stone-900 placeholder:text-stone-400"
          />
        </div>

        {viewMode === 'timeline' && (
          <div className="flex flex-wrap items-center gap-2 border-t sm:border-t-0 sm:border-l border-stone-200 pt-2 sm:pt-0 sm:pl-3">
            <select
              value={selectedTopicFilter}
              onChange={(e) => setSelectedTopicFilter(e.target.value)}
              className="text-xs bg-stone-50 border border-stone-200 rounded px-2.5 py-1 text-stone-800 focus:outline-none"
            >
              <option value="all">Todos os Temas ({topics.length})</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.folderName}
                </option>
              ))}
            </select>

            <button
              onClick={() => setPreambleOnly(!preambleOnly)}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                preambleOnly
                  ? 'bg-amber-900 text-amber-50 font-medium'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Somente Preâmbulo
            </button>
          </div>
        )}
      </div>

      {/* Demarcation Filter Ribbon */}
      <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 sm:p-4 mb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-stone-800 uppercase tracking-wider font-sans text-[11px]">
            Filtrar por Tags Demarcadoras:
          </span>
          <a
            href="https://drive.google.com/drive/u/0/folders/1uJOTlvp4Bex2sjHsYW1ZqIDc7nVTIZbw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-900 hover:underline inline-flex items-center gap-1 font-medium text-[11px]"
          >
            <span>Pasta Raiz no Drive (1uJOTlvp4...)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTopicFilter('all');
              setPreambleOnly(false);
            }}
            className="px-2.5 py-1 rounded bg-stone-900 text-stone-50 font-medium transition-colors"
          >
            Todos os Acontecimentos
          </button>
          <button
            onClick={() => setSearchQuery('Posse')}
            className="px-2.5 py-1 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 transition-colors"
          >
            1º Ano · Posse & Choque
          </button>
          <button
            onClick={() => setSearchQuery('CPI')}
            className="px-2.5 py-1 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 transition-colors"
          >
            2º Ano · CPI da Saúde
          </button>
          <button
            onClick={() => setSearchQuery('B3')}
            className="px-2.5 py-1 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 transition-colors"
          >
            3º Ano · Leilão B3 Saneamento
          </button>
          <button
            onClick={() => setSearchQuery('STF')}
            className="px-2.5 py-1 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 transition-colors"
          >
            4º Ano · Royalties & STF
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: TIMELINE CRONOLÓGICA */}
      {viewMode === 'timeline' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500 font-sans pb-2 border-b border-stone-100">
            <span>Sequência cronológica unificada com tags demarcadoras</span>
            <span className="tabular-nums font-medium text-stone-700">
              {filteredEvents.length} acontecimentos catalogados
            </span>
          </div>

          <div className="relative border-l border-stone-200 pl-6 sm:pl-8 space-y-8 ml-2 sm:ml-4">
            {filteredEvents.map((evt) => {
              const dominantSentiment = evt.sentimentOverview?.dominant;
              const sentimentBadge = dominantSentiment ? POLARITY_LABELS[dominantSentiment] : null;

              return (
                <div key={evt.id} className="relative group">
                  {/* Timeline point */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-stone-900 border-2 border-[#FBF9F5] shadow-xs group-hover:scale-125 transition-transform" />

                  <div className="bg-white border border-stone-200 hover:border-stone-400 rounded-lg p-5 sm:p-6 transition-all shadow-xs">
                    {/* Demarcation Tags Ribbon (Fase, Eixo, Tipo, Custódia) */}
                    {evt.demarcationTags && evt.demarcationTags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        {evt.demarcationTags.map((dt) => (
                          <span
                            key={dt.id}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-tight ${dt.colorClass}`}
                            title={`Categoria: ${dt.category}`}
                          >
                            {dt.label}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Card Top Metadata without Pills */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium text-stone-900 tabular-nums">
                          {evt.eventDate}
                        </span>
                        {evt.dateApproximated && (
                          <span className="text-[11px] text-amber-800 italic">
                            (data aproximada)
                          </span>
                        )}
                        <span aria-hidden="true">·</span>
                        <span className="text-stone-600 truncate max-w-[200px] sm:max-w-none">
                          {evt.topicName}
                        </span>
                      </div>

                      {evt.isPreambleRelated && (
                        <span className="text-[11px] font-serif italic text-amber-900 font-medium">
                          Marco do Preâmbulo
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onSelectEvent(evt)}
                      className="font-serif text-lg sm:text-xl font-semibold text-stone-900 hover:text-amber-800 cursor-pointer transition-colors mb-2.5"
                    >
                      {evt.title}
                    </h3>

                    {/* Factual Summary */}
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {evt.summary}
                    </p>

                    {/* Rigorous Evidence & Sentiment Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-stone-50 rounded-md border border-stone-100 text-xs mb-4">
                      {/* Press side */}
                      <div>
                        <div className="font-medium text-stone-800 mb-1 flex items-center justify-between">
                          <span>Imprensa ({evt.sources.filter((s) => s.type === 'noticia').length})</span>
                          {dominantSentiment && (
                            <span className={sentimentBadge?.textClass}>
                              {dominantSentiment.toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="text-stone-600 text-[11px]">
                          {evt.sources.find((s) => s.type === 'noticia')?.outletOrAuthor || 'Fontes jornalísticas checadas'}
                        </div>
                      </div>

                      {/* Social side */}
                      <div>
                        <div className="font-medium text-stone-800 mb-1">
                          Redes Sociais ({evt.sources.filter((s) => s.type === 'rede_social').length})
                        </div>
                        <div className="text-stone-600 text-[11px]">
                          Repercussão pública separada da cobertura editorial
                        </div>
                      </div>
                    </div>

                    {/* Card Footer: Tags & Drawer Trigger */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-stone-500">
                        {evt.tags.map((tag, idx) => (
                          <React.Fragment key={tag}>
                            <button
                              onClick={() => setSearchQuery(tag)}
                              className="hover:text-stone-900 cursor-pointer text-stone-600"
                            >
                              #{tag}
                            </button>
                            {idx < evt.tags.length - 1 && <span aria-hidden="true">·</span>}
                          </React.Fragment>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        {evt.assets.length > 0 && (
                          <span className="flex items-center gap-1 text-amber-900 text-xs font-medium">
                            <Video className="w-3 h-3" />
                            <span>{evt.assets.length} Vídeo</span>
                          </span>
                        )}

                        <button
                          onClick={() => onSelectEvent(evt)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-50 rounded text-xs font-medium transition-colors"
                        >
                          <span>Abrir Dossiê do Fato</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: EXPLORAÇÃO DOS 20 TEMAS */}
      {viewMode === 'topics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white border border-stone-200 hover:border-stone-400 rounded-lg p-6 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span className="font-mono">Tema {String(topic.topicNumber).padStart(2, '0')}</span>
                  <span className="tabular-nums">{topic.timeframe}</span>
                </div>

                <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2">
                  {topic.title}
                </h3>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {topic.summary}
                </p>

                {topic.monitoringSheetName && (
                  <div className="text-[11px] text-stone-500 font-mono mb-4 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-stone-400" />
                    <span>Planilha: {topic.monitoringSheetName}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-stone-500">
                  <span className="tabular-nums">{topic.eventsCount} eventos</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{topic.sourcesCount} fontes</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{topic.videosCount} vídeos</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedTopicFilter(topic.id);
                    setViewMode('timeline');
                  }}
                  className="text-stone-900 hover:text-amber-800 font-medium inline-flex items-center gap-1 transition-colors"
                >
                  <span>Ver na Linha do Tempo</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW MODE 3: PANORAMA DE SENTIMENTO */}
      {viewMode === 'sentiment' && (
        <div className="space-y-8">
          {/* Methodology Banner */}
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 font-sans font-semibold mb-2">
              <Quote className="w-4 h-4 text-stone-600" />
              <span>Diretriz Metodológica de Sentimento da Plataforma ELO</span>
            </div>
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed mb-4 font-serif">
              A análise de sentimento é calibrada por unidade individual de evidência textual citada, separando estritamente a postura da imprensa das manifestações públicas nas redes sociais. 
              Posicionamentos oficiais do governo são catalogados como declarações institucionais e não alteram a percepção externa.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-stone-200 text-xs text-stone-600">
              <div>
                <strong>Imprensa:</strong> Tom editorial, manchetes e contextualização investigativa em veículos jornalísticos.
              </div>
              <div>
                <strong>Redes Sociais:</strong> Comentários, reações e engajamento orgânico de cidadãos em plataformas sociais.
              </div>
              <div>
                <strong>Institucional:</strong> Notas de esclarecimento, pronunciamentos e publicações em Diário Oficial.
              </div>
            </div>
          </div>

          {/* Table Breakdown by Theme */}
          <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-stone-200 font-serif font-semibold text-stone-900 text-base">
              Distribuição por Tema Pesquisado
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 border-b border-stone-200 uppercase font-sans">
                  <tr>
                    <th className="py-3 px-4">Tema</th>
                    <th className="py-3 px-4">Período</th>
                    <th className="py-3 px-4">Imprensa</th>
                    <th className="py-3 px-4">Redes Sociais</th>
                    <th className="py-3 px-4">Amostra Analisada</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {topics.map((t) => (
                    <tr key={t.id} className="hover:bg-stone-50/50">
                      <td className="py-3 px-4 font-medium text-stone-900">
                        {t.folderName}
                      </td>
                      <td className="py-3 px-4 font-mono text-stone-500 tabular-nums">
                        {t.timeframe}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${POLARITY_LABELS[t.sentimentSummary.pressPolarity].textClass}`}>
                          {POLARITY_LABELS[t.sentimentSummary.pressPolarity].label}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${POLARITY_LABELS[t.sentimentSummary.socialPolarity].textClass}`}>
                          {POLARITY_LABELS[t.sentimentSummary.socialPolarity].label}
                        </span>
                      </td>
                      <td className="py-3 px-4 tabular-nums text-stone-600">
                        {t.sentimentSummary.totalSampled} registros
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
