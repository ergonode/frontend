/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="filter-cell">
        <template v-if="filter">
            <GridEditableCell
                v-if="isEditing"
                :is-select-kind="!isText"
                :is-multi-select="isMultiSelect"
                :value="filterValue"
                :options="options"
                @updateDraft="updateFilterValue" />
            <div
                v-else
                class="filter-cell__horizontal-wrapper">
                <label
                    class="filter-cell__label typo-label txt--graphite">
                    {{ printedFilterValue }}
                </label>
                <Icon
                    v-if="!isText"
                    icon="arrow-triangle" />
            </div>
        </template>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import filterTypes from '~/model/filterTypes';

export default {
    name: 'GridFilterCell',
    components: {
        Icon: () => import('~/components/Icon/Icon'),
        GridEditableCell: () => import('~/components/Grid/GridEditableCell'),
    },
    props: {
        columnId: {
            type: String,
            required: true,
        },
        filter: {
            type: Object,
            required: false,
            default: undefined,
        },
        isEditing: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        filterValue() {
            return this.gridFilter[this.columnId] || (this.isMultiSelect ? [] : '');
        },
        printedFilterValue() {
            if ((Array.isArray(this.filterValue) && this.filterValue.length === 0)
                || !this.filterValue) {
                return 'Search...';
            }

            if (this.options && this.options.length > 0) {
                if (Array.isArray(this.filterValue)) {
                    return this.options.filter(
                        option => this.filterValue.some(
                            value => option.key === value,
                        ),
                    ).map(option => option.key).join(', ');
                }
                return this.options.filter(option => option.key === this.filterValue)[0].value;
            }

            return this.filterValue;
        },
        ...mapState('grid', {
            gridFilter: state => state.filter,
        }),
        isText() {
            return this.filter.type !== filterTypes.MULTI_SELECT
                && this.filter.type !== filterTypes.SELECT;
        },
        isMultiSelect() {
            return this.filter.type === filterTypes.MULTI_SELECT;
        },
        options() {
            if (this.filter === null || !this.filter.options) return null;

            const optionKeys = Object.keys(this.filter.options);

            return optionKeys.map(key => ({ key, value: this.filter.options[key] }));
        },
    },
    methods: {
        updateFilterValue(newValue) {
            this.$emit('onFilterChange', { id: this.columnId, filter: newValue });
        },
    },
};
</script>

<style lang="scss" scoped>
    .filter-cell {
        $self: &;
        position: relative;
        display: flex;
        flex: 1;
        height: 100%;

        &__horizontal-wrapper {
            display: flex;
            flex: 1;
            justify-content: space-between;
            align-items: center;
            padding: 8px;

            #{$self}__label {
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
        }
    }
</style>
