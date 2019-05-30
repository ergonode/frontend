/*
* Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
* See LICENSE for license details.
*/
<template>
    <div class="check-placeholder-cell">
        <Icon icon="arrow-triangle" />
    </div>
</template>

<script>
export default {
    name: 'GridCheckPlaceholderCell',
    components: {
        Icon: () => import('~/components/Icon/Icon'),
    },
};
</script>

<style lang="scss" scoped>
    .check-placeholder-cell {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        padding: 8px;
    }
</style>
