export type StatusImovel = "ocupado" | "vago" | "manutencao";
export type StatusContrato = "ativo" | "vencendo" | "encerrado";
export type StatusCobranca = "pendente" | "pago" | "atrasado";
export type StatusChamado = "aberto" | "em_andamento" | "concluido";
export type StatusVaga = "livre" | "ocupada";
export type PrioridadeChamado = "baixa" | "media" | "alta" | "urgente";

export interface Imovel {
  id: string;
  codigo: string;
  tipo: string;
  bloco: string;
  numero: string;
  endereco: string;
  status: StatusImovel;
  inquilinoId?: string;
  inquilinoNome?: string;
  proprietarioId?: string;
  proprietarioNome?: string;
  valorAluguel: number;
  valorCondominio: number;
  observacoes?: string;
  criadoEm: string;
}

export interface Inquilino {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  whatsapp: string;
  email: string;
  profissao: string;
  empresa?: string;
  imovelId?: string;
  imovelCodigo?: string;
  statusContrato?: StatusContrato;
  observacoes?: string;
  criadoEm: string;
}

export interface Proprietario {
  id: string;
  nome: string;
  cpfCnpj: string;
  telefone: string;
  whatsapp: string;
  email: string;
  endereco: string;
  chavePix?: string;
  banco?: string;
  agencia?: string;
  conta?: string;
  imoveis: string[];
  criadoEm: string;
}

export interface Contrato {
  id: string;
  imovelId: string;
  imovelCodigo: string;
  inquilinoId: string;
  inquilinoNome: string;
  proprietarioId: string;
  proprietarioNome: string;
  dataInicio: string;
  dataTermino: string;
  valorAluguel: number;
  valorCondominio: number;
  diaVencimento: number;
  status: StatusContrato;
  observacoes?: string;
  criadoEm: string;
}

export interface Cobranca {
  id: string;
  inquilinoId: string;
  inquilinoNome: string;
  imovelId: string;
  imovelCodigo: string;
  valor: number;
  multa: number;
  juros: number;
  vencimento: string;
  dataPagamento?: string;
  status: StatusCobranca;
  referencia: string;
}

export interface Chamado {
  id: string;
  imovelId: string;
  imovelCodigo: string;
  inquilinoId?: string;
  inquilinoNome?: string;
  tipo: string;
  descricao: string;
  status: StatusChamado;
  prioridade: PrioridadeChamado;
  responsavel?: string;
  dataAbertura: string;
  dataConclusao?: string;
  valorGasto?: number;
  observacoes?: string;
}

export interface Vaga {
  id: string;
  numero: string;
  bloco: string;
  status: StatusVaga;
  imovelId?: string;
  imovelCodigo?: string;
  inquilinoId?: string;
  inquilinoNome?: string;
  placa?: string;
  modelo?: string;
  cor?: string;
}

export interface Predio {
  id: string;
  nome: string;
  bloco: string;
  endereco: string;
  andares: number;
  aptosPorAndar: number;
  descricao?: string;
}

// ── WhatsApp ────────────────────────────────────────────────────────────────
export type StatusMensagem = "enviado" | "entregue" | "lido" | "erro";
export type TipoMensagem =
  | "texto"
  | "cobranca"
  | "boleto"
  | "lembrete"
  | "confirmacao"
  | "manutencao";
export type RemetenteMsg = "admin" | "inquilino";

export interface MensagemWhatsApp {
  id: string;
  remetente: RemetenteMsg;
  tipo: TipoMensagem;
  conteudo: string;
  hora: string;
  status: StatusMensagem;
}

export interface ConversaWhatsApp {
  id: string;
  inquilinoId: string;
  inquilinoNome: string;
  imovelCodigo: string;
  telefone: string;
  mensagens: MensagemWhatsApp[];
  naoLidas: number;
  online: boolean;
}

export interface TemplateWhatsApp {
  id: string;
  nome: string;
  tipo: TipoMensagem;
  conteudo: string;
}

// ── Email ────────────────────────────────────────────────────────────────────
export type PastaEmail = "inbox" | "enviados" | "rascunhos";
export type TipoEmail =
  | "cobranca"
  | "manutencao"
  | "aviso"
  | "boleto"
  | "geral";

export interface Email {
  id: string;
  de: string;
  deNome: string;
  para: string;
  paraNome: string;
  assunto: string;
  corpo: string;
  dataHora: string;
  lido: boolean;
  pasta: PastaEmail;
  tipo: TipoEmail;
}
