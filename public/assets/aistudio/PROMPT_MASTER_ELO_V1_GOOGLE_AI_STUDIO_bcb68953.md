# PROMPT MASTER — ELO V1
## Plataforma de Pesquisa e Inteligência Governamental | Caso inicial: documentário “Última Instância — Ricardo Couto”

### 0. ORIENTAÇÃO DE EXECUÇÃO — LEIA ANTES DE PROGRAMAR

Atue como uma equipe integrada de arquitetura de software, engenharia full-stack, UX/UI, pesquisa documental, jornalismo de dados, gestão de acervos audiovisuais, inteligência de comunicação e QA. Use o **Google AI Studio — Build Mode** para **construir efetivamente uma aplicação web full-stack funcional**, e não uma maquete, uma landing page ou um conjunto de cards com dados inventados.

**Nome:** ELO. **Assinatura:** Plataforma de Pesquisa e Inteligência Governamental. **Primeiro projeto:** Última Instância — Ricardo Couto. **Idioma:** português do Brasil. **Fuso:** America/Sao_Paulo. **Formato de data:** DD/MM/AAAA. **Público:** pesquisadores, roteiristas, produtores audiovisuais, profissionais de comunicação e gestores de conteúdo da FSB.

A ELO é uma plataforma reutilizável de pesquisa sobre governos; entretanto, **a V1 é deliberadamente focada neste documentário**. Preserve a arquitetura para expansão posterior, mas não implemente multiempresa, módulos comerciais ou funcionalidades especulativas nesta versão.

**Resultado inegociável:** um site navegável, com três abas, conectado de verdade ao Google Drive, com dados persistentes, sincronização automática, resumos e classificação documental rastreáveis, vídeos e fontes originais acessíveis segundo permissões reais, análise de sentimento fundamentada, GitHub e projeto pronto para Vercel.

**Regra de honestidade técnica:** não afirme que um serviço está conectado, que uma URL foi verificada, que um vídeo foi assistido ou que uma sincronização ocorreu sem executar a integração e testar o resultado. Na ausência de credenciais ou suporte do ambiente, entregue código funcional e fluxo de configuração, sinalize “Aguardando conexão” e não simule sucesso com dados fictícios. Não exiba botões inativos.

### 1. FONTES INICIAIS E PASTAS REAIS

**Google Drive raiz:**
`https://drive.google.com/drive/folders/1uJOTlvp4Bex2sjHsYW1ZqIDc7nVTIZbw`

As **três únicas abas principais** devem corresponder às três pastas reais já existentes, usando seus IDs e não apenas os nomes:

1. **Arquivos do Governo** — `1VNLpztK8pTmx2vno0gp0toOl8GwAjxfc`
   `https://drive.google.com/drive/folders/1VNLpztK8pTmx2vno0gp0toOl8GwAjxfc`
2. **Redes Sociais e Imprensa** — `1WYDQHNu30SsfnCZud_Dt_70k0Mg0UwT8`
   `https://drive.google.com/drive/folders/1WYDQHNu30SsfnCZud_Dt_70k0Mg0UwT8`
3. **Ambientações e Locações** — `12MZSuE8UAu44NQpfOrBRn0OEDP-zsRix`
   `https://drive.google.com/drive/folders/12MZSuE8UAu44NQpfOrBRn0OEDP-zsRix`

A conexão deve percorrer **recursivamente todas as subpastas e arquivos**, sem limite fixo de profundidade, com paginação da Drive API. O Google Drive é a **fonte de verdade para os arquivos**, mas o banco de dados é a fonte de verdade para os metadados enriquecidos, status editoriais, relações e histórico de sincronização.

**Organização atualmente observada:**
- `Redes Sociais e Imprensa` reúne **20 pastas temáticas já pesquisadas**. Cada pasta tem planilha de monitoramento (`.xlsx` ou `.xlsm`) e, quando existente, subpasta de vídeos `.mp4`. Respeite todas as abas das planilhas, não só a primeira: síntese, cronologia, notícias, redes, vídeos, fontes oficiais, prioridades e ressalvas.
- `Arquivos do Governo` tem, entre outras, `STF e Institucionais`, `Gerais (presença do RC e/ou secretários)`, `Entrevistas`, `Coletivas de imprensa` e `Inaurações` [mantenha o nome da pasta como está no Drive; não corrija nem renomeie]. Algumas dessas pastas contêm outras subpastas, ainda vazias.
- `Ambientações e Locações` tem `ALERJ`, `Sede da Secretaria da Fazenda`, `REFIT`, `Instituto do Cerebro`, `Palácio Laranjeiras`, `Tribunal de Justiça` e `Sede OAB RJ`, além de subpastas de tomadas, fachada, drone, corredores e circulação de pessoas.

