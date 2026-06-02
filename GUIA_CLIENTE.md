# GestorImob — Guia de Apresentação ao Cliente

> **Sistema de Gestão de Locações e Condomínios**
> Versão atual: MVP · Junho/2026

---

## O que é o GestorImob?

O **GestorImob** é um sistema online de gestão condominial e de locações. Ele permite que administradores, síndicos e inquilinos acessem, em um único lugar, todas as informações do imóvel, contratos, cobranças, solicitações e muito mais — sem precisar instalar nenhum programa.

Basta ter **acesso à internet e um navegador** (Chrome, Firefox, Safari, Edge).

---

## Como funciona o acesso?

O sistema possui **dois portais distintos**:

| Portal                      | Para quem                              | Como acessar       |
| --------------------------- | -------------------------------------- | ------------------ |
| **Painel do Administrador** | Síndico, gestor, equipe administrativa | `/login`           |
| **Portal do Inquilino**     | Moradores e locatários                 | `/login-inquilino` |

> ⚠️ **Importante:** O administrador é responsável por criar e gerenciar as contas de todos os inquilinos. Nenhum inquilino se cadastra sozinho — o acesso é sempre liberado pela administração.

---

## Passo a passo: Administrador

### 1. Fazer login

1. Abra o sistema no navegador: `http://seu-dominio.com`
2. Clique em **"Acessar painel"** (cartão do Administrador)
3. Digite seu e-mail e senha cadastrados
4. Clique em **"Entrar"**

Você será redirecionado ao **Dashboard**, a tela principal do painel.

---

### 2. Cadastrar um imóvel

Antes de cadastrar inquilinos e contratos, é preciso ter o imóvel no sistema.

1. No menu lateral, clique em **"Imóveis"**
2. Clique no botão **"Novo Imóvel"** (canto superior direito)
3. Preencha os campos:
   - **Tipo**: Apartamento, Casa, Kitnet, Sala Comercial etc.
   - **Bloco e Número**: identificação interna
   - **Endereço completo**
   - **Proprietário**: selecione da lista
   - **Valor do aluguel** e **valor do condomínio**
4. Clique em **"Salvar"**

O imóvel aparecerá na lista com status **Vago**.

---

### 3. Cadastrar um proprietário

1. No menu lateral, clique em **"Proprietários"**
2. Clique em **"Novo Proprietário"**
3. Preencha os dados pessoais: nome, CPF/CNPJ, telefone, e-mail
4. Preencha os dados bancários (banco, agência, conta, Pix) para repasse
5. Clique em **"Salvar"**

---

### 4. Cadastrar um inquilino e liberar o acesso ao portal

> Esta é a etapa mais importante para o morador conseguir entrar no sistema.

1. No menu lateral, clique em **"Inquilinos"**
2. Clique em **"Novo Inquilino"**
3. Preencha os dados:
   - **Nome completo**, **CPF**, **telefone** e **WhatsApp**
   - **E-mail** (será usado para comunicações)
   - **Imóvel vinculado**: selecione o imóvel que o inquilino vai ocupar
4. Defina uma **senha inicial** para o inquilino (ex.: os 6 primeiros dígitos do CPF)
5. Clique em **"Salvar"**
6. Informe ao inquilino:
   - O link de acesso: `http://seu-dominio.com/login-inquilino`
   - O CPF dele (usado como login)
   - A senha inicial definida por você

> Recomende que o inquilino altere a senha no primeiro acesso, em **Portal → Meu Perfil**.

---

### 5. Criar um contrato

1. No menu lateral, clique em **"Contratos"**
2. Clique em **"Novo Contrato"**
3. Preencha:
   - **Inquilino** e **Proprietário** (seleção nas listas)
   - **Imóvel** vinculado
   - **Data de início** e **data de término**
   - **Valor do aluguel** e **dia de vencimento**
4. Faça o upload do PDF do contrato assinado (opcional)
5. Clique em **"Salvar"**

O contrato ficará com status **Ativo**.

---

### 6. Lançar e gerenciar cobranças

1. No menu lateral, clique em **"Cobranças"**
2. Visualize as cobranças do mês em aberto, pagas e atrasadas
3. Para marcar um pagamento como recebido:
   - Clique no card da cobrança
   - Clique em **"Marcar como pago"**
4. Cobranças em atraso exibem automaticamente multa (2%) e juros

---

### 7. Enviar mensagem pelo WhatsApp integrado

