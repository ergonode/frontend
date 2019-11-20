/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="parsedValue"
        v-bind="$attrs"
        @focus="onFocus"
        @input="onClear">
        <template #prepend>
            <slot name="prepend" />
        </template>
        <template #option="{ option, index }">
            <ListElement
                :key="index"
                :large="!$attrs.small && $attrs.regular"
                :selected="index === selectedOptionIndex"
                @click.native="onSelectValue(option, index)">
                <slot
                    name="option"
                    :option="option">
                    <ListElementAction
                        v-if="$attrs.multiselect"
                        :small="$attrs.small">
                        <CheckBox
                            :value="isSelected(index)"
                            @input="onSelectValue(option, index)" />
                    </ListElementAction>
                    <ListElementDescription>
                        <ListElementTitle
                            :small="$attrs.small"
                            :hint="option.value ? `#${option.key} ${languageCode}` : ''"
                            :title="option.value || `#${option.key}`" />
                    </ListElementDescription>
                </slot>
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
        CheckBox: () => import('~/components/Inputs/CheckBox'),
    },
    props: {
        languageCode: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            selectedOptionIndex: -1,
            selectedOptions: {},
        };
    },
    created() {
        this.initSelectedOptions();
    },
    computed: {
        parsedValue() {
            if (Array.isArray(this.$attrs.value)) {
                return this.$attrs.value.map((val) => val.value || `#${val.key}`);
            }

            return this.$attrs.value.value || this.$attrs.value.key;
        },
    },
    methods: {
        isSelected(index) {
            return typeof this.selectedOptions[index] !== 'undefined';
        },
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onClear() {
            this.selectedOptionIndex = -1;
            this.selectedOptions = {};

            this.$emit('input', this.$attrs.multiselect ? [] : { key: '', value: '' });
        },
        initSelectedOptions() {
            if (this.$attrs.value) {
                if (!this.$attrs.multiselect) {
                    this.selectedOptionIndex = this.$attrs.options.findIndex(
                        (option) => option.key === this.$attrs.value.key,
                    );
                } else {
                    const { length } = this.$attrs.value;

                    for (let i = 0; i < length; i += 1) {
                        const optionIndex = this.$attrs.options.findIndex(
                            (option) => option.key === this.$attrs.value[i].key,
                        );

                        this.selectedOptions[optionIndex] = this.$attrs.value[i];
                    }
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
                this.selectedOptions[index] = value;
            }

            this.$emit('input', Object.values(this.selectedOptions));

            return true;
        },
    },
};
</script>
