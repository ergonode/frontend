/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const Login = () => import('~/pages/index').then(m => m.default || m);
const Dashboard = () => import('~/pages/dashboard/index').then(m => m.default || m);
const Import = () => import('~/pages/import/index').then(m => m.default || m);
const Categories = () => import('~/pages/categories/index').then(m => m.default || m);
const CategoryNew = () => import('~/pages/categories/new/index').then(m => m.default || m);
const CategoryEdit = () => import('~/pages/categories/edit/_id').then(m => m.default || m);
const CategoryTrees = () => import('~/pages/category-trees/index').then(m => m.default || m);
const Products = () => import('~/pages/products/index').then(m => m.default || m);
const ProductNew = () => import('~/pages/products/new/index').then(m => m.default || m);
const ProductEdit = () => import('~/pages/products/edit/_id').then(m => m.default || m);
const Templates = () => import('~/pages/templates/index').then(m => m.default || m);
const TemplateNew = () => import('~/pages/templates/new/index').then(m => m.default || m);
const TemplateEdit = () => import('~/pages/templates/edit/_id').then(m => m.default || m);
const Attributes = () => import('~/pages/attributes/index').then(m => m.default || m);
const AttributeNew = () => import('~/pages/attributes/new/index').then(m => m.default || m);
const AttributeEdit = () => import('~/pages/attributes/edit/_id').then(m => m.default || m);
const Users = () => import('~/pages/users/index').then(m => m.default || m);
const UserNew = () => import('~/pages/users/new/index').then(m => m.default || m);
const UserEdit = () => import('~/pages/users/edit/_id').then(m => m.default || m);
const UsersRolesNew = () => import('~/pages/users/new/roles/index').then(m => m.default || m);
const UsersRolesEdit = () => import('~/pages/users/edit/roles/_id').then(m => m.default || m);
const Settings = () => import('~/pages/settings/index').then(m => m.default || m);
const Channels = () => import('~/pages/channels/index').then(m => m.default || m);
const Placeholder = () => import('~/pages/placeholder/index').then(m => m.default || m);
const Profile = () => import('~/pages/profile/index').then(m => m.default || m);

// Tabs
const AttributeBaseTab = () => import('~/components/Card/AttributeBaseTab').then(m => m.default || m);
const AttributeTranslationsTab = () => import('~/components/Card/AttributeTranslationsTab').then(m => m.default || m);
const TemplateDesignerBaseTab = () => import('~/components/Card/TemplateDesignerBaseTab').then(m => m.default || m);
const TemplateDesignerTab = () => import('~/components/Card/TemplateDesignerTab').then(m => m.default || m);
const UserBaseTab = () => import('~/components/Card/UserBaseTab').then(m => m.default || m);
const UserAvatarTab = () => import('~/components/Card/UserAvatarTab').then(m => m.default || m);
const UserRolesBaseTab = () => import('~/components/Card/UserRolesBaseTab').then(m => m.default || m);
const UserRolesPrivilegeTab = () => import('~/components/Card/UserRolesPrivilegeTab').then(m => m.default || m);
const CategoryBaseTab = () => import('~/components/Card/CategoryBaseTab').then(m => m.default || m);
const CategoryTranslationsTab = () => import('~/components/Card/CategoryTranslationsTab').then(m => m.default || m);
const ProductBaseTab = () => import('~/components/Card/ProductBaseTab').then(m => m.default || m);
const ProductTemplateTab = () => import('~/components/Card/ProductTemplateTab').then(m => m.default || m);
const TreeDesignTab = () => import('~/components/Card/TreeDesignTab').then(m => m.default || m);

// Grid Tabs
const ProductGridTab = () => import('~/components/Card/Grid/ProductGridTab').then(m => m.default || m);
const CategoryGridTab = () => import('~/components/Card/Grid/CategoryGridTab').then(m => m.default || m);
const AttributeGridTab = () => import('~/components/Card/Grid/AttributeGridTab').then(m => m.default || m);
const RolesGridTab = () => import('~/components/Card/Grid/RolesGridTab').then(m => m.default || m);
const UsersGridTab = () => import('~/components/Card/Grid/UsersGridTab').then(m => m.default || m);
const UserActivityLogsGridTab = () => import('~/components/Card/Grid/UserActivityLogsGridTab').then(m => m.default || m);
const UsersActivityLogsGridTab = () => import('~/components/Card/Grid/UsersActivityLogsGridTab').then(m => m.default || m);

