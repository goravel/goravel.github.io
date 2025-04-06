import { defineConfig, type DefaultTheme } from 'vitepress';
export const config = defineConfig({
  lang: 'en-US',
  description: "Goravel is a web application framework with complete functions and excellent scalability. As a starting scaffolding to help Gopher quickly build their own applications.",
  themeConfig: {
    nav: nav(),
    sidebar: {
      '/quickstart/': {
        base: '/quickstart/',
        items: sidebarQuickstart()
      },
      '/upgrade/': {
        base: '/upgrade/',
        items: sidebarUpgrade()
      },
      '/foundation/': {
        base: '/foundation/',
        items: sidebarFoundation()
      },
      '/basic/': {
        base: '/basic/',
        items: sidebarBasic()
      },
      '/advanced/': {
        base: '/advanced/',
        items: sidebarAdvanced()
      },
      '/security/': {
        base: '/security/',
        items: sidebarSecurity()
      },
      '/orm/': {
        base: '/orm/',
        items: sidebarOrm()
      },
      '/testing/': {
        base: '/testing/',
        items: sidebarTesting()
      },
      '/other/': {
        base: '/other/',
        items: sidebarOther()
      }
    },
    editLink: {
      pattern: 'https://github.com/goravel/goravel.github.io/edit/main/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: 'Released under the MIT License',
      copyright: `Copyright © 2021-${new Date().getFullYear()} Goravel`
    }
  }
});
function nav(): DefaultTheme.NavItem[] {
  return [{
    text: 'Quickstart',
    link: '/quickstart/installation',
    activeMatch: '/quickstart/'
  }, {
    text: 'Upgrade',
    link: '/upgrade/v1.15',
    activeMatch: '/upgrade/'
  }, {
    text: 'Foundation',
    link: '/foundation/lifecycle',
    activeMatch: '/foundation/'
  }, {
    text: 'Basic',
    link: '/basic/routing',
    activeMatch: '/basic/'
  }, {
    text: 'Advanced',
    link: '/advanced/artisan',
    activeMatch: '/advanced/'
  }, {
    text: 'Security',
    link: '/security/authentication',
    activeMatch: '/security/'
  }, {
    text: 'ORM',
    link: '/orm/quickstart',
    activeMatch: '/orm/'
  }, {
    text: "Test",
    link: '/testing/quickstart',
    activeMatch: '/testing/'
  }, {
    text: 'Other',
    link: '/other/contributing',
    activeMatch: '/other/'
  }];
}
function sidebarQuickstart(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Installazione",
    link: 'installation'
  }, {
    text: "Configurazione",
    link: 'configuration'
  }, {
    text: "Struttura Cartella",
    link: 'directory-structure'
  }, {
    text: "Compila",
    link: 'compile'
  }];
}
function sidebarUpgrade(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Upgrade from v1.15',
    link: 'v1.15'
  }, {
    text: 'Upgrade from v1.14',
    link: 'v1.14'
  }, {
    text: 'History',
    link: 'history'
  }];
}
function sidebarFoundation(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Lifecycle',
    link: 'lifecycle'
  }, {
    text: "Contenitore Di Servizio",
    link: 'container'
  }, {
    text: "Fornitori Di Servizi",
    link: 'providers'
  }, {
    text: "Facciate",
    link: 'facades'
  }];
}
function sidebarBasic(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Routing',
    link: 'routing'
  }, {
    text: 'Middlewares',
    link: 'middlewares'
  }, {
    text: "Controllori",
    link: 'controllers'
  }, {
    text: 'Requests',
    link: 'requests'
  }, {
    text: 'Responses',
    link: 'responses'
  }, {
    text: "Viste",
    link: 'views'
  }, {
    text: 'Grpc',
    link: 'grpc'
  }, {
    text: "Sessione",
    link: 'session'
  }, {
    text: "Convalida",
    link: 'validation'
  }, {
    text: "Registrazione",
    link: 'logging'
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
    text: "Eventi",
    link: 'events'
  }, {
    text: "Archiviazione File",
    link: 'fs'
  }, {
    text: "Posta",
    link: 'mail'
  }, {
    text: "Coda",
    link: 'queues'
  }, {
    text: "Pianificazione Attività",
    link: 'schedule'
  }, {
    text: "Localizzazione",
    link: 'localization'
  }, {
    text: "Sviluppo Pacchetto",
    link: 'package'
  }, {
    text: 'Color Output',
    link: 'color'
  }, {
    text: "Stringhe",
    link: 'strings'
  }, {
    text: 'Helpers',
    link: 'helpers'
  }];
}
function sidebarSecurity(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Autenticazione",
    link: 'authentication'
  }, {
    text: "Autorizzazione",
    link: 'authorization'
  }, {
    text: "Cifratura",
    link: 'encryption'
  }, {
    text: 'Hashing',
    link: 'hashing'
  }];
}
function sidebarOrm(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Quickstart',
    link: 'quickstart'
  }, {
    text: "Relazioni",
    link: 'relationships'
  }, {
    text: "Migrazioni",
    link: 'migrations'
  }, {
    text: "Semina",
    link: 'seeding'
  }, {
    text: "Fabbriche",
    link: 'factories'
  }];
}
function sidebarTesting(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Quickstart',
    link: 'quickstart'
  }, {
    text: "Test HTTP",
    link: 'http'
  }, {
    text: 'Mocks',
    link: 'mocks'
  }];
}
function sidebarOther(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Contributing',
    link: 'contributing'
  }, {
    text: 'Excellent Packages',
    link: 'packages'
  }, {
    text: "Politica Sulla Privacy",
    link: 'privacy'
  }];
}