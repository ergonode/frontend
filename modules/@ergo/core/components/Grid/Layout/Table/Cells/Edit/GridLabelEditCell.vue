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
            :options="options"
            :error-messages="errorMessages"
            @focus="onFocus"
            @input="onValueChange">
            <template #prepend>
                <div
                    v-if="localValue"
                    class="selected-badge">
                    <PointBadge :color="colors[localValue.id]" />
                </div>
            </template>
            <template #option="{ option }">
                <ListElementAction>
                    <PointBadge :color="colors[option.id]" />
                </ListElementAction>
                <ListElementDescription>
                    <ListElementTitle
                        :small="true"
                        :hint="option.hint"
                        :title="option.value || `#${option.key}`" />
                </ListElementDescription>
            </template>
        </TranslationSelect>
    </GridActivatorEditCell>
</template>

<script>
import PointBadge from '@Core/components/Badges/PointBadge';
import GridActivatorEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridActivatorEditCell';
import TranslationSelect from '@Core/components/Inputs/Select/TranslationSelect';
import ListElementAction from '@Core/components/List/ListElementAction';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';

export default {
    name: 'GridLabelEditCell',
    inject: ['setEditingCellCoordinates'],
    components: {
        GridActivatorEditCell,
        TranslationSelect,
        ListElementDescription,
        ListElementTitle,
        ListElementAction,
        PointBadge,
    },
    props: {
        value: {
            type: String,
            default: '',
        },
        colors: {
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
        rowId: {
            type: [String, Number],
            required: true,
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
        return {
            options: [],
            localValue: null,
        };
    },
    created() {
        this.$axios.$get(`${this.languageCode}/products/${this.rowId}`).then(({ workflow = [] }) => {
            this.options = workflow.map(e => ({
                id: e.code,
                key: e.code,
                value: e.name,
                hint: e.name
                    ? `#${e.code} ${this.languageCode}`
                    : '',
            }));

            this.localValue = this.options.find(option => option.id === this.value);
        });
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

<style lang="scss" scoped>
    .selected-badge {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 6px;
        margin-right: 2px;
    }
</style>
