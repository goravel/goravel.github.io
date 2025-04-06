import { defineConfig, type DefaultTheme } from 'vitepress';
export const en = defineConfig({
  lang: 'en-US',
  description: "Goravel is a web application framework with complete functions and excellent scalability. As a starting scaffolding to help Gopher quickly build their own applications.",
  themeConfig: {
    nav: nav(),
    sidebar: {
      '/en/quickstart/': {
        base: '/en/quickstart/',
        items: sidebarQuickstart()
      },
      '/en/upgrade/': {
        base: '/en/upgrade/',
        items: sidebarUpgrade()
      },
      '/en/foundation/': {
        base: '/en/foundation/',
        items: sidebarFoundation()
      },
      '/en/basic/': {
        base: '/en/basic/',
        items: sidebarBasic()
      },
      '/en/advanced/': {
        base: '/en/advanced/',
        items: sidebarAdvanced()
      },
      '/en/security/': {
        base: '/en/security/',
        items: sidebarSecurity()
      },
      '/en/orm/': {
        base: '/en/orm/',
        items: sidebarOrm()
      },
      '/en/testing/': {
        base: '/en/testing/',
        items: sidebarTesting()
      },
      '/en/other/': {
        base: '/en/other/',
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
    link: '/en/quickstart/installation',
    activeMatch: '/en/quickstart/'
  }, {
    text: 'Upgrade',
    link: '/en/upgrade/v1.15',
    activeMatch: '/en/upgrade/'
  }, {
    text: 'Foundation',
    link: '/en/foundation/lifecycle',
    activeMatch: '/en/foundation/'
  }, {
    text: 'Basic',
    link: '/en/basic/routing',
    activeMatch: '/en/basic/'
  }, {
    text: 'Advanced',
    link: '/en/advanced/artisan',
    activeMatch: '/en/advanced/'
  }, {
    text: 'Security',
    link: '/en/security/authentication',
    activeMatch: '/en/security/'
  }, {
    text: 'ORM',
    link: '/en/orm/quickstart',
    activeMatch: '/orm/'
  }, {
    text: 'Testing',
    link: '/en/testing/quickstart',
    activeMatch: '/testing/'
  }, {
    text: 'Other',
    link: '/en/other/contributing',
    activeMatch: '/other/'
  }];
}
function sidebarQuickstart(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Installation',
    link: 'installation'
  }, {
    text: "الإعدادات",
    link: 'configuration'
  }, {
    text: 'Directory Structure',
    link: 'directory-structure'
  }, {
    text: 'Compile',
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
    text: "حاوية الخدمة",
    link: 'container'
  }, {
    text: "مزودي الخدمات",
    link: 'providers'
  }, {
    text: 'Facades',
    link: 'facades'
  }];
}
function sidebarBasic(): DefaultTheme.SidebarItem[] {
  return [{
    text: "توجيه",
    link: 'routing'
  }, {
    text: 'Middlewares',
    link: 'middlewares'
  }, {
    text: "المتحكمون",
    link: 'controllers'
  }, {
    text: 'Requests',
    link: 'requests'
  }, {
    text: 'Responses',
    link: 'responses'
  }, {
    text: "المشاهدات",
    link: 'views'
  }, {
    text: "عشب",
    link: 'grpc'
  }, {
    text: "الجلسة",
    link: 'session'
  }, {
    text: "المصادقة",
    link: 'validation'
  }, {
    text: "تسجيل",
    link: 'logging'
  }];
}
function sidebarAdvanced(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Artisan',
    link: 'artisan'
  }, {
    text: "مخبئ",
    link: 'cache'
  }, {
    text: "الأحداث",
    link: 'events'
  }, {
    text: "تخزين الملفات",
    link: 'fs'
  }, {
    text: "البريد",
    link: 'mail'
  }, {
    text: "طوابير",
    link: 'queues'
  }, {
    text: "جدولة المهمة",
    link: 'schedule'
  }, {
    text: "التعريب",
    link: 'localization'
  }, {
    text: "تطوير الحزمة",
    link: 'package'
  }, {
    text: 'Color Output',
    link: 'color'
  }, {
    text: "المقاطع",
    link: 'strings'
  }, {
    text: 'Helpers',
    link: 'helpers'
  }];
}
function sidebarSecurity(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Authentication',
    link: 'authentication'
  }, {
    text: 'Authorization',
    link: 'authorization'
  }, {
    text: 'Encryption',
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
    text: 'Relationships',
    link: 'relationships'
  }, {
    text: "الهجرات",
    link: 'migrations'
  }, {
    text: 'Seeding',
    link: 'seeding'
  }, {
    text: 'Factories',
    link: 'factories'
  }];
}
function sidebarTesting(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Quickstart',
    link: 'quickstart'
  }, {
    text: 'HTTP Tests',
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
    text: 'Privacy Policy',
    link: 'privacy'
  }];
}