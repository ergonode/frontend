/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="navigationCellClasses"
        tabindex="0"
        @keydown="onKeyDown"
        @focus="onFocus"
        @blur="onFocusLost"
        @click="onClick"
        @dblclick="onDblClick">
        <slot
            :is-focused="isFocused"
            :is-editing="isEditing"
            :is-action="isAction" />
    </div>
</template>

<script>
import gridNavigationMixin from '~/mixins/gridNavigationMixin';

export default {
    name: 'GridNavigationCell',
    mixins: [gridNavigationMixin],
    computed: {
        navigationCellClasses() {
            return [
                'navigation-cell',
                {
                    'navigation-cell--selected': this.isSelected,
                    'navigation-cell--focused': this.isFocused,
                },
                `keyboard-navigable-${this.column}-${this.row}`,
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .navigation-cell {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        outline-style: none;
        border-bottom: 1px solid $grey;

        &--selected {
            background-color: $lightGreen !important;
        }

        &--focused {
            box-shadow: inset 0 0 0 2px $primary;
        }
    }
</style>
