/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilterContent
        :value="value.isEmptyRecord"
        @input="onEmptyRecordChange">
        <List>
            <ListElement
                v-for="(option, index) in options"
                :key="index"
                :selected="typeof selectedOptions[index] !== 'undefined'"
                :size="smallSize"
                @click.native.prevent="onSelectValue(option, index)">
                <template #default="{ isSelected }">
                    <ListElementAction :size="smallSize">
                        <CheckBox :value="isSelected" />
                    </ListElementAction>
                    <ListElementDescription>
                        <ListElementTitle
                            :size="smallSize"
                            :hint="option.value ? `#${option.key} ${languageCode}` : ''"
                            :title="option.value || `#${option.key}`" />
                    </ListElementDescription>
                </template>
            </ListElement>
        </List>
    </GridAdvancedFilterContent>
</template>

<script>
import CheckBox from '@Core/components/CheckBox/CheckBox';
import GridAdvancedFilterContent from '@Core/components/Grid/AdvancedFilters/Content/GridAdvancedFilterContent';
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
        GridAdvancedFilterContent,
        List,
        ListElement,
        ListElementAction,
        ListElementDescription,
        ListElementTitle,
        CheckBox,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: Object,
            default: () => ({
                isEmptyRecord: false,
            }),
        },
        /**
         * Code of the language
         */
        languageCode: {
            type: String,
            required: true,
        },
        /**
         * Component variances that user can choose from
         */
        options: {
            type: Array,
            default: () => [],
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
            return this.value[FILTER_OPERATOR.EQUAL]
                ? this.value[FILTER_OPERATOR.EQUAL]
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
                    const optionIndex = this.options
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

            this.selectedOptions = {
                ...this.selectedOptions,
            };

            this.$emit('input', {
                key: FILTER_OPERATOR.EQUAL,
                value: Object.values(this.selectedOptions),
            });
        },
        onEmptyRecordChange(value) {
            this.$emit('input', {
                key: 'isEmptyRecord',
                value,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .filter-content {
        max-height: 200px;
    }
</style>
