/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="component.component"
        v-bind="component.props" />
</template>

<script>
export default {
    name: 'ExtendWithModulesComponents',
    props: {
        component: {
            type: Object,
            required: true,
        },
    },
};
</script>
