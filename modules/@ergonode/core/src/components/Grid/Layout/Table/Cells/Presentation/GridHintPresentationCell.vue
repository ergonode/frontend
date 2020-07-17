/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="info-hint-cell">
        <GridPresentationCell
            :value="value" />
        <InfoHint
            v-if="hint"
            :hint="hint" />
    </div>
</template>

<script>
import GridPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridPresentationCell';
import InfoHint from '@Core/components/Hints/InfoHint';

export default {
    name: 'GridHintPresentationCell',
    components: {
        GridPresentationCell,
        InfoHint,
    },
    props: {
        value: {
            type: String,
            required: true,
        },
        hint: {
            type: String,
            default: '',
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
