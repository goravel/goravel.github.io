import { defineConfig, type DefaultTheme } from 'vitepress';
export const config = defineConfig({
  lang: "zh-CN",
  description: "Goravel 是一个功能完整且可扩展性极强的 Web 应用程序框架。作为一个起始脚手架，帮助 Gopher 快速构建自己的应用程序。",
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
      text: "在 GitHub 上编辑此页面"
    },
    footer: {
      message: "基于 MIT 许可发布",
      copyright: `版权所有 © 2021-${new Date().getFullYear()} Goravel`
    }
  }
});
function nav(): DefaultTheme.NavItem[] {
  return [{
    text: "快速开始",
    link: '/quickstart/installation',
    activeMatch: '/quickstart/'
  }, {
    text: "升级",
    link: '/upgrade/v1.15',
    activeMatch: '/upgrade/'
  }, {
    text: "基础",
    link: '/foundation/lifecycle',
    activeMatch: '/foundation/'
  }, {
    text: "基本",
    link: '/basic/routing',
    activeMatch: '/basic/'
  }, {
    text: "高级",
    link: '/advanced/artisan',
    activeMatch: '/advanced/'
  }, {
    text: "安全",
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
    text: "其他",
    link: '/other/contributing',
    activeMatch: '/other/'
  }];
}
function sidebarQuickstart(): DefaultTheme.SidebarItem[] {
  return [{
    text: "安装",
    link: "安装"
  }, {
    text: "配置",
    link: "配置"
  }, {
    text: "目录结构",
    link: "目录结构"
  }, {
    text: "编译",
    link: "编译"
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
    link: "历史"
  }];
}
function sidebarFoundation(): DefaultTheme.SidebarItem[] {
  return [{
    text: "生命周期",
    link: "生命周期"
  }, {
    text: "服务容器",
    link: "容器"
  }, {
    text: "服务提供者",
    link: "服务提供者"
  }, {
    text: "门面",
    link: "门面"
  }];
}
function sidebarBasic(): DefaultTheme.SidebarItem[] {
  return [{
    text: "路由",
    link: "路由"
  }, {
    text: "中间件",
    link: "中间件"
  }, {
    text: "控制器",
    link: "控制器"
  }, {
    text: "请求",
    link: "请求"
  }, {
    text: "响应",
    link: "响应"
  }, {
    text: "视图",
    link: "视图"
  }, {
    text: 'Grpc',
    link: 'grpc'
  }, {
    text: "会话",
    link: "会话"
  }, {
    text: "验证",
    link: "验证"
  }, {
    text: "日志",
    link: "日志"
  }];
}
function sidebarAdvanced(): DefaultTheme.SidebarItem[] {
  return [{
    text: 'Artisan',
    link: 'artisan'
  }, {
    text: "缓存",
    link: "缓存"
  }, {
    text: "事件",
    link: "事件"
  }, {
    text: "文件存储",
    link: "文件系统"
  }, {
    text: "邮件",
    link: "邮件"
  }, {
    text: "队列",
    link: "队列"
  }, {
    text: "任务调度",
    link: "调度"
  }, {
    text: "本地化",
    link: "本地化"
  }, {
    text: "包开发",
    link: "包"
  }, {
    text: "彩色输出",
    link: "颜色"
  }, {
    text: "字符串",
    link: "字符串"
  }, {
    text: "辅助函数",
    link: "辅助函数"
  }];
}
function sidebarSecurity(): DefaultTheme.SidebarItem[] {
  return [{
    text: "身份验证",
    link: "身份验证"
  }, {
    text: "授权",
    link: "授权"
  }, {
    text: "加密",
    link: "加密"
  }, {
    text: "哈希",
    link: "哈希"
  }];
}
function sidebarOrm(): DefaultTheme.SidebarItem[] {
  return [{
    text: "快速入门",
    link: "快速入门"
  }, {
    text: "关系",
    link: "关系"
  }, {
    text: "迁移",
    link: "迁移"
  }, {
    text: "填充",
    link: "数据填充"
  }, {
    text: "工厂",
    link: "工厂"
  }];
}
function sidebarTesting(): DefaultTheme.SidebarItem[] {
  return [{
    text: "快速入门",
    link: "快速入门"
  }, {
    text: "HTTP 测试",
    link: 'http'
  }, {
    text: "模拟",
    link: "模拟"
  }];
}
function sidebarOther(): DefaultTheme.SidebarItem[] {
  return [{
    text: "贡献",
    link: "贡献"
  }, {
    text: "优秀的包",
    link: "包"
  }, {
    text: "隐私政策",
    link: "隐私"
  }];
}