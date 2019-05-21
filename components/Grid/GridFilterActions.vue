/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="filter-actions">
        <template v-if="!isEmptyFilters">
            <button
                class="btn-expander"
                @click="expandFilters">
                <Icon :icon="iconClass" />
                <Label
                    class="btn-expander__title"
                    :text="expandingText" />
            </button>
            <button
                :class="['btn-clear', {'btn-clear--expanded': !value}]"
                @click="clearFilters">
                {{ filtersText }}
            </button>
        </template>
        <template v-else>
            <Label
                class="btn-expander__title"
                text="Here you can place filters from side menu" />
        </template>
    </div>
</template>

<script>
export default {
    name: 'GridFilterActions',
    components: {
        Label: () => import('~/components/Label/Label'),
        Icon: () => import('~/components/Icon/Icon'),
    },
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        filtersNumber: {
            type: Number,
            required: true,
        },
    },
    computed: {
        iconClass() {
            return this.value
                ? 'arrow-single'
                : 'arrow-single trans-half';
        },
        expandingText() {
            return this.value
                ? 'Hide filters'
                : 'Show filters';
        },
        filtersText() {
            return this.value
                ? 'Clear all filters'
                : `${this.filtersNumber} selected`;
        },
        isEmptyFilters() {
            return this.filtersNumber === 0;
        },
    },
    methods: {
        clearFilters() {

        },
        expandFilters() {
            this.$emit('input', !this.value);
        },
    },
};
</script>

<style lang="scss" scoped>
    .filter-actions {
        display: flex;
        align-items: center;

        & > * {
            outline: none;
        }

        .btn-expander {
            display: flex;
            align-items: center;

            &__title {
                @include setFont(medium, small, regular, $graphite);
                margin: 0 8px 0 4px;
            }
        }

        .btn-clear {
            @include setFont(medium, small, regular, $success);
            margin-left: 8px;

            &--expanded {
                @include setFont(medium, tiny, regular, $graphite, 0.1);
                border-radius: 12px;
                border: 1px solid #d6d7d8;
                padding: 4px 8px;
            }
        }
    }
</style>
