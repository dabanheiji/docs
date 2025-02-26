/*
 * @Description: 头部注释
 */
export default {
    title: 'Hello',
    description: 'description',
    base: '/docs/',
    cleanUrls: true,
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
                    text: 'CSS',
                    items: [
                        { text: 'zIndex', link: '/skill/css/zIndex/index' }
                    ]
                },
                { text: 'JavaScript', link: '/skill/javascript/index' },
            ]
        }
    },
    srcDir:  "./"
}