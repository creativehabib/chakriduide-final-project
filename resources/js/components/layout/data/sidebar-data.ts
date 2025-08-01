import {
    IconBarrierBlock,
    IconBrowserCheck,
    IconBug,
    IconError404, IconFileText, IconFolder,
    IconHelp,
    IconLayoutDashboard,
    IconLock,
    IconMessages, IconNews,
    IconNotification,
    IconPackages,
    IconPalette,
    IconServerOff,
    IconSettings,
    IconTags,
    IconTool,
    IconUserCog,
    IconUserOff,
    IconUsers
} from '@tabler/icons-react';
import { AudioWaveform, Command, GalleryVerticalEnd, Camera, LucideShieldQuestion } from 'lucide-react';
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
    user: {
        name: 'satnaing',
        email: 'satnaingdev@gmail.com',
        avatar: '/avatars/shadcn.jpg',
    },
    teams: [
        {
            name: 'Shadcn Admin',
            logo: Command,
            plan: 'Vite + ShadcnUI',
        },
        {
            name: 'Acme Inc',
            logo: GalleryVerticalEnd,
            plan: 'Enterprise',
        },
        {
            name: 'Acme Corp.',
            logo: AudioWaveform,
            plan: 'Startup',
        },
    ],
    navGroups: [
        {
            title: 'General',
            items: [
                {
                    title: 'Dashboard',
                    url: '/dashboard',
                    icon: IconLayoutDashboard,
                },
                {
                    title: 'Blog',
                    icon: IconNews,
                    items: [
                        {
                            title: 'Posts',
                            url: '/blog/posts',
                            icon: IconFileText,
                        },
                        {
                            title: 'Categories',
                            url: '/blog/categories',
                            icon: IconFolder,
                        },
                        {
                            title: 'Tags',
                            url: '/blog/tags',
                            icon: IconTags,
                        }
                    ],
                },
                {
                    title: 'Quiz',
                    url: '/quiz',
                    icon: LucideShieldQuestion,
                },
                {
                    title: 'Apps',
                    url: '/apps',
                    icon: IconPackages,
                },
                {
                    title: 'Chats',
                    url: '/chats',
                    badge: '3',
                    icon: IconMessages,
                },
                {
                    title: 'Users',
                    url: '/users',
                    icon: IconUsers,
                },
                {
                    title: 'Media',
                    url: '/get-media',
                    icon: Camera,
                },
            ],
        },
        {
            title: 'Pages',
            items: [
                {
                    title: 'Errors',
                    icon: IconBug,
                    items: [
                        {
                            title: 'Unauthorized',
                            url: '/401',
                            icon: IconLock,
                        },
                        {
                            title: 'Forbidden',
                            url: '/403',
                            icon: IconUserOff,
                        },
                        {
                            title: 'Not Found',
                            url: '/404',
                            icon: IconError404,
                        },
                        {
                            title: 'Internal Server Error',
                            url: '/500',
                            icon: IconServerOff,
                        },
                        {
                            title: 'Maintenance Error',
                            url: '/503',
                            icon: IconBarrierBlock,
                        },
                    ],
                },
            ],
        },
        {
            title: 'Other',
            items: [
                {
                    title: 'Settings',
                    icon: IconSettings,
                    items: [
                        {
                            title: 'General',
                            url: '/settings/general',
                            icon: IconSettings,
                        },
                        {
                            title: 'Profile',
                            url: '/settings/profile',
                            icon: IconUserCog,
                        },
                        {
                            title: 'Account',
                            url: '/settings/account',
                            icon: IconTool,
                        },
                        {
                            title: 'Appearance',
                            url: '/settings/appearance',
                            icon: IconPalette,
                        },
                        {
                            title: 'Cronjob',
                            url: '/settings/cronjob',
                            icon: IconNotification,
                        },
                        {
                            title: 'Display',
                            url: '/settings/display',
                            icon: IconBrowserCheck,
                        },
                    ],
                },
                {
                    title: 'Visit Website',
                    url: '/',
                    icon: IconHelp,
                },
            ],
        },
    ],
}