**Exemplos de pastas confirmadas sem arquivos no inventário inicial:** `Arquivos do Governo / Entrevistas`; `Ambientações e Locações / ALERJ`; `Ambientações e Locações / Sede da Secretaria da Fazenda`; `Arquivos do Governo / STF e Institucionais / Vídeos do julgamento do STF`; `Arquivos do Governo / STF e Institucionais / Coletiva com Lula`; `Arquivos do Governo / Coletivas de imprensa / Canal Livre`; `Arquivos do Governo / Coletivas de imprensa / Entrevista para Roda Viva`. Outras subpastas poderão estar vazias: **confira todas durante a primeira sincronização**.

**Comportamento obrigatório para pastas vazias:** mostrar o nome e o caminho da pasta, a mensagem **“Aguardando arquivos no Google Drive”**, e, quando autorizado, um link “Abrir pasta no Drive”. Não ocultar pastas vazias, não gerar sinopse nem inventar imagens, temas ou data. Quando um arquivo chegar, o tema deve ser preenchido automaticamente na próxima sincronização.

**Preâmbulo editorial:** o documento `Preambulo1510.pdf`, se anexado ao projeto ou disponibilizado no Drive, será a referência editorial para o contexto inicial do documentário — notícia da chegada de Ricardo Couto, 20 anos de desgaste, tabuleiro da sucessão e transição para a história principal. **Não pressuponha que o Google AI Studio tenha acesso ao PDF enviado anteriormente em outra conversa.** Se ele não estiver acessível, indicar “Preâmbulo editorial pendente de importação”, permitir upload autenticado ou associação por ID, e manter a navegação factual baseada apenas no acervo conectado.

**Site anterior:** se eu anexar um ZIP ou conectar o repositório do projeto “Última Instância”, reutilize dele a base estruturada, os links e o que for tecnicamente aproveitável; modernize a arquitetura, não carregue as limitações de um HTML estático. Se não for anexado, não alegue ter lido esse código.

### 2. ESCOPO: EXATAMENTE TRÊS ABAS

A aplicação exibirá no menu principal **somente**:

#### ABA 1 — ARQUIVOS DO GOVERNO

Finalidade: organizar registros oficiais, entrevistas, coletivas, vídeos institucionais, atos, inaugurações, pronunciamentos e bastidores. A árvore de subpastas do Drive gera **temas e subtemas automaticamente**. Por exemplo: Coletivas de imprensa > Entrevista para Roda Viva. Permitir ver a cronologia do conteúdo documentado, filtrar por data, tema, personagem, secretaria, local, formato, tags, fontes e disponibilidade de vídeo.

Cada arquivo terá título original, sinopse factual de 2–3 frases quando analisado, tipo de registro, data do fato e da gravação/publicação separadas, personagens identificados somente quando respaldados, transcrição ou trechos relevantes quando processados, timestamps se disponíveis, documentos e vídeos associados, link para abrir o original e sinalização das limitações. **Tratar material institucional como fonte da administração, não como comprovação independente de alegações governamentais.**

#### ABA 2 — REDES SOCIAIS E IMPRENSA

Finalidade: reunir as **20 pesquisas temáticas** e suas fontes, respeitando a organização atual das pastas e os dados das planilhas, com uma linha do tempo unificada e um modo de exploração por tema.

Para cada tema, mostrar nome da pasta, breve resumo do acontecimento, data e precisão, notícias e seus veículos, publicações sociais, vídeos, fontes oficiais, personagens, hashtags/tags, dados relevantes, sentimento quando aplicável, relação com outros temas e ressalvas metodológicas. **Links existentes nas planilhas devem se tornar links funcionais na interface.** Usar identificadores estáveis e deduplicar URLs canônicas, mantendo as ocorrências originais e as relações com várias pesquisas. Não contar republicações como fatos independentes, nem chamar todas as referências de “notícias”.

