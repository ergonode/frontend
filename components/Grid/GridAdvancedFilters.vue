/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-advanced-filters">
        <div class="grid-advanced-filters__header">
            <div class="container">
                <div class="title-container">
                    <span
                        class="grid-advanced-filters__title">
                        Filters
                    </span>
                    <NumericBadge :number="filters.length" />
                </div>
                <div class="divider-container">
                    <Divider vertical />
                </div>
                <span
                    class="grid-advanced-filters__action"
                    @click="onClearAll">Clear all filters</span>
                <div class="divider-container">
                    <Divider vertical />
                </div>
                <span
                    class="grid-advanced-filters__action"
                    @click="onRemoveAll">Remove all filters</span>

                <div class="divider-container">
                    <Divider vertical />
                </div>
            </div>
            <IconFabButton
                theme="secondary"
                icon-path="Arrows/IconArrowDouble"
                :is-selected="isExpanded"
                @select="onExpandFilters">
                <template #icon="{ iconFillColor }">
                    <IconArrowDouble
                        :fill-color="iconFillColor"
                        :state="iconExpanderState" />
                </template>
            </IconFabButton>
        </div>
        <div
            v-if="isExpanded"
            class="filters-container">
            <template v-if="filters.length === 0">
                <div class="grid-advanced-filters__placeholder">
                    <span class="placeholder-title">
                        Create a filter by dragging an attribute here
                    </span>
                </div>
            </template>
            <template v-else>
                <div
                    v-for="filter in filters"
                    :key="filter.id" />
            </template>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { Arrow } from '~/model/icons/Arrow';

export default {
    name: 'GridAdvancedFilters',
    components: {
        Divider: () => import('~/components/Dividers/Divider'),
        NumericBadge: () => import('~/components/Badges/NumericBadge'),
        IconFabButton: () => import('~/components/Buttons/IconFabButton'),
        IconArrowDouble: () => import('~/components/Icon/Arrows/IconArrowDouble'),
    },
    props: {
        filters: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            isExpanded: false,
            iconExpanderState: Arrow.DOWN,
        };
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: (state) => state.isListElementDragging,
        }),
    },
    watch: {
        isListElementDragging() {
            if (!this.isExpanded && this.isListElementDragging) {
                this.isExpanded = true;
            }
        },
    },
    methods: {
        onExpandFilters(isExpanded) {
            this.isExpanded = isExpanded;

            if (this.isExpanded) {
                this.iconExpanderState = Arrow.UP;
            } else {
                this.iconExpanderState = Arrow.DOWN;
            }
        },
        onClearAll() {
            this.$emit('clearAll');
        },
        onRemoveAll() {
            this.$emit('removeAll');
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-advanced-filters {
        display: grid;
        grid-auto-flow: row;
        border: 1px solid $grey;
        padding: 0 6px 0 16px;
        margin-bottom: 24px;

        &__title {
            @include setFont(medium, medium, medium, $darkGraphite);
        }

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            background-color: $white;
        }

        &__action {
            @include setFont(medium, tiny, regular, $darkGraphite);

            display: flex;
            align-items: center;
            text-decoration: underline;
            cursor: pointer;
        }

        &__placeholder {
            padding: 8px 12px;
            background-color: $lightGrey;
            box-shadow:
                inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
                inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);

            .placeholder-title {
                @include setFont(medium, small, regular, $darkGraphite);
            }
        }
    }

    .container {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 16px;
        padding: 12px 0;
    }

    .title-container {
        display: grid;
        grid-auto-flow: column;
        column-gap: 8px;
        align-items: center;
    }

    .filters-container {
        display: grid;
        gap: 8px;
        grid-template-columns: max-content;
        padding-bottom: 16px;
    }

    .divider-container {
        display: flex;
        padding: 4px 0;
    }
</style>
