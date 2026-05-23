const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Todos os apps e seus ícones remotos
const apps = [
  { id: 'cartazpromocional', iconUrl: 'https://play-lh.googleusercontent.com/Ysf8UOKvvALR1ysIsAstPCs4X_W7pR9sVZJ_9b8iifl6uSaA-yqWqBeBwpIxXlhHkew' },
  { id: 'listapro',          iconUrl: 'https://play-lh.googleusercontent.com/NWTIP17qvyrVfNuQJwwYjqYYMKWLTQzlIYoZ6N3oDQg8df2varyJw7pzz-3URhRodp8Qn3ruZNtteoCgr1tLkQ' },
  { id: 'placarvolei',       iconUrl: 'https://play-lh.googleusercontent.com/i7MuPDpGkFEcyLEzYZCXUqLdQTcvL57p0yMZck2fVGG3_1BPojE0UkTeCiwl4kZhiA' },
  { id: 'sorteio',           iconUrl: 'https://play-lh.googleusercontent.com/lcto6sHod2bSfvqKg28R7qzSFyZpBydjJ6rJT5_wMTIkqas80_9jR3IJasbt7zNahgKs' },
  { id: 'tagproduto',        iconUrl: 'https://play-lh.googleusercontent.com/VmG6vvI2X4SICjQEdj1oFb6uF_zNkuhMAN6DL-RjdFzBSvqpDE8h0M2oPuS-hVqaC8I' },
  { id: 'vendi',             iconUrl: 'https://play-lh.googleusercontent.com/Cq1ooODikIv2QfsX7sTAsy-3Wy4KZB6iW4or7yKnnSSAEO9mwrsHOO1Pvbs3OSKi-bnXBJta0HXoEE5mSsuQ' },
];

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      // Follow redirect
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(destPath);
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => { fs.unlink(destPath, () => {}); reject(err); });
  });
}

async function run() {
  const appsDir = path.join(__dirname, 'src', 'apps');
  const imagesDir = path.join(__dirname, 'src', 'assets', 'images');

  for (const app of apps) {
    const appImgDir = path.join(imagesDir, app.id);
    fs.mkdirSync(appImgDir, { recursive: true });

    const iconDest = path.join(appImgDir, 'icon.png');
    try {
      console.log(`⬇️  Baixando ícone de ${app.id}...`);
      await downloadFile(app.iconUrl, iconDest);
      console.log(`✅ Ícone salvo: ${iconDest}`);

      // Atualizar o JSON com o caminho local
      const jsonPath = path.join(appsDir, `${app.id}.json`);
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      data.icon = `../assets/images/${app.id}/icon.png`;
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
      console.log(`💾 JSON atualizado para ${app.id}\n`);
    } catch (err) {
      console.error(`❌ Erro ao baixar ícone de ${app.id}:`, err.message);
    }
  }
  console.log('🎉 Todos os ícones baixados!');
}

run();
