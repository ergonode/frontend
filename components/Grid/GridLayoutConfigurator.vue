/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="layout-configurator">
        <!--
        NOTE:  Uncomment when the grid view functionality is ready
        <Icon
            v-for="(className, index) in gridIconClasses"
            :key="`${className}[${index}]`"
            :icon="generateIconClassState(className)"
            @click.native="onClick(index, 'grid')" />
        <div class="layout-configurator__divider" /> -->
        <Icon
            v-for="(className, index) in tableIconClasses"
            :key="`${className}[${index}]`"
            :icon="generateIconClassState(className)"
            size="medium"
            @click.native="onClick(index, 'table')" />
    </div>
</template>

<script>
export default {
    name: 'GridLayoutConfigurator',
    components: {
        Icon: () => import('~/components/Icon/Icon'),
    },
    data: () => ({
        smallSize: 32,
        mediumSize: 40,
        largeSize: 48,
        selectedSize: 32,
        selectedClass: 'table-small',
        sizes: [32, 40, 48],
        tableIconClasses: [
            'table-small',
            'table-medium',
            'table-large',
        ],
        gridIconClasses: [
            'grid-small',
            'grid-large',
        ],
    }),
    methods: {
        generateIconClassState(className) {
            return className === this.selectedClass
                ? `sprite-view view-${this.selectedClass}--selected`
                : `sprite-view view-${className}--deactive`;
        },
        onClick(index, type) {
            // TODO: We can only handle Table layout.
            // Feature: Create Grid Layout
            switch (type) {
            case 'table':
                this.selectedClass = this.tableIconClasses[index];
                this.selectedSize = this.sizes[index];
                this.$emit('input', this.selectedSize);
                break;
            default:
                this.selectedClass = this.gridIconClasses[index];
                break;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .layout-configurator {
        display: flex;

        &__divider {
            margin: 0 4px;
            background-color: $grey;
            flex-basis: 1px;
        }

        & > i {
            margin: 0 4px;
            cursor: pointer;
        }
    }
</style>
