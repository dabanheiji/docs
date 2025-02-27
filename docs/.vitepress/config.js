/*
 * @Description: 头部注释
 */
export default {
    title: '瓜娃子的秘密花园',
    description: 'description',
    base: '/docs/',
    cleanUrls: true,
    assetsDir: 'static',
    ignoreDeadLinks: true,
    themeConfig: {
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
                    // collapsed: false,
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
                },
                {
                    text: '算法',
                    // collapsed: false,
                    items: [
                        {
                            text: '单调栈',
                            link: '/skill/algorithm/monotonic-stack/index',
                            collapsed: true,
                            items: [
                                { text: '下一个更大元素I', link: '/skill/algorithm/monotonic-stack/question496' },
                                { text: '下一个更大元素II', link: '/skill/algorithm/monotonic-stack/question503' },
                                { text: '柱状图中的最大矩形', link: '/skill/algorithm/monotonic-stack/question84' },
                                { text: '最大矩形', link: '/skill/algorithm/monotonic-stack/question85' },
                                { text: '接雨水', link: '/skill/algorithm/monotonic-stack/question42' },
                            ]
                        },
                        {
                            text: '双指针',
                            link: '/skill/algorithm/double-pointer/index',
                            collapsed: true,
                            items: [
                                { text: '两数之和', link: '/skill/algorithm/double-pointer/question1' },
                                { text: '盛最多水的容器', link: '/skill/algorithm/double-pointer/question11' },
                                { text: '三数之和', link: '/skill/algorithm/double-pointer/question15' },
                                { text: '验证回文字符串', link: '/skill/algorithm/double-pointer/question125' },
                                { text: '长度最小的子数组', link: '/skill/algorithm/double-pointer/question209' },
                                { text: '移动零', link: '/skill/algorithm/double-pointer/question283' },
                                { text: '反转字符串', link: '/skill/algorithm/double-pointer/question344' },
                                { text: '找到字符串中所有字母异位词', link: '/skill/algorithm/double-pointer/question438' },
                                { text: '链表的中间节点', link: '/skill/algorithm/double-pointer/question876' },
                            ]
                        },
                        {
                            text: '二分查找',
                            link: '/skill/algorithm/binary-search/index',
                            collapsed: true,
                            items: [
                                { text: '二分查找', link: '/skill/algorithm/binary-search/question704' },
                                { text: '猜数字大小', link: '/skill/algorithm/binary-search/question374' },
                                { text: '第一个错误的版本', link: '/skill/algorithm/binary-search/question278' },
                                { text: '寻找旋转排序数组中的最小值', link: '/skill/algorithm/binary-search/question153' },
                            ]
                        },
                        {
                            text: '动态规划',
                            link: '/skill/algorithm/dynamic-programming/index',
                            collapsed: true,
                            items: [
                                { text: '爬楼梯', link: '/skill/algorithm/dynamic-programming/question70' },
                                { text: '打家劫舍', link: '/skill/algorithm/dynamic-programming/question198' },
                                { text: '打家劫舍2', link: '/skill/algorithm/dynamic-programming/question213' },
                            ]
                        },
                        {
                            text: '二叉树',
                            link: '/skill/algorithm/binary-tree/index',
                            collapsed: true,
                            items: [
                                { text: '二叉树的前序遍历', link: '/skill/algorithm/binary-tree/left' },
                                { text: '二叉树的中序遍历', link: '/skill/algorithm/binary-tree/center' },
                                { text: '二叉树的后序遍历', link: '/skill/algorithm/binary-tree/right' },
                            ]
                        }
                    ]
                }
            ]
        }
    },
    srcDir:  "./"
}