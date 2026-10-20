import React, { useState, useRef, useEffect } from 'react';
import { DriveAsset, VideoPlayerData } from '../types';
import {
  X,
  ExternalLink,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ShieldCheck,
  AlertCircle,
  Film,
  Sparkles,
  Tag,
  Clock,
  HardDrive,
} from 'lucide-react';

interface VideoPlayerModalProps {
  asset?: DriveAsset | null;
  videoData?: VideoPlayerData | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  asset,
  videoData,
  onClose,
}) => {
  if (!asset && !videoData) return null;

  // Normaliza os dados do vídeo
  const title = videoData?.title || asset?.name || 'Reprodução de Vídeo';
  const url = videoData?.url || (asset?.hasVideo ? `https://drive.google.com/file/d/${asset.driveId}/preview` : '');
  const driveId = videoData?.driveId || asset?.driveId;
  const duration = videoData?.duration || asset?.videoDuration || 'Variável';
  const sizeFormatted = videoData?.sizeFormatted || asset?.sizeFormatted;
  const synopsis = videoData?.synopsis || asset?.synopsis;
  const sourceLabel = videoData?.sourceLabel || 'Acervo do Documentário';
  const categoryLabel = videoData?.categoryLabel || (asset?.tab === 'governo' ? 'Arquivos Oficiais' : 'Documentário');
  const tags = videoData?.tags || asset?.tags || [];
  const webViewLink = videoData?.webViewLink || asset?.webViewLink || (driveId ? `https://drive.google.com/file/d/${driveId}/view` : undefined);

  // Determina o tipo de vídeo
  const isDirectVideo =
    url &&
    (url.endsWith('.mp4') ||
      url.endsWith('.webm') ||
      url.endsWith('.ogg') ||
      url.includes('commondatastorage.googleapis.com') ||
      url.includes('sample-videos'));

  const isYouTube =
    url && (url.includes('youtube.com') || url.includes('youtu.be'));

  const getYouTubeEmbedUrl = (ytUrl: string) => {
    try {
      if (ytUrl.includes('youtu.be/')) {
        const id = ytUrl.split('youtu.be/')[1].split('?')[0];
        return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
      }
      const urlObj = new URL(ytUrl);
      const id = urlObj.searchParams.get('v');
      return id
        ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`
        : ytUrl;
    } catch {
      return ytUrl;
    }
  };

  const previewDriveUrl = driveId
    ? `https://drive.google.com/file/d/${driveId}/preview`
    : url?.includes('drive.google.com')
    ? url
    : '';

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150">
      <div className="bg-stone-900 border border-stone-800 rounded-xl max-w-4xl w-full shadow-2xl overflow-hidden text-stone-100 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-3.5 sm:p-4 border-b border-stone-800 bg-stone-950 flex items-center justify-between shrink-0">
          <div className="space-y-0.5 truncate pr-3">
            <div className="flex items-center gap-2 text-xs text-stone-400 font-mono">
              <span className="inline-flex items-center gap-1 text-amber-400 font-semibold px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 text-[10px]">
                <Film className="w-3 h-3" />
                Player Integrado ELO
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-300 font-medium">{categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums font-mono text-stone-400">
                <Clock className="w-3 h-3 inline mr-1" />
                {duration}
              </span>
              {sizeFormatted && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums text-stone-400">{sizeFormatted}</span>
                </>
              )}
            </div>
            <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-100 truncate mt-0.5">
              {title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer shrink-0"
            title="Fechar player (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Display */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden shrink-0 group">
          {isDirectVideo ? (
            <>
              <video
                ref={videoRef}
                src={url}
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls
              />
            </>
          ) : isYouTube ? (
            <iframe
              src={getYouTubeEmbedUrl(url)}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={title}
            />
          ) : previewDriveUrl && !iframeError ? (
            <iframe
              src={previewDriveUrl}
              className="w-full h-full border-0 bg-stone-950"
              allow="autoplay; encrypted-media"
              allowFullScreen
              onError={() => setIframeError(true)}
              title={title}
            />
          ) : (
            <div className="text-center p-8 max-w-md space-y-4">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
              <div>
                <h4 className="font-semibold text-stone-200 text-sm">
                  Visualização no Player Externo
                </h4>
                <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                  O vídeo original está hospedado no repositório de mídia do Google Drive ou requer permissão específica de conta de rede.
                </p>
              </div>
              {webViewLink && (
                <a
                  href={webViewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  <span>Abrir Vídeo no Google Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Details & Metadata Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 space-y-3 overflow-y-auto">
          {synopsis && (
            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-mono font-semibold block mb-1">
                Decupagem & Contexto Editorial:
              </span>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-serif">
                {synopsis}
              </p>
            </div>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <Tag className="w-3 h-3 text-stone-500 mr-1" />
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-stone-800/80 text-stone-300 border border-stone-700/60 rounded text-[10px] font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-900 text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Fonte: {sourceLabel}</span>
              {driveId && (
                <span className="font-mono text-[11px] text-stone-500 hidden sm:inline">
                  · ID Drive: {driveId.slice(0, 14)}...
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {webViewLink && (
                <a
                  href={webViewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 hover:underline inline-flex items-center gap-1 font-medium text-xs"
                >
                  <span>Arquivo Original</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
