# gestorimob — Sistema de Gestão de Locações e Condomínios

## Visão Geral

O **gestorimob** é um SaaS de gestão de imóveis, contratos de locação, cobranças, manutenção e comunicação com inquilinos. O frontend está 100% construído com dados **mock** (estáticos). Este documento descreve tudo que o backend em **C# (.NET)** precisa implementar para substituir esses mocks por dados reais.

---

## Stack do Frontend

- **Next.js** 16.2.6 — App Router, SSR/SSG
- **TypeScript** 5 — Tipagem estrita
- **Tailwind CSS** 3.4.1 — Estilização
- **Plus Jakarta Sans** — Fonte via `next/font/google`
- **lucide-react** ^0.400.0 — Ícones
- **recharts** ^2.12.7 — Gráficos (dashboard, financeiro)

Deploy: **Netlify** (via `netlify.toml` + `@netlify/plugin-nextjs`)

---

## Variáveis de Ambiente

Configure no Netlify e no `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://sua-api.com
```

Em `next.config.ts`:

```ts
env: {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
}
```

Todas as chamadas de API devem usar `process.env.NEXT_PUBLIC_API_URL` como base URL.

---

## Autenticação

O sistema possui dois perfis de usuário.

### Admin

- Login por **e-mail + senha**
- Acessa todas as rotas administrativas
- Credencial de teste: `admin@gestao.com` / `admin123`

### Inquilino

- Login por **CPF + senha**
- Acessa apenas o portal do inquilino (`/portal/*`)
- Credencial de teste: CPF `123.456.789-00` / senha `123456`

### Fluxo Esperado

1. Frontend envia POST com credenciais
2. Backend retorna **JWT**
3. Frontend inclui o token em todas as requisições: `Authorization: Bearer {token}`
4. Rotas protegidas redirecionam para `/login` ou `/login-inquilino` se não autenticado

### Endpoints de Auth

```
POST /api/auth/admin/login       → { email, senha }  → { token, usuario }
POST /api/auth/inquilino/login   → { cpf, senha }    → { token, inquilino }
POST /api/auth/logout
GET  /api/auth/me
```

---

## Estrutura de Rotas do Frontend

### Rotas Públicas

- `/` — Página de seleção de acesso
- `/login` — Login administrador
- `/login-inquilino` — Login inquilino

### Rotas Admin (requerem JWT de admin)

- `/dashboard` — KPIs gerais com filtros por bloco e período
- `/imoveis` — Cards dos blocos com estatísticas
- `/imoveis/novo` — Formulário de criação de imóvel
- `/imoveis/[id]` — Visualização e edição de imóvel
- `/imoveis/predio/[bloco]` — Grid de apartamentos do bloco (A/B/C/D)
- `/inquilinos` — Listagem com busca
- `/inquilinos/novo` — Formulário de cadastro
- `/inquilinos/[id]` — Perfil completo do inquilino
- `/contratos` — Listagem de contratos
- `/contratos/novo` — Novo contrato (vincula inquilino + imóvel)
- `/cobrancas` — Aluguéis a receber por status
- `/financeiro` — Receita, inadimplência, gráficos
- `/manutencao` — Chamados de manutenção
- `/manutencao/novo` — Abrir novo chamado
- `/garagens` — Vagas e veículos
- `/proprietarios` — Donos dos imóveis
- `/proprietarios/novo` — Cadastrar proprietário
- `/relatorios` — Relatórios gerados
- `/whatsapp` — Chat com inquilinos

### Rotas Portal Inquilino (requerem JWT de inquilino)

- `/portal/dashboard` — Resumo: próximo vencimento, valor, status
- `/portal/pagamentos` — Histórico de aluguéis e status
- `/portal/contrato` — Contrato vigente em detalhes
- `/portal/garagem` — Vaga vinculada
- `/portal/solicitacoes` — Abrir e acompanhar chamados
- `/portal/perfil` — Dados cadastrais do inquilino

---

## Entidades e Modelos de Dados

### Imovel

```csharp
public class Imovel
{
    public string Id { get; set; }           // GUID
    public string Codigo { get; set; }       // "A-101"
    public string Tipo { get; set; }         // "Apartamento"
    public string Bloco { get; set; }        // "A" | "B" | "C" | "D"
    public string Numero { get; set; }       // "101"
    public string Endereco { get; set; }
    public string Status { get; set; }       // "ocupado" | "vago" | "manutencao"
    public string? InquilinoId { get; set; }
    public string? InquilinoNome { get; set; }
    public string? ProprietarioId { get; set; }
    public string? ProprietarioNome { get; set; }
    public decimal ValorAluguel { get; set; }
    public decimal ValorCondominio { get; set; }
    public string? Observacoes { get; set; }
    public DateTime CriadoEm { get; set; }
}
```

