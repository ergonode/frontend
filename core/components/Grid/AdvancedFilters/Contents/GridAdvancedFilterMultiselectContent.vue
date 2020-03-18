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
                v-for="(option, index) in options"
                :key="index"
                :selected="typeof selectedOptions[index] !== 'undefined'"
                @click.native.prevent="onSelectValue(option, index)">
                <template #default="{ isSelected }">
                    <ListElementAction :small="true">
                        <CheckBox
                            :value="isSelected" />
                    </ListElementAction>
                    <ListElementDescription>
                        <ListElementTitle
                            :small="true"
                            :hint="option.value ? `#${option.key} ${languageCode}` : ''"
                            :title="option.value || `#${option.key}`" />
                    </ListElementDescription>
                </template>
            </ListElement>
        </List>
    </GridAdvancedFilterBaseContent>
</template>

<script>
import { FILTER_OPERATOR } from '~/defaults/operators';
import GridAdvancedFilterBaseContent from '~/core/components/Grid/AdvancedFilters/Contents/GridAdvancedFilterBaseContent';
import List from '~/core/components/List/List';
import ListElement from '~/core/components/List/ListElement';
import ListElementAction from '~/core/components/List/ListElementAction';
import ListElementDescription from '~/core/components/List/ListElementDescription';
import ListElementTitle from '~/core/components/List/ListElementTitle';
import CheckBox from '~/core/components/Inputs/CheckBox';

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
        options: {
            type: Array,
            default: () => [],
        },
        languageCode: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            selectedOptions: {},
        };
    },
    watch: {
        filterValue: {
            immediate: true,
            handler() {
                this.initSelectedOptions();
            },
        },
    },
    computed: {
        filterValue() {
            return this.filter.value[FILTER_OPERATOR.EQUAL]
                ? this.filter.value[FILTER_OPERATOR.EQUAL].split(', ')
                : [];
        },
    },
    methods: {
        initSelectedOptions() {
            if (this.filterValue.length === 0) {
                this.selectedOptions = {};
            } else {
                const { length } = this.filterValue;

                for (let i = 0; i < length; i += 1) {
                    const optionIndex = this.options
                        .findIndex((option) => option.key === this.filterValue[i]);

                    this.selectedOptions[optionIndex] = this.filterValue[i];
                }
            }
        },
        onSelectValue(value, index) {
            if (typeof this.selectedOptions[index] !== 'undefined') {
                delete this.selectedOptions[index];
            } else {
                this.selectedOptions[index] = value.key;
            }

            this.$emit('input', { value: Object.values(this.selectedOptions).join(', '), operator: FILTER_OPERATOR.EQUAL });
        },
        onEmptyRecordChange(value) {
            this.$emit('emptyRecord', value);
        },
    },
};
</script>
