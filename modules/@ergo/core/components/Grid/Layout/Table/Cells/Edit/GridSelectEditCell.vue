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
            :size="smallSize"
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
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    getMappedObjectOption,
    getMappedObjectOptions,
} from '@Core/models/mappers/translationsMapper';

export default {
    name: 'GridSelectEditCell',
    inject: [
        'setEditingCellCoordinates',
    ],
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
            localValue = getMappedObjectOption({
                option: {
                    id: this.value,
                    ...this.options[this.value],
                },
                languageCode: this.languageCode,
            });
        }

        return {
            localValue,
        };
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        mappedOptions() {
            return getMappedObjectOptions({
                options: this.options,
                languageCode: this.languageCode,
            });
        },
    },
    methods: {
        onFocus(isFocused) {
            if (!isFocused) {
                if (this.localValue && this.localValue.id !== this.value) {
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
