# 🎨 Creative Manager - Backend

O **Creative Manager** é uma API RESTful de alta performance desenvolvida para centralizar e gerar dashboards de criativos e vendas, contando com futuras implementações de **Inteligência Artificial** para análise preditiva de dados.

O projeto foi construído seguindo os padrões de mercado, funcionando de forma totalmente desacoplada do frontend e integrado ao **Supabase** (Banco de Dados e Autenticação).

## 🚀 Tecnologias e Ferramentas
* **Node.js** com **Express**
* **TypeScript** (Segurança de tipagem e robustez)
* **Supabase** (PostgreSQL as a Service)
* **OpenAI SDK** (Integração com Inteligência Artificial)

## 📐 Arquitetura do Sistema (Camadas)

O projeto adota uma arquitetura em camadas bem definida, garantindo fácil manutenção e escalabilidade:

* `src/config`: Configurações e conexões com serviços externos (Supabase, IA).
* `src/models`: Tipagens, contratos e interfaces do TypeScript.
* `src/repositories`: Camada isolada para comunicação direta com o banco de dados.
* `src/services`: Onde residem as regras de negócio e chamadas de IA.
* `src/controllers`: Responsável por receber requisições HTTP e retornar respostas JSON.
* `src/routes`: Definição dos endpoints e mapeamento das rotas da API.
* `src/middlewares`: Interceptadores globais para tratamento de erros e segurança.

## 💻 Pré-requisitos

Para rodar o projeto localmente, você precisa ter o **Node.js** instalado em seu computador.

### Instalação no Windows / Mac
Acesse o site oficial [nodejs.org](https://nodejs.org/), baixe a versão marcada como **LTS** (Long Term Support) e siga o assistente de instalação padrão ("Next, Next, Finish").

### Instalação no Linux (Ubuntu/Debian)
Abra o terminal e execute os comandos abaixo em sequência:

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Verificação do Ambiente
Após a instalação, feche e abra o terminal novamente e valide executando:

```bash
node -v
npm -v
```

---

## 🛠️ Como rodar o projeto

**Passo 1:** Clone o repositório e acesse a pasta raiz:

```bash
git clone -b dev https://github.com/IA-para-advogado/Creative-Manager-BackEnd/tree/criar-base-de-projeto-backend
cd Creative-Manager-BackEnd
```

**Passo 2:** Instale todas as dependências do projeto na raiz:

```bash
npm install
```

**Passo 3:** Configuração das Variáveis de Ambiente:
Crie um arquivo chamado `.env` na raiz do projeto e insira as credenciais fornecidas pelo administrador:

```bash
PORT=3000
SUPABASE_URL=sua_url_do_supabase
SUPABASE_ANON_KEY=sua_chave_do_supabase
OPENAI_API_KEY=sua_chave_da_openai
```

**Passo 4:** Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

A API estará disponível localmente em: http://localhost:3000

Para testar o status da aplicação, acesse: http://localhost:3000/api/creatives/dashboard
