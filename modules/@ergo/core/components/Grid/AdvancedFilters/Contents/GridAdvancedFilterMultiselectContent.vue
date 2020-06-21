/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilterBaseContent
        :is-empty-record="filter.value.isEmptyRecord"
        @input="onEmptyRecordChange">
        <List>
            <ListElement
                v-for="(option, index) in filter.options"
                :key="index"
                :selected="typeof selectedOptions[index] !== 'undefined'"
                :size="smallSize"
                @click.native.prevent="onSelectValue(option, index)">
                <template #default="{ isSelected }">
                    <ListElementAction :small="true">
                        <CheckBox :value="isSelected" />
                    </ListElementAction>
                    <ListElementDescription>
                        <ListElementTitle
                            :size="smallSize"
                            :hint="option.value ? `#${option.key} ${filter.languageCode}` : ''"
                            :title="option.value || `#${option.key}`" />
                    </ListElementDescription>
                </template>
            </ListElement>
        </List>
    </GridAdvancedFilterBaseContent>
</template>

<script>
import GridAdvancedFilterBaseContent from '@Core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';
import CheckBox from '@Core/components/Inputs/CheckBox';
import List from '@Core/components/List/List';
import ListElement from '@Core/components/List/ListElement';
import ListElementAction from '@Core/components/List/ListElementAction';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'GridAdvancedFilterMultiselectContent',
    components: {
        GridAdvancedFilterBaseContent,
        List,
        ListElement,
        ListElementAction,
        ListElementDescription,
        ListElementTitle,
        CheckBox,
    },
    props: {
        filter: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            selectedOptions: {},
        };
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        filterValue() {
            return this.filter.value[FILTER_OPERATOR.EQUAL]
                ? this.filter.value[FILTER_OPERATOR.EQUAL].split(', ')
                : [];
        },
    },
    watch: {
        filterValue: {
            immediate: true,
            handler() {
                this.initSelectedOptions();
            },
        },
    },
    methods: {
        initSelectedOptions() {
            if (this.filterValue.length === 0) {
                this.selectedOptions = {};
            } else {
                const {
                    length,
                } = this.filterValue;

                for (let i = 0; i < length; i += 1) {
                    const optionIndex = this.filter.options
                        .findIndex(option => option.id === this.filterValue[i]);

                    this.selectedOptions[optionIndex] = this.filterValue[i];
                }
            }
        },
        onSelectValue(value, index) {
            if (typeof this.selectedOptions[index] !== 'undefined') {
                delete this.selectedOptions[index];
            } else {
                this.selectedOptions[index] = value.id;
            }

            this.$emit('input', {
                value: Object.values(this.selectedOptions).join(', '),
                key: FILTER_OPERATOR.EQUAL,
            });
        },
        onEmptyRecordChange(value) {
            this.$emit('emptyRecord', value);
        },
    },
};
</script>

<style lang="scss" scoped>
    .filter-content {
        max-height: 200px;
    }
</style>
