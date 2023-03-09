import { IoSearchCircle } from 'react-icons/io5'
import { IoMdBookmark } from 'react-icons/io'
import { AiFillQuestionCircle, AiFillRead } from 'react-icons/ai'
import type { INavBarItem } from './interfaces'

export const navbar_items: INavBarItem[] = [
    {
        label: 'Hub',
        icon: IoMdBookmark,
        path: 'hub',
    },
    {
        label: '群聊查找',
        icon: IoSearchCircle,
        path: 'dashboard',
        submenu: [
            {
                label: 'Spring 2023 课群',
                value: 'UCB Sp23',
                path: '/dashboard',
            },
            {
                label: '专业群',
                value: 'UCB Mj01',
                path: '/dashboard/majors',
            },
            {
                label: 'Cal Life',
                value: 'UCB Lf01',
                path: '/dashboard/life',
            },
        ],
    },
    {
        label: '学术资源',
        icon: AiFillRead,
        path: 'resources',
    },
    {
        label: 'FAQ & 帮助',
        icon: AiFillQuestionCircle,
        path: 'faq',
    },
]
