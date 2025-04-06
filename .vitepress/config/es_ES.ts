import { defineConfig, type DefaultTheme } from 'vitepress';
export const config = defineConfig({
  lang: "es-ES",
  description: "Goravel es un framework de aplicaciones web con funciones completas y excelente escalabilidad.Como inicio de scaffolding para ayudar a Gopher a construir rápidamente sus propias aplicaciones.",
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
        base: "/fundación/",
        items: sidebarFoundation()
      },
      '/basic/': {
        base: '/basic/',
        items: sidebarBasic()
      },
      '/advanced/': {
        base: "/avanzado/",
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
        base: "/es/testing/",
        items: sidebarTesting()
      },
      '/other/': {
        base: '/other/',
        items: sidebarOther()
      }
    },
    editLink: {
      pattern: 'https://github.com/goravel/goravel.github.io/edit/main/:path',
      text: "Editar esta página en GitHub"
    },
    footer: {
      message: "Publicado bajo la licencia MIT",
      copyright: `Copyright ©️ 2021-${new Date().getFullYear()} Goravel`
    }
  }
});
function nav(): DefaultTheme.NavItem[] {
  return [{
    text: "Inicio rápido",
    link: '/quickstart/installation',
    activeMatch: '/quickstart/'
  }, {
    text: "Mejorar",
    link: '/upgrade/v1.15',
    activeMatch: '/upgrade/'
  }, {
    text: "Cimiento",
    link: "/fundación/ciclo de vida",
    activeMatch: "/fundación/"
  }, {
    text: "Básico",
    link: '/basic/routing',
    activeMatch: '/basic/'
  }, {
    text: "Avanzado",
    link: '/advanced/artisan',
    activeMatch: "/avanzado/"
  }, {
    text: "Seguridad",
    link: '/security/authentication',
    activeMatch: '/security/'
  }, {
    text: 'ORM',
    link: '/orm/quickstart',
    activeMatch: '/orm/'
  }, {
    text: "Pruebas",
    link: '/testing/quickstart',
    activeMatch: "/es/testing/"
  }, {
    text: "Otro",
    link: "/other/contribuyendo",
    activeMatch: '/other/'
  }];
}
function sidebarQuickstart(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Instalación",
    link: "instalación"
  }, {
    text: "Configuración",
    link: "configuración"
  }, {
    text: "Estructura de directorio",
    link: "estructura-directorio"
  }, {
    text: "Compilar",
    link: "compilar"
  }];
}
function sidebarUpgrade(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Actualizar desde v1.15",
    link: 'v1.15'
  }, {
    text: "Actualizar desde v1.14",
    link: 'v1.14'
  }, {
    text: "Historial",
    link: "historia"
  }];
}
function sidebarFoundation(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Ciclo de vida",
    link: "ciclo de vida"
  }, {
    text: "Contenedor de servicio",
    link: "contenedor"
  }, {
    text: "Proveedores de servicios",
    link: "proveedores"
  }, {
    text: "Facadas",
    link: "fachadas"
  }];
}
function sidebarBasic(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Ruta",
    link: "enrutamiento"
  }, {
    text: "Intermediarios",
    link: "medias"
  }, {
    text: "Controladores",
    link: "controladores"
  }, {
    text: "Solicitudes",
    link: "solicitudes"
  }, {
    text: "Respuestas",
    link: "respuestas"
  }, {
    text: "Vistas",
    link: "vistas"
  }, {
    text: 'Grpc',
    link: 'grpc'
  }, {
    text: "Sesión",
    link: "sesión"
  }, {
    text: "Validación",
    link: "validación"
  }, {
    text: "Loggando",
    link: "registro"
  }];
}
function sidebarAdvanced(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Artisan',
    link: 'artisan'
  }, {
    text: "Caché",
    link: "caché"
  }, {
    text: "Eventos",
    link: "eventos"
  }, {
    text: "Almacenamiento de archivos",
    link: 'fs'
  }, {
    text: "Correo",
    link: "correo"
  }, {
    text: "Colas",
    link: "colas"
  }, {
    text: "Programación de tareas",
    link: "programar"
  }, {
    text: "Localización",
    link: "localización"
  }, {
    text: "Desarrollo de paquetes",
    link: "paquete"
  }, {
    text: "Color de salida",
    link: 'color'
  }, {
    text: "Cadenas",
    link: "cadenas"
  }, {
    text: 'Helpers',
    link: 'helpers'
  }];
}
function sidebarSecurity(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Autenticación",
    link: "autentificación"
  }, {
    text: "Autorización",
    link: "autorización"
  }, {
    text: "Encriptación",
    link: "cifrado"
  }, {
    text: 'Hashing',
    link: 'hashing'
  }];
}
function sidebarOrm(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Inicio rápido",
    link: "inicio rápido"
  }, {
    text: "Relaciones",
    link: "relaciones"
  }, {
    text: "Migraciones",
    link: "migraciones"
  }, {
    text: "Sembrando",
    link: "siembra"
  }, {
    text: "Fábricas",
    link: "fábricas"
  }];
}
function sidebarTesting(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Inicio rápido",
    link: "inicio rápido"
  }, {
    text: "Pruebas HTTP",
    link: 'http'
  }, {
    text: 'Mocks',
    link: 'mocks'
  }];
}
function sidebarOther(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Contribuyendo",
    link: "contribuyendo"
  }, {
    text: "Paquetes excelentes",
    link: "paquetes"
  }, {
    text: "Política de privacidad",
    link: "privacidad"
  }];
}