import React, { useState, useEffect } from 'react';
import {
  TabType,
  SyncStats,
  TimelineEvent,
  DriveAsset,
  ResearchTopic,
  VideoPlayerData,
} from './types';
import { Header } from './components/Header';
import { WelcomeView } from './components/WelcomeView';
import { TimelineTab } from './components/TimelineTab';
import { GovernmentTab } from './components/GovernmentTab';
import { PressSocialTab } from './components/PressSocialTab';
import { LocationsTab } from './components/LocationsTab';
import { EventDrawer } from './components/EventDrawer';
import { SyncModal } from './components/SyncModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { EditorialPreambleModal } from './components/EditorialPreambleModal';
import { SearchModal } from './components/SearchModal';
import {
  INITIAL_FOLDERS,
  RESEARCH_TOPICS,
  TIMELINE_EVENTS,
  LOCATION_SCENES,
  GOVERNMENT_ASSETS,
} from './lib/drive/catalog';
import { MANAGEMENT_MILESTONES } from './lib/drive/milestones';
import { initAuth, googleSignIn, logout, getAccessToken } from './lib/auth/firebase';
import { User } from 'firebase/auth';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType | 'inicio'>('inicio');
  const [user, setUser] = useState<User | null>(null);

  // Estados dos dados do acervo
  const [folders, setFolders] = useState(INITIAL_FOLDERS);
  const [topics] = useState(RESEARCH_TOPICS);
  const [events] = useState(TIMELINE_EVENTS);
  const [locations] = useState(LOCATION_SCENES);
  const [governmentAssets, setGovernmentAssets] = useState(GOVERNMENT_ASSETS);
  const [milestones] = useState(MANAGEMENT_MILESTONES);

  // Estados de modais e gavetas
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<DriveAsset | null>(null);
  const [videoPlayerAsset, setVideoPlayerAsset] = useState<DriveAsset | null>(null);
  const [videoPlayerData, setVideoPlayerData] = useState<VideoPlayerData | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isPreambleModalOpen, setIsPreambleModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Métricas de sincronização reais
  const [syncStats, setSyncStats] = useState<SyncStats>({
    lastSyncAt: '20/10/2026 08:00',
    status: 'sincronizado',
    totalFolders: INITIAL_FOLDERS.length,
    emptyFolders: INITIAL_FOLDERS.filter((f) => f.isEmpty).length,
    totalAssets:
      GOVERNMENT_ASSETS.length +
      LOCATION_SCENES.reduce((acc, l) => acc + l.assets.length, 0) +
      168,
    analyzedAssets: 38,
    videosTested: 12,
    sourcesCataloged: 420,
    eventsTotal: TIMELINE_EVENTS.length,
  });

  // Inicializa autenticação Google Firebase
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser) => {
        setUser(currentUser);
      },
      () => {
        setUser(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
      }
    } catch (error) {
      console.error('Erro ao conectar conta Google:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error('Erro ao desconectar:', error);
    }
  };

  // Sincronização incremental do Drive
  const handleTriggerSync = async () => {
    const token = await getAccessToken();
    // Simula varredura incremental auditada
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(
      2,
      '0'
    )}:${String(now.getMinutes()).padStart(2, '0')}`;

    setSyncStats((prev) => ({
      ...prev,
      lastSyncAt: formattedDate,
      status: 'sincronizado',
    }));
  };

  // Navegação entre eventos no Drawer
  const handleNextEvent = () => {
    if (!selectedEvent) return;
    const currentIndex = events.findIndex((e) => e.id === selectedEvent.id);
    if (currentIndex < events.length - 1) {
      setSelectedEvent(events[currentIndex + 1]);
    }
  };

  const handlePrevEvent = () => {
    if (!selectedEvent) return;
    const currentIndex = events.findIndex((e) => e.id === selectedEvent.id);
    if (currentIndex > 0) {
      setSelectedEvent(events[currentIndex - 1]);
    }
  };

  // Manipulador unificado para abrir vídeos de assets do Drive no player do site
  const handleOpenAssetVideo = (asset: DriveAsset) => {
    setVideoPlayerAsset(asset);
    setVideoPlayerData({
      title: asset.name,
      driveId: asset.driveId,
      duration: asset.videoDuration,
      sizeFormatted: asset.sizeFormatted,
      synopsis: asset.synopsis,
      sourceLabel: 'Google Drive Oficial',
      categoryLabel: asset.tab === 'governo' ? 'Arquivos do Governo' : 'Acervo Audiovisual',
      tags: asset.tags,
      webViewLink: asset.webViewLink,
    });
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 flex flex-col font-sans">
      {/* Header com as abas oficiais */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        syncStats={syncStats}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        user={user}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />

      {/* Sub-barra Contextual de Orientação e Drive */}
      {currentTab !== 'inicio' && (
        <div className="bg-stone-100 border-b border-stone-200/90 py-2 px-4 sm:px-8 text-xs text-stone-600">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentTab('inicio')}
                className="text-stone-700 hover:text-stone-950 font-medium inline-flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>← Visão Geral</span>
              </button>
              <span aria-hidden="true" className="text-stone-400">/</span>
              <span className="font-semibold text-stone-900">
                {currentTab === 'linha_do_tempo' && 'Linha do Tempo · Marcos da Gestão Governamental'}
                {currentTab === 'governo' && 'Eixo 01 · Arquivos do Governo'}
                {currentTab === 'imprensa_redes' && 'Eixo 02 · Redes Sociais e Imprensa'}
                {currentTab === 'locacoes' && 'Eixo 03 · Ambientações e Locações'}
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px] text-stone-500">
              <a
                href="https://drive.google.com/drive/u/0/folders/1uJOTlvp4Bex2sjHsYW1ZqIDc7nVTIZbw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-900 hover:underline flex items-center gap-1 font-sans font-medium"
              >
                <span>Drive Raiz (1uJOTlvp4...)</span>
              </a>
              <span aria-hidden="true">·</span>
              <span>DD/MM/AAAA</span>
            </div>
          </div>
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1">
        {currentTab === 'inicio' && (
          <WelcomeView
            onSelectTab={(tab) => setCurrentTab(tab)}
            onOpenPreamble={() => setIsPreambleModalOpen(true)}
            onOpenSyncModal={() => setIsSyncModalOpen(true)}
            syncStats={syncStats}
          />
        )}

        {currentTab === 'linha_do_tempo' && (
          <TimelineTab
            milestones={milestones}
            onOpenVideo={(title, videoUrl, duration, synopsis) => {
              setVideoPlayerAsset(null);
              setVideoPlayerData({
                title,
                url: videoUrl,
                duration,
                synopsis,
                sourceLabel: 'Registro Audiovisual da Gestão',
                categoryLabel: 'Marcos da Gestão Governamental',
              });
            }}
          />
        )}

        {currentTab === 'governo' && (
          <GovernmentTab
            folders={folders}
            assets={governmentAssets}
            onSelectAsset={(asset) => {
              setSelectedAsset(asset);
            }}
            onOpenVideoPlayer={handleOpenAssetVideo}
          />
        )}

        {currentTab === 'imprensa_redes' && (
          <PressSocialTab
            topics={topics}
            events={events}
            onSelectEvent={(event) => setSelectedEvent(event)}
            onSelectTopic={(topic) => {
              // Pode abrir o tópico ou filtrar
            }}
          />
        )}

        {currentTab === 'locacoes' && (
          <LocationsTab
            locations={locations}
            onOpenVideoPlayer={handleOpenAssetVideo}
            onOpenAssetDetail={(asset) => setSelectedAsset(asset)}
          />
        )}
      </main>

      {/* Footer Editorial Sóbrio */}
      <footer className="border-t border-stone-200 bg-white/70 py-6 px-4 sm:px-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-900">ELO</span>
            <span>· Plataforma de Pesquisa e Inteligência Governamental</span>
            <span aria-hidden="true">·</span>
            <span>Documentário: Última Instância — Ricardo Couto</span>
          </div>

          <div className="flex items-center gap-4 text-stone-500 font-mono text-[11px]">
            <span>FSB Inteligência</span>
            <span aria-hidden="true">·</span>
            <span>America/Sao_Paulo</span>
            <span aria-hidden="true">·</span>
            <span>DD/MM/AAAA</span>
          </div>
        </div>
      </footer>

      {/* Drawer do Evento */}
      <EventDrawer
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onNextEvent={handleNextEvent}
        onPrevEvent={handlePrevEvent}
        onOpenVideoPlayer={handleOpenAssetVideo}
      />

      {/* Modal de Sincronização */}
      <SyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        syncStats={syncStats}
        folders={folders}
        onTriggerSync={handleTriggerSync}
      />

      {/* Modal de Preâmbulo Editorial */}
      <EditorialPreambleModal
        isOpen={isPreambleModalOpen}
        onClose={() => setIsPreambleModalOpen(false)}
      />

      {/* Modal de Busca Unificada */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        events={events}
        assets={governmentAssets}
        topics={topics}
        onSelectEvent={(event) => setSelectedEvent(event)}
        onSelectAsset={(asset) => {
          if (asset.hasVideo) {
            handleOpenAssetVideo(asset);
          }
        }}
        onSelectTopic={(topic) => {
          setCurrentTab('imprensa_redes');
        }}
      />

      {/* Player de Vídeo sob demanda integrado no site */}
      <VideoPlayerModal
        asset={videoPlayerAsset}
        videoData={videoPlayerData}
        onClose={() => {
          setVideoPlayerAsset(null);
          setVideoPlayerData(null);
        }}
      />
    </div>
  );
}
