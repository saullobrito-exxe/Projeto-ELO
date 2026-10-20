import React, { useState } from 'react';
import { DriveFolder, DriveAsset } from '../types';
import {
  Landmark,
  FileText,
  Video,
  ExternalLink,
  Search,
  Scale,
  Mic,
  Award,
  Layers,
  Play,
  Eye,
  FolderOpen,
} from 'lucide-react';
import { DRIVE_CONFIG } from '../lib/drive/config';

interface GovernmentTabProps {
  folders: DriveFolder[];
  assets: DriveAsset[];
  onSelectAsset: (asset: DriveAsset) => void;
  onOpenVideoPlayer: (asset: DriveAsset) => void;
}

export const GovernmentTab: React.FC<GovernmentTabProps> = ({
  assets,
  onSelectAsset,
  onOpenVideoPlayer,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Categorias de registros governamentais essenciais
  const governmentClusters = [
    {
      id: 'all',
      name: 'Todos os Atos',
      icon: Layers,
      folderId: 'all',
    },
    {
      id: 'gerais',
      name: 'Decretos & Choque Fiscal',
      icon: Landmark,
      folderId: 'f_gov_gerais',
    },
    {
      id: 'stf',
      name: 'STF & Royalties',
      icon: Scale,
      folderId: 'f_gov_stf',
    },
    {
      id: 'coletivas',
      name: 'Coletivas de Imprensa',
      icon: Mic,
      folderId: 'f_gov_coletivas',
    },
    {
      id: 'inauracoes',
      name: 'Inaugurações & Entregas',
      icon: Award,
      folderId: 'f_gov_inauracoes',
    },
  ];

  // Filtra e prioriza os documentos oficiais mais relevantes
  const filteredAssets = assets.filter((asset) => {
    if (asset.tab !== 'governo') return false;
    if (selectedCategory !== 'all') {
      const cluster = governmentClusters.find((c) => c.id === selectedCategory);
      if (cluster && cluster.folderId !== 'all' && asset.folderId !== cluster.folderId) {
        return false;
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = asset.name.toLowerCase().includes(q);
      const matchSynopsis = asset.synopsis?.toLowerCase().includes(q) ?? false;
      const matchPeople = asset.identifiedPeople?.some((p) => p.toLowerCase().includes(q)) ?? false;
      return matchName || matchSynopsis || matchPeople;
    }

    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Banner de Acesso Direto à Pasta Oficial do Drive */}
      <div className="bg-white border border-stone-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
            <FolderOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-stone-900">
              Pasta Oficial do Drive: Arquivos do Governo
            </div>
            <div className="text-[11px] text-stone-500 font-mono">
              ID: {DRIVE_CONFIG.tabs.governo.id}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={DRIVE_CONFIG.tabs.governo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Abrir Pasta no Google Drive</span>
            <ExternalLink className="w-3 h-3 text-amber-400" />
          </a>
        </div>
      </div>

      {/* Header Editorial */}
      <div className="border-b border-stone-200 pb-4 mb-6">
        <h2 className="font-serif text-2xl font-bold text-stone-900 mb-1">
          Arquivos Oficiais do Governo
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm font-serif max-w-2xl">
          Atos normativos, decretos de contenção orçamentária, peças jurídicas da PGE perante o Supremo Tribunal Federal e coletivas oficiais.
        </p>
      </div>

      {/* Filtros Limpos por Categorias */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6">
        <div className="flex flex-wrap items-center gap-1.5">
          {governmentClusters.map((cluster) => {
            const Icon = cluster.icon;
            const isSelected = selectedCategory === cluster.id;
            return (
              <button
                key={cluster.id}
                onClick={() => setSelectedCategory(cluster.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-stone-900 text-stone-50 border-stone-900 shadow-xs'
                    : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-stone-500'}`} />
                <span>{cluster.name}</span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrar documentos..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-stone-200 focus:outline-none focus:border-stone-400 text-stone-900"
          />
        </div>
      </div>

      {/* Grid de Documentos Oficiais */}
      <div className="space-y-3.5">
        {filteredAssets.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-xl p-8 text-center text-xs text-stone-500">
            Nenhum documento encontrado para este filtro.
          </div>
        ) : (
          filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white border border-stone-200 hover:border-amber-400/80 rounded-xl p-4 sm:p-5 transition-all shadow-2xs space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500">
                    {asset.hasVideo ? (
                      <span className="text-amber-900 font-semibold flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        <span>Vídeo Oficial ({asset.videoDuration || 'MP4'})</span>
                      </span>
                    ) : (
                      <span className="text-stone-700 font-semibold flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>{asset.mimeType.split('/').pop()?.toUpperCase()}</span>
                      </span>
                    )}
                    <span>·</span>
                    <span className="tabular-nums">{asset.createdTime}</span>
                    {asset.sizeFormatted && (
                      <>
                        <span>·</span>
                        <span className="tabular-nums">{asset.sizeFormatted}</span>
                      </>
                    )}
                  </div>
                  <h3 className="font-serif text-base font-bold text-stone-900">
                    {asset.name}
                  </h3>
                </div>

                {/* Ações Diretas */}
                <div className="flex items-center gap-2 shrink-0">
                  {asset.hasVideo && (
                    <button
                      onClick={() => onOpenVideoPlayer(asset)}
                      className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Play className="w-3 h-3 fill-current text-amber-400" />
                      <span>Assistir Vídeo</span>
                    </button>
                  )}

                  <button
                    onClick={() => onSelectAsset(asset)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Dossiê</span>
                  </button>

                  <a
                    href={asset.webViewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                    title="Abrir arquivo no Google Drive"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {asset.synopsis && (
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-serif">
                  {asset.synopsis}
                </p>
              )}

              {asset.factualClaims && asset.factualClaims.length > 0 && (
                <div className="text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                  <span className="font-semibold text-stone-700 mr-1">Fatos:</span>
                  <span>{asset.factualClaims.join(' · ')}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
