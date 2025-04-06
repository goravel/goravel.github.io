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
    text: "测试",
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
    text: "安装",
    link: 'installation'
  }, {
    text: "配置",
    link: 'configuration'
  }, {
    text: "目录结构",
    link: 'directory-structure'
  }, {
    text: "编译",
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
    text: "服务容器",
    link: 'container'
  }, {
    text: "服务商",
    link: 'providers'
  }, {
    text: "面具",
    link: 'facades'
  }];
}
function sidebarBasic(): DefaultTheme.SidebarItem[] {
  return [{
    text: "路由",
    link: 'routing'
  }, {
    text: 'Middlewares',
    link: 'middlewares'
  }, {
    text: "控制器",
    link: 'controllers'
  }, {
    text: 'Requests',
    link: 'requests'
  }, {
    text: 'Responses',
    link: 'responses'
  }, {
    text: "视图",
    link: 'views'
  }, {
    text: "格尔普克",
    link: 'grpc'
  }, {
    text: "会议",
    link: 'session'
  }, {
    text: "验证",
    link: 'validation'
  }, {
    text: "日志记录",
    link: 'logging'
  }];
}
function sidebarAdvanced(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Artisan',
    link: 'artisan'
  }, {
    text: "缓存",
    link: 'cache'
  }, {
    text: "事件",
    link: 'events'
  }, {
    text: "文件存储",
    link: 'fs'
  }, {
    text: "邮件",
    link: 'mail'
  }, {
    text: "队列",
    link: 'queues'
  }, {
    text: "任务计划",
    link: 'schedule'
  }, {
    text: "本地化",
    link: 'localization'
  }, {
    text: "软件包开发",
    link: 'package'
  }, {
    text: 'Color Output',
    link: 'color'
  }, {
    text: "字符串",
    link: 'strings'
  }, {
    text: 'Helpers',
    link: 'helpers'
  }];
}
function sidebarSecurity(): DefaultTheme.SidebarItem[] {
  return [{
    text: "认证",
    link: 'authentication'
  }, {
    text: "授权",
    link: 'authorization'
  }, {
    text: "加密",
    link: 'encryption'
  }, {
    text: "正在散列",
    link: 'hashing'
  }];
}
function sidebarOrm(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Quickstart',
    link: 'quickstart'
  }, {
    text: "关系",
    link: 'relationships'
  }, {
    text: "迁移",
    link: 'migrations'
  }, {
    text: 'Seeding',
    link: 'seeding'
  }, {
    text: "因子",
    link: 'factories'
  }];
}
function sidebarTesting(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Quickstart',
    link: 'quickstart'
  }, {
    text: "HTTP 测试",
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
    text: "隐私政策",
    link: 'privacy'
  }];
}