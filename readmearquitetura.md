# gestorimob — Arquitetura e Infraestrutura

## Servidor Recomendado

Uma única VPS é suficiente para operar o sistema com até 200 inquilinos ativos.

- **CPU:** 2 vCPU
- **RAM:** 4 GB
- **Disco:** 80 GB SSD
- **Custo estimado:** R$ 80 a R$ 150/mês

Nao ha necessidade de cluster, Kubernetes ou multiplos servidores neste porte. Uma VPS bem configurada com Docker reduz custos e simplifica a manutencao.

---

## Componentes da Stack

**Nginx (ou Nginx Proxy Manager)**
Responsavel pelo roteamento de requisicoes, SSL via Let's Encrypt e proxy reverso para os servicos internos.

**Frontend — Next.js**
Servido via Netlify (deploy estatico/SSR). Consome a API via variavel de ambiente `NEXT_PUBLIC_API_URL`.

**Backend — ASP.NET Core (.NET 8)**
API REST principal. Processa autenticacao, regras de negocio, CRUD de todas as entidades e expoe os endpoints descritos no `readmebackend.md`.

**Worker — .NET Background Service**
Servico em background responsavel por:

- Geracao automatica de cobrancas mensais (cron job todo dia 1)
- Processamento de filas de mensagens (WhatsApp, notificacoes)
- Envio de lembretes automaticos de vencimento
- Atualizacao de status de cobrancas em atraso

**PostgreSQL**
Banco de dados principal. Armazena todas as entidades: imoveis, inquilinos, contratos, cobrancas, chamados, conversas e mensagens.

**Redis**
Controla filas de processamento assincrono, cache de sessoes JWT, rate limiting e tentativas de reenvio de mensagens.

**Webhook WhatsApp API**
Endpoint publico que recebe eventos da API do WhatsApp (mensagens recebidas, confirmacoes de entrega e leitura). O backend processa e salva no PostgreSQL, atualizando o status em tempo real.

**Backup Automatico**
Script diario de dump do PostgreSQL com retencao de 7 dias. Armazenamento em bucket externo compativel com S3.

---

## Diagrama de Comunicacao

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

## Configuracao Docker

### docker-compose.yml

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

### nginx.conf (basico)

```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name seu-dominio.com;

    ssl_certificate /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;

    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## Estrutura de Projeto do Backend

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

## Responsabilidades por Componente

**API (.NET)**
Recebe requisicoes do frontend, valida JWT, aplica regras de negocio e retorna dados. Envia mensagens WhatsApp via fila no Redis.

**Worker (.NET Background Service)**
Processa filas assincronas, executa cron jobs (cobrancas mensais, lembretes de vencimento, atualizacao de status atrasado), reprocessa falhas de envio WhatsApp.

**PostgreSQL**
Fonte de verdade. Armazena todas as entidades e historico de mensagens.

**Redis**
Fila de envio de mensagens, cache de tokens JWT invalidados, controle de tentativas e rate limiting da API WhatsApp.

**Webhook WhatsApp**
Endpoint `POST /api/whatsapp/webhook` publico, validado via assinatura HMAC. Recebe eventos de entrega, leitura e mensagens recebidas dos inquilinos.

---

## Custos Operacionais Estimados

- VPS (2 vCPU / 4 GB RAM): R$ 80 a R$ 150/mês
- Backup externo (S3 ou similar): R$ 20 a R$ 50/mês
- Dominio + SSL (Let's Encrypt gratuito): baixo custo
- WhatsApp Business API: conforme volume de mensagens

**Total estimado: R$ 120 a R$ 300/mês**

---

## Modelo Comercial

- **Implantacao:** R$ 8.000 (setup completo: servidor, deploy, seed, treinamento)
- **Mensalidade:** R$ 497/mês

A mensalidade contempla:

- Hospedagem e monitoramento do servidor
- Backup automatico diario
- Suporte tecnico
- Manutencao da integracao WhatsApp
- Atualizacoes corretivas de bugs

---

## Segurança da Aplicação

### Autenticação e Autorização

- **JWT (JSON Web Token):** todos os endpoints protegidos exigem token válido no header `Authorization: Bearer <token>`
- **Expiração curta:** tokens com TTL de 1 hora. Refresh token opcional com TTL de 7 dias
- **Invalidação no Redis:** logout e troca de senha invalidam o token imediatamente via blocklist no Redis
- **Dois perfis distintos:** Admin autentica por e-mail/senha; Inquilino autentica por CPF/senha — endpoints e dados isolados por perfil
- **Sem acesso cruzado:** inquilino só acessa dados vinculados ao seu CPF. Validação obrigatória no backend em cada requisição

### Proteção de Endpoints

- **Rate Limiting:** limite de tentativas de login (ex.: 5 tentativas em 10 min por IP) via Redis, prevenindo brute force
- **HTTPS obrigatório:** Nginx redireciona todo tráfego HTTP para HTTPS. Certificado via Let's Encrypt (renovação automática)
- **CORS restrito:** apenas a origem do frontend autorizada (`NEXT_PUBLIC_API_URL`) é aceita pela API
- **Webhook WhatsApp validado:** assinatura HMAC-SHA256 verificada em todo payload recebido no `POST /api/whatsapp/webhook`

### Proteção de Dados

- **Senhas com hash:** armazenadas com BCrypt (work factor ≥ 12). Nunca em texto plano
- **Variáveis sensíveis em ambiente:** `Jwt__Secret`, `ConnectionStrings`, `Redis__Connection` nunca vão para o repositório. Apenas via `.env` ou secrets do servidor
- **Sem dados sensíveis no JWT:** o payload do token contém apenas `userId`, `role` e `exp`. Nenhuma senha ou dado pessoal
- **PostgreSQL sem porta exposta:** container interno apenas. Acesso somente via rede Docker interna, não acessível externamente

### Segurança da Infraestrutura

- **Firewall VPS:** apenas portas 80, 443 e SSH (porta não padrão) abertas. Porta 5000 (API) e 5432 (PostgreSQL) bloqueadas externamente
- **SSH por chave:** acesso ao servidor somente via chave pública. Login por senha desabilitado
- **Docker sem privilégio root:** containers rodam com usuário não-root sempre que possível
- **Atualizações automáticas:** `unattended-upgrades` ativo no servidor para patches de segurança do SO
- **Backup criptografado:** dumps do PostgreSQL comprimidos e armazenados em bucket externo com chave AES

### Proteção contra Ataques Comuns (OWASP)

| Ameaça                   | Mitigação                                                       |
| ------------------------ | --------------------------------------------------------------- |
| SQL Injection            | Entity Framework Core com queries parametrizadas — sem SQL raw  |
| XSS                      | Frontend Next.js escapa saídas por padrão; CSP header via Nginx |
| CSRF                     | API stateless com JWT; sem cookies de sessão                    |
| Brute Force              | Rate limiting por IP no Redis                                   |
| Exposição de dados       | HTTPS + CORS + isolamento por perfil no backend                 |
| Dependências vulneráveis | `dotnet audit` e `npm audit` no pipeline de CI                  |

### Variáveis de Ambiente Obrigatórias (nunca commitar)

```
Jwt__Secret=<string aleatória com 256+ bits>
ConnectionStrings__Default=Host=...;Password=<SENHA_FORTE>
Redis__Connection=redis:6379
WhatsApp__HmacSecret=<segredo do webhook Meta>
```

---

## Repositorios

- Frontend: https://github.com/condertech/erpimob
- Backend: criar repositorio separado `gestorimob-api`
