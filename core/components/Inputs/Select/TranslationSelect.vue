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
                @click.native="onSelectValue(option)">
                <slot
                    name="option"
                    :option="option">
                    <ListElementAction
                        v-if="$attrs.multiselect"
                        :small="$attrs.small">
                        <CheckBox
                            :value="typeof selectedOptions[option.id] !== 'undefined'"
                            @input="onSelectValue(option)" />
                    </ListElementAction>
                    <ListElementDescription>
                        <ListElementTitle
                            :small="$attrs.small"
                            :hint="option.hint"
                            :title="option.value || `#${option.key}`" />
                    </ListElementDescription>
                </slot>
            </ListElement>
        </template>
    </Select>
</template>

<script>
import Select from '~/core/components/Inputs/Select/Select';

export default {
    name: 'TranslationSelect',
    inheritAttrs: false,
    components: {
        Select,
        ListElement: () => import('~/core/components/List/ListElement'),
        ListElementAction: () => import('~/core/components/List/ListElementAction'),
        ListElementDescription: () => import('~/core/components/List/ListElementDescription'),
        ListElementTitle: () => import('~/core/components/List/ListElementTitle'),
        CheckBox: () => import('~/core/components/Inputs/CheckBox'),
    },
    data() {
        return {
            selectedOptions: {},
        };
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
    computed: {
        parsedValue() {
            if (Array.isArray(this.$attrs.value)) {
                return this.$attrs.value.map((val) => val.value || `#${val.key}`);
            }
            return this.$attrs.value.value || this.$attrs.value.key;
        },
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