1. No menu lateral, clique em **"WhatsApp"**
2. Selecione o inquilino na lista à esquerda
3. Digite a mensagem ou escolha um **template pronto** (ex.: "Cobrança de Aluguel", "Lembrete de Vencimento")
4. Pressione **Enter** ou clique no botão verde para enviar

**Para enviar para vários inquilinos de uma vez (disparo em massa):**

1. Clique em **"Disparo em massa"** (botão no topo da lista)
2. Escolha o template de mensagem
3. Selecione os inquilinos desejados
4. Clique em **"Disparar mensagens"**

---

### 8. Registrar chamado de manutenção

1. No menu lateral, clique em **"Manutenção"**
2. Clique em **"Novo Chamado"**
3. Preencha: imóvel, tipo do problema, descrição e prioridade
4. Clique em **"Salvar"**
5. Acompanhe o status: **Aberto → Em andamento → Concluído**

---

### 9. Gerenciar garagens

1. No menu lateral, clique em **"Garagens"**
2. Veja o mapa visual de vagas: verde = livre, laranja = ocupada
3. As vagas são vinculadas automaticamente ao imóvel do inquilino

---

### 10. Gerar relatórios

1. No menu lateral, clique em **"Relatórios"**
2. Escolha a aba desejada:
   - **Imóveis**: ocupação e status
   - **Inquilinos**: lista com contratos
   - **Financeiro**: receita por período
   - **Inadimplência**: quem está em atraso
   - **Contratos vencendo**: renovações próximas
   - **Manutenção**: chamados por período
3. Clique em **"Exportar PDF"** ou **"Exportar Excel"** para salvar o relatório

---

## Passo a passo: Inquilino (Portal do Morador)

### 1. Fazer login

1. Acesse: `http://seu-dominio.com/login-inquilino`
2. Digite seu **CPF** (com pontos e traço: `000.000.000-00`)
3. Digite a **senha** fornecida pela administração
4. Clique em **"Entrar"**

---

### 2. Tela inicial — Meu Resumo

Ao entrar, você verá:

- **Próximo boleto**: valor e data de vencimento
- **Status do contrato**: ativo, vencendo etc.
- **Chamados em aberto**: solicitações de manutenção
- **Avisos da administração**

---

### 3. Ver meu contrato

1. No menu inferior, toque em **"Meu Contrato"**
2. Veja todas as informações do contrato: datas, valores, reajustes e partes envolvidas
3. Faça o download do contrato em PDF (quando disponível)

---

### 4. Ver meus pagamentos

1. No menu, toque em **"Pagamentos"**
2. Veja o histórico completo de aluguéis pagos e pendentes
3. Solicite a **2ª via do boleto** clicando no mês desejado

---

### 5. Abrir solicitação de manutenção

1. No menu, toque em **"Solicitações"**
2. Clique em **"Nova solicitação"**
3. Descreva o problema (ex.: "Torneira da cozinha com vazamento")
4. Escolha a prioridade
5. Acompanhe o status da solicitação na mesma tela

---

### 6. Ver minha vaga de garagem

1. No menu, toque em **"Garagem"**
2. Veja o número da sua vaga, bloco e dados do veículo cadastrado

---

### 7. Atualizar meus dados e senha

1. No menu, toque em **"Meu Perfil"**
2. Atualize telefone, e-mail ou outros dados de contato
3. Para trocar a senha:
   - Digite a senha atual
   - Digite a nova senha (mínimo 6 caracteres)
   - Confirme e salve

---

## Perguntas frequentes

**Esqueci minha senha. O que faço?**
Entre em contato com a administração do condomínio. O administrador pode redefinir sua senha pelo painel.

**Posso acessar pelo celular?**
Sim. O sistema funciona em qualquer navegador mobile (Chrome, Safari). Uma versão adaptada para tela pequena está disponível.

**Os dados são seguros?**
Sim. Todas as comunicações usam HTTPS (criptografia). Os dados ficam armazenados em servidor dedicado.

**Quem pode ver minhas informações?**
Apenas a equipe administrativa do condomínio e você mesmo têm acesso aos seus dados.

**Como recebo as cobranças?**
As cobranças são enviadas automaticamente via WhatsApp e e-mail no início de cada mês, conforme configurado pela administração.

---

## Contato e suporte

Em caso de dúvidas sobre o sistema, entre em contato com a administração do seu condomínio ou imobiliária. Eles têm acesso ao painel completo e podem ajudá-lo.

---

_GestorImob · Sistema de Gestão de Locações e Condomínios · © 2026_
