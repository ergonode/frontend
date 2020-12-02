/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VirtualScroll
        :items="items"
        :render-ahead="6"
        :estimated-height="20">
        <template #item="{ item, index }">
            <SelectListElement
                :key="index"
                :index="index"
                :size="size"
                :value="item"
                :selected="isItemSelected(index)"
                @input="onValueChange">
                <template #option="{ isSelected }">
                    <slot
                        name="item"
                        :item="item"
                        :is-selected="isSelected"
                        :index="index" />
                </template>
            </SelectListElement>
        </template>
    </VirtualScroll>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import SelectListElement from '@UI/components/Select/List/SelectListElement';
import {
    VirtualScroll,
} from 'vue-windowing';

export default {
    name: 'SelectList',
    components: {
        VirtualScroll,
        SelectListElement,
    },
    props: {
        /**
         * Map of selected item values
         */
        value: {
            type: [
                Array,
                String,
                Number,
                Object,
            ],
            default: '',
        },
        /**
         * Determines if the component is multiple choice
         */
        multiselect: {
            type: Boolean,
            default: false,
        },
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        items: {
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
        stringifiedItems() {
            return this.items.map(option => JSON.stringify(option));
        },
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                let selectedOptions = {};

                if (Array.isArray(this.value) && this.value.length) {
                    this.value.forEach((option) => {
                        selectedOptions[JSON.stringify(option)] = option;
                    });
                } else if (!Array.isArray(this.value) && (this.value || this.value === 0)) {
                    selectedOptions = {
                        [JSON.stringify(this.value)]: this.value,
                    };
                }

                this.selectedOptions = selectedOptions;
            },
        },
    },
    methods: {
        isItemSelected(index) {
            return typeof this.selectedOptions[this.stringifiedItems[index]] !== 'undefined';
        },
        onValueChange(index) {
            const value = this.items[index];

            if (this.multiselect) {
                const selectedItems = {
                    ...this.selectedOptions,
                };

                if (this.isItemSelected(index)) {
                    delete selectedItems[this.stringifiedItems[index]];
                } else {
                    selectedItems[this.stringifiedItems[index]] = value;
                }

                this.$emit('input', Object.values(selectedItems));
            } else {
                this.$emit('input', value);
            }
        },
    },
};
</script>
