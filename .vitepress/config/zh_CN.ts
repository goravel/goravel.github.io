import { defineConfig, type DefaultTheme } from 'vitepress';
export const config = defineConfig({
  lang: "zh-CN",
  description: "Goravel 是一个功能完整且可扩展性极强的 Web 应用程序框架。作为一个起始脚手架，帮助 Gopher 快速构建自己的应用程序。",
  themeConfig: {
    nav: nav(),
    sidebar: [{
      text: "快速开始",
      base: "/zh_CN/quickstart/",
      items: sidebarQuickstart()
    }, {
      text: "升级",
      base: "/zh_CN/upgrade/",
      items: sidebarUpgrade()
    }, {
      text: "基础",
      base: "/zh_CN/foundation/",
      items: sidebarFoundation()
    }, {
      text: "基本",
      base: "/zh_CN/basic/",
      items: sidebarBasic()
    }, {
      text: "高级",
      base: "/zh_CN/advanced/",
      items: sidebarAdvanced()
    }, {
      text: "安全",
      base: "/zh_CN/security/",
      items: sidebarSecurity()
    }, {
      text: "ORM",
      base: "/zh_CN/orm/",
      items: sidebarOrm()
    }, {
      text: "测试",
      base: "/zh_CN/testing/",
      items: sidebarTesting()
    }, {
      text: "其他",
      base: "/zh_CN/other/",
      items: sidebarOther()
    }],
    editLink: {
      pattern: 'https://github.com/goravel/goravel.github.io/edit/main/:path',
      text: "在 GitHub 上编辑此页面"
    },
    footer: {
      message: "基于 MIT 许可发布",
      copyright: `版权所有 © 2021-${new Date().getFullYear()} Goravel`
    },
    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },
    outline: {
      label: 'On this page'
    },
    langMenuLabel: 'Change language',
    returnToTopLabel: 'Return to top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Appearance',
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme',
    skipToContentLabel: 'Skip to content',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search'
              },
              modal: {
                noResultsText: 'No results for',
                resetButtonTitle: 'Clear the search query',
                footer: {
                  selectText: 'Select',
                  navigateText: 'Navigate'
                }
              }
            }
          }
        }
      }
    }
  }
});
function nav(): DefaultTheme.NavItem[] {
  return [{
    text: "快速开始",
    link: "/zh_CN/quickstart/installation",
    activeMatch: "/zh_CN/quickstart/"
  }, {
    text: "升级",
    link: "/zh_CN/upgrade/v1.15",
    activeMatch: "/zh_CN/upgrade/"
  }, {
    text: "基本",
    link: "/zh_CN/basic/routing",
    activeMatch: "/zh_CN/basic/"
  }, {
    text: "高级",
    link: "/zh_CN/advanced/artisan",
    activeMatch: "/zh_CN/advanced/"
  }, {
    text: 'ORM',
    link: "/zh_CN/orm/getting-started",
    activeMatch: "/zh_CN/orm/"
  }, {
    text: "其他",
    link: "/zh_CN/other/contributing",
    activeMatch: "/zh_CN/other/"
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
    text: "从 v1.15 升级",
    link: 'v1.15'
  }, {
    text: "从 v1.14 升级",
    link: 'v1.14'
  }, {
    text: "历史",
    link: 'history'
  }];
}
function sidebarFoundation(): DefaultTheme.SidebarItem[] {
  return [{
    text: "生命周期",
    link: 'lifecycle'
  }, {
    text: "服务容器",
    link: 'container'
  }, {
    text: "服务提供者",
    link: 'providers'
  }, {
    text: "门面",
    link: 'facades'
  }];
}
function sidebarBasic(): DefaultTheme.SidebarItem[] {
  return [{
    text: "路由",
    link: 'routing'
  }, {
    text: "中间件",
    link: 'middlewares'
  }, {
    text: "控制器",
    link: 'controllers'
  }, {
    text: "请求",
    link: 'requests'
  }, {
    text: "响应",
    link: 'responses'
  }, {
    text: "视图",
    link: "视图"
  }, {
    text: 'Grpc',
    link: 'grpc'
  }, {
    text: "会话",
    link: 'session'
  }, {
    text: "验证",
    link: 'validation'
  }, {
    text: "日志",
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
    text: "任务调度",
    link: 'schedule'
  }, {
    text: "本地化",
    link: 'localization'
  }, {
    text: "包开发",
    link: 'package'
  }, {
    text: "彩色输出",
    link: 'color'
  }, {
    text: "字符串",
    link: 'strings'
  }, {
    text: "辅助函数",
    link: 'helpers'
  }];
}
function sidebarSecurity(): DefaultTheme.SidebarItem[] {
  return [{
    text: "身份验证",
    link: 'authentication'
  }, {
    text: "授权",
    link: 'authorization'
  }, {
    text: "加密",
    link: 'encryption'
  }, {
    text: "哈希",
    link: 'hashing'
  }];
}
function sidebarOrm(): DefaultTheme.SidebarItem[] {
  return [{
    text: "开始使用",
    link: 'getting-started'
  }, {
    text: "关系",
    link: 'relationships'
  }, {
    text: "迁移",
    link: 'migrations'
  }, {
    text: "填充",
    link: 'seeding'
  }, {
    text: "工厂",
    link: 'factories'
  }];
}
function sidebarTesting(): DefaultTheme.SidebarItem[] {
  return [{
    text: "开始使用",
    link: 'getting-started'
  }, {
    text: "HTTP 测试",
    link: 'http'
  }, {
    text: "模拟",
    link: 'mocks'
  }];
}
function sidebarOther(): DefaultTheme.SidebarItem[] {
  return [{
    text: "贡献",
    link: 'contributing'
  }, {
    text: "优秀拓展包",
    link: 'packages'
  }, {
    text: "隐私政策",
    link: 'privacy'
  }];
}