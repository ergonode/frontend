/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        v-bind="$attrs"
        :value="parsedValue"
        :options="options"
        @focus="onFocus"
        @input="onClear">
        <template #prepend>
            <slot name="prepend" />
        </template>
        <template #option="{ option }">
            <ListElement
                :key="option.id"
                :large="!$attrs.small && $attrs.regular"
                :selected="isSelected(option.id)"
                @click.native="onSelectValue(option)">
                <slot
                    name="option"
                    :option="option">
                    <ListElementAction
                        v-if="$attrs.multiselect"
                        :small="$attrs.small">
                        <CheckBox
                            :value="isChecked(option.id)"
                            @input="onSelectValue(option)" />
                    </ListElementAction>
                    <ListElementDescription>
                        <ListElementTitle
                            :small="$attrs.small"
                            :hint="option.name ? `#${option.id} ${languageCode}` : ''"
                            :title="option.name || `#${option.code}`" />
                    </ListElementDescription>
                </slot>
            </ListElement>
        </template>
    </Select>
</template>

<script>
import { isEmpty, removeFromObjectByKey } from '~/model/objectWrapper';

export default {
    name: 'TranslationSelect',
    inheritAttrs: false,
    components: {
        Select: () => import('@Core/components/Inputs/Select/Select'),
        ListElement: () => import('@Core/components/List/ListElement'),
        ListElementAction: () => import('@Core/components/List/ListElementAction'),
        ListElementDescription: () => import('@Core/components/List/ListElementDescription'),
        ListElementTitle: () => import('@Core/components/List/ListElementTitle'),
        CheckBox: () => import('@Core/components/Inputs/CheckBox'),
    },
    props: {
        languageCode: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            selectedOptions: {},
            options: [],
        };
    },
    created() {
        this.initSelectedOptions();
    },
    computed: {
        parsedValue() {
            if (!this.selectedOptions || isEmpty(this.selectedOptions)) {
                return this.$attrs.multiselect ? [] : null;
            }
            if (!this.$attrs.multiselect) {
                return this.selectedOptions.id;
            }
            return Object.keys(this.selectedOptions);
        },
    },
    methods: {
        isSelected(id) {
            return this.$attrs.multiselect || isEmpty(this.selectedOptions)
                ? false
                : id === this.selectedOptions.id;
        },
        isChecked(id) {
            return this.$attrs.multiselect ? typeof this.selectedOptions[id] !== 'undefined' : false;
        },
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onClear() {
            this.selectedOptions = {};

            this.$emit('input', this.$attrs.multiselect ? [] : { key: null });
        },
        initSelectedOptions() {
            this.options = this.$attrs.options.map((option) => ({
                id: option.key,
                name: option.value,
                code: option.code || option.key,
            }));

            if (this.$attrs.value) {
                if (!this.$attrs.multiselect) {
                    this.selectedOptions = this.options.find(
                        (option) => option.id === this.$attrs.value.key,
                    );
                } else {
                    this.selectedOptions = this.$attrs.value.reduce((acc, currentKey) => {
                        const newObject = acc;
                        newObject[currentKey.key] = this.options.find(
                            (option) => option.id === currentKey.key,
                        );
                        return newObject;
                    }, {});
                }
            }
        },
        onSelectValue({ id, code = null, name = null }) {
            if (!this.$attrs.multiselect) {
                this.selectedOptions = { id, name, code };
                this.$emit('input', { key: id, value: name });

                return false;
            }

            if (this.isChecked(id)) {
                this.selectedOptions = removeFromObjectByKey(this.selectedOptions, id);
            } else {
                this.selectedOptions = {
                    [id]: { name, code },
                    ...this.selectedOptions,
                };
            }
            this.$emit('input', Object.keys(this.selectedOptions).map(
                (key) => ({
                    key,
                    value: this.selectedOptions[key].name || this.selectedOptions[key].code,
                }),
            ));

            return true;
        },
    },
};
</script>
