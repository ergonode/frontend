/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="icon-wrapper">
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
    .icon-wrapper {
        display: flex;
        flex: 0;
        justify-content: flex-start;
        align-items: center;
        padding: 0 8px 0 0;
    }
</style>
