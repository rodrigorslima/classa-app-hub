const https = require('https');

function fetchApp(packageId) {
  return new Promise((resolve) => {
    const url = `https://play.google.com/store/apps/details?id=${packageId}&hl=pt_BR`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      let html = '';
      res.on('data', c => html += c);
      res.on('end', () => {
        const ogImg = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i) ||
                      html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:image"/i);
        const icon = ogImg ? ogImg[1] : 'N/A';

        const ogDesc = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i) ||
                       html.match(/<meta[^>]*content="([^"]+)"[^>]*name="description"/i);
        const desc = ogDesc ? ogDesc[1] : 'N/A';

        const baseUrls = [];
        const regex = /https:\/\/play-lh\.googleusercontent\.com\/([a-zA-Z0-9_=-]+)/g;
        let match;
        while ((match = regex.exec(html)) !== null) {
          const fullUrl = match[0];
          if (fullUrl.includes('=w') && !fullUrl.includes('=s') && !fullUrl.includes('-pd') && !fullUrl.includes('-pc') && !fullUrl.includes('-rw')) {
            const baseUrl = fullUrl.split('=')[0];
            if (!baseUrls.includes(baseUrl)) baseUrls.push(baseUrl);
          }
        }
        // SS0 is usually the icon repeated, so filter it out
        const iconBase = icon.split('=')[0];
        const screenshots = baseUrls
          .filter(u => u !== iconBase)
          .slice(0, 8)
          .map(u => u + '=w720-h1280');

        console.log(`\n=== ${packageId} ===`);
        console.log('ICON:', icon);
        console.log('DESC:', desc.substring(0, 200));
        console.log('SCREENSHOTS:', screenshots.length);
        screenshots.forEach((s, i) => console.log(`SS${i}: ${s}`));
        resolve({ icon, desc, screenshots });
      });
    }).on('error', e => { console.error('ERR:', e); resolve({}); });
  });
}

async function run() {
  await fetchApp('com.rslima.volleyball_scoreboard');
  await fetchApp('com.rslima.prize_draw');
}
run();
