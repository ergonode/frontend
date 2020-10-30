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
import GridPresentationCell from '@UI/components/Grid/Layout/Table/Cells/Presentation/GridPresentationCell';
import InfoHint from '@UI/components/Hints/InfoHint';

export default {
    name: 'GridHintPresentationCell',
    components: {
        GridPresentationCell,
        InfoHint,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: String,
            required: true,
        },
        /**
         *  The hint is a tip for the component
         */
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
