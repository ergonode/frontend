/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="[
            'advanced-filter',
            {
                'advanced-filter--selected': isSelected,
                'advanced-filter--error': isError,
                'advanced-filter--ghost': isGhostFilter,
            }
        ]"
        @click="onClick">
        <template v-if="!isGhostFilter">
            <span
                class="advanced-filter__label"
                v-text="filter.label || filter.code" />
            <div class="advanced-filter__details">
                <span
                    v-if="!filter.value"
                    class="advanced-filter__placeholder">
                    Select
                </span>
                <span
                    v-else
                    class="advanced-filter__value"
                    v-text="filter.value" />
                <IconArrowDropDown :state="arrowIconState" />
            </div>
            <div class="icon-error-container">
                <IconError
                    v-if="isError"
                    size="16" />
            </div>
        </template>
        <template v-else>
            <GridAdvancedFilterGhost />
        </template>
        <SelectBaseContent
            v-if="isSelected"
            ref="selectContent"
            :style="selectContentPositionStyle"
            :fixed-content="false">
            <template #body>
                <Component
                    :is="selectBodyComponent"
                    :value="filterValue"
                    :options="filter.options" />
            </template>
            <template #footer>
                <Component
                    :is="selectFooterComponent"
                    @apply="onApply"
                    @clear="onClear" />
            </template>
        </SelectBaseContent>
    </div>
</template>

<script>
import { GHOST_ID } from '~/defaults/grid/main';
import { Arrow } from '~/model/icons/Arrow';
import { AttributeTypes } from '~/defaults/attributes/main';

export default {
    name: 'GridAdvancedFilter',
    components: {
        IconArrowDropDown: () => import('~/components/Icon/Arrows/IconArrowDropDown'),
        IconError: () => import('~/components/Icon/Feedback/IconError'),
        GridAdvancedFilterGhost: () => import('~/components/Grid/AdvancedFilters/GridAdvancedFilterGhost'),
        SelectBaseContent: () => import('~/components/Inputs/Select/Contents/SelectBaseContent'),
    },
    props: {
        isError: {
            type: Boolean,
            default: false,
        },
        filter: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isSelected: false,
            selectContentPositionStyle: null,
            filterValue: this.filter.value,
        };
    },
    destroyed() {
        window.removeEventListener('click', this.onClickOutside);
    },
    computed: {
        ghostFilterId() {
            return GHOST_ID;
        },
        isGhostFilter() {
            return this.filter.id === this.ghostFilterId;
        },
        arrowIconState() {
            return this.isSelected ? Arrow.UP : Arrow.DOWN;
        },
        selectFooterComponent() {
            switch (this.filter.type) {
            case AttributeTypes.SELECT:
                return () => import('~/components/Inputs/Select/Contents/Footers/SelectContentFooter');
            case AttributeTypes.MULTI_SELECT:
            case AttributeTypes.DATE:
            case AttributeTypes.PRICE:
                return () => import('~/components/Inputs/Select/Contents/Footers/MultiselectContentFooter');
            default: return () => import('~/components/Inputs/Select/Contents/Footers/SelectContentApplyFooter');
            }
        },
        selectBodyComponent() {
            switch (this.filter.type) {
            case AttributeTypes.SELECT:
                return () => import('~/components/Grid/AdvancedFilters/GridAdvancedFilterSelectContent');
            case AttributeTypes.MULTI_SELECT:
                return () => import('~/components/Grid/AdvancedFilters/GridAdvancedFilterMultiselectContent');
            case AttributeTypes.TEXT:
                return () => import('~/components/Grid/AdvancedFilters/GridAdvancedFilterTextContent');
            default: return () => import('~/components/Grid/AdvancedFilters/GridAdvancedFilterTextContent');
            }
        },
    },
    methods: {
        onClear() {
            if (this.filter.type === AttributeTypes.MULTI_SELECT) {
                this.filterValue = [];
            } else {
                this.filterValue = '';
            }
        },
        onApply() {
            this.isSelected = false;
            window.removeEventListener('click', this.onClickOutside);

            this.$emit('apply', { id: this.filter.id, value: this.filterValue });
        },
        onClick() {
            if (!this.isSelected) {
                window.addEventListener('click', this.onClickOutside);
            }
        },
        onClickOutside(event) {
            if (this.isSelected) {
                const { clientX, clientY } = event;
                const {
                    top, left, width, height,
                } = this.$refs.selectContent.$el.getBoundingClientRect();
                const isClickedInsideSelectContent = clientX > left
                    && clientX < left + width
                    && clientY > top
                    && clientY < top + height;

                if (!isClickedInsideSelectContent) {
                    this.isSelected = false;
                }
            } else {
                this.isSelected = !this.isSelected;
            }

            if (this.isSelected) {
                this.selectContentPositionStyle = this.getSelectBoundingBox();
            }

            if (!this.isSelected) {
                window.removeEventListener('click', this.onClickOutside);
            }
        },
        getSelectBoundingBox() {
            const {
                x,
                y,
                height,
                width,
            } = this.$el.getBoundingClientRect();
            const { innerHeight } = window;
            const maxHeight = 200;

            const position = { left: `${x}px` };

            if (this.fixedSelectContent) {
                position.width = `${width}px`;
            }

            if (innerHeight - y < maxHeight) {
                const offsetBottom = innerHeight - y;

                position.bottom = `${offsetBottom + 1}px`;

                return position;
            }

            position.top = `${y + height + 2}px`;

            return position;
        },
    },
};
</script>

<style lang="scss" scoped>
    .advanced-filter {
        $filter: &;

        position: relative;
        display: flex;
        height: 30px;

        &__label {
            @include setFont(bold, small, regular, $darkGraphite);

            display: flex;
            align-items: center;
            border: 1px solid $grey;
            padding: 0 8px;
            box-sizing: border-box;
            background-color: $background;
        }

        &__details {
            display: flex;
            align-items: center;
            padding: 0 2px 0 8px;
            box-sizing: border-box;
            border-right: 1px solid $grey;
            border-top: 1px solid $grey;
            border-bottom: 1px solid $grey;
        }

        &__placeholder {
            @include setFont(bold, small, regular, $lightGraphite);
        }

        &__value {
            @include setFont(medium, small, regular, $lightGraphite);
        }

        &--selected {
            #{$filter}__label {
                border-color: $primary;
                background-color: $primary;
                color: $white;
            }
        }

        &--error {
            #{$filter}__details {
                background-color: $lightRed;
            }
        }
    }

    .icon-error-container {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 16px;
        height: 16px;
    }
</style>
