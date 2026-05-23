# ClassA App Hub (`classa-app-hub`)

Este projeto foi desenvolvido para eliminar o gargalo de criação de páginas individuais de política de privacidade, termos de uso e landing pages toda vez que um novo aplicativo é criado.

Ele funciona como um **Gerador de Sites Estáticos (SSG)** sob medida para o **GitHub Pages**, permitindo hospedar múltiplos aplicativos sob a mesma URL raiz com caminhos limpos (ex: `seudominio.com/cartazpromocional`), mantendo todo o conteúdo e configuração centralizados de forma ultra-organizada.

---

## Recursos Principais
- **Design Premium**: Visual moderno e responsivo, estilo *dark mode* com efeito de vidro fosco (*glassmorphism*), animações fluidas e fontes modernas.
- **Tema Dinâmico por App**: Cada página de aplicativo adota automaticamente o esquema de cores e a identidade do seu app.
- **Seções em Abas**: Landing Page + Política de Privacidade + Termos de Uso + Contato tudo dentro da mesma página do app em abas interativas, ideal para validações do Google Play e App Store.
- **Busca e Filtros Instantâneos**: Filtre os apps por categoria e faça pesquisas em tempo real no hub central.
- **Sem Dependências**: O build script e o servidor local rodam em Node.js puro. Sem `node_modules`, sem complexidade.

---

## Como Começar e Testar Localmente

### 1. Pré-requisitos
Apenas certifique-se de ter o **Node.js** instalado no seu computador.

### 2. Gerar as Páginas (Build)
Abra o terminal no diretório do projeto e execute:
```bash
npm run build
```
*(ou simplesmente `node build.js`)*

Isso lerá as configurações da pasta `src/apps/`, copiará os arquivos de estilo e script para a raiz e gerará as pastas físicas de cada app.

### 3. Executar o Servidor de Teste
Para ver a galeria de apps e navegar nas páginas geradas localmente:
```bash
npm start
```
*(ou simplesmente `node server.js`)*

Acesse **`http://localhost:3000`** no seu navegador para ver o resultado!

---

## Como Adicionar um Novo Aplicativo

1. Vá até a pasta `src/apps/`.
2. Crie um arquivo com a extensão `.json` (ex: `novo-app.json`). Recomendamos duplicar o `cartazpromocional.json` ou `financasfacil.json` para usar como base.
3. Altere as informações de metadados, recursos, cores do tema, links das lojas e os textos da política e termos de uso.
4. Execute no terminal:
   ```bash
   npm run build
   ```
5. Pronto! Uma nova pasta chamada `novo-app/` contendo o `index.html` compilado será gerada na raiz do projeto.

---

## Como Publicar no GitHub Pages

Como este gerador cria pastas e arquivos HTML físicos e estáticos diretamente no diretório raiz do projeto, a publicação é extremamente simples:

1. Crie um repositório público no GitHub chamado `classa-app-hub`.
2. Envie todos os arquivos do projeto para ele (incluindo as pastas geradas pelo build):
   ```bash
   git init
   git add .
   git commit -m "feat: setup classa app hub"
   git remote add origin https://github.com/seu-usuario/classa-app-hub.git
   git branch -M main
   git push -u origin main
   ```
3. No GitHub, vá nas configurações do seu repositório: **Settings** > **Pages**.
4. Em **Build and deployment** > **Source**, selecione **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`, e clique em **Save**.

Após alguns instantes, o seu site estará no ar e seus links serão:
- Hub Principal: `https://seu-usuario.github.io/classa-app-hub/`
- App Cartaz Promocional: `https://seu-usuario.github.io/classa-app-hub/cartazpromocional/`
- App Lista Pro: `https://seu-usuario.github.io/classa-app-hub/listapro/`
- Política de Privacidade (direta): `https://seu-usuario.github.io/classa-app-hub/cartazpromocional/privacidade.html`
- Termos de Uso (direto): `https://seu-usuario.github.io/classa-app-hub/cartazpromocional/termos.html`