### Inquilino

```csharp
public class Inquilino
{
    public string Id { get; set; }
    public string Nome { get; set; }
    public string Cpf { get; set; }          // "123.456.789-00"
    public string Telefone { get; set; }
    public string Whatsapp { get; set; }
    public string Email { get; set; }
    public string Profissao { get; set; }
    public string? Empresa { get; set; }
    public string? ImovelId { get; set; }
    public string? ImovelCodigo { get; set; }
    public string? StatusContrato { get; set; } // "ativo" | "vencendo" | "encerrado"
    public string? Observacoes { get; set; }
    public string SenhaHash { get; set; }    // bcrypt
    public DateTime CriadoEm { get; set; }
}
```

### Proprietario

```csharp
public class Proprietario
{
    public string Id { get; set; }
    public string Nome { get; set; }
    public string CpfCnpj { get; set; }
    public string Telefone { get; set; }
    public string Whatsapp { get; set; }
    public string Email { get; set; }
    public string Endereco { get; set; }
    public string? ChavePix { get; set; }
    public string? Banco { get; set; }
    public string? Agencia { get; set; }
    public string? Conta { get; set; }
    public List<string> Imoveis { get; set; } // ex: ["A-101", "A-102"]
    public DateTime CriadoEm { get; set; }
}
```

### Contrato

```csharp
public class Contrato
{
    public string Id { get; set; }
    public string ImovelId { get; set; }
    public string ImovelCodigo { get; set; }
    public string InquilinoId { get; set; }
    public string InquilinoNome { get; set; }
    public string ProprietarioId { get; set; }
    public string ProprietarioNome { get; set; }
    public DateTime DataInicio { get; set; }
    public DateTime DataTermino { get; set; }
    public decimal ValorAluguel { get; set; }
    public decimal ValorCondominio { get; set; }
    public int DiaVencimento { get; set; }   // 1-31
    public string Status { get; set; }       // "ativo" | "vencendo" | "encerrado"
    public string? Observacoes { get; set; }
    public DateTime CriadoEm { get; set; }
}
```

### Cobranca

```csharp
public class Cobranca
{
    public string Id { get; set; }
    public string InquilinoId { get; set; }
    public string InquilinoNome { get; set; }
    public string ImovelId { get; set; }
    public string ImovelCodigo { get; set; }
    public decimal Valor { get; set; }
    public decimal Multa { get; set; }       // percentual: 2.0 = 2%
    public decimal Juros { get; set; }       // valor em R$ acumulado
    public DateTime Vencimento { get; set; }
    public DateTime? DataPagamento { get; set; }
    public string Status { get; set; }       // "pendente" | "pago" | "atrasado"
    public string Referencia { get; set; }   // "Jun/2024"
}
```

### Chamado (Manutencao)

```csharp
public class Chamado
{
    public string Id { get; set; }
    public string ImovelId { get; set; }
    public string ImovelCodigo { get; set; }
    public string? InquilinoId { get; set; }
    public string? InquilinoNome { get; set; }
    public string Tipo { get; set; }         // "Hidráulica" | "Elétrica" | "Estrutural" | "Pintura" | "Serralheria"
    public string Descricao { get; set; }
    public string Status { get; set; }       // "aberto" | "em_andamento" | "concluido"
    public string Prioridade { get; set; }   // "baixa" | "media" | "alta" | "urgente"
    public string? Responsavel { get; set; }
    public DateTime DataAbertura { get; set; }
    public DateTime? DataConclusao { get; set; }
    public decimal? ValorGasto { get; set; }
    public string? Observacoes { get; set; }
}
```

### Vaga (Garagem)

```csharp
public class Vaga
{
    public string Id { get; set; }
    public string Numero { get; set; }       // "01"
    public string Bloco { get; set; }        // "A"
    public string Status { get; set; }       // "livre" | "ocupada"
    public string? ImovelId { get; set; }
    public string? ImovelCodigo { get; set; }
    public string? InquilinoId { get; set; }
    public string? InquilinoNome { get; set; }
    public string? Placa { get; set; }       // "ABC-1234"
    public string? Modelo { get; set; }
    public string? Cor { get; set; }
}
```

### Predio (Bloco)

