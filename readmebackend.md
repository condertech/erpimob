# gestorimob — Sistema de Gestão de Locações e Condomínios

## Visão Geral

O **gestorimob** é um ERP, contratos de locação, cobranças, manutenção e comunicação com inquilinos. O frontend está 100% construído com dados **mock** (estáticos). Este README documenta tudo que o backend em **C# (.NET)** precisa implementar para substituir esses mocks por dados reais.

---

## Stack do Frontend

| Tecnologia        | Versão   | Uso                              |
| ----------------- | -------- | -------------------------------- |
| Next.js           | 16.2.6   | App Router, SSR/SSG              |
| TypeScript        | 5        | Tipagem estrita                  |
| Tailwind CSS      | 3.4.1    | Estilização                      |
| Plus Jakarta Sans | —        | Fonte via `next/font/google`     |
| lucide-react      | ^0.400.0 | Ícones                           |
| recharts          | ^2.12.7  | Gráficos (dashboard, financeiro) |

Deploy: **Netlify** (via `netlify.toml` + `@netlify/plugin-nextjs`)

---

## Variáveis de Ambiente

O frontend já está preparado para consumir a API via variável de ambiente. Configure no Netlify e no `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://sua-api.com
```

Atualmente em `next.config.ts`:

```ts
env: {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
}
```

Todas as chamadas de API devem usar `process.env.NEXT_PUBLIC_API_URL` como base URL.

---

## Autenticação

O sistema possui **dois perfis** de usuário:

### Admin

- Login por **e-mail + senha**
- Acessa todas as rotas administrativas (`/dashboard`, `/imoveis`, `/inquilinos`, etc.)
- Credenciais de teste: `admin@gestao.com` / `admin123`

### Inquilino

- Login por **CPF + senha**
- Acessa apenas o portal do inquilino (`/portal/*`)
- CPF de teste: `123.456.789-00` / `123456`

### Fluxo Esperado

1. Frontend envia POST com credenciais
2. Backend retorna **JWT**
3. Frontend armazena o token e inclui em todas as requisições no header `Authorization: Bearer {token}`
4. Rotas protegidas redirecionam para `/login` ou `/login-inquilino` se não autenticado

### Endpoints de Auth

```
POST /api/auth/admin/login       → { email, senha } → { token, usuario }
POST /api/auth/inquilino/login   → { cpf, senha }   → { token, inquilino }
POST /api/auth/logout
GET  /api/auth/me                → retorna dados do usuário logado
```

---

## Estrutura de Rotas do Frontend

### Rotas Públicas

| Rota               | Descrição                   |
| ------------------ | --------------------------- |
| `/`                | Página de seleção de acesso |
| `/login`           | Login administrador         |
| `/login-inquilino` | Login inquilino             |

### Rotas Admin (requerem JWT de admin)

| Rota                      | Descrição                                  |
| ------------------------- | ------------------------------------------ |
| `/dashboard`              | KPIs gerais + filtros por bloco/período    |
| `/imoveis`                | Cards dos blocos com estatísticas          |
| `/imoveis/novo`           | Formulário de criação de imóvel            |
| `/imoveis/[id]`           | Visualização e edição de imóvel            |
| `/imoveis/predio/[bloco]` | Grid de apartamentos do bloco (A/B/C/D)    |
| `/inquilinos`             | Listagem com busca                         |
| `/inquilinos/novo`        | Formulário de cadastro                     |
| `/inquilinos/[id]`        | Perfil completo do inquilino               |
| `/contratos`              | Listagem de contratos                      |
| `/contratos/novo`         | Novo contrato (vincula inquilino + imóvel) |
| `/cobrancas`              | Aluguéis a receber por status              |
| `/financeiro`             | Receita, inadimplência, gráficos           |
| `/manutencao`             | Chamados de manutenção                     |
| `/manutencao/novo`        | Abrir novo chamado                         |
| `/garagens`               | Vagas e veículos                           |
| `/proprietarios`          | Donos dos imóveis                          |
| `/proprietarios/novo`     | Cadastrar proprietário                     |
| `/relatorios`             | Relatórios gerados                         |
| `/whatsapp`               | Chat com inquilinos                        |

### Rotas Portal Inquilino (requerem JWT de inquilino)

| Rota                   | Descrição                                 |
| ---------------------- | ----------------------------------------- |
| `/portal/dashboard`    | Resumo: próximo vencimento, valor, status |
| `/portal/pagamentos`   | Histórico de aluguéis + status            |
| `/portal/contrato`     | Contrato vigente em detalhes              |
| `/portal/garagem`      | Vaga(s) vinculada(s)                      |
| `/portal/solicitacoes` | Abrir e acompanhar chamados               |
| `/portal/perfil`       | Dados cadastrais do inquilino             |

---

## Entidades e Modelos de Dados

### `Imovel`

