const https = require('https');
const fs = require('fs');
const path = require('path');

const APPS = [
  { id: 'cartazpromocional', packageId: 'com.rslima.promotion_poster' },
  { id: 'listapro', packageId: 'com.classa.lista_pro' }
];

function fetchMetadata(app) {
  return new Promise((resolve) => {
    const url = `https://play.google.com/store/apps/details?id=${app.packageId}&hl=pt_BR`;
    console.log(`🔍 Buscando dados da Play Store para o app: ${app.id} (${app.packageId})...`);
    
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        // 1. Extrair Ícone (og:image)
        const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i) || 
                             html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:image"/i);
        const iconUrl = ogImageMatch ? ogImageMatch[1] : null;

        // 2. Extrair Screenshots
        const baseUrls = [];
        const regex = /https:\/\/play-lh\.googleusercontent\.com\/([a-zA-Z0-9_=-]+)/g;
        let match;
        
        while ((match = regex.exec(html)) !== null) {
          const fullUrl = match[0];
          // Google Play screenshots normalmente contêm parâmetros como =w526-h296 ou =w1052-h592 na URL
          if (fullUrl.includes('=w') && !fullUrl.includes('=s') && !fullUrl.includes('-pd') && !fullUrl.includes('-pc') && !fullUrl.includes('-rw')) {
            const baseUrl = fullUrl.split('=')[0];
            if (!baseUrls.includes(baseUrl)) {
              baseUrls.push(baseUrl);
            }
          }
        }

        // Limitar a no máximo 8 screenshots únicas e limpar o sufixo de tamanho para obter qualidade HD padrão
        const cleanScreenshots = baseUrls
          .slice(0, 8)
          .map(baseUrl => baseUrl + '=w720-h1280'); // Redimensionar para tamanho ideal de visualização de celular

        console.log(`✅ ${app.id}: Ícone e ${cleanScreenshots.length} capturas encontradas.`);
        resolve({ icon: iconUrl, screenshots: cleanScreenshots });
      });
    }).on('error', (err) => {
      console.error(`❌ Erro ao buscar dados do app ${app.id}:`, err);
      resolve({ icon: null, screenshots: [] });
    });
  });
}

async function run() {
  const appsDir = path.join(__dirname, 'src', 'apps');
  
  for (const app of APPS) {
    const jsonPath = path.join(appsDir, `${app.id}.json`);
    if (!fs.existsSync(jsonPath)) {
      console.log(`⚠️ Arquivo JSON para ${app.id} não encontrado em: ${jsonPath}`);
      continue;
    }

    const { icon, screenshots } = await fetchMetadata(app);
    
    if (icon) {
      const appData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      appData.icon = icon;
      appData.screenshots = screenshots;
      
      fs.writeFileSync(jsonPath, JSON.stringify(appData, null, 2));
      console.log(`💾 JSON atualizado com sucesso para: ${app.id}\n`);
    }
  }
  console.log('🎉 Atualização de metadados concluída!');
}

run();
