import React from 'react';
import { TabType, SyncStats } from '../types';
import {
  Landmark,
  Newspaper,
  Camera,
  RefreshCw,
  Search,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { DRIVE_CONFIG } from '../lib/drive/config';

interface HeaderProps {
  currentTab: TabType | 'inicio';
  onSelectTab: (tab: TabType | 'inicio') => void;
  syncStats: SyncStats;
  onOpenSyncModal: () => void;
  onOpenSearch: () => void;
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  syncStats,
  onOpenSyncModal,
  onOpenSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200/90 px-4 sm:px-6 py-2.5 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-6">
        {/* Zone 1: Brand & Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('inicio')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
            title="Ir para a Visão Geral do Documentário"
          >
            <img
              src="/logo_elo.jpeg"
              alt="ELO — Plataforma de Pesquisa e Inteligência Governamental"
              className="h-10 sm:h-11 w-auto object-contain rounded transition-transform group-hover:scale-102"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('WhatsApp')) {
                  target.src = '/assets/aistudio/WhatsApp_Image_2026-10-20_at_12.10.09_52048c33.jpeg';
                }
              }}
            />
            <div className="hidden xl:block border-l border-stone-200 pl-3">
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-sans block">
                Documentário Longa Metragem
              </span>
              <span className="text-xs font-serif font-bold text-stone-800">
                Última Instância — Ricardo Couto
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={() => onSelectTab('linha_do_tempo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 rounded-lg border cursor-pointer ${
              currentTab === 'linha_do_tempo'
                ? 'bg-amber-900 text-amber-50 border-amber-900 shadow-xs'
                : 'bg-transparent text-stone-600 hover:text-stone-900 border-transparent hover:border-stone-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Linha do Tempo</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 font-semibold">
              Marcos
            </span>
          </button>

          <button
            onClick={() => onSelectTab('governo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 rounded-lg border cursor-pointer ${
              currentTab === 'governo'
                ? 'bg-stone-900 text-stone-50 border-stone-900 shadow-xs'
                : 'bg-transparent text-stone-600 hover:text-stone-900 border-transparent hover:border-stone-200'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Arquivos do Governo</span>
          </button>

          <button
            onClick={() => onSelectTab('imprensa_redes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 rounded-lg border cursor-pointer ${
              currentTab === 'imprensa_redes'
                ? 'bg-stone-900 text-stone-50 border-stone-900 shadow-xs'
                : 'bg-transparent text-stone-600 hover:text-stone-900 border-transparent hover:border-stone-200'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Redes & Imprensa</span>
          </button>

          <button
            onClick={() => onSelectTab('locacoes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 rounded-lg border cursor-pointer ${
              currentTab === 'locacoes'
                ? 'bg-stone-900 text-stone-50 border-stone-900 shadow-xs'
                : 'bg-transparent text-stone-600 hover:text-stone-900 border-transparent hover:border-stone-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Locações</span>
          </button>
        </nav>

        {/* Zone 3: Direct Root Drive Link & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Direct Drive Button to requested Root folder */}
          <a
            href={DRIVE_CONFIG.rootFolderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-amber-950 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors border border-amber-200 font-semibold cursor-pointer"
            title="Abrir pasta raiz oficial no Google Drive (1uJOTlvp4Bex2sjHsYW1ZqIDc7nVTIZbw)"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Pasta Raiz do Drive</span>
            <ExternalLink className="w-3 h-3 text-amber-800" />
          </a>

          <button
            onClick={onOpenSearch}
            className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            title="Busca rápida no acervo"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSyncModal}
            className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            title="Painel de Saúde e Sincronização do Drive"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
