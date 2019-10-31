/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        v-bind="$attrs"
        @focus="onFocus"
        @input="onClear">
        <template #option="{ option, index }">
            <ListElement
                :key="index"
                :large="!$attrs.small && $attrs.regular"
                :selected="index === selectedOptionIndex"
                @click.native="onSelectValue(option, index)">
                <ListElementAction v-if="$attrs.multiselect">
                    <CheckBox
                        :value="
                            typeof selectedOptions[index] !== 'undefined'
                        "
                        @input="onSelectValue(option, index)" />
                </ListElementAction>
                <ListElementDescription>
                    <ListElementTitle
                        :small="$attrs.small"
                        :title="option.value" />
                    <ListElementHint :title="option.key" />
                </ListElementDescription>
            </ListElement>
        </template>
    </Select>
</template>

<script>
export default {
    name: 'TranslationSelect',
    inheritAttrs: false,
    components: {
        Select: () => import('~/components/Inputs/Select/Select'),
        ListElement: () => import('~/components/List/ListElement'),
        ListElementAction: () => import('~/components/List/ListElementAction'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
        ListElementTitle: () => import('~/components/List/ListElementTitle'),
        ListElementHint: () => import('~/components/List/ListElementHint'),
        CheckBox: () => import('~/components/Inputs/CheckBox'),
    },
    data() {
        return {
            selectedOptionIndex: -1,
            selectedOptions: {},
        };
    },
    mounted() {
        this.initSelectedOptions();
    },
    methods: {
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onClear() {
            this.selectedOptionIndex = -1;
            this.selectedOptions = {};

            this.$emit('input', this.$attrs.multiselect ? [] : '');
            this.$emit('focus', false);
        },
        initSelectedOptions() {
            if (!this.$attrs.multiselect) {
                this.selectedOptionIndex = this.$attrs.options
                    .findIndex((option) => option.key === this.$attrs.value);
            } else {
                const { length } = this.$attrs.value;

                for (let i = 0; i < length; i += 1) {
                    const optionIndex = this.$attrs.options
                        .findIndex((option) => option.key === this.$attrs.value[i]);

                    this.selectedOptions[optionIndex] = this.$attrs.value[i];
                }
            }
        },
        onSelectValue(value, index) {
            if (!this.$attrs.multiselect) {
                this.selectedOptionIndex = index;
                this.$emit('input', value);

                return false;
            }

            if (typeof this.selectedOptions[index] !== 'undefined') {
                delete this.selectedOptions[index];
            } else {
                this.selectedOptions[index] = value.key;
            }

            this.$emit('input', Object.values(this.selectedOptions));

            return true;
        },
    },
};
</script>