```csharp
public class Predio
{
    public string Id { get; set; }           // "A" | "B" | "C" | "D"
    public string Nome { get; set; }         // "Bloco A"
    public string Bloco { get; set; }
    public string Endereco { get; set; }
    public int Andares { get; set; }         // 5
    public int AptosPorAndar { get; set; }   // 10
    public string? Descricao { get; set; }
}
```

### Conversa e Mensagem (WhatsApp)

```csharp
public class Conversa
{
    public string Id { get; set; }
    public string InquilinoId { get; set; }
    public string InquilinoNome { get; set; }
    public string ImovelCodigo { get; set; }
    public string Telefone { get; set; }
    public List<Mensagem> Mensagens { get; set; }
    public int NaoLidas { get; set; }
    public bool Online { get; set; }
}

public class Mensagem
{
    public string Id { get; set; }
    public string Remetente { get; set; }    // "admin" | "inquilino"
    public string Tipo { get; set; }         // "texto" | "cobranca" | "boleto" | "lembrete"
    public string Conteudo { get; set; }
    public string Hora { get; set; }         // "09:00"
    public string Status { get; set; }       // "enviado" | "entregue" | "lido" | "erro"
}
```

---

## Endpoints da API

### Autenticação

```
POST   /api/auth/admin/login
POST   /api/auth/inquilino/login
POST   /api/auth/logout
GET    /api/auth/me
```

### Predios

```
GET    /api/predios
GET    /api/predios/{bloco}
```

### Imoveis

```
GET    /api/imoveis                   ?bloco=&status=&busca=
GET    /api/imoveis/{id}
POST   /api/imoveis
PUT    /api/imoveis/{id}
DELETE /api/imoveis/{id}
GET    /api/imoveis/bloco/{bloco}
```

### Inquilinos

```
GET    /api/inquilinos                ?busca=&status=
GET    /api/inquilinos/{id}
POST   /api/inquilinos
PUT    /api/inquilinos/{id}
DELETE /api/inquilinos/{id}
GET    /api/inquilinos/{id}/cobrancas
GET    /api/inquilinos/{id}/contratos
GET    /api/inquilinos/{id}/chamados
```

### Proprietarios

```
GET    /api/proprietarios
GET    /api/proprietarios/{id}
POST   /api/proprietarios
PUT    /api/proprietarios/{id}
DELETE /api/proprietarios/{id}
```

### Contratos

```
GET    /api/contratos                 ?status=ativo|vencendo|encerrado&inquilinoId=
GET    /api/contratos/{id}
POST   /api/contratos
PUT    /api/contratos/{id}
DELETE /api/contratos/{id}
POST   /api/contratos/{id}/encerrar
```

### Cobrancas

```
GET    /api/cobrancas                 ?status=pendente|pago|atrasado&referencia=&inquilinoId=
GET    /api/cobrancas/{id}
POST   /api/cobrancas
PUT    /api/cobrancas/{id}
POST   /api/cobrancas/{id}/pagar
POST   /api/cobrancas/gerar
```

### Chamados (Manutencao)

```
GET    /api/chamados                  ?status=&prioridade=&imovelId=
GET    /api/chamados/{id}
POST   /api/chamados
PUT    /api/chamados/{id}
DELETE /api/chamados/{id}
```

### Garagens

```
GET    /api/vagas                     ?bloco=&status=livre|ocupada
GET    /api/vagas/{id}
PUT    /api/vagas/{id}
```

### Dashboard

```
GET    /api/dashboard                 ?bloco=&referencia=
GET    /api/dashboard/receita-mensal
GET    /api/dashboard/inadimplentes
```

Resposta de `/api/dashboard`:

```json
{
  "totalImoveis": 200,
  "imoveisOcupados": 120,
  "imoveisVagos": 60,
  "totalInquilinos": 10,
  "contratosAtivos": 8,
  "contratosVencendo": 2,
  "inadimplentes": 3,
  "receitaMensal": 15300,
  "chamadosAbertos": 5
}
```

### WhatsApp

```
GET    /api/whatsapp/conversas
GET    /api/whatsapp/conversas/{id}
POST   /api/whatsapp/conversas/{id}/mensagens
GET    /api/whatsapp/templates
```

### Portal do Inquilino

```
GET    /api/portal/resumo
GET    /api/portal/contrato
GET    /api/portal/pagamentos
GET    /api/portal/garagem
GET    /api/portal/solicitacoes
POST   /api/portal/solicitacoes
GET    /api/portal/perfil
PUT    /api/portal/perfil
```

---

## Regras de Negócio

### Cobrancas

