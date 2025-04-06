import type {DefaultTheme} from "vitepress";

export const enSearch: DefaultTheme.LocalSearchOptions['locales'] = {
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
                    navigateText: 'Navigate',
                }
            }
        }
    }
}

export const zh_CNSearch: DefaultTheme.LocalSearchOptions['locales'] = {
    zh_CN: {
        translations: {
            button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
            },
            modal: {
                noResultsText: '没有找到相关结果：',
                resetButtonTitle: '清除搜索条件',
                footer: {
                    selectText: '选择',
                    navigateText: '切换',
                }
            }
        }
    }
}

export const zh_TWSearch: DefaultTheme.LocalSearchOptions['locales'] = {
    zh_TW: {
        translations: {
            button: {
                buttonText: '搜尋',
                buttonAriaLabel: '搜尋'
            },
            modal: {
                noResultsText: '沒有找到相關結果：',
                resetButtonTitle: '清除搜尋條件',
                footer: {
                    selectText: '選擇',
                    navigateText: '切換',
                }
            }
        }
    }
}