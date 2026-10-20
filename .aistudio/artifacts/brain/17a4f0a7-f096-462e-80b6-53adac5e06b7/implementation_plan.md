# ELO V1 — Plataforma de Pesquisa e Inteligência Governamental
## Caso: Documentário "Última Instância — Ricardo Couto"

O ELO V1 é uma plataforma editorial e analítica full-stack voltada a pesquisadores, roteiristas e jornalistas de dados, concebida para indexar, analisar e navegar pelo acervo documental e audiovisual do documentário "Última Instância — Ricardo Couto", com integração direta ao Google Drive e análise factual por IA.

### User Review & Critical Decisions

> [!IMPORTANT]
> As cinco decisões estratégicas foram alinhadas com as suas respostas e governam a arquitetura da V1:

- **Autenticação & Google Drive**: Login Google OAuth com permissão de leitura (`drive.readonly`) e carregamento imediato do acervo estruturado pré-catalogado das três pastas raiz, garantindo funcionamento instantâneo enquanto novas sincronizações ocorrem.
- **Persistência de Dados**: Conexão direta com o Google Drive como fonte de verdade dos arquivos, suportada por armazenamento estruturado e auditável no backend da aplicação, permitindo sincronização incremental idempotente sem necessidade de commit ou rebuild.
- **Tela de Boas-Vindas**: Apresentação inicial sofisticada com contextualização do documentário, botões diretos para as três abas principais, acesso rápido à Linha do Tempo e ao Preâmbulo Editorial.
- **Motor de Inteligência Artificial**: Gemini 2.5 Server-Side como motor analítico principal (sinopses factuais de 2-3 frases, extração de entidades, timestamps e citações), com camada de abstração pronta para conexão com NotebookLM Enterprise.
- **Análise de Sentimento com Rigor Metodológico**: Separação estrita entre cobertura de imprensa e manifestações de redes sociais, exigindo citação literal de evidência, alvo explícito, polaridade (`positivo`, `negativo`, `neutro`, `misto`, `indeterminado`) e sem atribuição de sentimento a imagens de ambientação.

---

### 1. Overview & Core Concept

- **O que faz**: A plataforma organiza o acervo de pesquisa em exatamente três eixos fundamentais correspondentes às três pastas oficiais do Google Drive:
  1. **Arquivos do Governo** (`1VNLpztK8pTmx2vno0gp0toOl8GwAjxfc`): Registros oficiais, pronunciamentos, coletivas, entrevistas institucionais e atos da administração.
  2. **Redes Sociais e Imprensa** (`1WYDQHNu30SsfnCZud_Dt_70k0Mg0UwT8`): 20 pesquisas temáticas catalogadas a partir de planilhas de monitoramento (`.xlsx/.xlsm`), notícias, publicações sociais e linha do tempo unificada.
  3. **Ambientações e Locações** (`12MZSuE8UAu44NQpfOrBRn0OEDP-zsRix`): Catálogo de produção audiovisual organizado por locações (ALERJ, Palácio Guanabara/Laranjeiras, Fazenda, REFIT, Tribunal de Justiça, OAB), com tomadas de fachada, drone, corredores e circulação.
- **Público-Alvo**: Roteiristas, diretores audiovisuais, pesquisadores documentais e equipe de comunicação e inteligência da FSB.
- **Valor Principal**: Transparência e rastreabilidade absoluta: cada sinopse, citação ou gráfico tem proveniência declarada (pasta > arquivo > planilha > aba > linha), sem dados alucinados ou conexões forçadas.

---

### 2. User Experience & Visual Design

- **Direção Visual**: Editorial institucional contemporânea, inspirada no design de arquivos documentais e galerias de arte contemporânea.
  - **Paleta**: Tela neutra alabastro/papel acolhedor (`#FBF9F5` / `#18181B`), divisórias sutis em hairline (`border-stone-200` / `border-stone-800`), tipografia grafite profundo (`#1C1917`), e acentos sóbrios terracota/bronze (`#9A3412` / `#C2410C`) para a marca ELO e estados de destaque.
  - **Tipografia**: Pares distintos com alta legibilidade — display serif editorial para títulos de acontecimentos e marcos documentais, combinado com sans-serif moderno e numerais tabulares (`tabular-nums`) para datas, contagens e metadados.
  - **Anti-Slop Discipline**: Eliminação total de pílulas estáticas e bordas grossas esquerdas; metadados exibidos como texto limpo unboxed com separadores tipográficos (`·` e `/`); botões funcionais com rótulos diretos e claros.
- **Fluxos do Usuário**:
  1. **Tela de Boas-Vindas**: Apresentação editorial de alto padrão com resumo do documentário "Última Instância — Ricardo Couto", botões de acesso direto às 3 abas, status da conexão Drive e acesso rápido à Linha do Tempo.
  2. **Navegação nas 3 Abas**:
     - *Aba 1 (Governo)*: Árvore automática de temas institucionais, filtros por personagens e secretarias, status de pastas vazias ("Aguardando arquivos no Google Drive").
     - *Aba 2 (Redes & Imprensa)*: Visão dupla entre Linha do Tempo Cronológica e Catálogo dos 20 Temas, com painel de sentimento fundamentado e links diretos para as matérias e planilhas de origem.
     - *Aba 3 (Ambientações)*: Grade de produção por local com tags cinematográficas (drone, fachada, circulação) e player audiovisual sob demanda.
  3. **Painel Lateral de Leitura**: Drawer amplo com abas internas factuais (`O que aconteceu`, `Contexto`, `Fontes`, `Vídeos`, `Sentimento`, `Rastreabilidade`, `Pendências`).