Deve existir uma **linha do tempo cronológica**, com agrupamento visual discreto de acontecimentos e abertura de um painel de leitura do evento. Mostrar o conteúdo sem exigir abrir todos os links para entender o contexto.

#### ABA 3 — AMBIENTAÇÕES E LOCAÇÕES

Finalidade: um **catálogo audiovisual de produção** organizado pelos locais e cenas previstos. Preservar subpastas e tags como “fachada”, “drone”, “corredor”, “plenário”, “movimentação”, “entrada/saída” e “imagem de apoio” quando aparecerem nos nomes ou forem confirmadas no conteúdo.

A visualização principal será por **local + sequência de materiais**, com um seletor opcional de linha do tempo quando houver datas confirmadas. Não atribuir data histórica a uma tomada somente pela data em que ela foi enviada ao Drive. Vincular locais a eventos de outras abas apenas quando houver relação documental; por exemplo, imagens do Tribunal de Justiça podem ser relevantes para o trecho da sucessão, mas esse vínculo é uma **sugestão editorial**, não prova de que a imagem retrata o fato.

Nesta aba, priorizar galeria com miniaturas reais quando disponível, vídeos e acesso ao original, descrição objetiva do que foi efetivamente reconhecido e status de preenchimento das subpastas. **Não aplicar sentimento a imagens de apoio sem enunciados ou contexto opinativo.**

### 3. EXPERIÊNCIA GLOBAL DO USUÁRIO

**Navegação:** cabeçalho compacto com marca ELO e assinatura, identificação do projeto “Última Instância”, as três abas, busca global, botão de filtros e indicador discreto da última sincronização. Não adicionar uma quarta aba chamada Dashboard, NotebookLM, Análises ou Configurações. Recursos administrativos devem ficar sob um menu secundário acessível só a perfis autorizados; análises e filtros permanecem dentro das três abas.

**Primeira tela:** começar já mostrando a aba “Redes Sociais e Imprensa” com a cronologia, como continuidade do site do documentário, ou permitir lembrar a última aba visitada. Exibir uma introdução editorial de 2–3 linhas, não uma landing page extensa.

**Padrão do evento/card:**
- título do acontecimento (não apenas nome do arquivo);
- data do acontecimento e etiqueta de data aproximada quando necessária;
- resumo curto de leitura imediata (máximo 3 linhas);
- chips de tema/tags; origem (Arquivos do Governo / Redes e Imprensa / Ambientações);
- ícones reais para quantidades de vídeos, notícias, documentos e registros;
- sentimento relevante com contexto e nível de confiança, quando houver;
- marcador `Preâmbulo` ou `Pesquisa complementar` somente quando essa relação for comprovada;
- status editorial e status de processamento.

Ao clicar, abrir **painel lateral amplo no desktop** e **tela detalhada no celular**, sem perder o ponto da navegação. Estrutura interna: `O que aconteceu`, `Contexto`, `O que dizem as fontes`, `Vídeos e imagens`, `Notícias`, `Documentos`, `Sentimento`, `Conexões`, `Rastreabilidade`, `Pendências`. Mostrar somente as seções com dados; manter pendências visíveis à equipe. Possibilitar ir ao evento anterior/próximo.

**Busca e filtros:** pesquisa textual por título, transcrição, resumo, personagem, instituição, palavra-chave, local, nome original do arquivo, veículo, tema e tags; filtros por intervalo de datas, aba, subpasta, formatos, personagem, local, sentimento, fonte, presença de vídeo, material não analisado, fonte inacessível e status editorial. Permitir combinar filtros, limpar com um clique e exibir quantos resultados existem. Incluir chips clicáveis para tags que aplicam automaticamente o filtro.

**Duas perspectivas sobre a mesma base:** sequência cronológica de **acontecimentos** e catálogo de **arquivos/fontes**. Evitar confundir data de envio com data do fato. Um arquivo pode relacionar-se a vários acontecimentos sem duplicação; um acontecimento pode ter várias fontes e arquivos.

**Direção de arte:** editorial, sóbria, contemporânea, minimalista; cores neutras com uma cor de destaque da marca ELO; tipografia de alta legibilidade; espaço em branco; identidade institucional sofisticada, sem excesso de gráficos, gradientes e animações. Desktop e mobile first com responsividade real, navegação por teclado, WCAG 2.2 AA quando viável, estados de carregamento, vazio, erro e sucesso; controles com feedback imediato. Não criar menus profundamente aninhados ou botões que parecem funcionar, mas não funcionam.

