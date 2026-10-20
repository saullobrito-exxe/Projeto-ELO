export type TabType = 'linha_do_tempo' | 'governo' | 'imprensa_redes' | 'locacoes';

export type MilestoneCategory =
  | 'administracao'
  | 'transparencia'
  | 'servidor'
  | 'arrecadacao'
  | 'economia'
  | 'rioprevidencia'
  | 'pge'
  | 'cedae'
  | 'obras'
  | 'seguranca'
  | 'saude'
  | 'transporte'
  | 'cultura'
  | 'clima_ambiente'
  | 'ciencia';

export interface ManagementMilestone {
  id: string;
  category: MilestoneCategory;
  categoryLabel: string;
  title: string;
  period: string;
  exactDate?: string;
  summary: string;
  highlights: string[];
  impactMetric?: {
    value: string;
    label: string;
  };
  sources: {
    title: string;
    outlet: string;
    url?: string;
  }[];
  videoUrl?: string;
  videoDuration?: string;
  tags: string[];
}

export type SentimentPolarity = 'positivo' | 'negativo' | 'neutro' | 'misto' | 'indeterminado';

export type SentimentChannel = 'imprensa' | 'redes' | 'institucional' | 'declaracao_terceiro';

export type EditorialStatus = 'descoberto' | 'extraido' | 'analisado' | 'em_revisao' | 'publicado' | 'erro' | 'incessivel';

export interface DriveFolder {
  id: string;
  driveId: string;
  name: string;
  parentId?: string;
  tab: TabType;
  path: string;
  isEmpty: boolean;
  subfoldersCount: number;
  filesCount: number;
  webViewLink: string;
  notes?: string;
}

export interface DriveAsset {
  id: string;
  driveId: string;
  folderId: string;
  name: string;
  mimeType: string;
  sizeBytes?: number;
  sizeFormatted?: string;
  createdTime: string;
  modifiedTime: string;
  webViewLink: string;
  thumbnailLink?: string;
  tab: TabType;
  status: EditorialStatus;
  hasVideo?: boolean;
  videoDuration?: string;
  hasTranscription?: boolean;
  synopsis?: string;
  factualClaims?: string[];
  identifiedPeople?: string[];
  tags?: string[];
  sheetOrigin?: {
    spreadsheetName: string;
    sheetTab: string;
    rowOrCell: string;
  };
  demarcationTags?: DemarcationTag[];
}

export interface SentimentRecord {
  id: string;
  target: string; // ex: 'Ricardo Couto', 'Governo do Estado', 'Secretaria da Fazenda'
  channel: SentimentChannel;
  authorOrOutlet: string;
  date: string;
  polarity: SentimentPolarity;
  confidence: number; // 0 a 100%
  evidenceQuote: string;
  editorialNotes?: string;
  isHumanReviewed: boolean;
}

export interface SourceItem {
  id: string;
  type: 'noticia' | 'rede_social' | 'oficial' | 'video' | 'planilha';
  title: string;
  outletOrAuthor: string;
  url: string;
  canonicalUrl?: string;
  publishDate: string;
  summary: string;
  sentiment?: SentimentRecord;
  sheetReference?: string;
  isAccessible: boolean;
}

export interface DemarcationTag {
  id: string;
  label: string;
  category: 'fase' | 'eixo' | 'tipo' | 'custodia';
  colorClass: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  eventDate: string;
  dateApproximated: boolean;
  dateAccuracyLabel?: string;
  summary: string;
  detailedContext?: string;
  tab: TabType;
  topicId?: string;
  topicName?: string;
  folderPath?: string;
  characters: string[];
  institutions: string[];
  location?: string;
  tags: string[];
  demarcationTags?: DemarcationTag[];
  sources: SourceItem[];
  assets: DriveAsset[];
  sentimentOverview?: {
    dominant: SentimentPolarity;
    pressCount: { positivo: number; negativo: number; neutro: number; misto: number };
    socialCount: { positivo: number; negativo: number; neutro: number; misto: number };
    confidenceAvg: number;
  };
  editorialStatus: EditorialStatus;
  isPreambleRelated?: boolean;
  suggestedConnections?: Array<{
    targetEventId: string;
    targetEventTitle: string;
    reason: string;
    status: 'confirmada' | 'sugerida';
  }>;
  pendingItems?: string[];
}

export interface ResearchTopic {
  id: string;
  folderName: string;
  topicNumber: number;
  title: string;
  summary: string;
  timeframe: string;
  monitoringSheetName?: string;
  eventsCount: number;
  videosCount: number;
  sourcesCount: number;
  sentimentSummary: {
    pressPolarity: SentimentPolarity;
    socialPolarity: SentimentPolarity;
    totalSampled: number;
  };
}

export interface LocationScene {
  id: string;
  name: string;
  driveFolderId: string;
  description: string;
  isEmpty: boolean;
  tags: ('fachada' | 'drone' | 'corredor' | 'plenário' | 'movimentação' | 'circulação de pessoas' | 'entrada/saída' | 'imagem de apoio')[];
  assets: DriveAsset[];
  relatedEventsSuggestions?: string[];
}

export interface SyncStats {
  lastSyncAt: string;
  status: 'sincronizado' | 'processando' | 'erro' | 'aguardando_auth';
  totalFolders: number;
  emptyFolders: number;
  totalAssets: number;
  analyzedAssets: number;
  videosTested: number;
  sourcesCataloged: number;
  eventsTotal: number;
}

export interface VideoPlayerData {
  title: string;
  url?: string;
  driveId?: string;
  duration?: string;
  sizeFormatted?: string;
  synopsis?: string;
  sourceLabel?: string;
  categoryLabel?: string;
  tags?: string[];
  webViewLink?: string;
}
