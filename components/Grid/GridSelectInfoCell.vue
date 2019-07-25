/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="info-select-cell">
        <GridInfoCell :value="value" />
        <Icon icon="arrow-triangle" />
    </div>
</template>

<script>
import GridInfoCell from '~/components/Grid/GridInfoCell';
import Icon from '~/components/Icon/Icon';

export default {
    name: 'GridSelectInfoCell',
    components: {
        GridInfoCell,
        Icon,
    },
    props: {
        value: {
            type: [String, Number, Array],
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .info-select-cell {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        padding-right: 13px;
    }
</style>
