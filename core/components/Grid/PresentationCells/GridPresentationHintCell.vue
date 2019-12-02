/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="info-hint-cell">
        <GridPresentationCell :value="value" />
        <InfoHint :hint="hint" />
    </div>
</template>

<script>
import GridPresentationCell from '~/core/components/Grid/PresentationCells/GridPresentationCell';
import InfoHint from '~/core/components/Hints/InfoHint';

export default {
    name: 'GridPresentationHintCell',
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
            required: true,
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
