import { ElementType } from 'react'
import { InertiaLinkProps } from '@inertiajs/react'

interface User {
    name: string
    email: string
    avatar: string
}

interface Team {
    name: string
    logo: ElementType
    plan: string
}

interface BaseNavItem {
    title: string
    badge?: string
    icon?: ElementType
}

type NavLink = BaseNavItem & {
    url: InertiaLinkProps['href']
    items?: never
}

type NavCollapsible = BaseNavItem & {
    items: (BaseNavItem & { url: InertiaLinkProps['href'] })[]
    url?: never
}

type NavItem = NavLink | NavCollapsible

interface NavGroup {
    title: string
    items: NavItem[]
}

interface SidebarData {
    user: User
    teams: Team[]
    navGroups: NavGroup[]
}

export type {
    SidebarData,
    NavGroup,
    NavItem,
    NavLink,
    NavCollapsible,
    User,
    Team,
}