### 4. APLICAÇÃO FULL-STACK, SEGURANÇA E PERSISTÊNCIA

**Tecnologia preferida:** Next.js (App Router) + React + TypeScript, Tailwind CSS e componentes acessíveis (por exemplo, shadcn/ui), com rotas e serviços server-side; banco PostgreSQL persistente (Neon, Supabase ou outro compatível com Vercel) usando Prisma/Drizzle, migrations, índices e configuração de ambiente. Se o ambiente do AI Studio disponibilizar inicialmente outro stack, mantenha arquitetura portável ao Vercel e justifique a escolha.

Não depender de `data.js` ou JSON embarcado como única base de produção; esses podem servir para importar o acervo anterior, mas **a fonte dinâmica deve ser uma base persistente**. A atualização de conteúdo nunca deve exigir commit, rebuild ou novo deploy. Separar camadas de UI, API, adaptadores Drive, pipeline de IA, banco, autenticação, jobs e logs.

**Identidade e autorização:** login Google por OAuth com escopos mínimos e consentimento; papéis `admin`, `editor`, `pesquisador`/`leitor`. Só `admin` pode configurar Drive, credenciais, sincronização e publicação; `editor` pode corrigir textos e aprovar metadados; `leitor` apenas consultar dados autorizados. O site poderá ter URL online, mas o **acervo não deve ficar público por padrão**. Preservar permissões reais do Drive. Não alterar permissões, não usar link “qualquer pessoa” como atalho, não expor API keys, refresh tokens, documentos privados, transcrições ou links assinados no HTML público ou GitHub. Guardar secrets no ambiente servidor e tokens protegidos. Se arquivos forem privados, usar visualização autenticada/servidor com checagem de autorização, evitando vazamento no cache.

**Acesso e conformidade:** tratar material político, imagem/voz, dados pessoais e direitos de transmissão com controle de acesso, log de auditoria, retenção e revisão editorial. Não redistribuir cópias integrais de reportagens, vídeos ou textos protegidos sem licença; usar embed oficial ou link à fonte. Não enviar conteúdo restrito a serviços de IA sem autorização para processamento.

### 5. GOOGLE DRIVE: INVENTÁRIO E ATUALIZAÇÃO AUTOMÁTICA

Implementar a **Google Drive API v3** com autenticação adequada, varredura recursiva e armazenamento incremental de metadados: `fileId`, `folderId`, parent IDs, caminho completo, nome original, MIME type, tamanho, createdTime, modifiedTime, versão/hash quando disponível, webViewLink, permissões e status de acesso. Seguir paginação e tratar rate limits, arquivos enormes, atalhos e pastas movidas.

**Primeira sincronização:**
1. Identificar todas as pastas e subpastas sob os três IDs de origem, inclusive vazias.
2. Catalogar arquivos reais sem descartá-los por extensão.
3. Para documentos e planilhas suportados, extrair conteúdo com ferramentas próprias; `.xlsx` e `.xlsm` devem ser lidos **sem executar macros**, cobrindo todas as abas com conteúdo.
4. Extrair e normalizar fontes, nomes, datas, URLs, temas e eventuais prioridades; conservar uma referência literal à planilha, aba e linha/célula de origem.
5. Identificar vídeos por metadata sem afirmar que o conteúdo foi visualizado; enfileirar processamento autorizado.
6. Construir acontecimentos e relacionamentos sem duplicar arquivos e sem inventar fatos.
7. Mostrar um relatório honesto do processamento.

**Sincronizações futuras:** habilitar processamento incremental de novos, alterados, movidos e removidos (ou inacessíveis) com `changes.getStartPageToken` / `changes.list` da Drive API quando adequado; manter verificação periódica da árvore de pastas e da pertinência dos arquivos. Considerar `changes.watch` com webhook seguro se apropriado, mas não depender de webhook sem configuração. Persistir `lastSyncAt`, `changeToken`, versão/hash, filas, erros, retries e logs. Operações devem ser **idempotentes**: reprocessar a mesma alteração não duplica arquivos ou eventos. Se um arquivo mudar, atualizar resumos e análises dependentes; não sobrescrever silenciosamente anotações humanas. Arquivos removidos devem ser marcados como indisponíveis ou arquivados, com histórico, sem desaparecer misteriosamente.

