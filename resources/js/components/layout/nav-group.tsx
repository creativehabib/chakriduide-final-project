import { ReactNode } from 'react'
import { Link } from '@inertiajs/react'
import { ChevronRight } from 'lucide-react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/components/ui/sidebar'
import { Badge } from '../ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { NavCollapsible, NavItem, NavLink, type NavGroup } from './types'

export function NavGroup({ title, items }: NavGroup) {
    const { state } = useSidebar()
    const currentUrl = window.location.pathname

    return (
        <SidebarGroup>
            <SidebarGroupLabel>{title}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const key = `${item.title}-${item.url}`

                    if (!item.items)
                        return <SidebarMenuLink key={key} item={item} href={currentUrl} />

                    if (state === 'collapsed')
                        return (
                            <SidebarMenuCollapsedDropdown
                                key={key}
                                item={item}
                                href={currentUrl}
                            />
                        )

                    return (
                        <SidebarMenuCollapsible
                            key={key}
                            item={item}
                            href={currentUrl}
                        />
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}

const NavBadge = ({ children }: { children: ReactNode }) => (
    <Badge className="rounded-full px-1 py-0 text-xs">{children}</Badge>
)

const SidebarMenuLink = ({ item, href }: { item: NavLink; href: string }) => {
    const { setOpenMobile } = useSidebar()

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={checkIsActive(href, item)}
                tooltip={item.title}
            >
                <Link href={item.url} onClick={() => setOpenMobile(false)}>
                    {item.icon && <item.icon size={18} />}
                    <span>{item.title}</span>
                    {item.badge && <NavBadge>{item.badge}</NavBadge>}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}
import { useEffect, useState } from 'react'
const SidebarMenuCollapsible = ({
                                    item,
                                    href,
                                }: {
    item: NavCollapsible
    href: string
}) => {
    const { setOpenMobile } = useSidebar()
    const [open, setOpen] = useState(false)

    // Sync collapsible open state with active menu state
    useEffect(() => {
        const isActive = checkIsActive(href, item, true)
        setOpen(isActive)
    }, [href, item])

    return (
        <Collapsible asChild open={open} onOpenChange={setOpen} className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} isActive={open}>
                        {item.icon && <item.icon size={18} />}
                        <span>{item.title}</span>
                        {item.badge && <NavBadge>{item.badge}</NavBadge>}
                        <ChevronRight
                            className={`ml-auto transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
                        />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className='CollapsibleContent'>
                    <SidebarMenuSub>
                        {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                    asChild
                                    isActive={checkIsActive(href, subItem)}
                                >
                                    <Link href={subItem.url} onClick={() => setOpenMobile(false)} className='cursor-pointer'>
                                        {subItem.icon && <subItem.icon size={18} />}
                                        <span>{subItem.title}</span>
                                        {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    )
}

const SidebarMenuCollapsedDropdown = ({
                                          item,
                                          href,
                                      }: {
    item: NavCollapsible
    href: string
}) => {
    return (
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                        tooltip={item.title}
                        isActive={checkIsActive(href, item)}
                    >
                        {item.icon && <item.icon size={18} />}
                        <span>{item.title}</span>
                        {item.badge && <NavBadge>{item.badge}</NavBadge>}
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" sideOffset={4}>
                    <DropdownMenuLabel>
                        {item.title} {item.badge ? `(${item.badge})` : ''}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {item.items.map((sub) => (
                        <DropdownMenuItem key={`${sub.title}-${sub.url}`} asChild>
                            <Link
                                href={sub.url}
                                className={`${checkIsActive(href, sub) ? 'bg-secondary' : ''}`}
                            >
                                {sub.icon && <sub.icon size={18} />}
                                <span className="max-w-52 text-wrap">{sub.title}</span>
                                {sub.badge && (
                                    <span className="ml-auto text-xs">{sub.badge}</span>
                                )}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    )
}

function checkIsActive(href: string, item: NavItem, mainNav = false): boolean {
    const normalize = (url?: string) => url?.replace(/\/+$/, '') || ''
    const current = normalize(href)
    const itemUrl = normalize(item.url)

    // 1. Direct match
    if (current === itemUrl) return true

    // 2. Match children (if any)
    if ('items' in item && item.items?.some(sub => normalize(sub.url) === current)) {
        return true
    }

    // 3. Match wildcard paths (e.g. /users/*)
    if (itemUrl && current.startsWith(itemUrl + '/')) {
        return true
    }

    // 4. For top-level menus (if enabled)
    return !!(mainNav && itemUrl && current.startsWith(itemUrl));


}