```csharp
public class Imovel
{
    public string Id { get; set; }           // GUID
    public string Codigo { get; set; }       // "A-101" (Bloco + Numero)
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

### `Inquilino`

```csharp
public class Inquilino
{
    public string Id { get; set; }
    public string Nome { get; set; }
    public string Cpf { get; set; }          // formato: "123.456.789-00"
    public string Telefone { get; set; }
    public string Whatsapp { get; set; }
    public string Email { get; set; }
    public string Profissao { get; set; }
    public string? Empresa { get; set; }
    public string? ImovelId { get; set; }
    public string? ImovelCodigo { get; set; }
    public string? StatusContrato { get; set; } // "ativo" | "vencendo" | "encerrado"
    public string? Observacoes { get; set; }
    public string SenhaHash { get; set; }    // hash bcrypt
    public DateTime CriadoEm { get; set; }
}
```

### `Proprietario`

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
    public List<string> Imoveis { get; set; } // lista de códigos ex: ["A-101", "A-102"]
    public DateTime CriadoEm { get; set; }
}
```

### `Contrato`

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

### `Cobranca`

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

### `Chamado` (Manutenção)

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

### `Vaga` (Garagem)

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

### `Predio` (Bloco)

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

### `Conversa` e `Mensagem` (WhatsApp)

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

### Prédios

```
GET    /api/predios
GET    /api/predios/{bloco}
```

### Imóveis

```
GET    /api/imoveis                   ?bloco=&status=&busca=
GET    /api/imoveis/{id}
POST   /api/imoveis
PUT    /api/imoveis/{id}
DELETE /api/imoveis/{id}
GET    /api/imoveis/bloco/{bloco}     → para a página /imoveis/predio/[bloco]
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

### Proprietários

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

### Cobranças

```
GET    /api/cobrancas                 ?status=pendente|pago|atrasado&referencia=&inquilinoId=
GET    /api/cobrancas/{id}
POST   /api/cobrancas
PUT    /api/cobrancas/{id}
POST   /api/cobrancas/{id}/pagar      → registrar pagamento
POST   /api/cobrancas/gerar           → gerar cobranças mensais (via cron job)
```

### Chamados (Manutenção)

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
→ { totalImoveis, imoveisOcupados, imoveisVagos, totalInquilinos,
    contratosAtivos, contratosVencendo, inadimplentes,
    receitaMensal, chamadosAbertos }

GET    /api/dashboard/receita-mensal  → [{ mes: "Jan", valor: 14200 }, ...]
GET    /api/dashboard/inadimplentes   → lista de inquilinos com cobrança atrasada
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
GET    /api/portal/resumo             → dashboard do inquilino logado
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

### Cobranças

- Geração automática no dia 1 de cada mês via cron job
- Multa por atraso: **2%** sobre o valor total
- Juros: **0,033% ao dia** após o vencimento
- Status muda para `atrasado` automaticamente no dia seguinte ao vencimento se não pago
- Contrato com status `vencendo` = faltam ≤ 30 dias para `dataTermino`

### Imóveis

- Estrutura: **4 blocos (A, B, C, D)** × **5 andares** × **10 apartamentos** = 200 unidades
- Código = `{BLOCO}-{ANDAR}{APT:2 dígitos}` → ex: `A-101`, `B-304`
- Ao vincular inquilino → status do imóvel vira `ocupado`
- Ao encerrar contrato → status do imóvel vira `vago`

### Portal do Inquilino

- Login por **CPF** (não e-mail)
- O inquilino só vê dados do **seu próprio imóvel, contrato e vaga**

---

## Formato de Resposta da API

```json
{
  "success": true,
  "data": { ... },
  "message": "Operação realizada com sucesso",
  "errors": null
}
```

Em erro:

```json
{
  "success": false,
  "data": null,
  "message": "Erro ao processar requisição",
  "errors": ["Campo obrigatório: nome"]
}
```

Listas paginadas:

```json
{
  "success": true,
  "data": {
    "items": [ ... ],
    "total": 200,
    "pagina": 1,
    "porPagina": 20
  }
}
```

---

## Seed do Banco de Dados

| Entidade      | Qtde | Observação                        |
| ------------- | ---- | --------------------------------- |
| Prédios       | 4    | Blocos A, B, C, D                 |
| Imóveis       | 200  | Gerados: 4 × 5 × 10               |
| Inquilinos    | 10   | Com login funcional               |
| Proprietários | 8    | —                                 |
| Contratos     | 10   | 8 ativos, 2 vencendo              |
| Cobranças     | 12   | 6 pagas, 3 pendentes, 3 atrasadas |
| Chamados      | 7    | Mix de status/prioridade          |
| Vagas         | 12   | Distribuídas por bloco            |

**Inquilino de teste (portal):**

```
CPF:   123.456.789-00
Senha: 123456
```

**Admin de teste:**

```
Email: admin@gestao.com
Senha: admin123
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

### Estrutura de Projeto

```
gestorimob-api/
├── src/
│   ├── GestorImob.API/            ← Controllers + Program.cs
│   ├── GestorImob.Application/    ← Services, DTOs, Interfaces
│   ├── GestorImob.Domain/         ← Entities, Enums, ValueObjects
│   └── GestorImob.Infrastructure/ ← DbContext, Repositories, Migrations
├── tests/
└── docker-compose.yml
```

### CORS

Configure para aceitar o frontend no Netlify:

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