- Geração automática no dia 1 de cada mês (cron job)
- Multa por atraso: **2%** sobre o valor total
- Juros: **0,033% ao dia** após o vencimento
- Status muda para `atrasado` automaticamente no dia seguinte ao vencimento se não pago
- Contrato com status `vencendo` = faltam 30 dias ou menos para `dataTermino`

### Imoveis

- Estrutura: 4 blocos (A, B, C, D) × 5 andares × 10 apartamentos = **200 unidades**
- Código do imóvel: `{BLOCO}-{ANDAR}{APT:2 dígitos}` — ex: `A-101`, `B-304`
- Ao vincular inquilino → status do imóvel muda para `ocupado`
- Ao encerrar contrato → status do imóvel muda para `vago`

### Portal do Inquilino

- Login por CPF (não por e-mail)
- O inquilino acessa apenas dados do **seu próprio** imóvel, contrato e vaga

---

## Formato de Resposta da API

Envelope padrão para todas as respostas:

```json
{
  "success": true,
  "data": {},
  "message": "Operação realizada com sucesso",
  "errors": null
}
```

Em caso de erro:

```json
{
  "success": false,
  "data": null,
  "message": "Erro ao processar requisição",
  "errors": ["Campo obrigatório: nome"]
}
```

Listas com paginação:

```json
{
  "success": true,
  "data": {
    "items": [],
    "total": 200,
    "pagina": 1,
    "porPagina": 20
  }
}
```

---

## Dados de Seed

Volumes para popular o banco inicialmente:

- **Predios:** 4 (Blocos A, B, C, D)
- **Imoveis:** 200 (gerados: 4 × 5 × 10)
- **Inquilinos:** 10 (com login funcional)
- **Proprietarios:** 8
- **Contratos:** 10 (8 ativos, 2 vencendo)
- **Cobrancas:** 12 (6 pagas, 3 pendentes, 3 atrasadas)
- **Chamados:** 7 (mix de status e prioridade)
- **Vagas:** 12 (distribuídas por bloco)

Credenciais de seed:

```
Admin
  Email: admin@gestao.com
  Senha: admin123

Inquilino (portal)
  Nome:  Carlos Eduardo Silva
  CPF:   123.456.789-00
  Senha: 123456
  Imovel: A-101
```

---

## Sugestão de Stack Backend

```
.NET 8 — ASP.NET Core Web API
Entity Framework Core 8 + PostgreSQL
BCrypt.Net-Next — hash de senhas
Microsoft.AspNetCore.Authentication.JwtBearer
AutoMapper
FluentValidation
Scalar / Swagger — documentação da API
```

Estrutura de projeto sugerida:

```
gestorimob-api/
├── src/
│   ├── GestorImob.API/            <- Controllers, Program.cs
│   ├── GestorImob.Application/    <- Services, DTOs, Interfaces
│   ├── GestorImob.Domain/         <- Entities, Enums, ValueObjects
│   └── GestorImob.Infrastructure/ <- DbContext, Repositories, Migrations
├── tests/
└── docker-compose.yml
```

### CORS

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "https://seu-site.netlify.app"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

app.UseCors("FrontendPolicy");
```

---

## Repositório Frontend

- Código: https://github.com/condertech/erpimob
- Deploy: Netlify (configurado via `netlify.toml`)
- Backend: criar repositório separado `gestorimob-api`

---

## Arquitetura de Infraestrutura

### Servidor Recomendado

Uma única VPS é suficiente para operar o sistema com até 200 inquilinos ativos.

- **CPU:** 2 vCPU
- **RAM:** 4 GB
- **Disco:** 80 GB SSD
- **Custo estimado:** R$ 80 a R$ 150/mês

Não há necessidade de cluster, Kubernetes ou múltiplos servidores neste porte. Uma VPS bem configurada com Docker reduz custos e simplifica manutenção.

---

### Componentes da Stack

**Nginx (ou Nginx Proxy Manager)**
Responsável pelo roteamento de requisições, SSL (via Let's Encrypt) e proxy reverso para os serviços internos.

**Frontend — Next.js**
Servido via Netlify (deploy estático/SSR). Consome a API via `NEXT_PUBLIC_API_URL`.

**Backend — ASP.NET Core (.NET 8)**
API REST principal. Processa autenticação, regras de negócio, CRUD de todas as entidades e expõe os endpoints documentados neste arquivo.

**Worker — .NET Background Service**
Serviço em background responsável por:

- Geração automática de cobranças mensais (cron job todo dia 1)
- Processamento de filas de mensagens (WhatsApp, notificações)
- Envio de lembretes automáticos de vencimento
- Atualização de status de cobranças em atraso

**PostgreSQL**
Banco de dados principal. Armazena todas as entidades: imóveis, inquilinos, contratos, cobranças, chamados, conversas e mensagens.

**Redis**
Controla filas de processamento assíncrono, cache de sessões JWT, controle de rate limiting e tentativas de reenvio de mensagens.

**Webhook WhatsApp API**
Endpoint público que recebe eventos da API do WhatsApp (mensagens recebidas, confirmações de entrega/leitura). O backend processa e salva no PostgreSQL, atualizando o status em tempo real.

**Backup Automático**
Script diário de dump do PostgreSQL com retenção de 7 dias. Armazenamento em bucket externo (S3 compatível).

---

### Diagrama de Comunicacao

```
Inquilino/Admin (browser)
        |
        v
   Netlify (Frontend Next.js)
        |
        v
   Nginx (VPS) — SSL termination, proxy reverso
        |
        +---> ASP.NET Core API (:5000)
        |           |
        |           +---> PostgreSQL (:5432)
        |           |
        |           +---> Redis (:6379)
        |           |
        |           +---> Worker (Background Service)
        |
        +---> Webhook WhatsApp (/api/whatsapp/webhook)
                    |
                    v
             WhatsApp Business API
