<script setup>
import { VPTeamMembers } from 'vitepress/theme';

const core_developers = [
  {
    avatar: 'https://github.com/hwbrzzl.png',
    name: 'Wenbo Han',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/hwbrzzl' }
    ]
  },
  {
    avatar: 'https://github.com/devhaozi.png',
    name: '耗子',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/DevHaoZi' }
    ]
  },
  {
    avatar: 'https://github.com/kkumar-gcc.png',
    name: 'krishan kumar',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/kkumar-gcc' }
    ]
  },
  {
    avatar: 'https://github.com/almas1992.png',
    name: 'ALMAS',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/almas1992' }
    ]
  }
];
</script>

# 贡献指南

Goravel欢迎来自不同才能的丰富多样的贡献，如编码、翻译、文章、教程等。 完成两个功能（5个`Good First Issue`等于1个`Feature`）后，您将被认可为核心贡献者。 每三个月完成一个功能，您就可以保持这个状态。

让我们一起让Goravel更高效！

## 奖励

- 当Goravel在未来获得收益时，核心开发者将有资格获得福利。
- 完成一个`Feature`后，您将收到一件官方Goravel T恤，每个主要版本发布周期最多1件。 （注：由于国家差异，您可能需要帮助我们找到合适的供应商。）

<p align="left"><img src="/t-shirt.jpg" width="500"></p>

## 核心开发者

<VPTeamMembers size="small" :members="core_developers" />

## 贡献者

<a href="https://github.com/goravel/framework/graphs/contributors">
  <img alt="contributors" src="https://contrib.rocks/image?repo=goravel/framework"/>
</a>

## Bug 反馈

您可以在这里报告Bug反馈，提交前请先在问题列表中搜索类似问题。 报告应包含标题和问题的清晰描述，尽可能多的相关信息，以及演示问题的代码示例。 Bug 反馈的目的是让您自己和其他人能够轻松重现 Bug 并开发修复方案。 Goravel 鼓励提交者同时为 Bug 修复创建 PR，使开源项目得到更积极的开发。

## 支持问题

Goravel的GitHub问题跟踪器不是用来提供Goravel帮助或支持的。 相反，请使用以下渠道之一：

- [GitHub讨论](https://github.com/goravel/goravel/discussions)
- [Telegram](https://github.com/goravel/goravel/tree/master#group)
- [微信](https://github.com/goravel/goravel/blob/master/README_zh.md#%E7%BE%A4%E7%BB%84)

## 开发讨论

您可以在Goravel框架仓库的[GitHub讨论板](https://github.com/goravel/goravel/discussions)上提出新功能或对现有Goravel行为的改进建议。 关于错误、新功能和现有功能实现的非正式讨论在 Telegram 或微信群中进行。 Goravel 的维护者 Bowen 通常在工作日上午9:00至下午18:00（UTC+08:00）出现在群里，在其他时间偶尔出现在群里。

## 贡献

### 查找/创建问题

您可以在[问题列表](https://github.com/goravel/goravel/issues)中查找或创建问题，留言表达您处理该问题的意愿，一旦得到仓库维护者的确认，就可以开始处理了。

### 创建 PR

- 如果你对这个过程不熟悉，可以查看[这篇文章](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)；
- 在开发过程中，如果遇到问题，可以随时在 issue 中详细描述问题以便未来沟通，但在此之前，请确保你已尽可能通过 Google 等方法尝试解决问题；
- 创建 PR 前，请尽可能提高单元测试覆盖率，以提供更稳定的功能；
- 如果你修改了 `contracts` 文件夹下的任何文件，请在根目录运行 `go run github.com/vektra/mockery/v2` 命令生成 mock 文件；
- 当 PR 开发完成后，请添加 `Review Ready`，维护者将及时进行审核。
- PR 合并后，如果 PR 描述设置正确，相关 issue 将自动关闭；
- Goravel 非常感谢您的贡献，并将在下一个版本中将您添加到主页贡献列表中；❤️

## 哪个分支？

**所有**错误修复都应发送到支持错误修复的最新版本，除非它们修复了仅存在于即将发布的版本中的功能。

**新功能**或具有破坏性变更的功能应始终发送到 `master` 分支。

## 本地环境

| 软件                                                  | 操作          |
| --------------------------------------------------- | ----------- |
| Golang v1.20                        | 最低版本        |
| [vektra/mockery](https://github.com/vektra/mockery) | 为单元测试提供模拟文件 |

## Goravel 仓库

| 仓库                                                                    | 操作                                                                                                                                          |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [goravel/goravel](https://github.com/goravel/goravel)                 | Goravel 工匠                                                                                                                                  |
| [goravel/framework](https://github.com/goravel/framework)             | Goravel 主仓库                                                                                                                                 |
| [goravel/example](https://github.com/goravel/example)                 | Goravel 示例                                                                                                                                  |
| [goravel/example-client](https://github.com/goravel/example-client)   | Grpc 客户端示例                                                                                                                                  |
| [goravel/example-proto](https://github.com/goravel/example-proto)     | 示例的proto依赖                                                                                                                                  |
| [goravel/example-package](https://github.com/goravel/example-package) | 包的示例                                                                                                                                        |
| [goravel/docs](https://github.com/goravel/docs)                       | 文档                                                                                                                                          |
| [goravel/docs-web](https://github.com/goravel/docs-web)               | Goravel网站                                                                                                                                   |
| [goravel/s3](https://github.com/goravel/s3)                           | 存储模块的S3驱动                                                                                                                                   |
| [goravel/oss](https://github.com/goravel/oss)                         | 存储模块的OSS驱动                                                                                                                                  |
| [goravel/cos](https://github.com/goravel/cos)                         | 存储模块的COS驱动                                                                                                                                  |
| [goravel/minio](https://github.com/goravel/minio)                     | 存储模块的Minio驱动                                                                                                                                |
| [goravel/cloudinary](https://github.com/goravel/cloudinary)           | 存储模块的Cloudinary驱动                                                                                                                           |
| [goravel/redis](https://github.com/goravel/redis)                     | 缓存模块的Redis驱动                                                                                                                                |
| [goravel/gin](https://github.com/goravel/gin)                         | Route模块的Gin驱动                                                                                                                               |
| [goravel/fiber](https://github.com/goravel/fiber)                     | Route模块的Fiber驱动                                                                                                                             |
| [goravel/file-rotatelogs](https://github.com/goravel/file-rotatelogs) | 为Log模块提供日志分割功能                                                                                                                              |
| [goravel/.github](https://github.com/goravel/.github) | [社区健康文件](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file) |

## 行为准则

Goravel的行为准则源自Laravel的行为准则。 任何违反行为准则的行为都可以向Bowen报告。

- 参与者将容忍不同的观点。
- 参与者必须确保他们的语言和行为不包含人身攻击和贬低性的个人评论。
- 在解释他人的言行时，参与者应始终假定对方有良好的意图。
- 合理认为是骚扰的行为将不被容忍。
