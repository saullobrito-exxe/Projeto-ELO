import React, { useState } from 'react';
import { LocationScene, DriveAsset } from '../types';
import { Camera, Video, ExternalLink, AlertCircle, Play, Film, MapPin, Eye } from 'lucide-react';
import { DRIVE_CONFIG } from '../lib/drive/config';

interface LocationsTabProps {
  locations: LocationScene[];
  onOpenVideoPlayer: (asset: DriveAsset) => void;
  onOpenAssetDetail: (asset: DriveAsset) => void;
}

export const LocationsTab: React.FC<LocationsTabProps> = ({
  locations,
  onOpenVideoPlayer,
  onOpenAssetDetail,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedLocationId, setSelectedLocationId] = useState<string>('all');

  const allTags = ['fachada', 'drone', 'corredor', 'plenário', 'movimentação', 'circulação de pessoas', 'imagem de apoio'];

  const filteredLocations = locations.filter((loc) => {
    if (selectedLocationId !== 'all' && loc.id !== selectedLocationId) return false;
    if (selectedTag !== 'all' && !loc.tags.includes(selectedTag as any)) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumbs & Drive Link */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-100/80 px-4 py-2.5 rounded-md border border-stone-200 mb-6 text-xs text-stone-600 font-mono">
        <div className="flex items-center gap-1.5 flex-wrap">
          <a
            href="https://drive.google.com/drive/u/0/folders/1uJOTlvp4Bex2sjHsYW1ZqIDc7nVTIZbw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-900 hover:underline font-semibold"
          >
            Drive Raiz (1uJOTlvp4...)
          </a>
          <span aria-hidden="true">/</span>
          <a
            href={DRIVE_CONFIG.tabs.locacoes.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-800 hover:underline font-medium"
          >
            Ambientações e Locações (12MZSuE8...)
          </a>
          {selectedLocationId !== 'all' && (
            <>
              <span aria-hidden="true">/</span>
              <span className="text-stone-900 font-bold">
                {locations.find((l) => l.id === selectedLocationId)?.name}
              </span>
            </>
          )}
        </div>

        <a
          href={
            selectedLocationId !== 'all'
              ? `${DRIVE_CONFIG.tabs.locacoes.url}?folder=${locations.find((l) => l.id === selectedLocationId)?.driveFolderId}`
              : DRIVE_CONFIG.tabs.locacoes.url
          }
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-900 hover:underline inline-flex items-center gap-1 font-medium font-sans"
        >
          <span>Abrir Pasta de Locações no Drive</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Editorial Header */}
      <div className="border-b border-stone-200 pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans mb-1.5">
          <span>Aba 03 · ID {DRIVE_CONFIG.tabs.locacoes.id}</span>
          <span aria-hidden="true">/</span>
          <span>Catálogo Audiovisual de Produção</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 mb-2">
          Ambientações e Locações
        </h2>
        <p className="text-stone-600 text-sm max-w-3xl leading-relaxed">
          Catálogo técnico de tomadas audiovisuais organizado pelos pontos de filmagem previstos no roteiro do documentário. 
          Inclui tomadas aéreas com drone, fachadas arquitetônicas, corredores institucionais e circulação pública. Imagens de apoio são isentas de classificação de sentimento.
        </p>
      </div>

      {/* Filter Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 rounded-lg border border-stone-200 mb-8">
        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-stone-500 font-medium mr-1">Enquadramento:</span>
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-2.5 py-1 text-xs rounded transition-colors ${
              selectedTag === 'all'
                ? 'bg-stone-900 text-stone-50 font-medium'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Todos
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                selectedTag === tag
                  ? 'bg-stone-900 text-stone-50 font-medium'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Location selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500">Locação:</span>
          <select
            value={selectedLocationId}
            onChange={(e) => setSelectedLocationId(e.target.value)}
            className="text-xs bg-stone-50 border border-stone-200 rounded px-2.5 py-1 text-stone-800 focus:outline-none"
          >
            <option value="all">Todas as Locações ({locations.length})</option>
            {locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="space-y-10">
        {filteredLocations.map((loc) => (
          <div key={loc.id} className="bg-white border border-stone-200 rounded-lg p-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 pb-4 border-b border-stone-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>Ponto de Produção</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-600">Pasta ID: {loc.driveFolderId}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-stone-900">
                  {loc.name}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
                  {loc.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`${DRIVE_CONFIG.tabs.locacoes.url}?folder=${loc.driveFolderId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-900 hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>Abrir no Drive</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Tags Ribbon */}
            <div className="flex flex-wrap items-center gap-2 mb-6 text-xs text-stone-500">
              <span className="font-medium text-stone-700">Tags de Cena:</span>
              {loc.tags.map((t, idx) => (
                <React.Fragment key={t}>
                  <span className="text-stone-600">#{t}</span>
                  {idx < loc.tags.length - 1 && <span aria-hidden="true">·</span>}
                </React.Fragment>
              ))}
            </div>

            {/* Empty State Banner if confirmed empty */}
            {loc.isEmpty ? (
              <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-amber-900">
                    Aguardando arquivos no Google Drive
                  </div>
                  <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                    Esta locação está reservada no roteiro, mas ainda não possui arquivos ou tomadas brutas carregadas na subpasta do Drive. A sincronização automática atualizará a galeria assim que as imagens forem enviadas pela equipe de gravação.
                  </p>
                </div>
              </div>
            ) : (
              /* Media Assets Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loc.assets.map((asset) => (
                  <div
                    key={asset.id}
                    className="border border-stone-200 rounded-md p-4 bg-stone-50/60 hover:bg-stone-50 hover:border-stone-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Media Card Header */}
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                        <span className="flex items-center gap-1 font-mono font-medium text-stone-700">
                          <Film className="w-3 h-3" />
                          <span>{asset.videoDuration || '03:00'}</span>
                        </span>
                        <span className="tabular-nums">{asset.sizeFormatted}</span>
                      </div>

                      <h4 className="font-medium text-xs sm:text-sm text-stone-900 mb-2 line-clamp-2">
                        {asset.name}
                      </h4>

                      {asset.synopsis && (
                        <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-3">
                          {asset.synopsis}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between">
                      <button
                        onClick={() => onOpenVideoPlayer(asset)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded transition-colors"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Reproduzir</span>
                      </button>

                      <button
                        onClick={() => onOpenAssetDetail(asset)}
                        className="text-xs text-stone-600 hover:text-stone-900 inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Detalhes</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
