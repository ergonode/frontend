/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AdvancedFilterContent :fixed="true">
        <AdvancedFilterShowOnly
            :value="value.isEmptyRecord"
            @input="onEmptyRecordChange" />
        <Divider />
        <VirtualScroll
            v-if="options.length && !value.isEmptyRecord"
            :items="options"
            :root-height="200"
            :render-ahead="4"
            :estimated-height="20">
            <template #item="{ item, index}">
                <ListElement
                    :key="index"
                    :selected="typeof selectedOptions[index] !== 'undefined'"
                    :size="smallSize"
                    @click.native.prevent="onSelectValue(item, index)">
                    <template #default="{ isSelected }">
                        <ListElementAction :size="smallSize">
                            <CheckBox :value="isSelected" />
                        </ListElementAction>
                        <ListElementDescription>
                            <ListElementTitle
                                :size="smallSize"
                                :hint="item.value ? `#${item.key} ${languageCode}` : ''"
                                :title="item.value || `#${item.key}`" />
                        </ListElementDescription>
                    </template>
                </ListElement>
            </template>
        </VirtualScroll>
        <DropdownPlaceholder v-else />
    </AdvancedFilterContent>
</template>

<script>
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    SIZE,
} from '@Core/defaults/theme';
import AdvancedFilterShowOnly from '@UI/components/AdvancedFilters/AdvancedFilterShowOnly';
import AdvancedFilterContent from '@UI/components/AdvancedFilters/Content/AdvancedFilterContent';
import CheckBox from '@UI/components/CheckBox/CheckBox';
import Divider from '@UI/components/Dividers/Divider';
import ListElement from '@UI/components/List/ListElement';
import ListElementAction from '@UI/components/List/ListElementAction';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import {
    VirtualScroll,
} from 'vue-windowing';

export default {
    name: 'AdvancedFilterMultiselectContent',
    components: {
        AdvancedFilterContent,
        VirtualScroll,
        ListElement,
        ListElementAction,
        ListElementDescription,
        ListElementTitle,
        DropdownPlaceholder,
        CheckBox,
        AdvancedFilterShowOnly,
        Divider,
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
