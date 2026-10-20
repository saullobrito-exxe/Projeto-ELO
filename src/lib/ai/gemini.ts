import { GoogleGenAI, Type } from '@google/genai';

// Instância do Gemini API com o SDK oficial @google/genai
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export interface AISynopsisResponse {
  titulo_normalizado: string;
  sinopse: string;
  fatos: string[];
  alegacoes_atribuidas: string[];
  data_fato: string;
  precisao_data: string;
  personagens: string[];
  orgaos: string[];
  locais: string[];
  temas: string[];
  tags: string[];
  confianca: number;
  review_required: boolean;
  modelo_versao: string;
}

export interface AISentimentResponse {
  alvo: string;
  canal: 'imprensa' | 'redes' | 'institucional' | 'declaracao_terceiro';
  polaridade: 'positivo' | 'negativo' | 'neutro' | 'misto' | 'indeterminado';
  confianca: number;
  evidencia_citada: string;
  justificativa_metodologica: string;
}

/**
 * Gera sinopse estritamente factual de 2 a 3 frases (40 a 70 palavras),
 * extraindo entidades e distinguindo fatos confirmados de alegações atribuídas.
 */
export async function analyzeDocumentWithGemini(
  documentTitle: string,
  contentSample: string
): Promise<AISynopsisResponse | null> {
  const ai = getGenAI();
  if (!ai) {
    console.warn('GEMINI_API_KEY não configurada no ambiente.');
    return null;
  }

  try {
    const prompt = `Você é um pesquisador sênior e analista documental da plataforma ELO no documentário "Última Instância — Ricardo Couto".
Analise o documento a seguir e produza uma sinopse curta, rigorosa e factual de 2 a 3 frases (40 a 70 palavras).
Regra estrita: NUNCA invente fatos. Distinga explicitamente fatos consumados de alegações atribuídas a fontes políticas ou investigações em curso.

Título do Arquivo: "${documentTitle}"
Conteúdo extraído:
${contentSample.slice(0, 8000)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titulo_normalizado: { type: Type.STRING },
            sinopse: { type: Type.STRING },
            fatos: { type: Type.ARRAY, items: { type: Type.STRING } },
            alegacoes_atribuidas: { type: Type.ARRAY, items: { type: Type.STRING } },
            data_fato: { type: Type.STRING },
            precisao_data: { type: Type.STRING },
            personagens: { type: Type.ARRAY, items: { type: Type.STRING } },
            orgaos: { type: Type.ARRAY, items: { type: Type.STRING } },
            locais: { type: Type.ARRAY, items: { type: Type.STRING } },
            temas: { type: Type.ARRAY, items: { type: Type.STRING } },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            confianca: { type: Type.NUMBER },
            review_required: { type: Type.BOOLEAN },
            modelo_versao: { type: Type.STRING },
          },
          required: [
            'titulo_normalizado',
            'sinopse',
            'fatos',
            'alegacoes_atribuidas',
            'personagens',
            'confianca',
            'modelo_versao',
          ],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AISynopsisResponse;
    }
    return null;
  } catch (error) {
    console.error('Erro na extração documental via Gemini:', error);
    return null;
  }
}

/**
 * Adaptador para NotebookLM Enterprise.
 * Como o NotebookLM Enterprise exige licenciamento prévio específico em preview,
 * a plataforma disponibiliza interface de contrato sem bloquear o fluxo do ELO.
 */
export const notebookLmAdapter = {
  status: 'NotebookLM Enterprise: pronto para credenciamento corporativo GCP',
  isConfigured: false,
  checkAvailability: async () => {
    return {
      configured: false,
      message: 'NotebookLM: não configurado — operando via Gemini API v2.5 Server-Side como motor primário garantido.',
    };
  },
};