**Agendamento inicial seguro:** sincronização automática diária, compatível com Vercel Cron no plano Hobby. Permitir frequência menor apenas se o plano contratado suportar, sem presumir Pro. Oferecer botão “Sincronizar agora” para admin, indicador “Última atualização”, status `Sincronizado`, `Processando`, `Pendente de autorização`, `Erro`, contagem real de itens novos e botão “Ver detalhes”. Para vídeos grandes, dividir o trabalho em jobs assíncronos com fila e retry, sem ultrapassar timeout de uma função serverless. Não executar a IA de todo o acervo em cada acesso à página.

**Política de publicação:** conteúdo novo pode entrar automaticamente no inventário interno, com título/tema e análise pendente; **não publicar sinopses ou sentimento gerados por IA para audiência externa sem política de aprovação editorial**. Implementar estados `descoberto`, `extraído`, `analisado`, `em revisão`, `publicado`, `erro` e `inacessível`. Para acesso interno, permitir consulta de registros em revisão com etiqueta explícita.

### 6. PROCESSAMENTO IA, NOTEBOOKLM E ALTERNATIVA GARANTIDA

**Objetivo editorial:** para cada arquivo elegível, produzir uma **sinopse curta, clara e rastreável** (40–70 palavras, ou 2–3 frases); registrar o assunto principal, fatos alegados versus confirmados, atores, locais, datas, tags, temas e possíveis conexões. Vídeos precisam, quando tecnicamente possível, de descrição de cenas, principais falas e timestamps; links jornalísticos de título, veículo, data, resumo do conteúdo realmente acessado e URL original. Uma sinopse deve explicar o valor do material sem exigir que o pesquisador o abra imediatamente.

**Integração desejada com NotebookLM:** avaliar **antes de implementar** se a conta/projeto dispõe de **NotebookLM Enterprise API** (pode exigir licenciamento e recursos em preview) ou outra interface oficial atualmente autorizada que permita criar notebooks, adicionar fontes e consultar resultados programaticamente. Se houver:
- preparar um notebook ou coleção organizada por projeto e/ou eixo, com rastreabilidade por source ID;
- enviar apenas fontes autorizadas e suportadas, respeitando limites e permissões;
- atualizar/reassociar as fontes quando mudarem e persistir o estado;
- usar o resultado como apoio à compreensão documental, citando fontes e verificando sua cobertura.

**Regra técnica crítica:** **não inventar uma API do NotebookLM de consumo, não fazer scraping da interface e não afirmar que o NotebookLM lê automaticamente uma pasta inteira ou devolve uma sinopse ao site sem integração comprovada.** Se não houver API suportada/licença ou a integração não estiver disponível, implementar imediatamente **Gemini API do lado do servidor** como motor principal de extração e análise (PDF/texto/planilha/áudio/vídeo, usando métodos suportados como File API para mídia). Disponibilizar status `NotebookLM: não configurado` e, se útil, exportação/manual de fontes para estudo humano no NotebookLM, **sem bloquear nenhum recurso central do ELO**. Quando a integração empresarial for habilitada depois, permitir ativá-la sem reescrever a UI ou a base.

**Pipeline de IA:** detectar MIME; extrair texto e tabelas com parser apropriado; processar vídeo/áudio via Gemini quando disponível com controle de tamanho, custos e formato; usar transcrição e timestamps sempre que suportados; ler URLs públicas acessíveis, mas não “adivinhar” conteúdo de página bloqueada, vídeo não aberto ou post fechado; guardar trechos de evidência e versão do modelo. Para mídias não processadas, mostrar somente metadados e “Sinopse automática indisponível — conteúdo não analisado”.

**Saída estritamente estruturada:** usar JSON Schema/Zod validado no backend para retornar `titulo_normalizado`, `sinopse`, `fatos`, `alegacoes_atribuidas`, `data_fato`, `precisao_data`, `personagens`, `orgaos`, `locais`, `temas`, `tags`, `tipo_fonte`, `trechos_citados`/`timestamp`, `fontes`, `verificacao`, `conexoes_sugeridas`, `pendencias`, `confianca`, `modelo_versao` e `review_required`. Validar campos e rejeitar respostas que não tenham fonte suficiente. Não preencher campos ausentes com hipóteses.

