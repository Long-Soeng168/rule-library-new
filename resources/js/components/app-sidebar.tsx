import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    FilesIcon,
    Folder,
    LanguagesIcon,
    LayoutGrid,
    LayoutList,
    LucideIcon,
    MapPinHouseIcon,
    SchoolIcon,
    SettingsIcon,
    ShapesIcon,
    UsersIcon,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    permission?: string;
    activeList?: string[];
    items?: {
        title: string;
        url: string;
        permission?: string;
    }[];
}[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    // {
    //     title: 'Your Library',
    //     url: '/manage-library-data',
    //     icon: SchoolIcon,
    // },
    {
        title: 'Users',
        url: '/admin/users',
        icon: UsersIcon,
        activeList: ['/admin/users', '/admin/roles', '/admin/permissions'],
        permission: 'user view',
        items: [
            {
                title: 'All Users',
                url: '/admin/users',
                permission: 'user view',
            },
            {
                title: 'Roles',
                url: '/admin/roles',
                permission: 'role view',
            },
            {
                title: 'Permissions',
                url: '/admin/permissions',
                permission: 'permission view',
            },
        ],
    },
    {
        title: 'Items',
        url: '/admin/items',
        icon: LayoutList,
        activeList: ['/admin/items', '/admin/item-categories'],
        permission: 'item view',
        items: [
            {
                title: 'All Items',
                url: '/admin/items',
                permission: 'item view',
            },
            {
                title: 'Categories',
                url: '/admin/item-categories',
                permission: 'item_category view',
            },
        ],
    },
    {
        title: 'Posts',
        url: '/admin/posts',
        icon: FilesIcon,
        activeList: ['/admin/posts', '/admin/post-categories'],
        permission: 'post view',
        items: [
            {
                title: 'All Posts',
                url: '/admin/posts',
                permission: 'post view',
            },
            {
                title: 'Categories',
                url: '/admin/post-categories',
                permission: 'post_category view',
            },
        ],
    },
    {
        title: 'Website Settings',
        url: '/admin/website-infos',
        icon: SettingsIcon,
        permission: 'website_info view',
        items: [
            {
                title: 'Website Info',
                url: '/admin/website-infos',
                permission: 'website_info view',
            },
            {
                title: 'Pages',
                url: '/admin/pages',
                permission: 'page view',
            },
            {
                title: 'Links',
                url: '/admin/links',
                permission: 'link view',
            },
            {
                title: 'Key Values',
                url: '/admin/key-values',
                permission: 'key_value view',
            },
            {
                title: 'FAQ',
                url: '/admin/faqs',
                permission: 'faq view',
            },
            {
                title: 'Banners',
                url: '/admin/banners',
                permission: 'banner view',
            },
        ],
    },
    {
        title: 'Library Data',
        url: '/admin/library-data',
        icon: SchoolIcon,
        activeList: ['/admin/library-data'],
        permission: 'library_data view',
        items: [
            {
                title: 'All Library Data',
                url: '/admin/library-data',
                permission: 'library_data view',
            },
            // {
            //     title: 'Library Data Submited',
            //     url: '/admin/library-data/submits',
            //     permission: 'library_data_submit view',
            // },
        ],
    },
    // {
    //     title: 'Resources',
    //     url: '/admin/resources',
    //     icon: LayoutListIcon,
    //     items: [
    //         {
    //             title: 'All Resources',
    //             url: '/admin/resources',
    //         },
    //         {
    //             title: 'Categories',
    //             url: '/admin/resources/categories',
    //         },
    //         {
    //             title: 'Types',
    //             url: '/admin/resources/types',
    //         },
    //     ],
    // },
    // {
    //     title: 'Items',
    //     url: '/admin/items',
    //     icon: LayoutListIcon,
    //     items: [
    //         {
    //             title: 'All Items',
    //             url: '/admin/items',
    //         },
    //         {
    //             title: 'Categories',
    //             url: '/admin/items/categories',
    //         },
    //         {
    //             title: 'Types',
    //             url: '/admin/items/types',
    //         },
    //     ],
    // },

    // {
    //     title: 'Categories',
    //     url: '/admin/categories',
    //     icon: ComponentIcon,
    //     items: [
    //         {
    //             title: 'Main Categories',
    //             url: '/admin/categories',
    //         },
    //         {
    //             title: 'Categories',
    //             url: '/admin/sub-categories',
    //         },
    //         {
    //             title: 'Types',
    //             url: '/admin/categories/types',
    //         },
    //     ],
    // },
    {
        title: 'Types',
        url: '/admin/types',
        icon: ShapesIcon,
        permission: 'type view',
        items: [
            {
                title: 'All Types',
                url: '/admin/types',
                permission: 'type view',
            },
            {
                title: 'Type Groups',
                url: '/admin/type-groups',
                permission: 'type_group view',
            },
        ],
    },
    {
        title: 'Locations',
        url: '/admin/locations',
        icon: MapPinHouseIcon,
        permission: 'location view',
    },
    {
        title: 'Languages',
        url: '/admin/languages',
        icon: LanguagesIcon,
        permission: 'language view',
    },
];

const footerNavItems: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    permission?: string;
    activeList?: string[];
}[] = [
    {
        title: 'Sources Hub',
        url: '#',
        icon: Folder,
        permission: 'source_hub view',
    },
    {
        title: 'Sample Content',
        url: '/admin/sample-content',
        icon: BookOpen,
        permission: 'sample_content view',
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
