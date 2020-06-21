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
        component: {
            type: Function,
            required: true,
        },
        props: {
            type: Object,
            default: () => ({
            }),
        },
        listeners: {
            type: Object,
            default: () => ({
            }),
        },
    },
};
</script>
