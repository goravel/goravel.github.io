import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { createFileSystemTypesCache } from '@shikijs/vitepress-twoslash/cache-fs'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import timeline from "vitepress-markdown-timeline";
import {defineConfig} from "vitepress";

export const shared = defineConfig({
    title: 'Goravel',

    /*rewrites: {
        'en/:rest*': ':rest*'
    },*/

    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,

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
        socialLinks: [
            {icon: 'github', link: 'https://github.com/goravel/goravel'},
            {icon: 'discord', link: 'https://discord.gg/cFc5csczzS'},
        ],
    },

    vite: {
        plugins: [
            groupIconVitePlugin()
        ],
    },
})