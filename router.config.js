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
                path: 'activity-log',
                component: GridTabs.UserActivityLogsGridTab,
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
        name: 'categories-new',
        path: '/categories/new',
        component: Pages.CategoryNew,
        children: [
            {
                path: 'general',
                component: Tabs.CategoryBaseTab,
            },
            {
                path: 'translations',
                component: Tabs.CategoryTranslationsTab,
            },
        ],
        meta: {
            privileges: ['CATEGORY_READ'],
        },
    },
    {
        name: 'categories-edit-id',
        path: '/categories/edit/:id/:tab?',
        component: Pages.CategoryEdit,
        children: [
            {
                path: 'general',
                component: Tabs.CategoryBaseTab,
            },
            {
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
                path: 'grid',
                component: GridTabs.CategoryTreesGridTab,
            },
        ],
        meta: {
            privileges: ['CATEGORY_TREE_READ'],
        },
    },
    {
        name: 'category-trees-new',
        path: '/category-trees/new',
        component: Pages.CategoryTreesNew,
        children: [
            {
                path: 'general',
                component: Tabs.CategoryTreeBaseTab,
            },
            {
                path: 'translations',
                component: Tabs.CategoryTreeTranslationsTab,
            },
            {
                path: 'designer',
                component: Tabs.CategoryTreeDesignTab,
            },
        ],
        meta: {
            privileges: ['CATEGORY_TREE_CREATE'],
        },
    },
    {
        name: 'category-trees-edit-id',
        path: '/category-trees/edit/:id/:tab?',
        component: Pages.CategoryTreesEdit,
        children: [
            {
                path: 'general',
                component: Tabs.CategoryTreeBaseTab,
            },
            {
                path: 'translations',
                component: Tabs.CategoryTreeTranslationsTab,
            },
            {
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
                path: 'grid',
                component: GridTabs.ProductGridTab,
            },
        ],
        meta: {
            privileges: ['PRODUCT_READ'],
        },
    },
    {
        name: 'products-new',
        path: '/products/new',
        component: Pages.ProductNew,
        children: [
            {
                path: 'general',
                component: Tabs.ProductBaseTab,
            },
            {
                path: 'template',
                component: Tabs.ProductTemplateTab,
            },
        ],
        meta: {
            privileges: ['PRODUCT_READ'],
        },
    },
    {
        name: 'products-edit-id',
        path: '/products/edit/:id?',
        component: Pages.ProductEdit,
        children: [
            {
                path: 'general',
                component: Tabs.ProductBaseTab,
            },
            {
                path: 'template',
                component: Tabs.ProductTemplateTab,
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
        name: 'templates-new',
        path: '/templates/new',
        component: Pages.TemplateNew,
        children: [
            {
                path: 'general',
                component: Tabs.TemplateDesignerBaseTab,
            },
            {
                path: 'template',
                component: Tabs.TemplateDesignerTab,
            },
        ],
        meta: {
            privileges: ['TEMPLATE_DESIGNER_READ'],
        },
    },
    {
        name: 'templates-edit-id',
        path: '/templates/edit/:id?',
        component: Pages.TemplateEdit,
        children: [
            {
                path: 'general',
                component: Tabs.TemplateDesignerBaseTab,
            },
            {
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
                path: 'grid',
                component: GridTabs.AttributeGridTab,
                meta: {
                    privileges: ['ATTRIBUTE_READ'],
                },
            },
        ],
    },
    {
        name: 'attributes-new',
        path: '/attributes/new',
        component: Pages.AttributeNew,
        children: [
            {
                path: 'general',
                component: Tabs.AttributeBaseTab,
            },
            {
                path: 'translations',
                component: Tabs.AttributeTranslationsTab,
            },
        ],
        meta: {
            privileges: ['ATTRIBUTE_READ'],
        },
    },
    {
        name: 'attributes-edit-id',
        path: '/attributes/edit/:id?',
        component: Pages.AttributeEdit,
        children: [
            {
                path: 'general',
                component: Tabs.AttributeBaseTab,
            },
            {
                path: 'translations',
                component: Tabs.AttributeTranslationsTab,
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
                path: 'grid',
                component: GridTabs.UsersGridTab,
                meta: {
                    privileges: ['USER_READ'],
                },
            },
            {
                path: 'roles',
                component: GridTabs.RolesGridTab,
                meta: {
                    privileges: ['USER_ROLE_READ'],
                },
            },
            {
                path: 'logs',
                component: GridTabs.UsersActivityLogsGridTab,
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
        path: '/users/user/edit/:id?',
        component: Pages.UserEdit,
        children: [
            {
                path: 'general',
                component: Tabs.UserBaseTab,
            },
            {
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
        path: '/users/role/edit/:id?',
        component: Pages.UsersRolesEdit,
        children: [
            {
                path: 'general',
                component: Tabs.UserRolesBaseTab,
            },
            {
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
                path: 'statuses',
                component: GridTabs.ProductStatusGridTab,
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
        path: '/workflow/status/edit/:id?',
        component: Pages.ProductStatusEdit,
        children: [
            {
                path: 'general',
                component: Tabs.ProductStatusBaseTab,
            },
            {
                path: 'translations',
                component: Tabs.ProductStatusTranslationsTab,
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
                path: 'grid',
                component: GridTabs.SegmentsGridTab,
                meta: {
                    privileges: ['SEGMENT_READ'],
                },
            },
            {
                path: 'condition-sets',
                component: GridTabs.ConditionSetsGridTab,
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
        name: 'segment-new',
        path: '/segments/segment/new',
        component: Pages.SegmentNew,
        children: [
            {
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
                path: 'general',
                component: Tabs.SegmentsBaseTab,
            },
            {
                path: 'translations',
                component: Tabs.SegmentsTranslationsTab,
            },
        ],
        meta: {
            privileges: ['SEGMENT_READ'],
        },
    },
    {
        name: 'condition-set-new',
        path: '/segments/condition-set/new',
        component: Pages.ConditionSetNew,
        children: [
            {
                path: 'general',
                component: Tabs.ConditionSetBaseTab,
            },
        ],
        meta: {
            privileges: ['CONDITION_READ', 'CONDITION_CREATE'],
        },
    },
    {
        name: 'condition-set-edit-id',
        path: '/segments/condition-set/edit/:id',
        component: Pages.ConditionSetEdit,
        children: [
            {
                path: 'general',
                component: Tabs.ConditionSetBaseTab,
            },
            {
                path: 'translations',
                component: Tabs.ConditionSetTranslationsTab,
            },
            {
                path: 'designer',
                component: Tabs.ConditionSetDesignTab,
            },
        ],
        meta: {
            privileges: ['CONDITION_READ'],
        },
    },
    {
        name: 'settings', path: '/settings', component: Pages.Settings,
    },
    {
        name: 'channels', path: '/channels', component: Pages.Channels,
    },
    {
        name: 'placeholder', path: '/placeholder/:placeholder?', component: Pages.Placeholder,
    },
];
