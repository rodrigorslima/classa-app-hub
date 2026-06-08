const fs = require('fs');

const rawData = {
  "app_name": "Cartaz Promocional",
  "developer": "Class A Tecnologia",
  "contact_email": "classatecnologia@gmail.com",
  "privacy_policy": {
    "pt": {
      "title": "Política de Privacidade",
      "last_updated": "23 de Maio de 2026",
      "introduction": "A Class A Tecnologia desenvolveu o aplicativo Cartaz Promocional como um aplicativo Comercial/Freemium. Este SERVIÇO é fornecido por nós e destina-se ao uso no estado em que se encontra. Esta página é usada para informar os visitantes sobre nossas políticas com relação à coleta, uso e divulgação de Informações Pessoais de quem decide usar nosso Serviço. Ao usar nosso Serviço, você concorda com a coleta e o uso de informações em relação a esta política.",
      "sections": [
        {
          "id": "1",
          "title": "Coleta e Uso de Informações",
          "content": "Para uma melhor experiência durante o uso de nosso Serviço, podemos exigir que você nos forneça certas informações de identificação pessoal. As informações que solicitamos serão retidas em seu dispositivo ou em nossos servidores para o funcionamento do aplicativo e não são vendidas a terceiros.",
          "items": [
            "Câmera e Fotos: Usamos a câmera e a galeria para escanear códigos de barras, capturar e selecionar imagens essenciais para a geração de cartazes e etiquetas.",
            "Armazenamento e Arquivos: Usamos o acesso a arquivos para salvar, exportar e compartilhar os cartazes e listas geradas em formatos como PDF, CSV ou Excel.",
            "Autenticação de Usuário: Coletamos seu e-mail e nome básicos ao fazer login usando serviços de autenticação (Google Sign-In, Apple Sign-In ou E-mail/Senha)."
          ]
        },
        {
          "id": "2",
          "title": "Serviços de Terceiros",
          "content": "O aplicativo utiliza serviços de terceiros que podem coletar informações usadas para identificá-lo, rastrear o uso do aplicativo, fornecer suporte técnico e exibir anúncios.",
          "third_parties": [
            {
              "name": "Google Play Services",
              "url": "https://policies.google.com/privacy"
            },
            {
              "name": "Google AdMob",
              "url": "https://support.google.com/admob/answer/6128543"
            },
            {
              "name": "Pangle (Mediação)",
              "url": "https://www.pangleglobal.com/privacy"
            },
            {
              "name": "Firebase Core, Auth, e Firestore",
              "url": "https://firebase.google.com/support/privacy"
            },
            {
              "name": "Firebase Analytics e Crashlytics",
              "url": "https://firebase.google.com/support/privacy"
            },
            {
              "name": "RevenueCat",
              "url": "https://www.revenuecat.com/privacy"
            }
          ]
        },
        {
          "id": "3",
          "title": "Dados de Log e Analytics",
          "content": "Sempre que você usar nosso Serviço, no caso de um erro no aplicativo, coletamos dados (Log Data) por meio do Firebase Crashlytics. Esses dados podem incluir IP, versão do SO e horário do erro."
        },
        {
          "id": "4",
          "title": "Assinaturas e Compras no Aplicativo",
          "content": "O processamento de pagamentos é feito inteiramente pelas lojas de aplicativos oficiais (App Store e Google Play). O RevenueCat é usado apenas para verificar e conceder acesso aos recursos premium; nós não armazenamos dados de cartão de crédito."
        },
        {
          "id": "5",
          "title": "Segurança de Dados",
          "content": "Valorizamos sua confiança, mas lembre-se de que nenhum método de armazenamento ou transmissão eletrônica é 100% seguro."
        },
        {
          "id": "6",
          "title": "Exclusão de Dados (Direito do Usuário)",
          "content": "Você tem o direito de solicitar a exclusão de seus dados e conta diretamente nas configurações do aplicativo ou enviando um e-mail para o suporte. Os dados serão removidos em até 30 dias."
        },
        {
          "id": "7",
          "title": "Privacidade de Crianças",
          "content": "Não coletamos intencionalmente informações de crianças menores de 13 anos. Se descobrirmos tal ocorrência, as informações serão excluídas."
        },
        {
          "id": "8",
          "title": "Alterações nesta Política",
          "content": "Podemos atualizar esta política. Recomendamos revisá-la periodicamente."
        }
      ],
      "legal_compliance": "Esta política foi elaborada com foco na conformidade com a LGPD (Brasil), GDPR (Europa) e diretrizes da Google Play Store / Apple App Store."
    }
  },
  "terms_of_use": {
    "pt": {
      "title": "Termos de Uso",
      "last_updated": "23 de Maio de 2026",
      "introduction": "Bem-vindo ao Cartaz Promocional. Estes Termos de Uso regem o seu acesso e uso do aplicativo móvel fornecido pela Class A Tecnologia. Ao baixar ou usar o aplicativo, estes termos se aplicarão automaticamente a você – portanto, certifique-se de lê-los cuidadosamente antes de usar o aplicativo.",
      "sections": [
        {
          "id": "1",
          "title": "Uso do Aplicativo",
          "content": "Você tem permissão para baixar, instalar e usar o aplicativo estritamente para seus fins comerciais ou pessoais. Não é permitido copiar, modificar, extrair o código-fonte ou utilizá-lo para fins ilegais. Todos os direitos de propriedade intelectual pertencem à Class A Tecnologia."
        },
        {
          "id": "2",
          "title": "Planos, Assinaturas e Pagamentos (RevenueCat)",
          "content": "Todas as transações financeiras são gerenciadas pelas lojas de aplicativos oficiais (Google Play Store e Apple App Store) utilizando a infraestrutura do RevenueCat. Nós não temos acesso e não armazenamos suas informações de cartão de crédito. As assinaturas são renovadas automaticamente, a menos que sejam canceladas com 24 horas de antecedência."
        },
        {
          "id": "3",
          "title": "Serviços de Terceiros",
          "content": "O aplicativo utiliza serviços de terceiros (Google Play Services, AdMob, Firebase e Crashlytics) que possuem seus próprios Termos e Condições e Políticas de Privacidade."
        },
        {
          "id": "4",
          "title": "Isenção de Responsabilidade",
          "content": "A Class A Tecnologia não garante que o serviço será ininterrupto ou livre de erros. Os documentos gerados (arquivos PDF, CSV, Excel, cartazes e etiquetas) são de inteira responsabilidade do usuário."
        },
        {
          "id": "5",
          "title": "Limitação de Responsabilidade",
          "content": "A Class A Tecnologia não aceitará qualquer responsabilidade por qualquer perda resultante da confiança neste aplicativo, tampouco por perda de dados."
        },
        {
          "id": "6",
          "title": "Alterações nos Termos",
          "content": "Podemos atualizar nossos Termos de Uso de tempos em tempos. Recomendamos que você revise esta página periodicamente."
        }
      ]
    }
  }
};

function parsePrivacyPolicy(rawPolicyPt) {
  const finalSections = [];

  if (rawPolicyPt.introduction) {
    finalSections.push({
      title: "Introdução",
      paragraphs: [rawPolicyPt.introduction]
    });
  }

  rawPolicyPt.sections.forEach(sec => {
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

function parseTermsOfUse(rawTermsPt) {
  const finalSections = [];

  if (rawTermsPt.introduction) {
    finalSections.push({
      title: "Introdução",
      paragraphs: [rawTermsPt.introduction]
    });
  }

  rawTermsPt.sections.forEach(sec => {
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
  const appFile = 'src/apps/cartazpromocional.json';
  const appData = JSON.parse(fs.readFileSync(appFile, 'utf-8'));

  appData.privacyPolicy = parsePrivacyPolicy(rawData.privacy_policy.pt);
  appData.termsOfUse = parseTermsOfUse(rawData.terms_of_use.pt);

  fs.writeFileSync(appFile, JSON.stringify(appData, null, 2));
  console.log('Successfully updated cartazpromocional.json');
} catch (e) {
  console.error(e);
}