**Conexões entre fontes:** construir relações automáticas sugeridas entre arquivos e acontecimentos por data, tema, nomes e semelhança textual; deduplicar e mostrar justificativa da conexão (“mesma decisão judicial”, “referência ao mesmo anúncio” etc.). Classificar como `confirmada documentalmente` ou `sugerida para revisão`. Permitir que editores aceitem/recusem uma conexão; não transformar coincidência de palavras em causalidade.

### 7. ANÁLISE DE SENTIMENTO — OBRIGATÓRIA, MAS METODOLOGICAMENTE VÁLIDA

O ELO deve permitir entender **como fontes e manifestações se posicionam sobre o governo Ricardo Couto, seus atos, medidas e personagens**, sem confundir tom de notícia com percepção da população nem adotar avaliações políticas do sistema como verdade.

**Unidade de classificação:** fonte ou registro opinativo individual, quando houver texto/fala suficiente. Classificar por alvo explícito (`Governo`, `Ricardo Couto`, `medida específica`, `secretaria`, `outro ator`), canal (`imprensa`, `redes`, `institucional`, `declaração de terceiro`), autoria/fonte, data, excerto de evidência, polaridade e confiança.

**Régua de sentimento:** `positivo`, `negativo`, `neutro`, `misto` e `indeterminado`. Positivo = elogio/apoio explícito ao alvo; negativo = crítica/rejeição explícita; neutro = relato descritivo sem posicionamento detectável; misto = apoios e críticas relevantes na mesma unidade; indeterminado = conteúdo insuficiente, ambíguo ou não processado. Uma manchete de crise **não é automaticamente negativa**; uma matéria factual sobre exoneração tampouco. Declarações do governo sobre seus resultados devem aparecer como **posição institucional**, separadas de recepção externa; cenas de fachada ou imagens de apoio são `não aplicável`, não entram no denominador. Não deduzir o sentimento dos cidadãos apenas do enquadramento da imprensa.

**Exibição:** sentimento no card apenas quando houver classificação fundamentada; no detalhe, explicar a classificação com evidência curta, autor, alvo, fonte e observações. Dentro de **Redes Sociais e Imprensa**, mostrar panorama por período/tema, **separando imprensa de redes sociais e, quando pertinente, discursos institucionais de terceiros**. Somente calcular percentuais se houver quantidade de unidades efetivamente analisadas, denominador explícito e critérios de amostragem. Informar cobertura, período e limitações; `misto` e `indeterminado` em categorias próprias. Não multiplicar uma única reportagem republicada para inflar contagens, não fabricar comentários, alcance, engajamentos ou representatividade.

Permitir revisão humana do sentimento e registrar versão da classificação. Identificar divergências ou notícias que mencionam acusações sem comprovação como **alegações atribuídas**, nunca como fatos verificados. O sistema serve à pesquisa e análise editorial, não à construção artificial de narrativas favoráveis ou desfavoráveis.

### 8. MODELO DE DADOS E RASTREABILIDADE

Implementar pelo menos estas entidades persistentes:
- `Project` (ELO V1 / Última Instância), `DriveFolder` (árvore, aba, caminho, vazio), `DriveAsset` (ID Drive único, MIME, versão, links, permissões, metadados, processamento);
- `ResearchTopic` (tema automaticamente gerado por subpasta; categoria, descrição e status);
- `Event` (ID estável, título, resumo, descrição, data e precisão, capítulo opcional, tema, personagens, instituições, local, status editorial e ligação com preâmbulo);
- `Source` (tipo, veículo, autoria, publicação, URL original, URL canônica, acessibilidade, deduplicação, evidências);
- relações N:N `EventAsset`, `EventSource`, `EventTag`, `RelatedEvent` (com confiança/justificativa);
- `Tag` (normalizada com sinônimos, sem duplicatas evidentes), `Location`, `AITreatment` (modelo, versão, output validado, confiança), `SentimentAnalysis` (alvo, fonte, polaridade, justificativa, revisão), `SyncRun`, `AuditLog`, `UserRole`.

Cada informação exibida deve permitir rastrear o arquivo e, quando aplicável, **planilha > aba > linha/célula**, URL, transcrição/timestamp e data da última consulta. Preservar textos originais; a IA cria camadas derivadas, nunca substitui a fonte.

