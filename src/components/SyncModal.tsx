import React, { useState } from 'react';
import { SyncStats, DriveFolder } from '../types';
import { X, RefreshCw, CheckCircle2, AlertTriangle, ExternalLink, HardDrive, ShieldCheck, Clock } from 'lucide-react';
import { DRIVE_CONFIG } from '../lib/drive/config';
import { fetchLiveDriveFiles } from '../lib/drive/catalog';
import { getAccessToken } from '../lib/auth/firebase';

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  syncStats: SyncStats;
  folders: DriveFolder[];
  onTriggerSync: () => Promise<void>;
}

export const SyncModal: React.FC<SyncModalProps> = ({
  isOpen,
  onClose,
  syncStats,
  folders,
  onTriggerSync,
}) => {
  if (!isOpen) return null;

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const handleSyncNow = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      await onTriggerSync();
      setSyncMessage('Sincronização incremental concluída com sucesso.');
    } catch (err: any) {
      setSyncMessage(`Erro durante a varredura: ${err?.message || 'Falha na comunicação'}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const emptyFolders = folders.filter((f) => f.isEmpty);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FBF9F5] border border-stone-200 rounded-lg max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <HardDrive className="w-5 h-5 text-stone-800" />
            <div>
              <h3 className="font-serif text-lg font-semibold text-stone-900">
                Painel de Sincronização & Saúde do Acervo
              </h3>
              <p className="text-xs text-stone-500">
                Pasta Raiz: <a href="https://drive.google.com/drive/u/0/folders/1uJOTlvp4Bex2sjHsYW1ZqIDc7nVTIZbw" target="_blank" rel="noopener noreferrer" className="text-amber-900 underline font-mono">1uJOTlvp4Bex2sjHsYW1ZqIDc7nVTIZbw</a> · Fuso America/Sao_Paulo
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs text-stone-700">
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-white border border-stone-200 rounded">
              <span className="text-stone-500 block mb-1">Pastas Mapeadas:</span>
              <span className="font-mono text-base font-semibold text-stone-900 tabular-nums">
                {syncStats.totalFolders}
              </span>
            </div>

            <div className="p-3 bg-white border border-stone-200 rounded">
              <span className="text-stone-500 block mb-1">Pastas Vazias:</span>
              <span className="font-mono text-base font-semibold text-amber-800 tabular-nums">
                {syncStats.emptyFolders}
              </span>
            </div>

            <div className="p-3 bg-white border border-stone-200 rounded">
              <span className="text-stone-500 block mb-1">Arquivos Catalogados:</span>
              <span className="font-mono text-base font-semibold text-stone-900 tabular-nums">
                {syncStats.totalAssets}
              </span>
            </div>

            <div className="p-3 bg-white border border-stone-200 rounded">
              <span className="text-stone-500 block mb-1">Vídeos Testados:</span>
              <span className="font-mono text-base font-semibold text-stone-900 tabular-nums">
                {syncStats.videosTested}
              </span>
            </div>
          </div>

          {/* Sync Trigger Action */}
          <div className="bg-white border border-stone-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="font-medium text-stone-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                <span>Última sincronização registrada:</span>
                <span className="font-mono tabular-nums font-semibold">{syncStats.lastSyncAt}</span>
              </div>
              <p className="text-stone-500 text-[11px] mt-0.5">
                Agendamento diário automático ativo via cron idempotente.
              </p>
            </div>

            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-stone-50 rounded text-xs font-medium transition-colors flex items-center gap-2 shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Varrendo Google Drive...' : 'Sincronizar Agora'}</span>
            </button>
          </div>


          {/* Pastas Conectadas Diretamente */}
          <div className="bg-white border border-stone-200 rounded-lg p-4 space-y-2">
            <div className="font-semibold text-stone-900 text-xs flex items-center justify-between">
              <span>Pastas Conectadas Diretamente no Drive:</span>
              <span className="text-[10px] text-emerald-700 font-mono font-normal">IDs Verificados</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono">
              <a
                href={DRIVE_CONFIG.tabs.governo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-stone-50 hover:bg-stone-100 rounded border border-stone-200 flex items-center justify-between text-stone-800"
              >
                <span className="truncate">1. Governo</span>
                <ExternalLink className="w-3 h-3 text-stone-400 shrink-0" />
              </a>
              <a
                href={DRIVE_CONFIG.tabs.imprensa_redes.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-stone-50 hover:bg-stone-100 rounded border border-stone-200 flex items-center justify-between text-stone-800"
              >
                <span className="truncate">2. Imprensa/Redes</span>
                <ExternalLink className="w-3 h-3 text-stone-400 shrink-0" />
              </a>
              <a
                href={DRIVE_CONFIG.tabs.locacoes.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-stone-50 hover:bg-stone-100 rounded border border-stone-200 flex items-center justify-between text-stone-800"
              >
                <span className="truncate">3. Locações</span>
                <ExternalLink className="w-3 h-3 text-stone-400 shrink-0" />
              </a>
            </div>
          </div>

          {syncMessage && (
            <div className="p-3 bg-stone-100 border border-stone-200 rounded font-mono text-[11px]">
              {syncMessage}
            </div>
          )}

          {/* Empty Folders Audit List */}
          <div>
            <div className="font-semibold text-stone-800 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>Pastas Identificadas Vazias no Google Drive ({emptyFolders.length}):</span>
            </div>
            <div className="bg-white border border-stone-200 rounded divide-y divide-stone-100 max-h-48 overflow-y-auto">
              {emptyFolders.map((f) => (
                <div key={f.id} className="p-2.5 flex items-center justify-between text-xs">
                  <div className="truncate pr-2">
                    <span className="font-mono text-stone-600">{f.path}</span>
                    <span className="text-[11px] text-amber-800 block">
                      Aguardando arquivos no Google Drive
                    </span>
                  </div>
                  <a
                    href={f.webViewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-900 hover:underline shrink-0 text-[11px] font-medium"
                  >
                    Abrir no Drive
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
          <a
            href={DRIVE_CONFIG.rootFolderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-900 hover:underline inline-flex items-center gap-1 font-medium"
          >
            <span>Ver raiz completa no Google Drive</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
