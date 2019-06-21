/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="loadComponent"
        v-bind="{ layoutElement }" />
</template>

<script>

export default {
    name: 'ComponentWrapper',
    props: {
        componentName: {
            type: String,
            required: true,
        },
        layoutElement: {
            type: Object,
            required: true,
        },
    },
    computed: {
        loadComponent() {
            return () => import(`~/components/Template/ProductDesigner/${this.componentName}`);
        },
    },
};
</script>
