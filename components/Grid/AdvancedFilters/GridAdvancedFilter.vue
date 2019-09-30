/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="[
            'advanced-filter',
            {
                'advanced-filter--editing': isEditing,
                'advanced-filter--error': isError,
                'advanced-filter--ghost': isGhostFilter,
            }
        ]"
        @click="onClick">
        <template v-if="!isGhostFilter">
            <span
                class="advanced-filter__label"
                v-text="filter.label" />
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
                <IconArrowDropDown />
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
        <slot :is-editing="isEditing" />
    </div>
</template>

<script>
import { GHOST_ID } from '~/defaults/grid/main';

export default {
    name: 'GridAdvancedFilter',
    components: {
        IconArrowDropDown: () => import('~/components/Icon/Arrows/IconArrowDropDown'),
        IconError: () => import('~/components/Icon/Feedback/IconError'),
        GridAdvancedFilterGhost: () => import('~/components/Grid/AdvancedFilters/GridAdvancedFilterGhost'),
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
            isEditing: false,
        };
    },
    computed: {
        ghostFilterId() {
            return GHOST_ID;
        },
        isGhostFilter() {
            return this.filter.id === this.ghostFilterId;
        },
    },
    methods: {
        onClick() {
            this.isEditing = !this.isEditing;
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
            border-right: 1px solid $grey;
            padding: 0 8px;
            background-color: $background;
        }

        &__details {
            display: flex;
            align-items: center;
            padding: 0 2px 0 8px;
        }

        &__placeholder {
            @include setFont(bold, small, regular, $lightGraphite);
        }

        &__value {
            @include setFont(medium, small, regular, $lightGraphite);
        }

        &:not(&--ghost) {
            border: 1px solid $grey;
        }

        &--editing {
            #{$filter}__label {
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
