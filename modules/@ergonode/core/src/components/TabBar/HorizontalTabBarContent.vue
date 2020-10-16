/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <KeepAlive>
        <Component
            :is="component"
            v-bind="props"
            v-on="listeners" />
    </KeepAlive>
</template>

<script>
export default {
    name: 'HorizontalTabBarContent',
    props: {
        /**
         * Tab bar content component
         */
        component: {
            type: Function,
            required: true,
        },
        /**
         * Props of content component
         */
        props: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Listeners of content component
         */
        listeners: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>
