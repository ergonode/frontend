/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridActivatorEditCell>
        <TranslationSelect
            :style="{ width: `${width}px`, height: `${height}px` }"
            :value="localValue"
            :autofocus="true"
            :solid="true"
            :small="true"
            :clearable="true"
            :options="mappedOptions"
            :error-messages="errorMessages"
            @focus="onFocus"
            @input="onValueChange" />
    </GridActivatorEditCell>
</template>

<script>
import GridActivatorEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridActivatorEditCell';
import TranslationSelect from '@Core/components/Inputs/Select/TranslationSelect';

export default {
    name: 'GridSelectEditCell',
    inject: ['setEditingCellCoordinates'],
    components: {
        GridActivatorEditCell,
        TranslationSelect,
    },
    props: {
        value: {
            type: String,
            default: '',
        },
        options: {
            type: Object,
            default: () => ({}),
        },
        languageCode: {
            type: String,
            default: 'EN',
        },
        errorMessages: {
            type: String,
            default: '',
        },
        width: {
            type: Number,
            default: 0,
        },
        height: {
            type: Number,
            default: 0,
        },
    },
    data() {
        let localValue = null;

        if (this.value) {
            const { code, label } = this.options[this.value];

            localValue = {
                id: this.value,
                key: code,
                value: label,
                hint: label
                    ? `#${code} ${this.languageCode}`
                    : '',
            };
        }

        return {
            localValue,
        };
    },
    computed: {
        mappedOptions() {
            const optionKeys = Object.keys(this.options);

            return optionKeys.map(key => ({
                id: key,
                key: this.options[key].code,
                value: this.options[key].label,
                hint: this.options[key].label
                    ? `#${this.options[key].code} ${this.languageCode}`
                    : '',
            }));
        },
    },
    methods: {
        onFocus(isFocused) {
            if (!isFocused) {
                if (this.localValue.id !== this.value) {
                    this.$emit('input', this.localValue.id || this.localValue);
                }
                this.setEditingCellCoordinates();
            }
        },
        onValueChange(value) {
            this.localValue = value;
        },
    },
};
</script>
