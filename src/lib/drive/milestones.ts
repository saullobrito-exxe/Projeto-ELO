import { ManagementMilestone, MilestoneCategory } from '../../types';

export const MILESTONE_CATEGORIES: { id: MilestoneCategory; label: string; color: string }[] = [
  { id: 'administracao', label: 'Reestruturação Administrativa', color: 'bg-stone-900 text-stone-100' },
  { id: 'transparencia', label: 'Transparência & Gestão', color: 'bg-blue-100 text-blue-900 border border-blue-200' },
  { id: 'servidor', label: 'Valorização do Servidor', color: 'bg-purple-100 text-purple-900 border border-purple-200' },
  { id: 'arrecadacao', label: 'Aumento da Arrecadação & Propag', color: 'bg-emerald-100 text-emerald-900 border border-emerald-300' },
  { id: 'economia', label: 'Desenvolvimento Econômico', color: 'bg-amber-100 text-amber-900 border border-amber-300' },
  { id: 'seguranca', label: 'Segurança Pública & Polícias', color: 'bg-red-100 text-red-900 border border-red-300' },
  { id: 'saude', label: 'Saúde & Hospitais', color: 'bg-teal-100 text-teal-900 border border-teal-300' },
  { id: 'obras', label: 'Obras & Equipamentos', color: 'bg-orange-100 text-orange-900 border border-orange-200' },
  { id: 'transporte', label: 'Mobilidade & Transporte', color: 'bg-cyan-100 text-cyan-900 border border-cyan-200' },
  { id: 'rioprevidencia', label: 'Rioprevidência', color: 'bg-indigo-100 text-indigo-900 border border-indigo-200' },
  { id: 'pge', label: 'PGE-RJ & Recuperação de Ativos', color: 'bg-slate-100 text-slate-900 border border-slate-300' },
  { id: 'cedae', label: 'Cedae & Eficiência', color: 'bg-sky-100 text-sky-900 border border-sky-300' },
  { id: 'cultura', label: 'Cultura & Carnaval', color: 'bg-pink-100 text-pink-900 border border-pink-200' },
  { id: 'clima_ambiente', label: 'Meio Ambiente & El Niño', color: 'bg-lime-100 text-lime-900 border border-lime-300' },
  { id: 'ciencia', label: 'Ciência, Tecnologia & Faperj', color: 'bg-violet-100 text-violet-900 border border-violet-200' },
];

