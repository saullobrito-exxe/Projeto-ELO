export interface TeamMember {
  name: string;
  email: string;
  role: 'editor' | 'leitor';
  roleLabel: string;
  status: 'ativo';
}

export const PROJECT_TEAM: TeamMember[] = [
  {
    name: 'João Vitor',
    email: 'joao.vitor@fsbcomunicacao.com.br',
    role: 'editor',
    roleLabel: 'Editor',
    status: 'ativo',
  },
  {
    name: 'Saullo Rosa',
    email: 'saullo.rosa@fsbcomunicacao.com.br',
    role: 'editor',
    roleLabel: 'Editor',
    status: 'ativo',
  },
];

export const PRIMARY_EDITOR_EMAIL = 'joao.vitor@fsbcomunicacao.com.br';
