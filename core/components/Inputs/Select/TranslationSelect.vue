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
        <template #option="{ option }">
            <ListElement
                :key="option.key"
                :large="!$attrs.small && $attrs.regular"
                :selected="isSelected(option.key)"
                @click.native="onSelectValue(option)">
                <slot
                    name="option"
                    :option="option">
                    <ListElementAction
                        v-if="$attrs.multiselect"
                        :small="$attrs.small">
                        <CheckBox
                            :value="isChecked(option.key)"
                            @input="onSelectValue(option)" />
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
import { removeValueAtIndex } from '~/model/arrayWrapper';

export default {
    name: 'TranslationSelect',
    inheritAttrs: false,
    components: {
        Select: () => import('~/core/components/Inputs/Select/Select'),
        ListElement: () => import('~/core/components/List/ListElement'),
        ListElementAction: () => import('~/core/components/List/ListElementAction'),
        ListElementDescription: () => import('~/core/components/List/ListElementDescription'),
        ListElementTitle: () => import('~/core/components/List/ListElementTitle'),
        CheckBox: () => import('~/core/components/Inputs/CheckBox'),
    },
    props: {
        languageCode: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            selectedOptions: this.$attrs.value || null,
        };
    },
    computed: {
        parsedValue() {
            return 'xxxx';
            // let parsedValue = null;
            // if (!this.selectedOptions) return null;
            // if (!this.$attrs.multiselect) {
            //     parsedValue = this.$attrs.options.find(
            //         (option) => option.key.toString() === this.selectedOptions.toString(),
            //     );
            //     return parsedValue ? parsedValue.value : `#${this.selectedOptions}`;
            // }
            // parsedValue = this.selectedOptions.map((option) => {
            //     const parsedOption = this.$attrs.options.find(
            //         (o) => o.key.toString() === option.toString(),
            //     );
            //     return parsedOption.value || `#${parsedOption.key}`;
            // });

            // return parsedValue.join(', ');
        },
    },
    methods: {
        isSelected(key) {
            return this.$attrs.multiselect ? false : key === this.selectedOptions;
        },
        isChecked(key) {
            return this.selectedOptions.includes(key);
        },
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onClear() {
            this.selectedOptions = null;

            this.$emit('input', this.$attrs.multiselect ? [] : null);
        },
        onSelectValue({ key }) {
            if (!this.$attrs.multiselect) {
                this.selectedOptions = key;
                this.$emit('input', key);

                return false;
            }

            if (this.isChecked(key)) {
                const index = this.selectedOptions.findIndex((option) => option === key);
                this.selectedOptions = removeValueAtIndex(this.selectedOptions, index);
            } else {
                this.selectedOptions = [
                    key,
                    ...this.selectedOptions,
                ];
            }
            this.$emit('input', this.selectedOptions);

            return true;
        },
    },
};
</script>
