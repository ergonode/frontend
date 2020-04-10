/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        :class="[
            'presentation-cell',
            { 'presentation-cell--placeholder': !isValue },
        ]"
        v-text="isValue ? value : placeholder" />
</template>

<script>

export default {
    name: 'GridFilterPresentationCell',
    props: {
        placeholder: {
            type: String,
            default: 'Search...',
        },
        value: {
            type: [String, Number],
            default: '',
        },
    },
    computed: {
        isValue() {
            return this.value !== '';
        },
    },
};
</script>

<style lang="scss" scoped>
    .presentation-cell {
        flex: 1;
        width: 0;
        padding: 8px;
        font: $FONT_MEDIUM_12_16;
        user-select: none;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        &--placeholder {
            color: $GREY_DARK;
        }

        &:not(&--placeholder) {
            color: $GRAPHITE_DARK;
        }
    }
</style>
