const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);

  // Tratar url e remover query params/hash
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let safePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
  
  // Caminho físico do arquivo
  let filePath = path.join(__dirname, safePath);
  
  // Se o caminho for um diretório, garantir a barra no final (trailing slash) para o roteamento relativo funcionar
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    if (!parsedUrl.pathname.endsWith('/')) {
      res.writeHead(301, { 'Location': parsedUrl.pathname + '/' + parsedUrl.search });
      res.end();
      return;
    }
    filePath = path.join(filePath, 'index.html');
  }


  // Verificar se o arquivo existe
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    res.writeHead(200, { 'Content-Type': contentType });
    
    const stream = fs.createReadStream(filePath);
    stream.on('error', (err) => {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Erro interno do servidor');
    });
    stream.pipe(res);
  } else {
    // Se o arquivo não existir, mostrar 404 amigável
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404 - Página Não Encontrada</h1><p>O arquivo ou aplicativo solicitado não foi gerado ou não existe.</p><a href="/">Voltar para o início</a>');
  }
});

server.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`💻 Servidor de desenvolvimento rodando localmente!`);
  console.log(`🔗 Link de acesso: \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
  console.log(`==================================================\n`);
});
