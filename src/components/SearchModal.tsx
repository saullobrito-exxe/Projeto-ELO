import React, { useState } from 'react';
import { X, Search, Landmark, Newspaper, Camera, ArrowRight, Video } from 'lucide-react';
import { TimelineEvent, DriveAsset, ResearchTopic } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: TimelineEvent[];
  assets: DriveAsset[];
  topics: ResearchTopic[];
  onSelectEvent: (event: TimelineEvent) => void;
  onSelectAsset: (asset: DriveAsset) => void;
  onSelectTopic: (topic: ResearchTopic) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  events,
  assets,
  topics,
  onSelectEvent,
  onSelectAsset,
  onSelectTopic,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const q = query.toLowerCase().trim();

  const matchingEvents = q
    ? events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.summary.toLowerCase().includes(q) ||
          e.characters.some((c) => c.toLowerCase().includes(q)) ||
          e.tags.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  const matchingAssets = q
    ? assets.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.synopsis?.toLowerCase().includes(q) ||
          a.identifiedPeople?.some((p) => p.toLowerCase().includes(q))
      )
    : [];

  const matchingTopics = q
    ? topics.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.summary.toLowerCase().includes(q) ||
          t.folderName.toLowerCase().includes(q)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div className="bg-[#FBF9F5] border border-stone-200 rounded-lg max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar em todo o acervo ELO (fatos, falas, personagens, vídeos)..."
            autoFocus
            className="flex-1 text-sm bg-transparent border-0 focus:outline-none text-stone-900 placeholder:text-stone-400"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 max-h-[70vh] overflow-y-auto space-y-6 text-xs">
          {!q ? (
            <div className="py-12 text-center text-stone-400">
              Digite uma palavra-chave para buscar entre acontecimentos, documentos oficiais e vídeos.
            </div>
          ) : matchingEvents.length === 0 && matchingAssets.length === 0 && matchingTopics.length === 0 ? (
            <div className="py-12 text-center text-stone-500">
              Nenhum resultado encontrado para "{query}".
            </div>
          ) : (
            <>
              {/* Events */}
              {matchingEvents.length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-2 flex items-center gap-1.5">
                    <Newspaper className="w-3.5 h-3.5 text-stone-600" />
                    <span>Acontecimentos & Fatos ({matchingEvents.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchingEvents.map((evt) => (
                      <div
                        key={evt.id}
                        onClick={() => {
                          onSelectEvent(evt);
                          onClose();
                        }}
                        className="p-3 bg-white hover:bg-stone-100/70 border border-stone-200 rounded cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                          <span className="font-mono tabular-nums">{evt.eventDate}</span>
                          <span className="truncate max-w-[200px]">{evt.topicName}</span>
                        </div>
                        <h5 className="font-serif font-semibold text-stone-900 text-xs sm:text-sm">
                          {evt.title}
                        </h5>
                        <p className="text-stone-600 text-xs line-clamp-1 mt-1">
                          {evt.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assets */}
              {matchingAssets.length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-2 flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-stone-600" />
                    <span>Documentos & Vídeos Brutos ({matchingAssets.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchingAssets.map((ast) => (
                      <div
                        key={ast.id}
                        onClick={() => {
                          onSelectAsset(ast);
                          onClose();
                        }}
                        className="p-3 bg-white hover:bg-stone-100/70 border border-stone-200 rounded cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                          <span className="font-mono uppercase">{ast.mimeType.split('/').pop()}</span>
                          <span className="tabular-nums">{ast.sizeFormatted}</span>
                        </div>
                        <h5 className="font-medium text-stone-900 text-xs">
                          {ast.name}
                        </h5>
                        {ast.synopsis && (
                          <p className="text-stone-600 text-xs line-clamp-1 mt-1">
                            {ast.synopsis}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Topics */}
              {matchingTopics.length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-2 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-stone-600" />
                    <span>Pesquisas Temáticas ({matchingTopics.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchingTopics.map((top) => (
                      <div
                        key={top.id}
                        onClick={() => {
                          onSelectTopic(top);
                          onClose();
                        }}
                        className="p-3 bg-white hover:bg-stone-100/70 border border-stone-200 rounded cursor-pointer transition-colors"
                      >
                        <h5 className="font-serif font-semibold text-stone-900 text-xs">
                          {top.folderName}
                        </h5>
                        <p className="text-stone-600 text-xs line-clamp-1 mt-1">
                          {top.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
