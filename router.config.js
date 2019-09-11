/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
// pages
const Login = () => import('~/pages/index').then(m => m.default || m);
const Dashboard = () => import('~/pages/dashboard/index').then(m => m.default || m);
const Categories = () => import('~/pages/categories/index').then(m => m.default || m);
const CategoryNew = () => import('~/pages/categories/new/index').then(m => m.default || m);
const CategoryEdit = () => import('~/pages/categories/edit/_id').then(m => m.default || m);
const CategoryTrees = () => import('~/pages/category-trees/index').then(m => m.default || m);
const CategoryTreesNew = () => import('~/pages/category-trees/new/index').then(m => m.default || m);
const CategoryTreesEdit = () => import('~/pages/category-trees/edit/_id').then(m => m.default || m);
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
const Profile = () => import('~/pages/profile/index').then(m => m.default || m);
const Segments = () => import('~/pages/segments/index').then(m => m.default || m);
const SegmentNew = () => import('~/pages/segments/_segment/index').then(m => m.default || m);
const SegmentEdit = () => import('~/pages/segments/_segment/_id').then(m => m.default || m);
// const ConditionSetNew = () => import('~/pages/segments/_condition-set/index').then(m => m.default || m);
// const ConditionSetEdit = () => import('~/pages/segments/_condition-set/_id').then(m => m.default || m);

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
const CategoryTreeBaseTab = () => import('~/components/Card/CategoryTreeBaseTab').then(m => m.default || m);
const CategoryTreeTranslationsTab = () => import('~/components/Card/CategoryTreeTranslationsTab').then(m => m.default || m);
const CategoryTreeDesignTab = () => import('~/components/Card/CategoryTreeDesignTab').then(m => m.default || m);
const ProductBaseTab = () => import('~/components/Card/ProductBaseTab').then(m => m.default || m);
const ProductTemplateTab = () => import('~/components/Card/ProductTemplateTab').then(m => m.default || m);
const ProductStatusBaseTab = () => import('~/components/Card/ProductStatusBaseTab').then(m => m.default || m);
const ProductStatusTranslationsTab = () => import('~/components/Card/ProductStatusTranslationsTab').then(m => m.default || m);
const SegmentsBaseTab = () => import('~/components/Card/SegmentsBaseTab').then(m => m.default || m);
const SegmentsTranslationsTab = () => import('~/components/Card/SegmentsTranslationsTab').then(m => m.default || m);
const ConditionSetDesignTab = () => import('~/components/Card/ConditionSetDesignTab').then(m => m.default || m);

