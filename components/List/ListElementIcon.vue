/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="element-icon">
        <Component :is="iconComponent" />
    </div>
</template>

<script>
export default {
    name: 'ListElementIcon',
    props: {
        iconPath: {
            type: String,
            default: null,
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
