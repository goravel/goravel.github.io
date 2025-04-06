import { defineConfig, type DefaultTheme } from 'vitepress';
export const config = defineConfig({
  lang: "ro-RO",
  description: "Goravel este un cadru pentru aplicații web cu funcții complete și excelente scalabilitate. Ca o schelă de început pentru a-l ajuta pe Gopher să își construiască rapid propriile aplicații.",
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
        base: "/fundație/",
        items: sidebarFoundation()
      },
      '/basic/': {
        base: "/bază/",
        items: sidebarBasic()
      },
      '/advanced/': {
        base: "/avansat/",
        items: sidebarAdvanced()
      },
      '/security/': {
        base: "/securitate/",
        items: sidebarSecurity()
      },
      '/orm/': {
        base: '/orm/',
        items: sidebarOrm()
      },
      '/testing/': {
        base: "/testare/",
        items: sidebarTesting()
      },
      '/other/': {
        base: "/altel/",
        items: sidebarOther()
      }
    },
    editLink: {
      pattern: 'https://github.com/goravel/goravel.github.io/edit/main/:path',
      text: "Editează această pagină pe GitHub"
    },
    footer: {
      message: "Publicat sub licența MIT",
      copyright: `Drepturi de autor ©️ 2021${new Date().getFullYear()} Goravel`
    }
  }
});
function nav(): DefaultTheme.NavItem[] {
  return [{
    text: 'Quickstart',
    link: "/quickstart/instalare",
    activeMatch: '/quickstart/'
  }, {
    text: "Actualizează",
    link: '/upgrade/v1.15',
    activeMatch: '/upgrade/'
  }, {
    text: "Fundație",
    link: "/fundaţie/ciclu de viaţă",
    activeMatch: "/fundație/"
  }, {
    text: "Baza",
    link: "/bază/rutare",
    activeMatch: "/bază/"
  }, {
    text: "Avansat",
    link: "/avansat/artizan",
    activeMatch: "/avansat/"
  }, {
    text: "Securitate",
    link: "/securitate/autentificare",
    activeMatch: "/securitate/"
  }, {
    text: 'ORM',
    link: '/orm/quickstart',
    activeMatch: '/orm/'
  }, {
    text: "Testare",
    link: "/testare/pornire rapidă",
    activeMatch: "/testare/"
  }, {
    text: "Altele",
    link: "/altele/contribuții",
    activeMatch: "/altel/"
  }];
}
function sidebarQuickstart(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Instalare",
    link: "instalare"
  }, {
    text: "Configurare",
    link: "configurare"
  }, {
    text: "Structura Directoarelor",
    link: "Structura-director"
  }, {
    text: "Compilare",
    link: "compilează"
  }];
}
function sidebarUpgrade(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Upgrade de la v1.15",
    link: "v1,15"
  }, {
    text: "Upgrade de la v1.14",
    link: "v1,14"
  }, {
    text: "Istoric",
    link: "Istoric"
  }];
}
function sidebarFoundation(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Lifeciclu",
    link: "ciclu de viaţă"
  }, {
    text: "Container serviciu",
    link: 'container'
  }, {
    text: "Furnizori de servicii",
    link: "furnizori"
  }, {
    text: "Fațete",
    link: "fațade"
  }];
}
function sidebarBasic(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Rutare",
    link: "rutare"
  }, {
    text: 'Middlewares',
    link: "middleware"
  }, {
    text: "Controlori",
    link: "controlori"
  }, {
    text: "Cereri",
    link: "cereri"
  }, {
    text: "Răspunsuri",
    link: "răspunsuri"
  }, {
    text: "Vizualizări",
    link: "vizualizări"
  }, {
    text: "Grătar",
    link: "grătar"
  }, {
    text: "Sesiune",
    link: "sesiune"
  }, {
    text: "Validare",
    link: "validarea"
  }, {
    text: "Logare",
    link: "logare"
  }];
}
function sidebarAdvanced(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Artisan',
    link: 'artisan'
  }, {
    text: "Geocutie",
    link: "geocutie"
  }, {
    text: "Evenimente",
    link: "evenimente"
  }, {
    text: "Spațiu de stocare",
    link: 'fs'
  }, {
    text: "E-mail",
    link: "poştă"
  }, {
    text: "Cozi",
    link: "cozi"
  }, {
    text: "Programarea sarcinilor",
    link: "program"
  }, {
    text: "Localizare",
    link: "localizare"
  }, {
    text: "Pachet Dezvoltare",
    link: "pachet"
  }, {
    text: "Ieșire culoare",
    link: "culoare"
  }, {
    text: "Șiruri",
    link: "șiruri"
  }, {
    text: 'Helpers',
    link: 'helpers'
  }];
}
function sidebarSecurity(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Autentificare",
    link: "autentificare"
  }, {
    text: "Autorizare",
    link: "Autorizare"
  }, {
    text: "Criptare",
    link: "criptare"
  }, {
    text: 'Hashing',
    link: 'hashing'
  }];
}
function sidebarOrm(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Quickstart',
    link: "pornire rapidă"
  }, {
    text: "Relaţii",
    link: "relaţii"
  }, {
    text: "Migrații",
    link: "migrări"
  }, {
    text: 'Seeding',
    link: "însămânțare"
  }, {
    text: "Fabrici",
    link: "fabrici"
  }];
}
function sidebarTesting(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Quickstart',
    link: "pornire rapidă"
  }, {
    text: "Teste HTTP",
    link: 'http'
  }, {
    text: "Șosete",
    link: "dubluri"
  }];
}
function sidebarOther(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Contribuție",
    link: "contributie"
  }, {
    text: "Pachete Excelente",
    link: "pachete"
  }, {
    text: "Politica de confidenţialitate",
    link: "intimitate"
  }];
}