export const pages = [
    {
        name: 'index', path: '/', component: Login,
    },
    {
        name: 'profile',
        path: '/profile',
        component: Profile,
        children: [
            {
                path: 'activity-log',
                component: UserActivityLogsGridTab,
            },
        ],
    },
    {
        name: 'dashboard', path: '/dashboard', component: Dashboard,
    },
    {
        name: 'import',
        path: '/import',
        component: Import,
        meta: {
            permission: 'IMPORT_READ',
        },
    },
    {
        name: 'categories',
        path: '/categories',
        component: Categories,
        children: [
            {
                path: 'grid',
                component: CategoryGridTab,
                meta: {
                    permission: 'CATEGORY_READ',
                },
            },
        ],
        meta: {
            permission: 'CATEGORY_READ',
        },
    },
    {
        name: 'categories-new',
        path: '/categories/new',
        component: CategoryNew,
        children: [
            {
                path: 'general',
                component: CategoryBaseTab,
            },
            {
                path: 'translations',
                component: CategoryTranslationsTab,
            },
        ],
        meta: {
            permission: 'CATEGORY_READ',
        },
    },
    {
        name: 'categories-edit-id',
        path: '/categories/edit/:id/:tab?',
        component: CategoryEdit,
        children: [
            {
                path: 'general',
                component: CategoryBaseTab,
            },
            {
                path: 'translations',
                component: CategoryTranslationsTab,
            },
        ],
        meta: {
            permission: 'CATEGORY_READ',
        },
    },
    {
        name: 'category-trees',
        path: '/category-trees',
        component: CategoryTrees,
        children: [
            {
                path: 'tree',
                component: TreeDesignTab,
            },
        ],
        meta: {
            permission: 'CATEGORY_TREE_READ',
        },
    },
    {
        name: 'products',
        path: '/products',
        component: Products,
        children: [
            {
                path: 'grid',
                component: ProductGridTab,
            },
        ],
        meta: {
            permission: 'PRODUCT_READ',
        },
    },
    {
        name: 'products-new',
        path: '/products/new',
        component: ProductNew,
        children: [
            {
                path: 'general',
                component: ProductBaseTab,
            },
            {
                path: 'template',
                component: ProductTemplateTab,
            },
        ],
        meta: {
            permission: 'PRODUCT_READ',
        },
    },
    {
        name: 'products-edit-id',
        path: '/products/edit/:id?',
        component: ProductEdit,
        children: [
            {
                path: 'general',
                component: ProductBaseTab,
            },
            {
                path: 'template',
                component: ProductTemplateTab,
            },
        ],
        meta: {
            permission: 'PRODUCT_READ',
        },
    },
    {
        name: 'templates',
        path: '/templates',
        component: Templates,
        meta: {
            permission: 'TEMPLATE_DESIGNER_READ',
        },
    },
    {
        name: 'templates-new',
        path: '/templates/new',
        component: TemplateNew,
        children: [
            {
                path: 'general',
                component: TemplateDesignerBaseTab,
            },
            {
                path: 'template',
                component: TemplateDesignerTab,
            },
        ],
        meta: {
            permission: 'TEMPLATE_DESIGNER_READ',
        },
    },
    {
        name: 'templates-edit-id',
        path: '/templates/edit/:id?',
        component: TemplateEdit,
        children: [
            {
                path: 'general',
                component: TemplateDesignerBaseTab,
            },
            {
                path: 'template',
                component: TemplateDesignerTab,
            },
        ],
        meta: {
            permission: 'TEMPLATE_DESIGNER_READ',
        },
    },
    {
        name: 'attributes',
        path: '/attributes',
        component: Attributes,
        meta: {
            permission: 'ATTRIBUTE_READ',
        },
        children: [
            {
                path: 'grid',
                component: AttributeGridTab,
                meta: {
                    permission: 'ATTRIBUTE_READ',
                },
            },
        ],
    },
    {
        name: 'attributes-new',
        path: '/attributes/new',
        component: AttributeNew,
        children: [
            {
                path: 'general',
                component: AttributeBaseTab,
            },
            {
                path: 'translations',
                component: AttributeTranslationsTab,
            },
        ],
        meta: {
            permission: 'ATTRIBUTE_READ',
        },
    },
    {
        name: 'attributes-edit-id',
        path: '/attributes/edit/:id?',
        component: AttributeEdit,
        children: [
            {
                path: 'general',
                component: AttributeBaseTab,
            },
            {
                path: 'translations',
                component: AttributeTranslationsTab,
            },
        ],
        meta: {
            permission: 'ATTRIBUTE_READ',
        },
    },
    {
        name: 'users',
        path: '/users',
        component: Users,
        children: [
            {
                path: 'grid',
                component: UsersGridTab,
                meta: {
                    permission: 'USER_READ',
                },
            },
            {
                path: 'roles',
                component: RolesGridTab,
                meta: {
                    permission: 'USER_ROLE_READ',
                },
            },
            {
                path: 'logs',
                component: UsersActivityLogsGridTab,
            },
        ],
        meta: {
            permission: 'USER_READ',
        },
    },
    {
        name: 'users-new',
        path: '/users/new',
        component: UserNew,
        children: [
            {
                path: 'general',
                component: UserBaseTab,
            },
            {
                path: 'avatar',
                component: UserAvatarTab,
            },
        ],
        meta: {
            permission: 'USER_READ',
        },
    },
    {
        name: 'users-edit-id',
        path: '/users/edit/:id?',
        component: UserEdit,
        children: [
            {
                path: 'general',
                component: UserBaseTab,
            },
            {
                path: 'avatar',
                component: UserAvatarTab,
            },
        ],
        meta: {
            permission: 'USER_READ',
        },
    },
    {
        name: 'users-roles-new',
        path: '/users/roles/new',
        component: UsersRolesNew,
        children: [
            {
                path: 'general',
                component: UserRolesBaseTab,
            },
            {
                path: 'privileges',
                component: UserRolesPrivilegeTab,
            },
        ],
        meta: {
            permission: 'USER_ROLE_READ',
        },
    },
    {
        name: 'users-roles-edit-id',
        path: '/users/roles/edit/:id?',
        component: UsersRolesEdit,
        children: [
            {
                path: 'general',
                component: UserRolesBaseTab,
            },
            {
                path: 'privileges',
                component: UserRolesPrivilegeTab,
            },
        ],
        meta: {
            permission: 'USER_ROLE_READ',
        },
    },
    {
        name: 'settings', path: '/settings', component: Settings,
    },
    {
        name: 'channels', path: '/channels', component: Channels,
    },
    {
        name: 'placeholder', path: '/placeholder/:placeholder?', component: Placeholder,
    },
];
