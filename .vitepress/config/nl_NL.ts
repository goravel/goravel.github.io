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
    text: "Testen",
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
    text: "Installatie",
    link: 'installation'
  }, {
    text: "Configuratie",
    link: 'configuration'
  }, {
    text: "Map structuur",
    link: 'directory-structure'
  }, {
    text: "Compileren",
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
    text: "Service container",
    link: 'container'
  }, {
    text: "Service providers",
    link: 'providers'
  }, {
    text: 'Facades',
    link: 'facades'
  }];
}
function sidebarBasic(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Routering",
    link: 'routing'
  }, {
    text: 'Middlewares',
    link: 'middlewares'
  }, {
    text: "Regelsystemen",
    link: 'controllers'
  }, {
    text: 'Requests',
    link: 'requests'
  }, {
    text: 'Responses',
    link: 'responses'
  }, {
    text: "Weergaven",
    link: 'views'
  }, {
    text: 'Grpc',
    link: 'grpc'
  }, {
    text: "Sessie",
    link: 'session'
  }, {
    text: "Validatie",
    link: 'validation'
  }, {
    text: "Logboekregistratie",
    link: 'logging'
  }];
}
function sidebarAdvanced(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Artisan',
    link: 'artisan'
  }, {
    text: "Cachegeheugen",
    link: 'cache'
  }, {
    text: "Evenementen",
    link: 'events'
  }, {
    text: "Opslag van bestanden",
    link: 'fs'
  }, {
    text: "E-mailen",
    link: 'mail'
  }, {
    text: "Wachtrijen",
    link: 'queues'
  }, {
    text: "Taak Plannen",
    link: 'schedule'
  }, {
    text: "Lokalisatie",
    link: 'localization'
  }, {
    text: "Pakket ontwikkeling",
    link: 'package'
  }, {
    text: 'Color Output',
    link: 'color'
  }, {
    text: "Tekenreeks",
    link: 'strings'
  }, {
    text: 'Helpers',
    link: 'helpers'
  }];
}
function sidebarSecurity(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Authenticatie",
    link: 'authentication'
  }, {
    text: "Autorisatie",
    link: 'authorization'
  }, {
    text: "Versleuteling",
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
    text: "Relaties",
    link: 'relationships'
  }, {
    text: "Migraties",
    link: 'migrations'
  }, {
    text: 'Seeding',
    link: 'seeding'
  }, {
    text: "Fabrieken",
    link: 'factories'
  }];
}
function sidebarTesting(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Quickstart',
    link: 'quickstart'
  }, {
    text: "HTTP Testen",
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
    text: "Privacy Beleid",
    link: 'privacy'
  }];
}