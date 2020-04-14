/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="presentation-multi-select-cell">
        <GridPresentationCell :value="presentationValue" />
        <IconArrowDropDown />
    </div>
</template>

<script>
import GridPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridPresentationCell';
import IconArrowDropDown from '@Core/components/Icons/Arrows/IconArrowDropDown';

export default {
    name: 'GridSelectPresentationCell',
    components: {
        GridPresentationCell,
        IconArrowDropDown,
    },
    props: {
        value: {
            type: Array,
            required: true,
        },
        options: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        presentationValue() {
            if (!this.value) return '';

            return this.value.map(option => this.options[option].label || `#${this.options[option].code}`).join(', ');
        },
    },
};
</script>

<style lang="scss" scoped>
    .presentation-multi-select-cell {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        padding-right: 6px;
    }
</style>
