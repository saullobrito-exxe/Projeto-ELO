import React from 'react';
import { TabType, SyncStats } from '../types';
import {
  Landmark,
  Newspaper,
  Camera,
  ArrowRight,
  Clock,
  ExternalLink,
  FolderOpen,
  CheckCircle2,
} from 'lucide-react';
import { DRIVE_CONFIG } from '../lib/drive/config';

interface WelcomeViewProps {
  onSelectTab: (tab: TabType) => void;
  onOpenPreamble: () => void;
  onOpenSyncModal: () => void;
  syncStats: SyncStats;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  onSelectTab,
  onOpenPreamble,
  onOpenSyncModal,
  syncStats,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Brand Hero Header com a Logo Oficial Anexada */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-10 mb-8 shadow-xs text-center flex flex-col items-center">
        <div className="mb-4">
          <img
            src="/logo_elo.jpeg"
            alt="ELO — Plataforma de Pesquisa e Inteligência Governamental"
            className="h-16 sm:h-20 w-auto object-contain mx-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.src.includes('WhatsApp')) {
                target.src = '/assets/aistudio/WhatsApp_Image_2026-10-20_at_12.10.09_52048c33.jpeg';
              }
            }}
          />
        </div>

        <div className="text-xs uppercase tracking-widest text-amber-900 font-sans font-semibold mb-2">
          Documentário de Longa Metragem · FSB Inteligência
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl font-semibold tracking-tight text-stone-900 mb-3">
          Última Instância — Ricardo Couto
        </h1>

        <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-serif">
          Ambiente central de inteligência e pesquisa factual. Curadoria dos marcos da gestão, 
          acervo de documentos oficiais, monitoramento de imprensa e locações de filmagem.
        </p>
      </div>

      {/* CONEXÃO DIRETA CONFORME A PASTA RAIZ DO DRIVE */}
      <div className="bg-stone-900 text-stone-100 rounded-xl p-5 sm:p-6 mb-8 shadow-sm border border-stone-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold uppercase tracking-wider">Google Drive Conectado</span>
            </div>
            <div className="font-serif text-base sm:text-lg font-medium text-white">
              Pasta Raiz Oficial: ELO
            </div>
            <p className="text-xs text-stone-300 font-sans">
              ID da Pasta Raiz: <code className="font-mono text-amber-300 bg-stone-800 px-1.5 py-0.5 rounded">1uJOTlvp4Bex2sjHsYW1ZqIDc7nVTIZbw</code>
            </p>
          </div>

          <a
            href={DRIVE_CONFIG.rootFolderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <span>Abrir Pasta Raiz no Drive</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Subpastas Vinculadas Diretamente à Pasta Raiz */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
          <a
            href={DRIVE_CONFIG.tabs.governo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-stone-950/80 hover:bg-stone-800 border border-stone-800 rounded-lg flex items-center justify-between transition-colors group cursor-pointer"
          >
            <div className="truncate pr-2">
              <span className="text-[10px] text-stone-400 font-mono block">Raiz / Subpasta 01</span>
              <span className="text-xs font-medium text-stone-200 group-hover:text-amber-400 truncate block">
                Arquivos do Governo
              </span>
            </div>
            <FolderOpen className="w-4 h-4 text-stone-500 group-hover:text-amber-400 shrink-0" />
          </a>

          <a
            href={DRIVE_CONFIG.tabs.imprensa_redes.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-stone-950/80 hover:bg-stone-800 border border-stone-800 rounded-lg flex items-center justify-between transition-colors group cursor-pointer"
          >
            <div className="truncate pr-2">
              <span className="text-[10px] text-stone-400 font-mono block">Raiz / Subpasta 02</span>
              <span className="text-xs font-medium text-stone-200 group-hover:text-amber-400 truncate block">
                Redes & Imprensa
              </span>
            </div>
            <FolderOpen className="w-4 h-4 text-stone-500 group-hover:text-amber-400 shrink-0" />
          </a>

          <a
            href={DRIVE_CONFIG.tabs.locacoes.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-stone-950/80 hover:bg-stone-800 border border-stone-800 rounded-lg flex items-center justify-between transition-colors group cursor-pointer"
          >
            <div className="truncate pr-2">
              <span className="text-[10px] text-stone-400 font-mono block">Raiz / Subpasta 03</span>
              <span className="text-xs font-medium text-stone-200 group-hover:text-amber-400 truncate block">
                Ambientações e Locações
              </span>
            </div>
            <FolderOpen className="w-4 h-4 text-stone-500 group-hover:text-amber-400 shrink-0" />
          </a>
        </div>
      </div>

      {/* AS 4 ÁREAS RELEVANTES — NAVEGAÇÃO LIMPA E DIRETA */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-sans font-semibold">
            Navegação Principal do Projeto:
          </div>
          <span className="text-xs text-stone-500 font-mono">
            {syncStats.totalAssets} arquivos catalogados
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: Linha do Tempo */}
          <div
            onClick={() => onSelectTab('linha_do_tempo')}
            className="bg-white border-2 border-amber-200/90 hover:border-amber-400 rounded-xl p-5 transition-all shadow-xs group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-900 text-amber-50 uppercase">
                  Central
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-1 group-hover:text-amber-900 transition-colors">
                Linha do Tempo — Marcos da Gestão
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed mb-3 font-serif">
                Reconstituição dos 10 marcos estruturantes: alívio de R$ 42,1 bi na dívida (Propag), choque de gestão (6,5 mil exonerações), Refit, ICMS recorde (+17,8%) e segurança.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs font-semibold text-amber-900">
              <span>Ver marcos e vídeos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Arquivos do Governo */}
          <div
            onClick={() => onSelectTab('governo')}
            className="bg-white border border-stone-200 hover:border-stone-400 rounded-xl p-5 transition-all shadow-xs group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center">
                  <Landmark className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-stone-500">Eixo 01</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-1 group-hover:text-amber-900 transition-colors">
                Arquivos do Governo
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed mb-3 font-serif">
                Dossiês normativos essenciais: decretos de exoneração, termo de adesão ao Propag com Ministério da Fazenda e memoriais da PGE perante o STF.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs font-medium text-stone-700 group-hover:text-stone-900">
              <span>Consultar atos oficiais</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Redes & Imprensa */}
          <div
            onClick={() => onSelectTab('imprensa_redes')}
            className="bg-white border border-stone-200 hover:border-stone-400 rounded-xl p-5 transition-all shadow-xs group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center">
                  <Newspaper className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-stone-500">Eixo 02</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-1 group-hover:text-amber-900 transition-colors">
                Redes Sociais e Imprensa
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed mb-3 font-serif">
                Monitoramento dos temas de maior impacto, balanço de sentimento calibrado com evidências textuais e rastreabilidade até as planilhas do Drive.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs font-medium text-stone-700 group-hover:text-stone-900">
              <span>Explorar repercussão</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Locações */}
          <div
            onClick={() => onSelectTab('locacoes')}
            className="bg-white border border-stone-200 hover:border-stone-400 rounded-xl p-5 transition-all shadow-xs group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-stone-500">Eixo 03</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-1 group-hover:text-amber-900 transition-colors">
                Ambientações e Locações
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed mb-3 font-serif">
                Catálogo de produção para filmagens: ALERJ, Palácio Laranjeiras, Refinaria Manguinhos, Instituto do Cérebro e tribunais superiores.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs font-medium text-stone-700 group-hover:text-stone-900">
              <span>Ver catálogo de cenas</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé de Ações Diretas */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPreamble}
            className="hover:text-stone-900 underline underline-offset-4 cursor-pointer"
          >
            Consultar Preâmbulo Editorial
          </button>
          <span>·</span>
          <button
            onClick={onOpenSyncModal}
            className="hover:text-stone-900 underline underline-offset-4 cursor-pointer"
          >
            Verificar Conexão e Integridade do Drive
          </button>
        </div>

        <div className="font-mono text-[11px] text-stone-400 hidden sm:block">
          ELO V1 · FSB Inteligência Governamental
        </div>
      </div>
    </div>
  );
};
