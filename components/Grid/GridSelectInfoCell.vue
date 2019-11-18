/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="info-select-cell">
        <GridInfoCell :value="value" />
        <IconArrowDropDown />
    </div>
</template>

<script>
import GridInfoCell from '~/components/Grid/GridInfoCell';
import IconArrowDropDown from '~/components/Icon/Arrows/IconArrowDropDown';

export default {
    name: 'GridSelectInfoCell',
    components: {
        GridInfoCell,
        IconArrowDropDown,
    },
    props: {
        value: {
            type: [String, Number],
            required: true,
        },
        fixedWidth: {
            type: Boolean,
            default: false,
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
        padding-right: 6px;
    }
</style>
