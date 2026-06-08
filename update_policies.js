const fs = require('fs');

function parsePrivacyPolicy(rawPolicy) {
  const finalSections = [];

  // Add intro as section 1 if present
  if (rawPolicy.introduction) {
    finalSections.push({
      title: "Introdução",
      paragraphs: [rawPolicy.introduction]
    });
  }

  rawPolicy.sections.forEach(sec => {
    const p = [];
    if (sec.content) p.push(sec.content);
    if (sec.items) {
      sec.items.forEach(item => p.push(`• ${item}`));
    }
    if (sec.third_parties) {
      sec.third_parties.forEach(tp => p.push(`• ${tp.name}: ${tp.url}`));
    }
    finalSections.push({
      title: `${sec.id}. ${sec.title}`,
      paragraphs: p
    });
  });

  return finalSections;
}

function parseTermsOfUse(rawTerms) {
  const finalSections = [];

  if (rawTerms.introduction) {
    finalSections.push({
      title: "Introdução",
      paragraphs: [rawTerms.introduction]
    });
  }

  rawTerms.sections.forEach(sec => {
    const p = [];
    if (sec.content) p.push(sec.content);
    finalSections.push({
      title: `${sec.id}. ${sec.title}`,
      paragraphs: p
    });
  });

  return finalSections;
}

try {
  const appFile = 'src/apps/tagproduto.json';
  const privacyFile = 'tagproduto/PRIVACY_POLICY.json';
  const termsFile = 'tagproduto/TERMS_OF_USE.json';

  const appData = JSON.parse(fs.readFileSync(appFile, 'utf-8'));
  const rawPrivacy = JSON.parse(fs.readFileSync(privacyFile, 'utf-8'));
  const rawTerms = JSON.parse(fs.readFileSync(termsFile, 'utf-8'));

  appData.privacyPolicy = parsePrivacyPolicy(rawPrivacy);
  appData.termsOfUse = parseTermsOfUse(rawTerms);

  fs.writeFileSync(appFile, JSON.stringify(appData, null, 2));
  console.log('Successfully updated tagproduto.json');
} catch (e) {
  console.error(e);
}