```

---

### Configuracao Docker (docker-compose.yml)

```yaml
version: "3.9"

services:
  api:
    build: ./gestorimob-api
    container_name: gestorimob_api
    restart: always
    ports:
      - "5000:5000"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ConnectionStrings__Default=Host=postgres;Database=gestorimob;Username=postgres;Password=SENHA_FORTE
      - Redis__Connection=redis:6379
      - Jwt__Secret=CHAVE_JWT_SECRETA_256_BITS
    depends_on:
      - postgres
      - redis

  worker:
    build: ./gestorimob-api
    container_name: gestorimob_worker
    restart: always
    command: ["dotnet", "GestorImob.Worker.dll"]
    environment:
      - ConnectionStrings__Default=Host=postgres;Database=gestorimob;Username=postgres;Password=SENHA_FORTE
      - Redis__Connection=redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    container_name: gestorimob_postgres
    restart: always
    environment:
      POSTGRES_DB: gestorimob
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: SENHA_FORTE
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: gestorimob_redis
    restart: always
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

---

### Estrutura de Projeto Sugerida

```
gestorimob-api/
├── src/
│   ├── GestorImob.API/              <- Controllers, Program.cs, Middlewares
│   ├── GestorImob.Application/      <- Services, DTOs, Interfaces, Validators
│   ├── GestorImob.Domain/           <- Entities, Enums, ValueObjects
│   ├── GestorImob.Infrastructure/   <- DbContext, Repositories, Migrations, Redis
│   └── GestorImob.Worker/           <- Background Services, Cron Jobs, Filas
├── tests/
│   ├── GestorImob.UnitTests/
│   └── GestorImob.IntegrationTests/
├── docker-compose.yml
└── nginx.conf
```

---

### Responsabilidades por Componente

**API (.NET):**
Recebe requisições do frontend, valida JWT, aplica regras de negócio e retorna dados. Envia mensagens WhatsApp via fila no Redis.

**Worker (.NET Background Service):**
Processa filas assíncronas, executa cron jobs (cobranças mensais, lembretes de vencimento, atualização de status atrasado), reprocessa falhas de envio WhatsApp.

**PostgreSQL:**
Fonte de verdade. Armazena todas as entidades e histórico de mensagens.

**Redis:**
Fila de envio de mensagens (lista), cache de tokens JWT invalidados, controle de tentativas e rate limiting da API WhatsApp.

**Webhook WhatsApp:**
Endpoint `POST /api/whatsapp/webhook` público, validado via assinatura HMAC. Recebe eventos de entrega, leitura e mensagens recebidas.

---

## Custos Operacionais Estimados

- VPS (2 vCPU / 4 GB RAM): R$ 80 a R$ 150/mês
- Backup externo (S3 ou similar): R$ 20 a R$ 50/mês
- Domínio + SSL (Let's Encrypt gratuito): baixo custo
- WhatsApp Business API: conforme volume de mensagens

**Total estimado: R$ 120 a R$ 300/mês**

---

## Modelo Comercial

- **Implantação:** R$ 8.000 (setup completo: servidor, deploy, seed, treinamento)
- **Mensalidade:** R$ 497/mês

A mensalidade contempla:

- Hospedagem e monitoramento do servidor
- Backup automático diário
- Suporte técnico
- Manutenção da integração WhatsApp
- Atualizações corretivas de bugs
