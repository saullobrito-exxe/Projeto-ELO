import React, { useState } from 'react';
import { TimelineEvent, DriveAsset } from '../types';
import {
  X,
  Calendar,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  Video,
  ShieldAlert,
  Link2,
  CheckCircle2,
  FileText,
  Quote,
  Sparkles,
} from 'lucide-react';
import { POLARITY_LABELS, CHANNEL_LABELS } from '../lib/sentiment';

interface EventDrawerProps {
  event: TimelineEvent | null;
  onClose: () => void;
  onNextEvent?: () => void;
  onPrevEvent?: () => void;
  onOpenVideoPlayer: (asset: DriveAsset) => void;
}

export const EventDrawer: React.FC<EventDrawerProps> = ({
  event,
  onClose,
  onNextEvent,
  onPrevEvent,
  onOpenVideoPlayer,
}) => {
  if (!event) return null;

  const [activeSection, setActiveSection] = useState<
    'fato' | 'fontes' | 'midia' | 'sentimento' | 'rastreio'
  >('fato');

  const dominant = event.sentimentOverview?.dominant;
  const sentimentMeta = dominant ? POLARITY_LABELS[dominant] : null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-2xl bg-[#FBF9F5] h-full shadow-2xl flex flex-col border-l border-stone-200 overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 bg-white">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
              <span className="font-semibold text-stone-900 tabular-nums">{event.eventDate}</span>
              {event.dateApproximated && <span className="text-amber-800 italic">(data aprox.)</span>}
              <span aria-hidden="true">·</span>
              <span className="truncate max-w-[200px]">{event.topicName}</span>
            </div>

            <div className="flex items-center gap-1">
              {onPrevEvent && (
                <button
                  onClick={onPrevEvent}
                  className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors"
                  title="Acontecimento anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              {onNextEvent && (
                <button
                  onClick={onNextEvent}
                  className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors"
                  title="Próximo acontecimento"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors ml-2"
                title="Fechar painel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Demarcation Tags Ribbon */}
          {event.demarcationTags && event.demarcationTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
              {event.demarcationTags.map((dt) => (
                <span
                  key={dt.id}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${dt.colorClass}`}
                >
                  {dt.label}
                </span>
              ))}
            </div>
          )}

          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 mb-2 leading-tight">
            {event.title}
          </h2>

          <div className="flex items-center gap-2 mb-3 text-[11px] text-stone-500 font-mono">
            <span>Caminho: {event.folderPath || 'Redes Sociais e Imprensa'}</span>
            <span aria-hidden="true">·</span>
            <a
              href="https://drive.google.com/drive/u/0/folders/1uJOTlvp4Bex2sjHsYW1ZqIDc7nVTIZbw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-900 hover:underline inline-flex items-center gap-0.5 font-sans font-medium"
            >
              <span>Abrir no Drive Raiz</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-1 border-b border-stone-200 pt-3 overflow-x-auto scrollbar-none text-xs">
            <button
              onClick={() => setActiveSection('fato')}
              className={`pb-2 px-2.5 font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeSection === 'fato'
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              O que aconteceu & Contexto
            </button>
            <button
              onClick={() => setActiveSection('fontes')}
              className={`pb-2 px-2.5 font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeSection === 'fontes'
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              O que dizem as fontes ({event.sources.length})
            </button>
            <button
              onClick={() => setActiveSection('midia')}
              className={`pb-2 px-2.5 font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeSection === 'midia'
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Vídeos & Documentos ({event.assets.length})
            </button>
            <button
              onClick={() => setActiveSection('sentimento')}
              className={`pb-2 px-2.5 font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeSection === 'sentimento'
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Sentimento Fundamentado
            </button>
            <button
              onClick={() => setActiveSection('rastreio')}
              className={`pb-2 px-2.5 font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeSection === 'rastreio'
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Rastreabilidade & Provas
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* SECTION 1: FATO & CONTEXTO */}
          {activeSection === 'fato' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-2">
                  Resumo Factual
                </h4>
                <p className="text-stone-800 text-sm leading-relaxed font-serif">
                  {event.summary}
                </p>
              </div>

              {event.detailedContext && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-2">
                    Contexto Investigativo do Documentário
                  </h4>
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    {event.detailedContext}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-white rounded-lg border border-stone-200 text-xs">
                <div>
                  <span className="font-semibold text-stone-700 block mb-1">
                    Personagens Identificados:
                  </span>
                  <div className="text-stone-600 space-y-0.5">
                    {event.characters.map((c) => (
                      <div key={c}>· {c}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-stone-700 block mb-1">
                    Instituições Envolvidas:
                  </span>
                  <div className="text-stone-600 space-y-0.5">
                    {event.institutions.map((i) => (
                      <div key={i}>· {i}</div>
                    ))}
                  </div>
                </div>
              </div>

              {event.location && (
                <div className="text-xs text-stone-600 flex items-center gap-1.5">
                  <span className="font-semibold text-stone-700">Locação / Cidade:</span>
                  <span>{event.location}</span>
                </div>
              )}

              {/* Conexões sugeridas */}
              {event.suggestedConnections && event.suggestedConnections.length > 0 && (
                <div className="pt-4 border-t border-stone-200">
                  <h4 className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-2 flex items-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5" />
                    <span>Conexões Editoriais Sugeridas</span>
                  </h4>
                  <div className="space-y-2">
                    {event.suggestedConnections.map((conn, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-stone-100/70 border border-stone-200 rounded text-xs space-y-1"
                      >
                        <div className="font-medium text-stone-900">
                          {conn.targetEventTitle}
                        </div>
                        <p className="text-stone-600">{conn.reason}</p>
                        <div className="text-[10px] text-stone-500">
                          Status: {conn.status === 'confirmada' ? 'Confirmada documentalmente' : 'Sugerida para revisão'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION 2: O QUE DIZEM AS FONTES */}
          {activeSection === 'fontes' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-500 mb-2">
                Fontes originais vinculadas a esta ocorrência na planilha temática de monitoramento:
              </div>

              {event.sources.map((src) => (
                <div
                  key={src.id}
                  className="bg-white border border-stone-200 rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-medium text-stone-800">
                      {src.outletOrAuthor}
                    </span>
                    <span className="tabular-nums">{src.publishDate}</span>
                  </div>

                  <h5 className="font-serif font-semibold text-sm text-stone-900">
                    {src.title}
                  </h5>

                  <p className="text-stone-600 text-xs leading-relaxed">
                    {src.summary}
                  </p>

                  {src.sheetReference && (
                    <div className="text-[11px] font-mono text-stone-500 flex items-center gap-1">
                      <FileSpreadsheet className="w-3 h-3 text-stone-400" />
                      <span>{src.sheetReference}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-stone-500 uppercase">
                      Tipo: {src.type}
                    </span>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-900 hover:underline font-medium inline-flex items-center gap-1"
                    >
                      <span>Abrir fonte original</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 3: VÍDEOS & DOCUMENTOS */}
          {activeSection === 'midia' && (
            <div className="space-y-4">
              {event.assets.length === 0 ? (
                <div className="bg-white border border-stone-200 rounded-lg p-6 text-center text-xs text-stone-500">
                  Nenhum arquivo bruto de vídeo ou documento diretamente associado a este evento na pasta do Drive.
                </div>
              ) : (
                event.assets.map((ast) => (
                  <div
                    key={ast.id}
                    className="bg-white border border-stone-200 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 font-medium text-amber-900">
                        <Video className="w-3.5 h-3.5" />
                        <span>Vídeo MP4 ({ast.videoDuration || 'Registro'})</span>
                      </span>
                      <span className="tabular-nums text-stone-500">{ast.sizeFormatted}</span>
                    </div>

                    <h5 className="font-semibold text-sm text-stone-900">
                      {ast.name}
                    </h5>

                    {ast.synopsis && (
                      <p className="text-stone-600 text-xs leading-relaxed">
                        {ast.synopsis}
                      </p>
                    )}

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        onClick={() => onOpenVideoPlayer(ast)}
                        className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded transition-colors"
                      >
                        Reproduzir no Player Integrado
                      </button>

                      <a
                        href={ast.webViewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-amber-900 hover:underline inline-flex items-center gap-1 font-medium"
                      >
                        <span>Abrir no Google Drive</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* SECTION 4: ANÁLISE DE SENTIMENTO FUNDAMENTADA */}
          {activeSection === 'sentimento' && (
            <div className="space-y-6">
              <div className="bg-white border border-stone-200 rounded-lg p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <span className="text-xs font-semibold text-stone-700">
                    Polaridade Dominante Fundamentada:
                  </span>
                  {dominant && (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${sentimentMeta?.borderClass} ${sentimentMeta?.textClass} ${sentimentMeta?.bgClass}`}>
                      {sentimentMeta?.label}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {event.sources
                    .filter((s) => s.sentiment)
                    .map((s) => {
                      const sent = s.sentiment!;
                      const pol = POLARITY_LABELS[sent.polarity];

                      return (
                        <div
                          key={sent.id}
                          className="p-3.5 bg-stone-50 rounded border border-stone-200 text-xs space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-stone-800">
                              {CHANNEL_LABELS[sent.channel]} · {sent.authorOrOutlet}
                            </span>
                            <span className={`font-semibold ${pol.textClass}`}>
                              {pol.label} ({sent.confidence}%)
                            </span>
                          </div>

                          <div className="text-stone-600">
                            <strong>Alvo explícito:</strong> {sent.target}
                          </div>

                          <div className="p-2.5 bg-white rounded border border-stone-200 italic font-serif text-stone-800">
                            "{sent.evidenceQuote}"
                          </div>

                          <div className="text-[10px] text-stone-400">
                            Revisão humana registrada: {sent.isHumanReviewed ? 'Sim (Auditado)' : 'Pendente de validação'}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: RASTREABILIDADE */}
          {activeSection === 'rastreio' && (
            <div className="space-y-4 text-xs">
              <div className="bg-white border border-stone-200 rounded-lg p-4 space-y-3">
                <div className="font-semibold text-stone-800 text-sm">
                  Cadeia de Custódia e Proveniência Documental
                </div>
                <div className="space-y-2 text-stone-600">
                  <div>
                    <strong>Caminho da Pasta:</strong> {event.folderPath || 'Acervo ELO'}
                  </div>
                  <div>
                    <strong>Identificador Único (ID Estável):</strong>{' '}
                    <span className="font-mono">{event.id}</span>
                  </div>
                  <div>
                    <strong>Status Editorial:</strong>{' '}
                    <span className="font-mono uppercase">{event.editorialStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
