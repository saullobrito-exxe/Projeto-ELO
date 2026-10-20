import React, { useState } from 'react';
import { X, BookOpen, FileText, CheckCircle2, AlertCircle, ExternalLink, ArrowRight } from 'lucide-react';

interface EditorialPreambleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEventId?: (id: string) => void;
}

export const EditorialPreambleModal: React.FC<EditorialPreambleModalProps> = ({
  isOpen,
  onClose,
  onSelectEventId,
}) => {
  if (!isOpen) return null;

  const [customFileId, setCustomFileId] = useState('');
  const [importedMessage, setImportedMessage] = useState<string | null>(null);

  const handleLinkCustomId = (e: React.FormEvent) => {
    e.preventDefault();
    if (customFileId.trim()) {
      setImportedMessage(`ID '${customFileId}' associado como referência editorial suplementar.`);
      setCustomFileId('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FBF9F5] border border-stone-200 rounded-lg max-w-3xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-900" />
            <div>
              <h3 className="font-serif text-lg font-semibold text-stone-900">
                Preâmbulo Editorial (Preambulo1510)
              </h3>
              <p className="text-xs text-stone-500 font-sans">
                Diretriz de roteiro e contextualização histórica do documentário
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
          {/* Status Banner */}
          <div className="p-4 bg-white border border-stone-200 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Diretrizes Editoriais Integradas ao Sistema</span>
            </div>
            <p className="text-stone-600 leading-relaxed font-serif text-xs sm:text-sm">
              O preâmbulo editorial orienta a narrativa inicial: a notícia da chegada de Ricardo Couto ao governo, os 20 anos prévios de desgaste institucional no Estado, a montagem do tabuleiro sucessório e a transição para os conflitos centrais da administração.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-stone-200 rounded-lg space-y-2">
              <h4 className="font-serif font-semibold text-stone-900 text-sm">
                1. Os 20 Anos de Desgaste Prévio
              </h4>
              <p className="text-stone-600 leading-relaxed">
                Reconstituição da crise orçamentária e dos mandatos anteriores marcada por sucessivos planos fiscais não cumpridos e investigações na cúpula dos poderes.
              </p>
            </div>

            <div className="p-4 bg-white border border-stone-200 rounded-lg space-y-2">
              <h4 className="font-serif font-semibold text-stone-900 text-sm">
                2. A Chegada e a Transição
              </h4>
              <p className="text-stone-600 leading-relaxed">
                A eleição de Ricardo Couto como ruptura discursiva, os primeiros 100 dias, o choque de gestão e a redução inicial de 12 secretarias de estado.
              </p>
            </div>

            <div className="p-4 bg-white border border-stone-200 rounded-lg space-y-2">
              <h4 className="font-serif font-semibold text-stone-900 text-sm">
                3. O Tabuleiro da Sucessão
              </h4>
              <p className="text-stone-600 leading-relaxed">
                As disputas fratricidas na ALERJ, a divisão partidária na base governista e as alianças forjadas em torno dos royalties e dos precatórios.
              </p>
            </div>

            <div className="p-4 bg-white border border-stone-200 rounded-lg space-y-2">
              <h4 className="font-serif font-semibold text-stone-900 text-sm">
                4. A Transição para o Fato Central
              </h4>
              <p className="text-stone-600 leading-relaxed">
                Abertura da narrativa investigativa para a CPI da Saúde, a privatização do saneamento e a consolidação das provas documentais do acervo.
              </p>
            </div>
          </div>

          {/* Import / ID Association Form */}
          <div className="p-4 bg-stone-100 rounded-lg border border-stone-200 space-y-3">
            <div className="font-semibold text-stone-800 text-xs">
              Associar Arquivo Complementar do Preâmbulo por ID do Google Drive:
            </div>
            <form onSubmit={handleLinkCustomId} className="flex gap-2">
              <input
                type="text"
                value={customFileId}
                onChange={(e) => setCustomFileId(e.target.value)}
                placeholder="Ex: 1VNL... ou ID de arquivo no Google Drive"
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-200 rounded text-stone-900 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-stone-900 text-stone-50 rounded text-xs font-medium hover:bg-stone-800 transition-colors"
              >
                Associar
              </button>
            </form>
            {importedMessage && (
              <div className="text-[11px] text-emerald-800 font-medium">
                {importedMessage}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-end text-xs">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-900 text-stone-50 rounded font-medium hover:bg-stone-800 transition-colors"
          >
            Concluir Leitura
          </button>
        </div>
      </div>
    </div>
  );
};