---

### 3. Key Product Decisions & Trade-Offs

- **Três Abas Estritas no Topo**: Conforme o briefing, a barra de navegação superior não contém abas extras como "Dashboard" ou "Configurações". O painel de administração e sincronização reside em um menu secundário discreto para usuários autorizados.
- **Fonte de Verdade Híbrida**: O Google Drive é a fonte de verdade incontestável dos arquivos originais. A camada ELO atua como repositório de metadados enriquecidos, indexação textual e status de curadoria humana.
- **Pastas Vazias Visíveis**: Pastas identificadas no Drive sem arquivos não são ocultadas; recebem aviso explícito de *"Aguardando arquivos no Google Drive"* e link de abertura direta, preservando a verdade da estrutura.
- **Player Audiovisual com Respeito a Permissões**: Verificação de status do arquivo no Drive com preview embed nativo autenticado, indicação clara de disponibilidade e fallback elegante para abertura no Drive quando restrito.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ELO V1 Frontend (React SPA)                    │
│                                                                        │
│  ┌───────────────────────┐  ┌───────────────────────────────────────┐  │
│  │   Tela Boas-Vindas    │  │        Barra Superior ELO             │  │
│  │ (3 Botões + Contexto) │  │ [Marca ELO] - [3 Abas] - [Sync/Busca] │  │
│  └───────────────────────┘  └───────────────────────────────────────┘  │
│                                                                        │
│  ┌───────────────────────┐  ┌───────────────────┐  ┌────────────────┐  │
│  │ 1. Arquivos Governo   │  │ 2. Redes/Imprensa │  │ 3. Ambientação │  │
│  │ (Árvore + Atos Ofic.) │  │ (20 Temas + Crono)│  │ (Locações/Cena)│  │
│  └───────────────────────┘  └───────────────────┘  └────────────────┘  │
│              ▲                        ▲                    ▲           │
│              └────────────────────────┼────────────────────┘           │
│                                       ▼                                │
│                     ┌──────────────────────────────────┐               │
│                     │   Drawer de Detalhes do Evento   │               │
│                     │  (Fatos, Provas, Mídia, Rastreio)│               │
│                     └──────────────────────────────────┘               │
└───────────────────────────────────────┬────────────────────────────────┘
                                        │
                                        ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        ELO Full-Stack API Layer                        │
│                                                                        │
│  ┌────────────────────┐   ┌────────────────────┐   ┌────────────────┐  │
│  │  Drive Sync Service│   │ Gemini AI Pipeline │   │ Sentiment Engine│  │
│  │(Recursivo/Changes) │   │(Zod Schema/Sinopse)│   │(Alvo/Evidência)│  │
│  └────────────────────┘   └────────────────────┘   └────────────────┘  │
│            │                        │                       │          │
│            ▼                        ▼                       ▼          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │     ELO Persistent Data Store (Pastas, Eventos, Fontes, Tags)    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│            │                                                           │
│            ▼                                                           │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Google Drive API v3 (OAuth Bearer / Google Workspace Connector) │  │
│  │  Pastas: 1VNLpztK... / 1WYDQHNu... / 12MZSuE8...                 │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

#### Modelo de Dados Principal:
- `DriveFolder`: `id`, `name`, `driveId`, `parentId`, `tabId`, `path`, `isEmpty`, `lastChecked`
- `DriveAsset`: `id`, `driveId`, `folderId`, `name`, `mimeType`, `size`, `webViewLink`, `status`
- `ResearchTopic`: `id`, `name`, `folderName`, `summary`, `status`, `sourcesCount`
- `Event`: `id`, `title`, `summary`, `description`, `date`, `dateAccuracy`, `topicId`, `tabId`, `characters`, `organizations`, `location`, `editorialStatus`
- `Source`: `id`, `type` (`news`, `social`, `official`, `video`), `vehicle`, `author`, `date`, `url`, `canonicalUrl`, `excerpt`, `sheetRef`
- `SentimentAnalysis`: `id`, `target`, `channel`, `author`, `date`, `polarity`, `confidence`, `evidenceQuote`, `isHumanReviewed`

---

### 5. Sequência de Execução Imediata

1. **Etapa A (Fundamentos & UI)**:
   - Configurar o layout institucional ELO, as 3 abas, a tela de boas-vindas com navegação em botões e o design system editorial sem pílulas.
2. **Etapa B (Estrutura Real do Google Drive)**:
   - Integrar os 3 IDs oficiais do Google Drive, listar a árvore de pastas reais (incluindo as pastas vazias confirmadas), e catalogar o acervo das 20 pesquisas temáticas.
3. **Etapa C (Linha do Tempo & Ingestão Documental)**:
   - Apresentar a cronologia completa da aba Redes Sociais e Imprensa, busca global, filtros combinados e drawer de leitura com rastreabilidade detalhada.
4. **Etapa D (Player Audiovisual, IA & Sentimento)**:
   - Implementar player sob demanda, análise de sentimento fundamentada por canal (imprensa vs redes) e integração server-side com Gemini.
5. **Etapa E (Validação & Qualidade)**:
   - Executar compilação, testes de tipagem e verificação de integridade no ambiente.
