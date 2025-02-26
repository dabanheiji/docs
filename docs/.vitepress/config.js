/*
 * @Description: 头部注释
 */
export default {
    title: 'Hello',
    description: 'description',
    base: '/docs/',
    cleanUrls: true,
    assetsDir: 'static',
    ignoreDeadLinks: true,
    themeConfig: {
        siteTitle: '瓜娃子的秘密花园',
        search: {
            provider: 'local'
        },      
        nav: [
            { text: '笔记', link: '/skill/index' }
        ],
        sidebar: {
            '/skill/': [
                {
                    text: '前端',
                    collapsed: true,
                    items: [
                        { 
                            text: 'CSS',
                            collapsed: true,
                            items: [
                                { text: 'zIndex', link: '/skill/css/zIndex/index' }
                            ]
                        },
                        { text: 'JavaScript', link: '/skill/javascript/index' },
                        { 
                            text: 'React',  
                            collapsed: true,
                            items: [
                                {
                                    text: 'ahooks',
                                    collapsed: true,
                                    items: [
                                        { text: 'useRequest', link: '/skill/react/ahooks/use-request' },
                                        { text: 'usePagination', link: '/skill/react/ahooks/use-pagination' },
                                        { text: 'useAntdTable', link: '/skill/react/ahooks/use-antd-table' },
                                        { text: 'useMemoizedFn', link: '/skill/react/ahooks/use-memoized-fn' },
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    srcDir:  "./"
}