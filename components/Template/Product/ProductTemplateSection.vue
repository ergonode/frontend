/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        class="section font--medium-24-32"
        v-text="label" />
</template>

<script>

export default {
    name: 'ProductTemplateSection',
    props: {
        label: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .section {
        display: flex;
        align-items: center;
        color: $GRAPHITE_DARK;
    }
</style>
