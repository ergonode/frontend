/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell @edit="onEditCell">
        <GridSelectEditContentCell :style="positionStyle">
            <TranslationSelect
                v-model="localValue"
                :autofocus="true"
                :size="smallSize"
                :disabled="disabled"
                :clearable="true"
                :options="options"
                :error-messages="errorMessages"
                @focus="onFocus">
                <template #prepend>
                    <div
                        v-if="localValue"
                        class="presentation-badge">
                        <PointBadge :color="colors[localValue.id].color" />
                    </div>
                </template>
                <template #option="{ option }">
                    <ListElementAction :size="smallSize">
                        <div class="presentation-badge-option">
                            <PointBadge :color="colors[option.id].color" />
                        </div>
                    </ListElementAction>
                    <ListElementDescription>
                        <ListElementTitle
                            :size="smallSize"
                            :hint="option.hint"
                            :title="option.value || `#${option.key}`" />
                    </ListElementDescription>
                </template>
            </TranslationSelect>
        </GridSelectEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import PointBadge from '@Core/components/Badges/PointBadge';
import GridSelectEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridSelectEditContentCell';
import ListElementAction from '@Core/components/List/ListElementAction';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import TranslationSelect from '@Core/components/Select/TranslationSelect';
import {
    SIZE,
} from '@Core/defaults/theme';
import gridEditCellMixin from '@Core/mixins/grid/cell/gridEditCellMixin';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'GridLabelEditCell',
    components: {
        GridSelectEditContentCell,
        TranslationSelect,
        ListElementDescription,
        ListElementTitle,
        ListElementAction,
        PointBadge,
    },
    mixins: [
        gridEditCellMixin,
    ],
    props: {
        colors: {
            type: Object,
            default: () => ({}),
        },
    },
    async fetch() {
        this.options = await this.getProductWorkflowOptions({
            id: this.rowId,
            languageCode: this.languageCode,
        });

        this.localValue = this.options.find(option => option.id === this.value);
    },
    data() {
        return {
            options: [],
            localValue: null,
        };
    },
    computed: {
        languageCode() {
            const columnIdParts = this.columnId.split(':');

            if (columnIdParts.length < 1) {
                return '';
            }

            return columnIdParts[1];
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    beforeDestroy() {
        if (this.localValue && this.localValue.id !== this.value) {
            this.$emit('cell-value', [
                {
                    value: this.localValue.id || this.localValue,
                    rowId: this.rowId,
                    columnId: this.columnId,
                    row: this.row,
                    column: this.column,
                },
            ]);
        }
    },
    methods: {
        ...mapActions('product', [
            'getProductWorkflowOptions',
        ]),
        onFocus(isFocused) {
            if (!isFocused) {
                this.onEditCell();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .presentation-badge {
        margin-right: 8px;
    }

    .presentation-badge-option {
        margin: 0 4px;
    }
</style>
