/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */


import { GridTabs, Tabs, Pages } from './router.imports';

export const pages = [
    {
        name: 'index', path: '/', component: Pages.Login,
    },
    {
        name: 'profile',
        path: '/profile',
        component: Pages.Profile,
        children: [
            {
                name: 'profile-activity-log-grid',
                path: 'activity-log-grid',
                component: GridTabs.UserActivityLogsGridTab,
            },
            {
                name: 'profile-privileges-grid',
                path: 'privileges-grid',
                component: GridTabs.UserPrivilegesGridTab,
            },
        ],
    },
    {
        name: 'dashboard', path: '/dashboard', component: Pages.Dashboard,
    },
    {
        name: 'categories',
        path: '/categories',
        component: Pages.Categories,
        children: [
            {
                name: 'categories-grid',
                path: 'grid',
                component: GridTabs.CategoryGridTab,
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
        name: 'category-new',
        path: '/categories/category/new',
        component: Pages.CategoryNew,
        children: [
            {
                name: 'category-new-general',
                path: 'general',
                component: Tabs.CategoryBaseTab,
            },
        ],
        meta: {
            privileges: ['CATEGORY_READ'],
        },
    },
    {
        name: 'category-edit-id',
        path: '/categories/category/edit/:id',
        component: Pages.CategoryEdit,
        children: [
            {
                name: 'category-edit-id-general',
                path: 'general',
                component: Tabs.CategoryBaseTab,
            },
            {
                name: 'category-edit-id-translations',
                path: 'translations',
                component: Tabs.CategoryTranslationsTab,
            },
        ],
        meta: {
            privileges: ['CATEGORY_READ'],
        },
    },
    {
        name: 'category-trees',
        path: '/category-trees',
        component: Pages.CategoryTrees,
        children: [
            {
                name: 'category-trees-grid',
                path: 'grid',
                component: GridTabs.CategoryTreesGridTab,
            },
        ],
        meta: {
            privileges: ['CATEGORY_TREE_READ'],
        },
    },
    {
        name: 'category-tree-new',
        path: '/category-trees/tree/new',
        component: Pages.CategoryTreesNew,
        children: [
            {
                name: 'category-tree-new-general',
                path: 'general',
                component: Tabs.CategoryTreeBaseTab,
            },
        ],
        meta: {
            privileges: ['CATEGORY_TREE_CREATE'],
        },
    },
    {
        name: 'category-tree-edit-id',
        path: '/category-trees/tree/edit/:id',
        component: Pages.CategoryTreesEdit,
        children: [
            {
                name: 'category-tree-edit-id-general',
                path: 'general',
                component: Tabs.CategoryTreeBaseTab,
            },
            {
                name: 'category-tree-edit-id-translations',
                path: 'translations',
                component: Tabs.CategoryTreeTranslationsTab,
            },
            {
                name: 'category-tree-edit-id-designer',
                path: 'designer',
                component: Tabs.CategoryTreeDesignTab,
            },
        ],
        meta: {
            privileges: ['CATEGORY_TREE_READ'],
        },
    },
    {
        name: 'products',
        path: '/products',
        component: Pages.Products,
        children: [
            {
                name: 'products-grid',
                path: 'grid',
                component: GridTabs.ProductGridTab,
            },
        ],
        meta: {
            privileges: ['PRODUCT_READ'],
        },
    },
    {
        name: 'product-new',
        path: '/products/product/new',
        component: Pages.ProductNew,
        children: [
            {
                name: 'product-new-general',
                path: 'general',
                component: Tabs.ProductBaseTab,
            },
        ],
        meta: {
            privileges: ['PRODUCT_READ'],
        },
    },
    {
        name: 'product-edit-id',
        path: '/products/product/edit/:id',
        component: Pages.ProductEdit,
        children: [
            {
                name: 'product-edit-id-general',
                path: 'general',
                component: Tabs.ProductBaseTab,
            },
            {
                name: 'product-edit-id-template',
                path: 'template',
                component: Tabs.ProductTemplateTab,
            },
            {
                name: 'product-edit-id-comments',
                path: 'comments',
                component: Tabs.ProductCommentsTab,
            },
        ],
        meta: {
            privileges: ['PRODUCT_READ'],
        },
    },
    {
        name: 'templates',
        path: '/templates',
        component: Pages.Templates,
        meta: {
            privileges: ['TEMPLATE_DESIGNER_READ'],
        },
    },
    {
        name: 'template-new',
        path: '/templates/template/new',
        component: Pages.TemplateNew,
        children: [
            {
                name: 'template-new-general',
                path: 'general',
                component: Tabs.TemplateDesignerBaseTab,
            },
        ],
        meta: {
            privileges: ['TEMPLATE_DESIGNER_READ'],
        },
    },
    {
        name: 'template-edit-id',
        path: '/templates/template/edit/:id',
        component: Pages.TemplateEdit,
        children: [
            {
                name: 'template-edit-id-general',
                path: 'general',
                component: Tabs.TemplateDesignerBaseTab,
            },
            {
                name: 'template-edit-id-template',
                path: 'template',
                component: Tabs.TemplateDesignerTab,
            },
        ],
        meta: {
            privileges: ['TEMPLATE_DESIGNER_READ'],
        },
    },
    {
        name: 'attributes',
        path: '/attributes',
        component: Pages.Attributes,
        meta: {
            privileges: ['ATTRIBUTE_READ'],
        },
        children: [
            {
                name: 'attributes-grid',
                path: 'grid',
                component: GridTabs.AttributeGridTab,
                meta: {
                    privileges: ['ATTRIBUTE_READ'],
                    title: 'Attributes',
                },
            },
            {
                name: 'attributes-group-grid',
                path: 'groups',
                component: GridTabs.AttributeGroupGridTab,
                meta: {
                    privileges: ['ATTRIBUTE_READ'],
                    title: 'Attribute Groups',
                },
            },
        ],
    },
    {
        name: 'notifications',
        path: '/notifications',
        component: Pages.Notifications,
        children: [
            {
                name: 'notifications-grid',
                path: 'grid',
                component: GridTabs.NotificationGridTab,
            },
        ],
    },
    {
        name: 'attribute-new',
        path: '/attributes/attribute/new',
        component: Pages.AttributeNew,
        children: [
            {
                name: 'attribute-new-general',
                path: 'general',
                component: Tabs.AttributeBaseTab,
            },
        ],
        meta: {
            privileges: ['ATTRIBUTE_READ'],
        },
    },
    {
        name: 'attribute-edit-id',
        path: '/attributes/attribute/edit/:id',
        component: Pages.AttributeEdit,
        children: [
            {
                name: 'attribute-edit-id-general',
                path: 'general',
                component: Tabs.AttributeBaseTab,
            },
            {
                name: 'attribute-edit-id-translations',
                path: 'translations',
                component: Tabs.AttributeTranslationsTab,
            },
        ],
        meta: {
            privileges: ['ATTRIBUTE_READ'],
        },
    },
    {
        name: 'attribute-group-new',
        path: '/attributes/group/new',
        component: Pages.AttributeGroupNew,
        children: [
            {
                name: 'attribute-group-new-general',
                path: 'general',
                component: Tabs.AttributeGroupBaseTab,
            },
        ],
        meta: {
            privileges: ['ATTRIBUTE_READ'],
        },
    },
    {
        name: 'attribute-group-edit-id',
        path: '/attributes/group/edit/:id',
        component: Pages.AttributeGroupEdit,
        children: [
            {
                name: 'attribute-group-edit-id-general',
                path: 'general',
                component: Tabs.AttributeGroupBaseTab,
            },
            {
                name: 'attribute-group-edit-id-translations',
                path: 'translations',
                component: Tabs.AttributeGroupTranslationsTab,
            },
        ],
        meta: {
            privileges: ['ATTRIBUTE_READ'],
        },
    },
    {
        name: 'users',
        path: '/users',
        component: Pages.Users,
        children: [
            {
                name: 'users-grid',
                path: 'grid',
                component: GridTabs.UsersGridTab,
                meta: {
                    title: 'Users',
                    privileges: ['USER_READ'],
                    isReadOnly: 'USER',
                },
            },
            {
                name: 'users-roles',
                path: 'roles',
                component: GridTabs.RolesGridTab,
                meta: {
                    title: 'Roles',
                    privileges: ['USER_ROLE_READ'],
                    isReadOnly: 'USER_ROLE',
                },
            },
            {
                name: 'users-activity-logs',
                path: 'logs',
                component: GridTabs.UsersActivityLogsGridTab,
                meta: {
                    title: 'Activity logs',
                    privileges: [],
                    isReadOnly: 'USER',
                },
            },
        ],
        meta: {
            privileges: ['USER_READ'],
        },
    },
    {
        name: 'user-new',
        path: '/users/user/new',
        component: Pages.UserNew,
        children: [
            {
                name: 'user-new-general',
                path: 'general',
                component: Tabs.UserBaseTab,
            },
        ],
        meta: {
            privileges: ['USER_READ', 'USER_CREATE'],
        },
    },
    {
        name: 'user-edit-id',
        path: '/users/user/edit/:id',
        component: Pages.UserEdit,
        children: [
            {
                name: 'user-edit-id-general',
                path: 'general',
                component: Tabs.UserBaseTab,
            },
            {
                name: 'user-edit-id-avatar',
                path: 'avatar',
                component: Tabs.UserAvatarTab,
            },
        ],
        meta: {
            privileges: ['USER_READ'],
        },
    },
    {
        name: 'users-role-new',
        path: '/users/role/new',
        component: Pages.UsersRolesNew,
        children: [
            {
                name: 'users-role-new-general',
                path: 'general',
                component: Tabs.UserRolesBaseTab,
            },
        ],
        meta: {
            privileges: ['USER_ROLE_READ', 'USER_ROLE_CREATE'],
        },
    },
    {
        name: 'users-role-edit-id',
        path: '/users/role/edit/:id',
        component: Pages.UsersRolesEdit,
        children: [
            {
                name: 'users-role-edit-id-general',
                path: 'general',
                component: Tabs.UserRolesBaseTab,
            },
            {
                name: 'users-role-edit-id-privileges',
                path: 'privileges',
                component: Tabs.UserRolesPrivilegeTab,
            },
        ],
        meta: {
            privileges: ['USER_ROLE_READ'],
        },
    },
    {
        name: 'workflow',
        path: '/workflow',
        component: Pages.Workflow,
        children: [
            {
                name: 'workflow-statuses',
                path: 'statuses',
                component: GridTabs.ProductStatusGridTab,
            },
            {
                name: 'workflow-transitions',
                path: 'transitions',
                component: GridTabs.TransitionsGridTab,
            },
        ],
        meta: {
            privileges: ['WORKFLOW_READ'],
        },
    },
    {
        name: 'workflow-status-new',
        path: '/workflow/status/new',
        component: Pages.ProductStatusNew,
        children: [
            {
                name: 'workflow-status-new-general',
                path: 'general',
                component: Tabs.ProductStatusBaseTab,
            },
        ],
        meta: {
            privileges: ['WORKFLOW_READ', 'WORKFLOW_CREATE'],
        },
    },
    {
        name: 'workflow-status-edit-id',
        path: '/workflow/status/edit/:id',
        component: Pages.ProductStatusEdit,
        children: [
            {
                name: 'workflow-status-edit-id-general',
                path: 'general',
                component: Tabs.ProductStatusBaseTab,
            },
            {
                name: 'workflow-status-edit-id-translations',
                path: 'translations',
                component: Tabs.ProductStatusTranslationsTab,
            },
        ],
        meta: {
            privileges: ['WORKFLOW_READ'],
        },
    },
    {
        name: 'transition-new',
        path: '/workflow/transition/new',
        component: Pages.TransitionNew,
        children: [
            {
                name: 'workflow-transition-new-general',
                path: 'general',
                component: Tabs.TransitionBaseTab,
            },
        ],
        meta: {
            privileges: ['WORKFLOW_READ', 'WORKFLOW_CREATE'],
        },
    },
    {
        name: 'transition-edit-source-destination',
        path: '/workflow/transition/edit/:id',
        component: Pages.TransitionEdit,
        children: [
            {
                name: 'workflow-transition-edit-id-general',
                path: 'general',
                component: Tabs.TransitionBaseTab,
            },
            {
                name: 'workflow-transition-edit-id-designer',
                path: 'designer',
                component: Tabs.ConditionSetDesignTab,
                meta: {
                    privileges: ['CONDITION_READ'],
                },
            },
        ],
        meta: {
            privileges: ['WORKFLOW_READ'],
        },
    },
    {
        name: 'segments',
        path: '/segments',
        component: Pages.Segments,
        children: [
            {
                name: 'segments-grid',
                path: 'grid',
                component: GridTabs.SegmentsGridTab,
                meta: {
                    privileges: ['SEGMENT_READ'],
                },
            },
        ],
        meta: {
            privileges: ['SEGMENT_READ'],
        },
    },
    {
        name: 'segment-new',
        path: '/segments/segment/new',
        component: Pages.SegmentNew,
        children: [
            {
                name: 'segment-new-general',
                path: 'general',
                component: Tabs.SegmentsBaseTab,
            },
        ],
        meta: {
            privileges: ['SEGMENT_READ', 'SEGMENT_CREATE'],
        },
    },
    {
        name: 'segment-edit-id',
        path: '/segments/segment/edit/:id',
        component: Pages.SegmentEdit,
        children: [
            {
                name: 'segment-edit-id-general',
                path: 'general',
                component: Tabs.SegmentsBaseTab,
            },
            {
                name: 'segment-edit-id-translations',
                path: 'translations',
                component: Tabs.SegmentsTranslationsTab,
            },
            {
                name: 'segment-edit-id-designer',
                path: 'designer',
                component: Tabs.ConditionSetDesignTab,
                meta: {
                    privileges: ['CONDITION_READ'],
                },
            },
        ],
        meta: {
            privileges: ['SEGMENT_READ'],
        },
    },
    {
        name: 'settings',
        path: '/settings',
        component: Pages.Settings,
        children: [
            {
                name: 'settings-language',
                path: '/settings/language',
                component: Tabs.LanguageSettingsTab,

            },
        ],
    },
    {
        name: 'channels', path: '/channels', component: Pages.Channels,
    },
    {
        name: 'placeholder', path: '/placeholder/:placeholder', component: Pages.Placeholder,
    },
];
