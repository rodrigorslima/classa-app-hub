const fs = require('fs');
const path = require('path');

// SVGs das Lojas para uso geral
const SVG_PLAYSTORE = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58-33.2-67.8 67.8 67.8 67.8 58-33.2c20.8-11.9 28.7-33.4 28.7-56.1 0-22.8-7.9-44.3-28.7-56.1zM325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z"/></svg>`;
const SVG_APPSTORE = `<svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-48.7-22.9-84.5-22.4-45.3.6-87.4 25.9-111.1 66.2-48.6 82.2-12.1 201.3 34 263.7 22.4 30.7 49 61.1 82.5 60 32.5-1.2 44.7-20.8 84.4-20.8 39.5 0 50.7 20.8 84.5 20.1 34.1-.7 57.5-27.4 79.8-60.1 25.7-37.1 36.2-73 36.8-75-1.1-.5-70.2-26.2-70.8-106.5zM290.4 86.1c31.3-37.9 25.2-71.8 25.2-71.8s-31.3 2.7-57.9 33.7c-24.9 29-22.8 61.2-22.8 61.2s24.2 4.8 55.5-23.1z"/></svg>`;
const SVG_GLOBE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;

const SVG_ICONS = {
  '🎨': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feat-icon-svg"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.67 12 12 16.5 14.67 16.5 19.79"></polyline><polyline points="7.5 14.67 12 12.03 12 6.81"></polyline><polyline points="12 12 16.5 14.67"></polyline></svg>`,
  '🖨️': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feat-icon-svg"><path d="M6 9V2h12v7"></path><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>`,
  '🏷️': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feat-icon-svg"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l4.58-4.58c.94-.94.94-2.48 0-3.42L12 2Z"></path><path d="M6 6h.01"></path></svg>`,
  '📲': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feat-icon-svg"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>`,
  '📋': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feat-icon-svg"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path></svg>`,
  '🛒': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feat-icon-svg"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`,
  '📈': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feat-icon-svg"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
  '✨': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feat-icon-svg"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912-1.275-1.275L12 3Z"></path></svg>`,
  '⚡': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feat-icon-svg"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  '📥': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feat-icon-svg"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`
};

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}


