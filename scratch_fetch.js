const https = require('https');

const packageId = 'com.rslima.promotion_poster';
const url = `https://play.google.com/store/apps/details?id=${packageId}&hl=pt_BR`;

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    // Buscar og:image
    const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i) || 
                         html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:image"/i);
    const ogTitleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i);
    
    console.log('--- RESULTADO ---');
    console.log('Título:', ogTitleMatch ? ogTitleMatch[1] : 'Não encontrado');
    console.log('Imagem OG (Ícone):', ogImageMatch ? ogImageMatch[1] : 'Não encontrado');
    
    // Buscar screenshots (Links contendo play-lh.googleusercontent.com)
    const imgUrls = [];
    const regex = /https:\/\/play-lh\.googleusercontent\.com\/[a-zA-Z0-9_=-]+/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      const imgUrl = match[0];
      if (!imgUrls.includes(imgUrl) && imgUrls.length < 15) {
        imgUrls.push(imgUrl);
      }
    }
    console.log('Links Googleusercontent encontrados:', imgUrls);
  });
}).on('error', err => {
  console.error('Erro na requisição:', err);
});
