const fs = require('fs');
const filePath = "C:\\Users\\rodri\\.gemini\\antigravity\\brain\\344804ff-f4f6-43bd-9ca2-9dc41e26a6ae\\.system_generated\\steps\\156\\content.md";

if (!fs.existsSync(filePath)) {
  console.log('Arquivo não encontrado!');
  process.exit(1);
}

const html = fs.readFileSync(filePath, 'utf-8');

// Regexes para buscar contagem de avaliações
const regexes = [
  /"ratingCount"\s*:\s*"(\d+)"/i,
  /"reviewCount"\s*:\s*"(\d+)"/i,
  /([\d\.,]+)\s*avaliações/i,
  /([\d\.,]+)\s*ratings/i
];

for (const r of regexes) {
  const match = html.match(r);
  if (match) {
    console.log(`Match com ${r}:`, match[0], '-> Valor:', match[1]);
  }
}
