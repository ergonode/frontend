/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="parsedValue"
        v-bind="$attrs"
        @search="onSearch"
        @focus="onFocus"
        @input="onClear">
        <template #prepend>
            <slot name="prepend" />
        </template>
        <template #option="{ option, index }">
            <ListElement
                :key="index"
                :large="!$attrs.small && $attrs.regular"
                :selected="typeof selectedOptions[option.id] !== 'undefined'"
                @click.native.prevent="onSelectValue(option)">
                <template #default="{ isSelected }">
                    <slot
                        name="option"
                        :option="option"
                        :selected="isSelected">
                        <ListElementAction
                            v-if="$attrs.multiselect"
                            :small="$attrs.small">
                            <CheckBox :value="isSelected" />
                        </ListElementAction>
                        <ListElementDescription>
                            <ListElementTitle
                                :small="$attrs.small"
                                :hint="option.hint"
                                :title="option.value || `#${option.key}`" />
                        </ListElementDescription>
                    </slot>
                </template>
            </ListElement>
        </template>
    </Select>
</template>

<script>
import Select from '@Core/components/Inputs/Select/Select';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';

export default {
    name: 'TranslationSelect',
    components: {
        Select,
        ListElement: () => import('@Core/components/List/ListElement'),
        ListElementAction: () => import('@Core/components/List/ListElementAction'),
        ListElementDescription,
        ListElementTitle,
        CheckBox: () => import('@Core/components/Inputs/CheckBox'),
    },
    inheritAttrs: false,
    data() {
        return {
            selectedOptions: {},
        };
    },
    computed: {
        parsedValue() {
            if (Array.isArray(this.$attrs.value)) {
                return this.$attrs.value.map(val => val.value || `#${val.key}`);
            }
            return this.$attrs.value.value || this.$attrs.value.key;
        },
    },
    created() {
        if (this.$attrs.multiselect) {
            this.$attrs.value.forEach((option) => {
                this.selectedOptions[option.id] = { ...option };
            });
        } else if (this.$attrs.value.id || this.$attrs.value.id === 0) {
            this.selectedOptions = { [this.$attrs.value.id]: { ...this.$attrs.value } };
        }
    },
    methods: {
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onSearch(value) {
            this.$emit('search', value);
        },
        onClear() {
            this.selectedOptions = {};
            this.$emit('input', this.$attrs.multiselect ? [] : {
                id: '', key: '', value: '', hint: '',
            });
        },
        onSelectValue(value) {
            const { id } = value;

            if (this.$attrs.multiselect) {
                if (typeof this.selectedOptions[id] !== 'undefined') {
                    delete this.selectedOptions[id];
                } else {
                    this.selectedOptions[id] = value;
                }

                this.$emit('input', Object.values(this.selectedOptions));
            } else {
                this.selectedOptions = { [id]: value };

                this.$emit('input', value);
            }
        },
    },
};
</script>
