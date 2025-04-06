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
    text: "Тестирование",
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
    text: "Установка",
    link: 'installation'
  }, {
    text: "Конфигурация",
    link: 'configuration'
  }, {
    text: "Структура каталогов",
    link: 'directory-structure'
  }, {
    text: "Компиляция",
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
    text: "Сервисный контейнер",
    link: 'container'
  }, {
    text: "Поставщики услуг",
    link: 'providers'
  }, {
    text: "Фасады",
    link: 'facades'
  }];
}
function sidebarBasic(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Маршрутизация",
    link: 'routing'
  }, {
    text: 'Middlewares',
    link: 'middlewares'
  }, {
    text: "Контроллеры",
    link: 'controllers'
  }, {
    text: 'Requests',
    link: 'requests'
  }, {
    text: 'Responses',
    link: 'responses'
  }, {
    text: "Просмотров",
    link: 'views'
  }, {
    text: "Грпк",
    link: 'grpc'
  }, {
    text: "Сессия",
    link: 'session'
  }, {
    text: "Проверка",
    link: 'validation'
  }, {
    text: "Ведение журнала",
    link: 'logging'
  }];
}
function sidebarAdvanced(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Artisan',
    link: 'artisan'
  }, {
    text: "Кэш",
    link: 'cache'
  }, {
    text: "События",
    link: 'events'
  }, {
    text: "Файловое хранилище",
    link: 'fs'
  }, {
    text: "Почта",
    link: 'mail'
  }, {
    text: "Очереди",
    link: 'queues'
  }, {
    text: "Планирование задач",
    link: 'schedule'
  }, {
    text: "Локализация",
    link: 'localization'
  }, {
    text: "Разработка пакета",
    link: 'package'
  }, {
    text: 'Color Output',
    link: 'color'
  }, {
    text: "Строки",
    link: 'strings'
  }, {
    text: 'Helpers',
    link: 'helpers'
  }];
}
function sidebarSecurity(): DefaultTheme.SidebarItem[] {
  return [{
    text: "Проверка подлинности",
    link: 'authentication'
  }, {
    text: "Авторизация",
    link: 'authorization'
  }, {
    text: "Шифрование",
    link: 'encryption'
  }, {
    text: "Хэширование",
    link: 'hashing'
  }];
}
function sidebarOrm(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Quickstart',
    link: 'quickstart'
  }, {
    text: "Отношения",
    link: 'relationships'
  }, {
    text: "Миграции",
    link: 'migrations'
  }, {
    text: 'Seeding',
    link: 'seeding'
  }, {
    text: "Фабрики",
    link: 'factories'
  }];
}
function sidebarTesting(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Quickstart',
    link: 'quickstart'
  }, {
    text: "HTTP тесты",
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
    text: "Политика конфиденциальности",
    link: 'privacy'
  }];
}