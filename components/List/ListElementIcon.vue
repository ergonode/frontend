/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="icon-wrapper">
        <Icon
            :icon="icon"
            size="medium" />
    </div>
</template>

<script>
export default {
    name: 'ListElementIcon',
    components: {
        Icon: () => import('~/components/Icon/Icon'),
    },
    props: {
        icon: {
            type: String,
            required: false,
            default: null,
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