Criar índices por datas, temas, tags, pastas e busca textual. Consolidar múltiplos arquivos sobre o mesmo fato, mas preservar a proveniência completa. Usar IDs estáveis; `driveFileId` identifica arquivo, `eventId` identifica acontecimento, evitando a equivalência falsa entre os dois.

### 9. PLAYER, LINKS E ARQUIVOS

Para `.mp4`, oferecer player **real** de acordo com as permissões efetivas: preview/embed do Drive autenticado quando suportado, ou arquivo servido com autorização adequada (streaming sob demanda com suporte a range, quando licenciado e tecnicamente viável). Não gerar iframe genérico que falha silenciosamente. Sempre oferecer `Abrir original no Google Drive`, status de acesso e, quando disponível, `Abrir no ponto 02:35`/timestamp. Para YouTube, usar incorporação oficial quando permitida; para Instagram/Facebook e notícias, incorporar apenas quando tecnicamente e juridicamente suportado e manter acesso original. Erros de iframe/cookies/CORS devem gerar fallback legível.

Mostrar `Vídeo identificado no Drive`, `Vídeo analisado`, `Reprodução testada`, `Não incorporável`, `Autorização necessária` como estados **distintos**. Nunca usar uma capa genérica fingindo ser o frame do vídeo. Carregar mídia sob demanda (lazy-load); galerias leves e paginação; não fazer download de dezenas de MP4 no navegador ao abrir a aba.

### 10. ADMINISTRAÇÃO DE CONTEÚDO E PAINEL DE SAÚDE

Sem criar uma quarta aba principal, fornecer menu interno para administradores: `Integrações`, `Sincronização`, `Fila de análise`, `Revisão editorial`, `Erros e logs`, `Permissões`.

Indicadores reais: pastas encontradas, pastas vazias, arquivos por aba/formato, arquivos novos desde a última execução, arquivos com sinopse, vídeos com player testado, fontes inacessíveis, temas catalogados, eventos distintos, classificação de sentimento coberta e itens pendentes. Marcar data/hora da última sincronização em America/Sao_Paulo. Permitir revisão e correção humana de sinopses, tags, datas, conexões, polaridade e relação com o roteiro, preservando histórico e impedindo que sincronização apague edições humanas.

Uma falha de IA não pode ocultar um arquivo já catalogado. Um erro de Google Drive não pode apagar a base existente; informar “Última sincronização falhou — exibindo dados salvos”.

### 11. GITHUB + VERCEL: PUBLICAÇÃO DE VERDADE

Organizar repositório com `src/app`, `src/components`, `src/lib/drive`, `src/lib/ai`, `src/lib/db`, `src/lib/auth`, `src/lib/sync`, `src/lib/ingestion`, `src/types`, `prisma` ou `drizzle`, `tests`, `README.md`, `.env.example`, arquivos de configuração, scripts de migração e testes. Utilizar a integração GitHub do AI Studio quando autorizada, e preparar projeto para o Vercel. **Não afirmar que GitHub ou Vercel estão conectados antes de receber autorização e testar.**

