import {groupIconMdPlugin, groupIconVitePlugin} from 'vitepress-plugin-group-icons'
import {createFileSystemTypesCache} from '@shikijs/vitepress-twoslash/cache-fs'
import {transformerTwoslash} from '@shikijs/vitepress-twoslash'
import timeline from "vitepress-markdown-timeline";
import {defineConfig} from "vitepress";

import {enSearch, zh_CNSearch, zh_TWSearch} from './search'

export const shared = defineConfig({
    title: 'Goravel',

    rewrites: {
        'en/:rest*': ':rest*'
    },

    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,

    head: [
        [
            "script",
            {
                crossorigin: "anonymous",
                async: "true",
                src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4978322804450032",
            },
        ],
        [
            "script",
            {
                async: "true",
                src: "https://www.googletagmanager.com/gtag/js?id=G-HJQNEG5H69",
            },
        ],
        [
            "script",
            {},
            "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-HJQNEG5H69');",
        ],
    ],

    markdown: {
        codeTransformers: [
            transformerTwoslash({
                typesCache: createFileSystemTypesCache()
            })
        ],
        config(md) {
            md.use(groupIconMdPlugin);
            md.use(timeline);
        },
        languages: ['go']
    },

    themeConfig: {
        logo: '/logo.png',
        siteTitle: false,
        socialLinks: [
            {icon: 'github', link: 'https://github.com/goravel/goravel'},
            {icon: 'discord', link: 'https://discord.gg/cFc5csczzS'},
        ],
        search: {
            provider: 'local',
            options: {
                locales: {
                    ...enSearch,
                    ...zh_CNSearch,
                    ...zh_TWSearch
                }
            }
        }
    },

    vite: {
        plugins: [
            groupIconVitePlugin()
        ],
    },
})