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
const Workflow = () => import('~/pages/workflow/index').then(m => m.default || m);
const ProductStatusNew = () => import('~/pages/workflow/statuses/new/index').then(m => m.default || m);
const ProductStatusEdit = () => import('~/pages/workflow/statuses/edit/_id').then(m => m.default || m);

const AttributeBaseTab = () => import('~/components/Card/AttributeBaseTab').then(m => m.default || m);
const AttributeTranslationsTab = () => import('~/components/Card/AttributeTranslationsTab').then(m => m.default || m);
const TemplateDesignerBaseTab = () => import('~/components/Card/TemplateDesignerBaseTab').then(m => m.default || m);
const TemplateDesignerTab = () => import('~/components/Card/TemplateDesignerTab').then(m => m.default || m);
const UsersGridTab = () => import('~/components/Card/UsersGridTab').then(m => m.default || m);
const UserActivityLogsGridTab = () => import('~/components/Card/UserActivityLogsGridTab').then(m => m.default || m);
const RolesGridTab = () => import('~/components/Card/RolesGridTab').then(m => m.default || m);
const UserBaseTab = () => import('~/components/Card/UserBaseTab').then(m => m.default || m);
const UsersActivityLogsGridTab = () => import('~/components/Card/UsersActivityLogsGridTab').then(m => m.default || m);
const UserAvatarTab = () => import('~/components/Card/UserAvatarTab').then(m => m.default || m);
const UserRolesBaseTab = () => import('~/components/Card/UserRolesBaseTab').then(m => m.default || m);
const UserRolesPrivilegeTab = () => import('~/components/Card/UserRolesPrivilegeTab').then(m => m.default || m);
const CategoryBaseTab = () => import('~/components/Card/CategoryBaseTab').then(m => m.default || m);
const CategoryTranslationsTab = () => import('~/components/Card/CategoryTranslationsTab').then(m => m.default || m);
const ProductGridTab = () => import('~/components/Card/ProductGridTab').then(m => m.default || m);
const ProductBaseTab = () => import('~/components/Card/ProductBaseTab').then(m => m.default || m);
const ProductTemplateTab = () => import('~/components/Card/ProductTemplateTab').then(m => m.default || m);
const TreeDesignTab = () => import('~/components/Card/TreeDesignTab').then(m => m.default || m);
const ProductStatusGridTab = () => import('~/components/Card/ProductStatusGridTab').then(m => m.default || m);
const LanguageSettingsTab = () => import('~/components/Card/LanguageSettingsTab').then(m => m.default || m);

export const pages = [
    {
        name: 'index', path: '/', component: Login,
    },
    {
        name: 'dashboard', path: '/dashboard', component: Dashboard,
    },
    {
        name: 'import', path: '/import', component: Import,
    },
    {
        name: 'categories', path: '/categories', component: Categories,
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
    },
    {
        name: 'templates', path: '/templates', component: Templates,
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
    },
    {
        name: 'attributes', path: '/attributes', component: Attributes,
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
    },
    {
        name: 'users',
        path: '/users',
        component: Users,
        children: [
            {
                path: 'grid',
                component: UsersGridTab,
            },
            {
                path: 'roles',
                component: RolesGridTab,
            },
            {
                path: 'logs',
                component: UsersActivityLogsGridTab,
            },
        ],
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
            {
                path: 'logs',
                component: UserActivityLogsGridTab,
            },
        ],
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
            {
                path: 'logs',
                component: UserActivityLogsGridTab,
            },
        ],
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
    },
    {
        name: 'workflow',
        path: '/workflow',
        component: Workflow,
        children: [
            {
                path: 'statuses',
                component: ProductStatusGridTab,
            },
        ],
    },
    {
        name: 'workflow-statuses-new',
        path: '/workflow/statuses/new',
        component: ProductStatusNew,
        children: [],
    },
    {
        name: 'workflow-statuses-edit-id',
        path: '/workflow/statuses/edit/:id?',
        component: ProductStatusEdit,
        children: [],
    },
    {
        name: 'settings',
        path: '/settings',
        component: Settings,
        children: [
            {
                path: '/settings/language',
                component: LanguageSettingsTab,
            },
        ],
    },
    {
        name: 'channels', path: '/channels', component: Channels,
    },
    {
        name: 'placeholder', path: '/placeholder/:placeholder?', component: Placeholder,
    },
];