export const MANAGEMENT_MILESTONES: ManagementMilestone[] = [
  // REESTRUTURAÇÃO DA ADMINISTRAÇÃO PÚBLICA
  {
    id: 'ms_adm_01',
    category: 'administracao',
    categoryLabel: 'Reestruturação Administrativa',
    title: 'Exoneração de 6,5 mil comissionados e choque de gestão',
    period: 'Março – Setembro / 2026',
    exactDate: '08/09/2026',
    summary: 'Auditoria geral resultou em mais de 6,5 mil exonerações de servidores comissionados, gerando economia estimada em R$ 311 milhões até o final do ano.',
    highlights: [
      'Economia estimada em cerca de R$ 311 milhões até o encerramento do exercício',
      'Desmonte de cargos ociosos e reavaliação de estruturas de apoio político',
      'Informação oficial consolidada pelo Comitê de Gestão em 08/09/2026',
    ],
    impactMetric: {
      value: 'R$ 311 milhões',
      label: 'Economia estimada em folha de comissionados',
    },
    sources: [
      { title: 'Auditoria corta mais de 6,5 mil cargos comissionados no RJ', outlet: 'Portal Oficial do Governo do RJ' },
      { title: 'Plano de contenção do déficit reduz máquina pública', outlet: 'G1 Rio' },
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    videoDuration: '02:40',
    tags: ['auditoria', 'cargos comissionados', 'corte de gastos', 'economia fiscal'],
  },
  {
    id: 'ms_adm_02',
    category: 'administracao',
    categoryLabel: 'Reestruturação Administrativa',
    title: 'Análise de integridade pelo Gabinete de Segurança Institucional (GSI)',
    period: 'Desde maio / 2026 até o momento',
    summary: 'Novos indicados a postos de confiança passam por triagem prévia obrigatória de antecedentes, conformidade e integridade pelo GSI.',
    highlights: [
      'Triagem de integridade antes da nomeação em Diário Oficial',
      'Prevenção de conflito de interesses e blindagem institucional',
      'Atuação conjunta do GSI com órgãos de fiscalização e controle',
    ],
    sources: [
      { title: 'Decreto estabelece checagem prévia pelo GSI para nomeações', outlet: 'Diário Oficial do Estado' },
    ],
    tags: ['integridade', 'compliance', 'GSI', 'nomeações'],
  },
  {
    id: 'ms_adm_03',
    category: 'administracao',
    categoryLabel: 'Reestruturação Administrativa',
    title: 'Fiscalização de contratos do Turismo com corte de R$ 26,1M',
    period: 'Maio / 2026',
    summary: 'Redução de mais de R$ 26,1 milhões em gastos com patrocínios e reformulação dos critérios técnicos para apoio a eventos no estado.',
    highlights: [
      'Economia direta superior a R$ 26,1 milhões no setor de turismo e eventos',
      'Estabelecimento de regras objetivas de contrapartida para eventos públicos',
    ],
    impactMetric: {
      value: 'R$ 26,1 milhões',
      label: 'Corte em patrocínios e eventos',
    },
    sources: [
      { title: 'Secretaria de Turismo adota novas diretrizes e reduz gastos com patrocínios', outlet: 'O Globo' },
    ],
    tags: ['turismo', 'patrocínios', 'fiscalização', 'revisão de contratos'],
  },
  {
    id: 'ms_adm_04',
    category: 'administracao',
    categoryLabel: 'Reestruturação Administrativa',
    title: 'Abertura de mais de 450 vagas em concursos públicos',
    period: 'Desde junho / 2026',
    summary: 'Autorização e abertura de mais de 450 vagas para órgãos estratégicos: Secretaria de Saúde, Iaserj, Polícia Militar, PGE-RJ, Inea e Seplag.',
    highlights: [
      'Fortalecimento de carreiras de estado e área da saúde pública',
      'Editais para PGE-RJ, Inea, Seplag, PM e Iaserj',
    ],
    impactMetric: {
      value: '+450 vagas',
      label: 'Concursos autorizados e em andamento',
    },
    sources: [
      { title: 'Governo do Estado anuncia concursos para Saúde, PGE e Meio Ambiente', outlet: 'Folha Dirigida' },
    ],
    tags: ['concursos públicos', 'saúde', 'PGE-RJ', 'Inea', 'Seplag'],
  },
  {
    id: 'ms_adm_05',
    category: 'administracao',
    categoryLabel: 'Reestruturação Administrativa',
    title: 'Auditoria em contratos com força-tarefa de auditores do TCM-Rio',
    period: 'Desde junho / 2026',
    summary: 'Força-tarefa integrada com auditores do TCM-Rio revisa gastos e contratos firmados nos últimos anos em todas as secretarias estaduais.',
    highlights: [
      'Pente-fino em compras públicas e contratações recorrentes',
      'Compartilhamento de corpo técnico de controle externo',
    ],
    sources: [
      { title: 'Acordo com TCM-Rio viabiliza força-tarefa de auditoria em contratos estaduais', outlet: 'G1 Política' },
    ],
    tags: ['auditoria', 'TCM-Rio', 'força-tarefa', 'contratos'],
  },
  {
    id: 'ms_adm_06',
    category: 'administracao',
    categoryLabel: 'Reestruturação Administrativa',
    title: 'Redução de secretarias de 32 para 28 e enxugamento de pastas',
    period: 'Junho – Agosto / 2026',
    summary: 'Reestruturação ministerial com queda do número de secretarias de 32 para 28. Fusão de Seenemar no Desenvolvimento Econômico e Juventude em Desenvolvimento Social.',
    highlights: [
      'Redução de 4 secretarias estaduais e extinção de subsecretarias paralelas',
      'Seplag reassume Subsecretaria de Gestão de Pessoal e Fundação Ceperj',
      'Extinção de 1.050 cargos “puxadinhos” vagos na estrutura do Poder Executivo',
    ],
    impactMetric: {
      value: '28 Secretarias',
      label: 'Redução da estrutura governamental (de 32 pastas)',
    },
    sources: [
      { title: 'Decreto consolida reforma e reduz secretarias para 28', outlet: 'Diário Oficial do Estado' },
    ],
    tags: ['reforma administrativa', 'redução de secretarias', 'fusão de pastas'],
  },
  {
    id: 'ms_adm_07',
    category: 'administracao',
    categoryLabel: 'Reestruturação Administrativa',
    title: 'Auditoria na Pesagro-Rio identifica centenas de bolsistas fantasmas',
    period: 'Setembro / 2026',
    summary: 'Economia imediata de mais de R$ 1 milhão no primeiro mês após a suspensão de pagamentos irregulares de bolsas e gratificações na empresa de pesquisa agropecuária.',
    highlights: [
      'Economia de R$ 1 milhão/mês aos cofres públicos',
      'Encaminhamento do relatório de apuração aos órgãos de controle',
    ],
    impactMetric: {
      value: 'R$ 1 milhão/mês',
      label: 'Economia após corte de irregularidades na Pesagro',
    },
    sources: [
      { title: 'Auditoria na Pesagro suspende bolsas irregulares e estanca desvios', outlet: 'O Dia' },
    ],
    tags: ['Pesagro-Rio', 'bolsistas fantasmas', 'combate a fraudes'],
  },

  // TRANSPARÊNCIA
  {
    id: 'ms_transp_01',
    category: 'transparencia',
    categoryLabel: 'Transparência & Gestão',
    title: 'Lançamento do Novo Portal da Transparência',
    period: 'Maio / 2026',
    summary: 'Estruturação de um portal mais didático, intuitivo e com ferramentas analíticas modernas para consulta cidadã e jornalística de despesas e receitas.',
    highlights: [
      'Visualização didática de dados orçamentários e contratos',
      'Download em formato aberto e API pública de dados',
    ],
    sources: [
      { title: 'Governo do RJ lança Portal da Transparência modernizado', outlet: 'Portal Oficial do Governo' },
    ],
    tags: ['portal da transparência', 'dados abertos', 'controle social'],
  },
  {
    id: 'ms_transp_02',
    category: 'transparencia',
    categoryLabel: 'Transparência & Gestão',
    title: 'Edital unificado de combustíveis para 77 órgãos com economia de R$ 11,5M',
    period: 'Julho / 2026',
    summary: 'Edital da Seplag unifica gestão de abastecimento e fornecimento de combustíveis para a frota oficial em contrato de 30 meses, economizando R$ 11,5 milhões.',
    highlights: [
      'Contratação centralizada para 77 órgãos e entidades',
      'Economia prevista de R$ 11,5 milhões nos 30 meses de vigência',
      'Controle por telemetria e cartões corporativos de frota',
    ],
    impactMetric: {
      value: 'R$ 11,5 milhões',
      label: 'Economia com abastecimento unificado de frota',
    },
    sources: [
      { title: 'Seplag unifica licitação de combustíveis de 77 entidades', outlet: 'Valor Econômico' },
    ],
    tags: ['combustíveis', 'licitação unificada', 'Seplag', 'frota oficial'],
  },
  {
    id: 'ms_transp_03',
    category: 'transparencia',
    categoryLabel: 'Transparência & Gestão',
    title: 'Programa Gestão em Números com painéis interativos abertos',
    period: 'Setembro / 2026',
    summary: 'Disponibilização de painéis interativos com dados inéditos sobre compras, contratos, consumo de combustíveis, viagens, passagens e fornecedores estaduais.',
    highlights: [
      'Painéis em Business Intelligence acessíveis a qualquer cidadão',
      'Transparência ativa sobre gastos com passagens aéreas e veículos',
    ],
    sources: [
      { title: 'Gestão em Números abre dados de compras e fornecedores no RJ', outlet: 'Agência Brasil' },
    ],
    tags: ['gestão em números', 'painéis analíticos', 'compras públicas'],
  },

  // VALORIZAÇÃO DO SERVIDOR
  {
    id: 'ms_serv_01',
    category: 'servidor',
    categoryLabel: 'Valorização do Servidor',
    title: 'Pagamento salarial no 1º dia útil de cada mês e 13º antecipado',
    period: 'Abril – Maio / 2026',
    summary: 'Restabelecimento do calendário de pagamento dos servidores no primeiro dia do mês e antecipação da 1ª parcela do 13º salário para o dia 19 de maio.',
    highlights: [
      'Previsibilidade e pontualidade integral para servidores da ativa, aposentados e pensionistas',
      '1ª parcela do 13º salário depositada um mês antes da data tradicional',
    ],
    sources: [
      { title: 'Governo do RJ antecipa primeira parcela do 13º dos servidores', outlet: 'Extra' },
    ],
    tags: ['salários', '13º salário', 'servidores públicos', 'calendário regular'],
  },
  {
    id: 'ms_serv_02',
    category: 'servidor',
    categoryLabel: 'Valorização do Servidor',
    title: 'Migração de carga horária para mais de 4,5 mil professores estaduais',
    period: 'Desde maio / 2026',
    summary: 'Convocação e aprovação do processo de migração de carga horária de 18 para 30 horas semanais para mais de 4,5 mil docentes da rede estadual.',
    highlights: [
      'Mais de 4.500 professores beneficiados com ampliação de jornada e renda',
      'Atendimento a demanda histórica da categoria do magistério fluminense',
    ],
    impactMetric: {
      value: '+4,5 mil docentes',
      label: 'Professores em migração para 30h semanais',
    },
    sources: [
      { title: 'Secretaria de Educação convoca professores para migração de carga horária', outlet: 'G1 Rio' },
    ],
    tags: ['professores', 'educação', 'migração de carga horária', 'Seeduc'],
  },
  {
    id: 'ms_serv_03',
    category: 'servidor',
    categoryLabel: 'Valorização do Servidor',
    title: 'Servidores de carreira em cargos de liderança estratégica',
    period: 'Desde junho / 2026',
    summary: 'Valorização do quadro efetivo com a nomeação de funcionários de carreira nos postos de comando de Casa Civil, Saúde, Obras, PGE, Cedae e Rioprevidência.',
    highlights: [
      'Comando técnico em mais de 16 secretarias e autarquias',
      'Despolitização da gestão e profissionalização do serviço público',
    ],
    sources: [
      { title: 'Governo prioriza servidores efetivos em diretorias de autarquias', outlet: 'O Dia' },
    ],
    tags: ['servidores de carreira', 'liderança técnica', 'governança'],
  },

  // AÇÕES PARA AUMENTO DA ARRECADAÇÃO & PROPAG
  {
    id: 'ms_arrec_01',
    category: 'arrecadacao',
    categoryLabel: 'Aumento da Arrecadação & Propag',
    title: 'Adesão ao Propag: Redução de R$ 42,1 bilhões na dívida com a União',
    period: 'Junho / 2026 – Em andamento',
    exactDate: '22/06/2026',
    summary: 'Adesão ao Programa de Pleno Pagamento de Dívidas dos Estados reduz a dívida de R$ 210,6 bi para R$ 168,5 bi com juros a 0% e parcela mensal caindo de R$ 436M para R$ 119M.',
    highlights: [
      'Redução de R$ 42,1 bilhões no saldo devedor mediante entrega de ativos',
      'Parcela mensal aliviada de R$ 436 milhões para R$ 119 milhões',
      'Contrapartida de 1% do saldo (R$ 900M em 2026 e R$ 2,2 bi em 2027) para ensino técnico, infraestrutura e segurança',
      'R$ 600 milhões específicos para ensino médio profissionalizante, dobrando a capacidade para 30 mil vagas',
      'Renegociação paralela de R$ 26 bilhões de dívidas com instituições bancárias',
    ],
    impactMetric: {
      value: '-R$ 42,1 bilhões',
      label: 'Redução do estoque da dívida estadual com a União',
    },
    sources: [
      { title: 'Rio de Janeiro adere ao Propag e reduz dívida bilionária com a União', outlet: 'Agência Brasil / EBC', url: 'https://agenciabrasil.ebc.com.br' },
      { title: 'STF estabelece prazo de 60 dias para pactuação final de garantias do Propag', outlet: 'Supremo Tribunal Federal', url: 'https://stf.jus.br' },
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    videoDuration: '03:15',
    tags: ['Propag', 'dívida com a União', 'RRF', 'ensino técnico', 'juros zero'],
  },
  {
    id: 'ms_arrec_02',
    category: 'arrecadacao',
    categoryLabel: 'Aumento da Arrecadação & Propag',
    title: 'Impedimento da Refit e pedido de desapropriação da refinaria de Manguinhos',
    period: 'Desde junho / 2026 até o momento',
    summary: 'Refit teve Inscrição Estadual impedida por irregularidades fiscais. O Estado solicitou à União a desapropriação da refinaria para operação pública qualificada.',
    highlights: [
      'Empresas do grupo impedidas de comprar produtos e emitir notas fiscais de venda',
      'Pedido protocolado no Governo Federal para desapropriação da Refinaria de Manguinhos',
      'Defesa de continuidade das atividades sob operadores qualificados e sem sonegação',
    ],
    sources: [
      { title: 'Governo do RJ cassa inscrição estadual da Refit e pede desapropriação', outlet: 'Valor Econômico' },
      { title: 'Operação mira fraudes fiscais no setor de refino e combustíveis', outlet: 'G1' },
    ],
    tags: ['Refit', 'Manguinhos', 'sonegação', 'inscrição estadual', 'desapropriação'],
  },
  {
    id: 'ms_arrec_03',
    category: 'arrecadacao',
    categoryLabel: 'Aumento da Arrecadação & Propag',
    title: 'Operação Foco nas divisas: +102% de autuações e +254% em multas',
    period: 'Junho / 2026',
    summary: 'Fortalecimento da fiscalização nas barreiras fiscais estaduais aumentou em 102% o número de autuações e em 254% o valor de penalidades aplicadas contra fraudes fiscais.',
    highlights: [
      'Combate direto à entrada de cargas irregulares e sonegação interestadual',
      'Aumento de 254% no volume arrecadatório de multas em barreiras',
    ],
    impactMetric: {
      value: '+254%',
      label: 'Aumento no valor de multas fiscais nas barreiras',
    },
    sources: [
      { title: 'Operação Foco bate recorde de apreensões e autuações nas divisas do RJ', outlet: 'O Globo' },
    ],
    tags: ['Operação Foco', 'fiscalização', 'barreiras fiscais', 'autuações'],
  },
  {
    id: 'ms_arrec_04',
    category: 'arrecadacao',
    categoryLabel: 'Aumento da Arrecadação & Propag',
    title: 'ICMS recorde: alta de 17,8% totalizando R$ 36,7 bilhões',
    period: 'Agosto / 2026',
    summary: 'O Rio de Janeiro registrou o maior crescimento na arrecadação de ICMS entre todos os estados brasileiros no 1º semestre de 2026, com R$ 36,7 bilhões arrecadados.',
    highlights: [
      'Crescimento de 17,8% em comparação ao mesmo período do ano anterior',
      'Liderança nacional no crescimento percentual da arrecadação tributária estadual',
      'Envio à Alerj dos projetos de Transação Tributária e Lei do Devedor Contumaz',
    ],
    impactMetric: {
      value: 'R$ 36,7 bilhões',
      label: 'Arrecadação de ICMS no 1º semestre (+17,8%)',
    },
    sources: [
      { title: 'Arrecadação de ICMS no Rio de Janeiro cresce 17,8% e lidera o país', outlet: 'CNN Brasil' },
    ],
    tags: ['ICMS', 'arrecadação recorde', 'devedor contumaz', 'transação tributária'],
  },
  {
    id: 'ms_arrec_05',
    category: 'arrecadacao',
    categoryLabel: 'Aumento da Arrecadação & Propag',
    title: 'Habilitação inédita de todos os 92 municípios fluminenses ao VAAR do Fundeb',
    period: 'Setembro / 2026',
    summary: 'Aprovação e regulamentação da lei do ICMS Educacional garantiu que 100% dos municípios do RJ cumprissem os requisitos para receber a parcela adicional do Fundeb.',
    highlights: [
      'Garantia de recursos suplementares para a educação básica em todos os 92 municípios',
      'Implementação prática dos critérios de desempenho escolar e equidade do VAAR',
    ],
    impactMetric: {
      value: '92 Municípios',
      label: 'Habilitação inédita de 100% das cidades fluminenses',
    },
    sources: [
      { title: 'Todos os 92 municípios do RJ são habilitados ao VAAR após regulamentação do ICMS Educacional', outlet: 'Agência Brasil' },
    ],
    tags: ['Fundeb', 'VAAR', 'ICMS Educacional', 'educação nos municípios'],
  },

  // ECONOMIA
  {
    id: 'ms_econ_01',
    category: 'economia',
    categoryLabel: 'Desenvolvimento Econômico',
    title: 'Abertura de 51 mil novos negócios e redução no preço do gás natural',
    period: 'Março – Agosto / 2026',
    summary: 'Registro de 51.093 novos negócios no estado, redução do preço do gás natural para postos, comércios e residências a partir de 1º de junho e prorrogação de incentivos fiscais.',
    highlights: [
      'Total de 51.093 empresas constituídas no estado no período',
      'Desconto e competitividade nas tarifas de gás natural veicular e canalizado',
      'Contratação da International Finance Corporation (IFC) para modernizar concessões de gás',
      'Pedido para desbloqueio de R$ 120 milhões da CIDE para obras viárias',
    ],
    impactMetric: {
      value: '51.093 empresas',
      label: 'Novos negócios abertos no Rio de Janeiro',
    },
    sources: [
      { title: 'Jucerja registra recorde de novas empresas no estado do Rio', outlet: 'Jucerja Oficial' },
      { title: 'Preço do gás natural tem redução para indústrias e postos no RJ', outlet: 'Valor Econômico' },
    ],
    tags: ['novos negócios', 'gás natural', 'IFC', 'desenvolvimento econômico'],
  },

  // RIOPREVIDÊNCIA, PGE-RJ E CEDAE
  {
    id: 'ms_rioprev_01',
    category: 'rioprevidencia',
    categoryLabel: 'Rioprevidência & PGE-RJ',
    title: 'Reversão de R$ 650M para aposentadorias e resgate do Fundo Revolution',
    period: 'Junho – Julho / 2026',
    summary: 'Reversão de R$ 650 milhões para pagamento de pensões e aposentadorias, adoção de critérios conservadores de liquidez e vitória judicial para resgate de R$ 481,5 milhões do Fundo Revolution.',
    highlights: [
      'R$ 650 milhões garantidos para o custeio previdenciário (+R$ 100M até o fim do ano)',
      'Resgate de R$ 481,5 milhões em investimentos arriscados no Fundo Revolution',
      'Diretorias ocupadas por servidores concursados da casa',
    ],
    impactMetric: {
      value: 'R$ 650 milhões',
      label: 'Reversão direta para folha de aposentados',
    },
    sources: [
      { title: 'Rioprevidência recupera R$ 481 milhões e saneia investimentos do fundo', outlet: 'Extra' },
    ],
    tags: ['Rioprevidência', 'aposentadorias', 'Fundo Revolution', 'previdência'],
  },
  {
    id: 'ms_pge_01',
    category: 'pge',
    categoryLabel: 'PGE-RJ & Recuperação de Ativos',
    title: 'PGE-RJ recupera R$ 153 milhões e destina R$ 114M para segurança pública',
    period: 'Setembro / 2026',
    summary: 'PGE-RJ recupera valores de ilícitos depositados na Justiça Federal desde 2021. Pelo Decreto nº 50.348/2026, R$ 114 milhões vão para viaturas blindadas e R$ 39 milhões para a CGE-RJ.',
    highlights: [
      'Total de R$ 153 milhões repatriados e convertidos em investimentos estaduais',
      'R$ 114 milhões aplicados na aquisição de novos veículos blindados para a polícia',
      'R$ 39 milhões destinados ao fortalecimento da Controladoria-Geral (CGE-RJ)',
    ],
    impactMetric: {
      value: 'R$ 153 milhões',
      label: 'Recuperados de corrupção e ilícitos pela PGE-RJ',
    },
    sources: [
      { title: 'PGE-RJ recupera R$ 153 milhões de desvios da saúde e destina para segurança', outlet: 'PGE-RJ Notícias' },
    ],
    tags: ['PGE-RJ', 'recuperação de ativos', 'veículos blindados', 'CGE-RJ'],
  },
  {
    id: 'ms_cedae_01',
    category: 'cedae',
    categoryLabel: 'Cedae & Eficiência',
    title: 'Corte de R$ 1,3 bilhão em contratos da Cedae e redução de terceirizados',
    period: 'Maio – Setembro / 2026',
    summary: 'Revisão orçamentária cortou R$ 1,3 bilhão em custos de contratos sem impactar o abastecimento e reduziu em R$ 7 milhões ao ano gastos com extraquadros e terceirizados.',
    highlights: [
      'Economia estrutural de R$ 1,3 bilhão em contratos legados',
      'Redução permanente de R$ 7 milhões anuais na folha de terceirizados',
    ],
    impactMetric: {
      value: 'R$ 1,3 bilhão',
      label: 'Economia de custos em contratos da Cedae',
    },
    sources: [
      { title: 'Nova gestão da Cedae revisa despesas e corta R$ 1,3 bi em contratos', outlet: 'O Globo' },
    ],
    tags: ['Cedae', 'corte de gastos', 'saneamento', 'gestão de contratos'],
  },

  // ENTREGAS E OBRAS
  {
    id: 'ms_obras_01',
    category: 'obras',
    categoryLabel: 'Obras & Equipamentos',
    title: 'Abertura do MIS Copacabana, Bondes de Santa Teresa e Teleférico do Alemão',
    period: 'Março – Setembro / 2026',
    summary: 'Abertura gradual do Museu da Imagem e do Som (MIS) em Copacabana, entrega das obras do Ramal Silvestre dos Bondes de Santa Teresa e chegada dos cabos do Teleférico do Alemão.',
    highlights: [
      'Desbloqueio e abertura das atividades do icônico MIS de Copacabana',
      'Volta da circulação de passageiros no Ramal Silvestre em Santa Teresa',
      'Primeira bobina de cabos instalada para reativação do Teleférico do Alemão',
    ],
    sources: [
      { title: 'MIS de Copacabana inicia abertura gradual de atividades culturais', outlet: 'Veja Rio' },
      { title: 'Bondes de Santa Teresa voltam a circular até o Ramal Silvestre', outlet: 'G1 Rio' },
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    videoDuration: '01:50',
    tags: ['MIS Copacabana', 'Bondes de Santa Teresa', 'Teleférico do Alemão', 'obras'],
  },

  // SEGURANÇA PÚBLICA
  {
    id: 'ms_seg_01',
    category: 'seguranca',
    categoryLabel: 'Segurança Pública & Polícias',
    title: 'R$ 70M da Lava Jato para 10,6 mil fuzis e drones da Polícia Civil',
    period: 'Maio – Julho / 2026',
    summary: 'Governo compra 10,6 mil fuzis com recursos da Lava Jato, transfere o Segurança Presente para a PM, entrega 15 mil coletes, 74 viaturas semiblindadas e cria Coordenadoria de Drones.',
    highlights: [
      'Compra de mais de 10,6 mil fuzis com R$ 70M recuperados de acordos de leniência',
      'Segurança Presente transferido da Segov para a Polícia Militar para despolitização',
      'Formatura de 500 novos policiais militares e mais 800 alunos em formação',
      'Polícia Civil cria Coordenadoria Especializada em Operações com Drones',
      'Inauguração do Complexo de Delegacias Especializadas em Niterói (DRE, DRFA, DRFC e DH)',
      'Polícia Penal: TAC para 5.128 novas vagas prisionais até 2028 e 255 novos agentes',
      'Corpo de Bombeiros: 8 novas unidades inauguradas em todo o interior e Baixada',
    ],
    impactMetric: {
      value: '10.600 fuzis',
      label: 'Armamento tático adquirido com dinheiro da corrupção',
    },
    sources: [
      { title: 'Governo do RJ usa recursos da Lava Jato para comprar 10,6 mil fuzis para polícias', outlet: 'CNN Brasil' },
      { title: 'Polícia Civil cria coordenadoria de drones para operações táticas', outlet: 'O Dia' },
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    videoDuration: '04:10',
    tags: ['segurança pública', 'fuzis', 'drones', 'Polícia Militar', 'Polícia Civil', 'Lava Jato'],
  },

  // SAÚDE
  {
    id: 'ms_saude_01',
    category: 'saude',
    categoryLabel: 'Saúde & Hospitais',
    title: 'Acelerador Linear no Instituto do Cérebro e expansão de leitos neonatais',
    period: 'Junho – Setembro / 2026',
    summary: 'Instalação de acelerador linear no Instituto do Cérebro (+150% em radioterapia), repasse de R$ 650M a todos os 92 municípios, expansão do HUPE e UTI Neonatal do HELagos.',
    highlights: [
      'Instituto do Cérebro amplia atendimento radioterápico de alta precisão em 150%',
      'R$ 650 milhões distribuídos aos 92 municípios (aumento de 70% por cidade)',
      'Hospital Pedro Ernesto (HUPE) com duas novas unidades de nefrologia e oncologia',
      'HELagos em Saquarema passa a contar com a 2ª maior UTI Neonatal do Estado (35 leitos)',
      'Adicional de qualificação regulamentado para mais de 3 mil servidores da Saúde e Iaserj',
    ],
    impactMetric: {
      value: '+150%',
      label: 'Aumento na capacidade radioterápica do Instituto do Cérebro',
    },
    sources: [
      { title: 'Instituto Estadual do Cérebro recebe acelerador linear para tratamento de tumores', outlet: 'G1 Saúde' },
      { title: 'Governo do RJ distribui R$ 650 milhões da Saúde para todos os 92 municípios', outlet: 'Tupi FM' },
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
    videoDuration: '02:05',
    tags: ['Instituto do Cérebro', 'saúde pública', 'acelerador linear', 'UTI neonatal', 'HUPE'],
  },

  // TRANSPORTE & CULTURA & AMBIENTE
  {
    id: 'ms_transp_mob_01',
    category: 'transporte',
    categoryLabel: 'Mobilidade & Transporte',
    title: 'Integração Terminal Margaridas, Tarifa Social R$ 5 e estudos do Metrô',
    period: 'Abril – Setembro / 2026',
    summary: 'Linhas intermunicipais integradas ao Terminal Margaridas, tarifa social de R$ 5 no metrô mantida até 2027 e acordo com BNDES e COPPE/UFRJ para expansão das Linhas 2, 3 e 4.',
    highlights: [
      'Facilidade de deslocamento entre a Baixada Fluminense e a Capital',
      'Tarifa social do metrô congelada a R$ 5 para usuários de Bilhete Único',
      'Parceria técnica para estudo de ampliação da malha metroviária',
    ],
    sources: [
      { title: 'Tarifa social do metrô do Rio é prorrogada por mais um ano a R$ 5', outlet: 'Extra' },
    ],
    tags: ['metrô', 'tarifa social', 'Terminal Margaridas', 'BNDES', 'mobilidade'],
  },
  {
    id: 'ms_cult_01',
    category: 'cultura',
    categoryLabel: 'Cultura & Carnaval',
    title: 'Inauguração do Cine Cordeiro após 40 anos e R$ 19,5M no Carnaval',
    period: 'Junho / 2026',
    summary: 'Entrega do Cine Cordeiro após quatro décadas de espera e aporte de R$ 19,5 milhões no Carnaval fluminense através de 4 editais contemplando 500 projetos culturais.',
    highlights: [
      'Resgate do patrimônio audiovisual e cultural da Região Serrana',
      'Fomento a 500 iniciativas culturais ligadas ao Carnaval em todo o estado',
    ],
    impactMetric: {
      value: 'R$ 19,5 milhões',
      label: 'Investimento em 500 projetos carnavalescos',
    },
    sources: [
      { title: 'Cine Cordeiro é reaberto após 40 anos com sessão histórica', outlet: 'Sec. Cultura RJ' },
    ],
    tags: ['Cine Cordeiro', 'carnaval', 'cultura', 'editais'],
  },
  {
    id: 'ms_clima_01',
    category: 'clima_ambiente',
    categoryLabel: 'Meio Ambiente & El Niño',
    title: 'Comitê El Niño, Índice de Excesso de Calor e Programa Estadual de Trilhas',
    period: 'Julho – Agosto / 2026',
    summary: 'Criação do Comitê de Enfrentamento ao El Niño pela Defesa Civil, lançamento do IMEC-RJ e Mapa de Queimadas, e instituição do Programa Estadual de Trilhas pelo Inea.',
    highlights: [
      'Índice Multidimensional de Excesso de Calor orientando os 92 municípios',
      'Mapa de Risco Humano para prevenção de incêndios florestais e queimadas',
      'Turismo sustentável e conservação ambiental com o Programa Estadual de Trilhas',
    ],
    sources: [
      { title: 'Defesa Civil cria comitê e mapa de risco para enfrentamento de ondas de calor no RJ', outlet: 'Agência Brasil' },
    ],
    tags: ['El Niño', 'Defesa Civil', 'IMEC-RJ', 'queimadas', 'Inea', 'trilhas'],
  },
  {
    id: 'ms_cienc_01',
    category: 'ciencia',
    categoryLabel: 'Ciência, Tecnologia & Faperj',
    title: 'R$ 38 milhões da Faperj para pesquisas em saúde e envelhecimento',
    period: 'Setembro / 2026',
    summary: 'Quatro editais da Faperj destinam R$ 38 milhões para estudos avançados em obesidade, envelhecimento saudável e transformação de pesquisas em soluções para a população.',
    highlights: [
      'Fomento à produção científica de universidades públicas e centros de pesquisa',
      'Foco direto na melhoria dos indicadores de longevidade e saúde da população',
    ],
    impactMetric: {
      value: 'R$ 38 milhões',
      label: 'Editais da Faperj para pesquisas biomédicas',
    },
    sources: [
      { title: 'Faperj lança editais de R$ 38 milhões para pesquisas biomédicas', outlet: 'Faperj Oficial' },
    ],
    tags: ['Faperj', 'ciência', 'pesquisa em saúde', 'envelhecimento'],
  },
];