Adicionar rotas servidoras para `GET /api/health`, leitura paginada de eventos/fontes, `POST /api/admin/sync` protegido e endpoint de cron protegido. Implementar validação de `CRON_SECRET`, logs, locks contra execuções concorrentes e idempotência. Configurar `vercel.json` com cron **diário** por padrão, e documentar plano necessário para frequência maior. Jamais colocar tokens de Drive, senha de banco ou Gemini no frontend ou repositório. Disponibilizar variáveis em `.env.example` somente com nomes e descrições, por exemplo `DATABASE_URL`, `GEMINI_API_KEY`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`, `CRON_SECRET`, `NEXTAUTH_SECRET`/equivalente, `ELO_DRIVE_ROOT_ID`, IDs das três pastas, configuração opcional NotebookLM Enterprise.

Preparar integrações com OAuth e banco persistente em ambiente Vercel, domínio temporário `.vercel.app` somente após deploy verdadeiro, proteção do site por login e política de acesso ao acervo. Projeto deve poder evoluir sem rebuild por conteúdo; deploy somente para mudanças no código. Documentar custo aproximado e limitações de processamento de mídia, APIs, banco e cron; não estimar consumo sem métricas.

### 12. EXECUÇÃO EM ETAPAS — ENTREGUE CÓDIGO, NÃO SOMENTE PLANO

Execute nesta ordem, sem me interromper por decisões triviais:

**Etapa A — Fundamentos:** iniciar projeto full-stack, criar layout ELO e três abas com estados vazios reais, login/roles, banco/schema/migrations. Verificar build.

**Etapa B — Google Drive:** implementar OAuth/credenciais, catálogo recursivo e primeiro sync das três pastas reais. Exibir estrutura existente, inclusive vazios e nomes originais. Verificar IDs, permissões e contagens efetivas.

**Etapa C — Ingestão:** ler documentos, abas de planilhas `.xlsx/.xlsm`, URLs e referências; estruturar temas, eventos, fontes e vídeos; preservar evidências e deduplicação. Publicar a cronologia **real** da aba Redes Sociais e Imprensa.

**Etapa D — IA:** implementar motor Gemini e adaptador opcional NotebookLM Enterprise, sinopses e tags, vínculos sugeridos, extração audiovisual e sentimento com critérios acima. Processamento em fila, sem bloqueio da UI.

**Etapa E — Interface final:** refinar busca, filtros, cards, detalhe, players, catálogo de locações, insights e pendências. Usar os três modos como **abas**, e não reproduzir a navegação Documentário/Pesquisa/Lacunas do protótipo anterior como abas extras. A narrativa e as lacunas devem existir dentro de cada aba e/ou nos detalhes/painel administrativo.

**Etapa F — Autoatualização:** implementar sync incremental e cron diário, botão manual, logs, tratamento de novos/alterados/excluídos, filas e tratamento de erros. Simular testes controlados de chegada de arquivo **somente em fixture/teste**, nunca modificar pastas de produção sem autorização.

**Etapa G — Qualidade:** testes automatizados unitários, integração com mocks de Drive/Gemini, testes de componentes e E2E de navegação. Corrigir erros reais de console, build, lint e TypeScript. Testar em desktop e mobile, teclados, vídeos e links efetivos, inclusive acessos negados. Não relatar como “testado” algo não executado.

**Etapa H — Entrega:** projeto completo, GitHub conectado se autorizado, Vercel conectado/deploy confirmado se autorizado, README com passos exatos e um relatório conciso: `Implementado`, `Testado`, `Aguardando credenciais`, `Limitado por API/permissões`, `Próximas melhorias`. Mostrar URLs reais de deploy somente após obtê-las da plataforma.

### 13. CRITÉRIOS DE ACEITAÇÃO

A V1 só pode ser chamada de concluída quando:

1. A interface tem **exatamente três abas** nomeadas como as três pastas do Drive, sem quarta aba principal.
2. Uma autorização Google válida permite **listar recursivamente** a estrutura real, inclusive pastas vazias, e exibir o tema corretamente em cada aba.
3. Os **20 temas preexistentes** de Redes Sociais e Imprensa são importados do Drive e consultáveis, quando a conta autorizada tem acesso; todas as abas relevantes das planilhas são consideradas.
4. Linha do tempo, busca, tags, filtros e detalhes navegam de fato; registros têm URL original e proveniência.
5. Arquivos/links acessíveis geram sinopse e relações **com base no conteúdo realmente processado**; os demais mostram pendência sem dados inventados.
6. A análise de sentimento individualiza fontes/canais/alvos e só apresenta números sustentados por amostras efetivas.
7. Os vídeos compatíveis são reproduzíveis mediante permissão; os incompatíveis exibem acesso alternativo e motivo.
8. A base é persistente; inclusão de arquivo no Drive entra no inventário após sincronização **sem commit/redeploy**.
9. OAuth, rotas administrativas, cron e secrets estão protegidos; conteúdo restrito não fica exposto só porque o site está online.
10. O projeto faz build, tem testes executados e está pronto para GitHub + Vercel, com integração e endereço confirmados quando autorizados.

**Restrições finais:** nenhuma informação fabricada, nenhum link inventado, nenhum player falso, nenhuma síntese com base apenas no nome do vídeo apresentada como se houvesse sido assistido, nenhuma análise de sentimento aplicada a imagens silenciosas, nenhuma integração “simulada” reportada como real, nenhuma alteração de acesso ao Google Drive sem minha autorização. **O foco da V1 é usabilidade, fidelidade ao acervo do documentário e atualização automática confiável. Execute o máximo possível e sinalize apenas bloqueios reais.**
