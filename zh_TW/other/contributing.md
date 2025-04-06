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

# Contribution Guide

Goravel welcomes rich and diverse contributions from different talents, such as coding, translations, articles,
tutorials, etc. After completing two features(5 `Good First Issue` == 1 `Feature`), you will be recognized as a core
contributor. By completing one feature every three months, you can maintain this status.

Let's make Goravel more efficient together!

## Reward

- Core developers will be eligible for benefits when Goravel benefits in the future.
- After completing a `Feature`, you will receive an official Goravel T-Shirt, with a maximum of 1 per major version
  release cycle. (PS: Because of the difference of country, you may need to help us to find a suitable supplier.)

<p align="left"><img src="/t-shirt.jpg" width="500"></p>

## Core Developers

<VPTeamMembers size="small" :members="core_developers" />

## Contributors

<a href="https://github.com/goravel/framework/graphs/contributors">
  <img alt="contributors" src="https://contrib.rocks/image?repo=goravel/framework"/>
</a>

## Bug Feedback

You can report Bug
Feedback here,
please search Issue List for similar questions before
submitting. The report should contain a title and a clear description of the problem, as much relevant information as
possible, and a code sample that demonstrates the problem. The goal of Bug Feedback is to make it easy for yourself and
other persons to reproduce the Bug and develop fixes. Goravel encourages committers to create a PR for the Bug repair at
the same time, making the open-source project more actively developed.

## Support Questions

Goravel's GitHub issue trackers are not intended to provide Goravel help or support. Instead, use one of the following
channels:

- [GitHub Discussions](https://github.com/goravel/goravel/discussions)
- [Telegram](https://github.com/goravel/goravel/tree/master#group)
- [WeChat](https://github.com/goravel/goravel/blob/master/README_zh.md#%E7%BE%A4%E7%BB%84)

## Development Discussion

You may propose new features or improvements to existing Goravel behavior in the Goravel framework
repository's [GitHub discussion board](https://github.com/goravel/goravel/discussions). Informal discussion regarding
bugs, new features, and implementation of existing features takes place in Telegram or WeChat. Bowen, the maintainer of
Goravel, is typically present in the group on weekdays from 9am-6pm (UTC+08:00), and sporadically present in the group
at other times.

## Contribution

### Find/Create Issue

You can find or create an issue in [Issue List](https://github.com/goravel/goravel/issues), leave a message to express
your willingness to deal with the issue, once confirmed by the repository maintainer, the process can be started.

### Create PR

- You can check out [this article](https://docs.github.com/en/get-started/quickstart/contributing-to-projects) if you
  are new to the process;
- During the development process, if you encounter a problem, you can describe the problem in detail in issue at any
  time for future communication, but before that, please make sure that you have tried to solve the problem through
  Google and other methods as much as possible;
- Before creating a PR, please improve the unit test coverage as much as possible to provide more stable functions;
- If you modify any file under the `contracts` folder, please run the `go run github.com/vektra/mockery/v2` command in
  the root directory to generate the mock file;
- When the PR is developed, please add the `Review Ready`, the maintainer will review it in a timely manner.
- After the PR is merged, the issue will be closed automatically if the description in the PR is set correctly;
- Goravel greatly appreciates your contribution and will add you to the home contribution list at the next release; ❤️

## Which Branch?

**All** bug fixes should be sent to the latest version that supports bug fixes, unless they fix features that exist only
in the upcoming release.

**New features** or features with breaking changes should always be sent to the `master` branch.

## Local Environment

| Software                                            | Action                             |
| --------------------------------------------------- | ---------------------------------- |
| Golang v1.22                        | The minimum version                |
| [vektra/mockery](https://github.com/vektra/mockery) | Provider mock files for unit tests |

## Goravel Repository

| Repository                                                            | Action                                                                                                                                                     |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [goravel/goravel](https://github.com/goravel/goravel)                 | Goravel artisans                                                                                                                                           |
| [goravel/framework](https://github.com/goravel/framework)             | Goravel main repository                                                                                                                                    |
| [goravel/example](https://github.com/goravel/example)                 | Goravel example                                                                                                                                            |
| [goravel/example-client](https://github.com/goravel/example-client)   | Example for Grpc client                                                                                                                                    |
| [goravel/example-proto](https://github.com/goravel/example-proto)     | The proto dependency of example                                                                                                                            |
| [goravel/example-package](https://github.com/goravel/example-package) | Example for package                                                                                                                                        |
| [goravel/docs](https://github.com/goravel/docs)                       | Document                                                                                                                                                   |
| [goravel/docs-web](https://github.com/goravel/docs-web)               | Goravel Website                                                                                                                                            |
| [goravel/s3](https://github.com/goravel/s3)                           | The S3 driver of Storage module                                                                                                                            |
| [goravel/oss](https://github.com/goravel/oss)                         | The OSS driver of Storage module                                                                                                                           |
| [goravel/cos](https://github.com/goravel/cos)                         | The COS driver of Storage module                                                                                                                           |
| [goravel/minio](https://github.com/goravel/minio)                     | The Minio driver of Storage module                                                                                                                         |
| [goravel/cloudinary](https://github.com/goravel/cloudinary)           | The Cloudinary driver of Storage module                                                                                                                    |
| [goravel/redis](https://github.com/goravel/redis)                     | The Redis driver of Cache module                                                                                                                           |
| [goravel/gin](https://github.com/goravel/gin)                         | The Gin driver of Route module                                                                                                                             |
| [goravel/fiber](https://github.com/goravel/fiber)                     | The Fiber driver of Route module                                                                                                                           |
| [goravel/file-rotatelogs](https://github.com/goravel/file-rotatelogs) | Providers log splitting functionality for Log module                                                                                                       |
| [goravel/.github](https://github.com/goravel/.github) | [Community health file](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file) |

## Code of Conduct

The Goravel code of conduct is derived from the Laravel code of conduct. Any violations of the code of conduct may be
reported to Bowen.

- Participants will be tolerant of opposing views.
- Participants must ensure that their language and actions are free of personal attacks and disparaging personal
  remarks.
- When interpreting the words and actions of others, participants should always assume good intentions.
- Behavior that can be reasonably considered harassment will not be tolerated.
