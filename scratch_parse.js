const fs = require('fs');

const filePath = "C:\\Users\\rodri\\.gemini\\antigravity\\brain\\344804ff-f4f6-43bd-9ca2-9dc41e26a6ae\\.system_generated\\steps\\156\\content.md";

if (!fs.existsSync(filePath)) {
  console.log('Arquivo content.md não encontrado em:', filePath);
  process.exit(1);
}

const html = fs.readFileSync(filePath, 'utf-8');
console.log('Tamanho do HTML:', html.length, 'bytes');

// 1. Procurar por notas (ex: 4,7 ou 4.7 ou "4,7 de 5 estrelas")
const ratingRegexes = [
  /class="[\w\s]*iwt3bd[\w\s]*"[^>]*>([\d,\.]+)</i, // Classe comum de nota
  /aria-label="Avaliado com ([\d,\.]+) de 5 estrelas"/i,
  /aria-label="Rated ([\d,\.]+) stars out of five"/i,
  /([\d,\.]+)\s*star/i,
  /"ratingValue"\s*:\s*"([\d,\.]+)"/i,
  /\[\[\[([\d,\.]+),/ // Estrutura de dados WIZ
];

console.log('--- TESTANDO REGEX DE NOTAS ---');
for (const regex of ratingRegexes) {
  const match = html.match(regex);
  if (match) {
    console.log(`Match com regex ${regex}:`, match[0], '-> Valor:', match[1]);
  }
}

// 2. Tentar extrair blocos de avaliações (comentários)
console.log('\n--- BUSCANDO COMENTÁRIOS ---');
// Procura por comentários comuns do Google Play (geralmente são strings de texto longas seguidas de dados)
const keywords = ['muito bom', 'excelente', 'parabéns', 'ótimo', 'aplicativo', 'ajudou', 'recomendo', 'top', 'prático'];
console.log('\n--- BUSCANDO TEXTOS DE SPANS ---');
const paragraphs = html.match(/<span[^>]*>([^<]{10,250})<\/span>/g) || [];
console.log('Total de spans com texto:', paragraphs.length);
let count = 0;
for (const p of paragraphs) {
  const text = p.replace(/<[^>]+>/g, '').trim();
  if (keywords.some(kw => text.toLowerCase().includes(kw)) && text.length > 25) {
    console.log(`Texto encontrado: "${text}"`);
    count++;
    if (count > 25) break;
  }
}
