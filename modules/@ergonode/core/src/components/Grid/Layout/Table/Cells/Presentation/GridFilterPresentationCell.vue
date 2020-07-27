/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        :class="classes"
        v-text="isPlaceholder ? placeholder : value" />
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
            type: [
                String,
                Number,
            ],
            default: '',
        },
    },
    computed: {
        classes() {
            return [
                'grid-filter-presentation-cell',
                {
                    'grid-filter-presentation-cell--placeholder': this.isPlaceholder,
                },
            ];
        },
        isPlaceholder() {
            return this.value === '';
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-filter-presentation-cell {
        flex: 1;
        width: 0;
        padding: 8px 0 8px 8px;
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
