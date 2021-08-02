/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-label-presentation-cell">
        <PointBadge
            v-if="color"
            :color="color" />
        <GridPresentationCell :value="label" />
    </div>
</template>

<script>

export default {
    name: 'GridLabelPresentationCell',
    props: {
        /**
         * Component value
         */
        value: {
            type: String,
            required: true,
        },
        /**
         * Component variances that user can choose from
         */
        options: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        color() {
            // TODO: Add support for dynamic filter options
            if (!this.options[this.value]) {
                return '';
            }

            return this.options[this.value].color;
        },
        label() {
            // TODO: Add support for dynamic filter options
            if (!this.options[this.value]) {
                return '';
            }
            return this.options[this.value].label || `#${this.options[this.value].code}`;
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-label-presentation-cell {
        display: flex;
        flex: 1;
        align-items: center;

        & > .point-badge {
            margin-left: 8px;
        }
    }
</style>
