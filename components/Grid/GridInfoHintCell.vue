/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="info-hint-cell">
        <GridInfoCell :value="value" />
        <InfoHint :hint="hint" />
    </div>
</template>

<script>
import GridInfoCell from '~/components/Grid/GridInfoCell';
import InfoHint from '~/components/Inputs/Hint/InfoHint';

export default {
    name: 'GridInfoHintCell',
    components: {
        GridInfoCell,
        InfoHint,
    },
    props: {
        value: {
            type: String,
            required: true,
        },
        hint: {
            type: String,
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
    .info-hint-cell {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        padding-right: 6px;
    }
</style>
