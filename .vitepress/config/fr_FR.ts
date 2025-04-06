import { defineConfig, type DefaultTheme } from "pressevitepress";
export const config = defineConfig({
  lang: "fr-FR",
  description: "Goravel est un framework d'application web avec des fonctions complètes et une excellente évolutivité. En tant qu'échafaudage de départ pour aider Gopher à construire rapidement ses propres applications.",
  themeConfig: {
    nav: nav(),
    sidebar: {
      '/quickstart/': {
        base: "/fr/quickstart/",
        items: sidebarQuickstart()
      },
      '/upgrade/': {
        base: "/fr/upgrade/",
        items: sidebarUpgrade()
      },
      '/foundation/': {
        base: "/fondation/",
        items: sidebarFoundation()
      },
      '/basic/': {
        base: "/fr/basique/",
        items: sidebarBasic()
      },
      '/advanced/': {
        base: "/avancé/",
        items: sidebarAdvanced()
      },
      '/security/': {
        base: "/fr/security/",
        items: sidebarSecurity()
      },
      '/orm/': {
        base: '/orm/',
        items: sidebarOrm()
      },
      '/testing/': {
        base: "/fr/testing/",
        items: sidebarTesting()
      },
      '/other/': {
        base: "/autres/",
        items: sidebarOther()
      }
    },
    editLink: {
      pattern: 'https://github.com/goravel/goravel.github.io/edit/main/:path',
      text: "Modifier cette page sur GitHub"
    },
    footer: {
      message: "Publié sous licence MIT",
      copyright: `Copyright ©️ 2021-${new Date().getFullYear()} Goravel`
    }
  }
});
function nav(): DefaultTheme.NavItem[] {
  return [{
    text: "Démarrage rapide",
    link: '/quickstart/installation',
    activeMatch: "/fr/quickstart/"
  }, {
    text: "Mise à jour",
    link: "/fr/upgrade/v1.15",
    activeMatch: "/fr/upgrade/"
  }, {
    text: "Fondation",
    link: "/fondation/cycle de vie",
    activeMatch: "/fondation/"
  }, {
    text: "Basique",
    link: "/fr/basic/routing",
    activeMatch: "/fr/basique/"
  }, {
    text: "Avancé",
    link: '/advanced/artisan',
    activeMatch: "/avancé/"
  }, {
    text: "Sécurité",
    link: "/fr/security/authentification",
    activeMatch: "/fr/security/"
  }, {
    text: 'ORM',
    link: '/orm/quickstart',
    activeMatch: '/orm/'
  }, {
    text: "Tests en cours",
    link: "/fr/testing/quickstart",
    activeMatch: "/fr/testing/"
  }, {
    text: "Autres",
    link: "/autre/contribution",
    activeMatch: "/autres/"
  }];
}
function sidebarQuickstart(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Installation',
    link: 'installation'
  }, {
    text: 'Configuration',
    link: "paramétrage"
  }, {
    text: "Structure du répertoire",
    link: "structure-répertoire-répertoire"
  }, {
    text: "Compiler",
    link: "compiler"
  }];
}
function sidebarUpgrade(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Mise à jour depuis la v1.15",
    link: 'v1.15'
  }, {
    text: "Mise à jour depuis la v1.14",
    link: 'v1.14'
  }, {
    text: "Historique",
    link: "Historique"
  }];
}
function sidebarFoundation(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Cycle de vie",
    link: "cycle de vie"
  }, {
    text: "Conteneur de service",
    link: "conteneur"
  }, {
    text: "Fournisseurs de services",
    link: "fournisseurs"
  }, {
    text: "Façades",
    link: "façades"
  }];
}
function sidebarBasic(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Routage",
    link: "routage"
  }, {
    text: "Moyens",
    link: "marchandises intermédiaires"
  }, {
    text: "Contrôleurs",
    link: "contrôleurs"
  }, {
    text: "Requêtes",
    link: "Requêtes"
  }, {
    text: "Réponses",
    link: "réponses"
  }, {
    text: "Vues",
    link: "Vues"
  }, {
    text: 'Grpc',
    link: 'grpc'
  }, {
    text: "Séance",
    link: 'session'
  }, {
    text: 'Validation',
    link: "Validation"
  }, {
    text: "Journalisation",
    link: "journalisation"
  }];
}
function sidebarAdvanced(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Artisan',
    link: 'artisan'
  }, {
    text: 'Cache',
    link: 'cache'
  }, {
    text: "Évènements",
    link: "Evénements"
  }, {
    text: "Stockage des fichiers",
    link: 'fs'
  }, {
    text: "Courrier",
    link: "courrier électronique"
  }, {
    text: 'Queues',
    link: "files d'attente"
  }, {
    text: "Planification des tâches",
    link: "Horaire"
  }, {
    text: "Traduction",
    link: "Traduction"
  }, {
    text: "Développement du paquet",
    link: "Paquet"
  }, {
    text: "Sortie de couleur",
    link: "couleur"
  }, {
    text: "Chaînes de caractères",
    link: "chaînes de caractères"
  }, {
    text: 'Helpers',
    link: 'helpers'
  }];
}
function sidebarSecurity(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Authentification",
    link: "authentification"
  }, {
    text: "Autorisation",
    link: "Autorisation"
  }, {
    text: "Chiffrement",
    link: "cryptage"
  }, {
    text: "Hachage",
    link: "hachage"
  }];
}
function sidebarOrm(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Démarrage rapide",
    link: "démarrage rapide"
  }, {
    text: "Relations",
    link: "relations"
  }, {
    text: 'Migrations',
    link: 'migrations'
  }, {
    text: "Sources",
    link: 'seeding'
  }, {
    text: "Usines",
    link: "usines"
  }];
}
function sidebarTesting(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Démarrage rapide",
    link: "démarrage rapide"
  }, {
    text: "Tests HTTP",
    link: 'http'
  }, {
    text: "Chopes",
    link: "bouchon"
  }];
}
function sidebarOther(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Contribuer",
    link: "contribuant"
  }, {
    text: "Paquets de qualité",
    link: "paquets"
  }, {
    text: "Politique de confidentialité",
    link: "Confidentialité"
  }];
}