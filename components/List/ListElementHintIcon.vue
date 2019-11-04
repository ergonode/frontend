/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        class="element-icon"
        :title="hint">
        <Component :is="iconComponent" />
    </span>
</template>

<script>
export default {
    name: 'ListElementHintIcon',
    props: {
        iconPath: {
            type: String,
            default: null,
        },
        hint: {
            type: String,
            default: '',
        },
    },
    computed: {
        iconComponent() {
            return () => import(`~/components/Icon/${this.iconPath}`);
        },
    },
};
</script>

<style lang="scss" scoped>
    .element-icon {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        min-width: 24px;
        min-height: 24px;
        margin-right: 4px;
    }
</style>
