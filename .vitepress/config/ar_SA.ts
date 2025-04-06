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
    text: "اختبار",
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
    text: "تثبيت",
    link: 'installation'
  }, {
    text: "الإعدادات",
    link: 'configuration'
  }, {
    text: "هيكل الدليل",
    link: 'directory-structure'
  }, {
    text: "تجميع",
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
    text: "واجهات",
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
    text: "المساعدات",
    link: 'helpers'
  }];
}
function sidebarSecurity(): DefaultTheme.SidebarItem[] {
  return [{
    text: "المصادقة",
    link: 'authentication'
  }, {
    text: "التصريح",
    link: 'authorization'
  }, {
    text: "التشفير",
    link: 'encryption'
  }, {
    text: "التجزئة",
    link: 'hashing'
  }];
}
function sidebarOrm(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Quickstart',
    link: 'quickstart'
  }, {
    text: "العلاقات",
    link: 'relationships'
  }, {
    text: "الهجرات",
    link: 'migrations'
  }, {
    text: "البذور",
    link: 'seeding'
  }, {
    text: "المصانع",
    link: 'factories'
  }];
}
function sidebarTesting(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Quickstart',
    link: 'quickstart'
  }, {
    text: "اختبارات HTTP",
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
    text: "سياسة الخصوصية",
    link: 'privacy'
  }];
}