function build() {
  console.log('🚀 Iniciando compilação das Landing Pages...');
  
  const srcDir = path.join(__dirname, 'src');
  const appsDir = path.join(srcDir, 'apps');
  const templatesDir = path.join(srcDir, 'templates');
  const assetsSrcDir = path.join(srcDir, 'assets');
  
  const destAssetsDir = path.join(__dirname, 'assets');
  const destCssDir = path.join(destAssetsDir, 'css');
  const destJsDir = path.join(destAssetsDir, 'js');

  // 1. Garantir que as pastas de destino dos assets existam
  fs.mkdirSync(destCssDir, { recursive: true });
  fs.mkdirSync(destJsDir, { recursive: true });

  // 2. Copiar arquivos de assets
  fs.copyFileSync(path.join(assetsSrcDir, 'css', 'style.css'), path.join(destCssDir, 'style.css'));
  fs.copyFileSync(path.join(assetsSrcDir, 'js', 'app-page.js'), path.join(destJsDir, 'app-page.js'));
  
  // Copiar pasta de imagens se existir
  const imagesSrcDir = path.join(assetsSrcDir, 'images');
  const destImagesDir = path.join(destAssetsDir, 'images');
  if (fs.existsSync(imagesSrcDir)) {
    copyDirSync(imagesSrcDir, destImagesDir);
    console.log('✅ Imagens copiadas para o build.');
  }

  console.log('✅ Assets copiados com sucesso.');

  // 3. Ler templates HTML
  const homeTemplate = fs.readFileSync(path.join(templatesDir, 'home.html'), 'utf-8');
  const landingTemplate = fs.readFileSync(path.join(templatesDir, 'landing.html'), 'utf-8');
  const documentTemplate = fs.readFileSync(path.join(templatesDir, 'document.html'), 'utf-8');

  // 4. Ler todos os apps cadastrados (.json)
  const appFiles = fs.readdirSync(appsDir).filter(file => file.endsWith('.json'));
  const apps = [];

  for (const file of appFiles) {
    const filePath = path.join(appsDir, file);
    try {
      const appData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      apps.push(appData);
    } catch (e) {
      console.error(`❌ Erro ao analisar o arquivo JSON: ${file}`, e);
    }
  }

  // Ordenar aplicativos por nome
  apps.sort((a, b) => a.name.localeCompare(b.name));

  // 5. Gerar arquivos estáticos para cada app
  for (const app of apps) {
    console.log(`📦 Gerando arquivos para: ${app.name}...`);
    
    // Criar pasta do app na raiz (ex: ./listapro/)
    const appDestDir = path.join(__dirname, app.id);
    fs.mkdirSync(appDestDir, { recursive: true });

    // Gerar badges de download
    let badgesHtml = '';
    if (app.links.playStore) {
      badgesHtml += `
      <a href="${app.links.playStore}" target="_blank" rel="noopener" class="badge-btn">
        ${SVG_PLAYSTORE}
        <div class="badge-btn-text">
          <span class="subtext">Disponível no</span>
          <span class="maintext">Google Play</span>
        </div>
      </a>`;
    }
    if (app.links.appStore === 'soon') {
      badgesHtml += `
      <div class="badge-btn badge-btn-soon" title="Em breve na App Store">
        ${SVG_APPSTORE}
        <div class="badge-btn-text">
          <span class="subtext">Em breve na</span>
          <span class="maintext">App Store</span>
        </div>
        <span class="badge-soon-chip">Em breve</span>
      </div>`;
    } else if (app.links.appStore) {
      badgesHtml += `
      <a href="${app.links.appStore}" target="_blank" rel="noopener" class="badge-btn">
        ${SVG_APPSTORE}
        <div class="badge-btn-text">
          <span class="subtext">Baixar na</span>
          <span class="maintext">App Store</span>
        </div>
      </a>`;
    }
    if (app.links.webApp) {
      badgesHtml += `
      <a href="${app.links.webApp}" target="_blank" rel="noopener" class="badge-btn web-badge">
        ${SVG_GLOBE}
        <div class="badge-btn-text">
          <span class="subtext">Acesse a</span>
          <span class="maintext">Versão Web</span>
        </div>
      </a>`;
    }

    // Gerar lista de recursos (features) com ícones vetoriais modernos
    let featuresHtml = '';
    if (app.features && app.features.length > 0) {
      featuresHtml = app.features.map(feat => {
        const svgIcon = SVG_ICONS[feat.icon] || feat.icon || '✨';
        return `
      <div class="feature-item">
        <div class="feature-item-icon-wrapper">
          ${svgIcon}
        </div>
        <h3>${feat.title}</h3>
        <p>${feat.description}</p>
      </div>`;
      }).join('\n');
    } else {
      featuresHtml = '<p>Nenhum recurso cadastrado para este aplicativo.</p>';
    }


    // Gerar HTML da política de privacidade
    let privacyContentHtml = '';
    if (app.privacyPolicy && app.privacyPolicy.length > 0) {
      privacyContentHtml = app.privacyPolicy.map(section => `
      <h2>${section.title}</h2>
      ${section.paragraphs.map(p => `<p>${p}</p>`).join('\n')}`).join('\n');
    } else {
      privacyContentHtml = '<p>Política de privacidade indisponível no momento.</p>';
    }

    // Gerar HTML dos termos de uso
    let termsContentHtml = '';
    if (app.termsOfUse && app.termsOfUse.length > 0) {
      termsContentHtml = app.termsOfUse.map(section => `
      <h2>${section.title}</h2>
      ${section.paragraphs.map(p => `<p>${p}</p>`).join('\n')}`).join('\n');
    } else {
      termsContentHtml = '<p>Termos de uso indisponíveis no momento.</p>';
    }

    // Gerar HTML de capturas de tela (screenshots) se existirem no JSON
    let screenshotsSectionHtml = '';
    if (app.screenshots && app.screenshots.length > 0) {
      screenshotsSectionHtml = `
    <!-- Capturas de Tela -->
    <section class="screenshots-section">
      <h2 class="section-title">Capturas de Tela</h2>
      <div class="screenshots-container-wrapper">
        <button class="carousel-control prev" aria-label="Anterior">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <div class="screenshots-container">
          ${app.screenshots.map(url => `
          <div class="screenshot-wrapper">
            <img src="${url}" alt="Captura de tela do ${app.name}" class="screenshot-img" loading="lazy">
          </div>`).join('\n')}
        </div>
        <button class="carousel-control next" aria-label="Próximo">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </section>`;
    }

    // Gerar HTML de depoimentos/avaliações se existirem no JSON
    let reviewsSectionHtml = '';
    if (app.reviews && app.reviews.length > 0) {
      // Calcular distribuição das barras baseadas na nota
      const rVal = parseFloat(app.rating || '4.8');
      const percentage5 = Math.round((rVal - 1) / 4 * 85 + 5);
      const percentage4 = Math.round((100 - percentage5) * 0.6);
      const percentage3 = Math.round((100 - percentage5 - percentage4) * 0.5);
      const percentage2 = Math.round((100 - percentage5 - percentage4 - percentage3) * 0.6);
      const percentage1 = Math.max(0, 100 - percentage5 - percentage4 - percentage3 - percentage2);

      reviewsSectionHtml = `
    <!-- Avaliações dos Usuários -->
    <section class="reviews-section">
      <h2 class="section-title">O que dizem os nossos usuários</h2>
      <div class="reviews-layout">
        <!-- Coluna da Esquerda: Scorecard de Avaliação -->
        <div class="reviews-scorecard">
          <div class="scorecard-big-rating">
            <span class="big-rating-number">${app.rating || '4.8'}</span>
            <div class="scorecard-stars">
              <span class="stars-gold">★★★★★</span>
            </div>
            <span class="scorecard-reviews-count">${app.reviewsCount || '1.000'} avaliações</span>
          </div>
          <div class="scorecard-bars">
            <div class="scorecard-bar-row">
              <span class="bar-label">5</span>
              <div class="bar-container"><div class="bar-fill" style="width: ${percentage5}%"></div></div>
            </div>
            <div class="scorecard-bar-row">
              <span class="bar-label">4</span>
              <div class="bar-container"><div class="bar-fill" style="width: ${percentage4}%"></div></div>
            </div>
            <div class="scorecard-bar-row">
              <span class="bar-label">3</span>
              <div class="bar-container"><div class="bar-fill" style="width: ${percentage3}%"></div></div>
            </div>
            <div class="scorecard-bar-row">
              <span class="bar-label">2</span>
              <div class="bar-container"><div class="bar-fill" style="width: ${percentage2}%"></div></div>
            </div>
            <div class="scorecard-bar-row">
              <span class="bar-label">1</span>
              <div class="bar-container"><div class="bar-fill" style="width: ${percentage1}%"></div></div>
            </div>
          </div>
        </div>

        <!-- Coluna da Direita: Grid de Depoimentos -->
        <div class="reviews-grid">
          ${app.reviews.map(rev => {
            const initials = rev.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            return `
          <div class="review-card spotlight-card">
            <div class="review-header">
              <div class="reviewer-info">
                <div class="reviewer-avatar">${initials}</div>
                <div class="reviewer-meta">
                  <strong>${rev.name}</strong>
                  <span>${rev.role}</span>
                </div>
              </div>
              <div class="review-meta-right">
                <span class="stars">${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}</span>
                <span class="review-verified"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Verificado</span>
              </div>
            </div>
            <p class="review-comment">"${rev.comment}"</p>
          </div>`;
          }).join('\n')}
        </div>
      </div>
    </section>`;
    }

    // Gerar HTML de marcadores/bullets
    let heroBulletsHtml = '';
    if (app.bullets && app.bullets.length > 0) {
      heroBulletsHtml = app.bullets.map(b => `
          <div class="hero-bullet-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>${b}</span>
          </div>`).join('\n');
    } else {
      heroBulletsHtml = `
          <div class="hero-bullet-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Focado em Performance</span>
          </div>
          <div class="hero-bullet-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Interface Moderna</span>
          </div>`;
    }

    const phoneScreenshot = app.phoneScreenshot || (app.screenshots && app.screenshots.length > 0 ? app.screenshots[0] : app.icon);

    // ----------------------------------------------------
    // ARQUIVO A: index.html (Landing Page do App)
    // ----------------------------------------------------
    let compiledLandingHtml = landingTemplate
      .replace(/{{APP_NAME}}/g, app.name)
      .replace(/{{APP_TAGLINE}}/g, app.tagline)
      .replace(/{{APP_DESCRIPTION}}/g, app.description)
      .replace(/{{APP_CATEGORY}}/g, app.category)
      .replace(/{{APP_ICON}}/g, app.icon)
      .replace(/{{THEME_PRIMARY}}/g, app.theme.primary)
      .replace(/{{THEME_SECONDARY}}/g, app.theme.secondary)
      .replace(/{{THEME_DARK}}/g, app.theme.dark)
      .replace(/{{THEME_LIGHT}}/g, app.theme.light)
      .replace(/{{DOWNLOAD_BADGES}}/g, badgesHtml)
      .replace(/{{FEATURES_LIST}}/g, featuresHtml)
      .replace(/{{SCREENSHOTS_SECTION}}/g, screenshotsSectionHtml)
      .replace(/{{REVIEWS_SECTION}}/g, reviewsSectionHtml)
      .replace(/{{APP_RATING}}/g, app.rating || '4.8')
      .replace(/{{APP_REVIEWS_COUNT}}/g, app.reviewsCount || '1.000')
      .replace(/{{PHONE_SCREENSHOT}}/g, phoneScreenshot)
      .replace(/{{HERO_BULLETS}}/g, heroBulletsHtml);




    fs.writeFileSync(path.join(appDestDir, 'index.html'), compiledLandingHtml);

    // ----------------------------------------------------
    // ARQUIVO B: privacidade.html (Política de Privacidade)
    // ----------------------------------------------------
    let compiledPrivacyHtml = documentTemplate
      .replace(/{{APP_NAME}}/g, app.name)
      .replace(/{{APP_CATEGORY}}/g, app.category)
      .replace(/{{APP_ICON}}/g, app.icon)
      .replace(/{{THEME_PRIMARY}}/g, app.theme.primary)
      .replace(/{{THEME_SECONDARY}}/g, app.theme.secondary)
      .replace(/{{THEME_DARK}}/g, app.theme.dark)
      .replace(/{{THEME_LIGHT}}/g, app.theme.light)
      .replace(/{{DOC_TITLE}}/g, 'Política de Privacidade')
      .replace(/{{DOC_CONTENT}}/g, privacyContentHtml);

    fs.writeFileSync(path.join(appDestDir, 'privacidade.html'), compiledPrivacyHtml);

    // ----------------------------------------------------
    // ARQUIVO C: termos.html (Termos de Uso)
    // ----------------------------------------------------
    let compiledTermsHtml = documentTemplate
      .replace(/{{APP_NAME}}/g, app.name)
      .replace(/{{APP_CATEGORY}}/g, app.category)
      .replace(/{{APP_ICON}}/g, app.icon)
      .replace(/{{THEME_PRIMARY}}/g, app.theme.primary)
      .replace(/{{THEME_SECONDARY}}/g, app.theme.secondary)
      .replace(/{{THEME_DARK}}/g, app.theme.dark)
      .replace(/{{THEME_LIGHT}}/g, app.theme.light)
      .replace(/{{DOC_TITLE}}/g, 'Termos de Uso')
      .replace(/{{DOC_CONTENT}}/g, termsContentHtml);

    fs.writeFileSync(path.join(appDestDir, 'termos.html'), compiledTermsHtml);
  }

  // 6. Gerar página principal minimalista (index.html na raiz)
  console.log('🗂️ Gerando página inicial do Portal...');

  const appLinksListHtml = apps.map(app => {
    // O index.html do portal fica na raiz, então "../assets/..." não funciona.
    // Convertemos para "assets/..." removendo o prefixo "../"
    const portalIconSrc = app.icon.startsWith('../') ? app.icon.replace('../', '') : app.icon;
    return `
    <a href="${app.id}/" class="portal-app-card" style="--theme-color: ${app.theme.primary}">
      <div class="portal-app-card-header">
        <img src="${portalIconSrc}" alt="Ícone de ${app.name}" class="portal-app-icon">
        <span class="portal-app-badge">${app.category}</span>
      </div>
      <div class="portal-app-card-body">
        <h3>${app.name}</h3>
        <p>${app.tagline}</p>
      </div>
      <div class="portal-app-card-footer">
        <span class="portal-app-action">Ver Detalhes</span>
        <svg class="portal-arrow" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </a>
    `;
  }).join('\n');

  let compiledHomeHtml = homeTemplate.replace(/{{APP_LINKS_LIST}}/g, appLinksListHtml);
  fs.writeFileSync(path.join(__dirname, 'index.html'), compiledHomeHtml);

  console.log('🎉 Compilação concluída com sucesso! Estrutura física gerada na raiz.');
}

build();