// Grid Tabs
const ProductStatusGridTab = () => import('~/components/Card/Grid/ProductStatusGridTab').then(m => m.default || m);
const ProductGridTab = () => import('~/components/Card/Grid/ProductGridTab').then(m => m.default || m);
const CategoryGridTab = () => import('~/components/Card/Grid/CategoryGridTab').then(m => m.default || m);
const CategoryTreesGridTab = () => import('~/components/Card/Grid/CategoryTreesGridTab').then(m => m.default || m);
const AttributeGridTab = () => import('~/components/Card/Grid/AttributeGridTab').then(m => m.default || m);
const RolesGridTab = () => import('~/components/Card/Grid/RolesGridTab').then(m => m.default || m);
const UsersGridTab = () => import('~/components/Card/Grid/UsersGridTab').then(m => m.default || m);
const UserActivityLogsGridTab = () => import('~/components/Card/Grid/UserActivityLogsGridTab').then(m => m.default || m);
const UsersActivityLogsGridTab = () => import('~/components/Card/Grid/UsersActivityLogsGridTab').then(m => m.default || m);
const SegmentsGridTab = () => import('~/components/Card/Grid/SegmentsGridTab').then(m => m.default || m);

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
        name: 'categories',
        path: '/categories',
        component: Categories,
        children: [
            {
                path: 'grid',
                component: CategoryGridTab,
                meta: {
                    privileges: ['CATEGORY_READ'],
                },
            },
        ],
        meta: {
            privileges: ['CATEGORY_READ'],
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
            privileges: ['CATEGORY_READ'],
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
            privileges: ['CATEGORY_READ'],
        },
    },
    {
        name: 'category-trees',
        path: '/category-trees',
        component: CategoryTrees,
        children: [
            {
                path: 'grid',
                component: CategoryTreesGridTab,
            },
        ],
        meta: {
            privileges: ['CATEGORY_TREE_READ'],
        },
    },
    {
        name: 'category-trees-new',
        path: '/category-trees/new',
        component: CategoryTreesNew,
        children: [
            {
                path: 'general',
                component: CategoryTreeBaseTab,
            },
            {
                path: 'translations',
                component: CategoryTreeTranslationsTab,
            },
            {
                path: 'designer',
                component: CategoryTreeDesignTab,
            },
        ],
        meta: {
            privileges: ['CATEGORY_TREE_CREATE'],
        },
    },
    {
        name: 'category-trees-edit-id',
        path: '/category-trees/edit/:id/:tab?',
        component: CategoryTreesEdit,
        children: [
            {
                path: 'general',
                component: CategoryTreeBaseTab,
            },
            {
                path: 'translations',
                component: CategoryTreeTranslationsTab,
            },
            {
                path: 'designer',
                component: CategoryTreeDesignTab,
            },
        ],
        meta: {
            privileges: ['CATEGORY_TREE_READ'],
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
            privileges: ['PRODUCT_READ'],
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
            privileges: ['PRODUCT_READ'],
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
            privileges: ['PRODUCT_READ'],
        },
    },
    {
        name: 'templates',
        path: '/templates',
        component: Templates,
        meta: {
            privileges: ['TEMPLATE_DESIGNER_READ'],
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
            privileges: ['TEMPLATE_DESIGNER_READ'],
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
            privileges: ['TEMPLATE_DESIGNER_READ'],
        },
    },
    {
        name: 'attributes',
        path: '/attributes',
        component: Attributes,
        meta: {
            privileges: ['ATTRIBUTE_READ'],
        },
        children: [
            {
                path: 'grid',
                component: AttributeGridTab,
                meta: {
                    privileges: ['ATTRIBUTE_READ'],
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
            privileges: ['ATTRIBUTE_READ'],
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
            privileges: ['ATTRIBUTE_READ'],
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
                    privileges: ['USER_READ'],
                },
            },
            {
                path: 'roles',
                component: RolesGridTab,
                meta: {
                    privileges: ['USER_ROLE_READ'],
                },
            },
            {
                path: 'logs',
                component: UsersActivityLogsGridTab,
            },
        ],
        meta: {
            privileges: ['USER_READ'],
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
            privileges: ['USER_READ'],
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
            privileges: ['USER_READ'],
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
            privileges: ['USER_ROLE_READ'],
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
            privileges: ['USER_ROLE_READ'],
        },
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
        meta: {
            privileges: ['WORKFLOW_READ'],
        },
    },
    {
        name: 'workflow-statuses-new',
        path: '/workflow/statuses/new',
        component: ProductStatusNew,
        children: [
            {
                path: 'general',
                component: ProductStatusBaseTab,
            },
            {
                path: 'translations',
                component: ProductStatusTranslationsTab,
            },
        ],
        meta: {
            privileges: ['WORKFLOW_READ'],
        },
    },
    {
        name: 'workflow-statuses-edit-id',
        path: '/workflow/statuses/edit/:id?',
        component: ProductStatusEdit,
        children: [
            {
                path: 'general',
                component: ProductStatusBaseTab,
            },
            {
                path: 'translations',
                component: ProductStatusTranslationsTab,
            },
        ],
        meta: {
            privileges: ['WORKFLOW_READ'],
        },
    },
    {
        name: 'segments',
        path: '/segments',
        component: Segments,
        children: [
            {
                path: 'grid',
                component: SegmentsGridTab,
            },
        ],
        meta: {
            privileges: ['SEGMENT_READ'],
        },
    },
    {
        name: 'segments-new',
        path: '/segments/segment/new',
        component: SegmentNew,
        children: [
            {
                path: 'general',
                component: SegmentsBaseTab,
            },
            {
                path: 'translations',
                component: SegmentsTranslationsTab,
            },
        ],
        meta: {
            privileges: ['SEGMENT_READ'],
        },
    },
    {
        name: 'segments-edit-id',
        path: '/segments/segment/edit/:id/:tab?',
        component: SegmentEdit,
        children: [
            {
                path: 'general',
                component: SegmentsBaseTab,
            },
            {
                path: 'translations',
                component: SegmentsTranslationsTab,
            },
            {
                path: 'designer',
                component: ConditionSetDesignTab,
            },
        ],
        meta: {
            privileges: ['SEGMENT_READ'],
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
