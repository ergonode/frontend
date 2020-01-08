/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCell
        :row="rowIndex"
        :column="columnIndex"
        :locked="!isEditingAllowed"
        :error="errorValue !== null"
        :draft="draftValue !== null"
        :spacebar-edition="false"
        :copyable="isEditingAllowed"
        :selected="isSelected"
        @copy="onDataCopy">
        <template #default="{ isEditing }">
            <Component
                :is="infoComponent"
                v-if="!isEditing"
                v-bind="infoComponentProps" />
            <GridEditActivatorCell v-else>
                <GridEditDataCell
                    :row-id="rowId"
                    :multiselect="isMultiSelect"
                    :type="column.type"
                    :value="editValue"
                    :options="options"
                    :clearable="false"
                    :colors="column.colors || null"
                    :parameters="parameters"
                    :error-messages="errorValue"
                    :fixed-width="$el.offsetWidth"
                    :fixed-height="$el.offsetHeight"
                    @focus="onFocus"
                    @updateValue="onUpdateDraft" />
            </GridEditActivatorCell>
        </template>
    </GridCell>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { isArrayEqualToArray } from '~/model/arrayWrapper';
import { hasParams } from '~/model/attributes/AttributeTypes';
import { getKeyByValue } from '~/model/objectWrapper';
import { COLUMN_TYPE } from '~/defaults/grid';

export default {
    name: 'GridDataCell',
    inject: ['setEditingCellCoordinates'],
    components: {
        GridCell: () => import('~/core/components/Grid/GridCell'),
        GridEditActivatorCell: () => import('~/core/components/Grid/EditCells/GridEditActivatorCell'),
        GridEditDataCell: () => import('~/core/components/Grid/EditCells/GridEditDataCell'),
    },
    props: {
        editingPrivilegeAllowed: {
            type: Boolean,
            default: true,
        },
        rowIndex: {
            type: Number,
            required: true,
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        column: {
            type: Object,
            required: true,
        },
        rowId: {
            type: [String, Number],
            required: true,
        },
        rowIds: {
            type: Array,
            required: true,
        },
        cellData: {
            type: [Array, Object],
            required: true,
        },
        isSelected: {
            type: Boolean,
            default: false,
        },
        draft: {
            type: Object,
            default: null,
        },
    },
    computed: {
        ...mapState('validations', {
            validationErrors: (state) => state.validationErrors,
        }),
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        isSelectKind() {
            return this.column.type === COLUMN_TYPE.SELECT
                || this.column.type === COLUMN_TYPE.MULTI_SELECT
                || this.column.type === COLUMN_TYPE.LABEL;
        },
        isMultiSelect() {
            return this.column.type === COLUMN_TYPE.MULTI_SELECT;
        },
        isEditingAllowed() {
            return this.column.editable && this.editingPrivilegeAllowed;
        },
        infoComponent() {
            const { type } = this.column;

            switch (type) {
            case COLUMN_TYPE.LABEL:
                return () => import('~/core/components/Grid/PresentationCells/GridPresentationColorPickerCell');
            case COLUMN_TYPE.IMAGE:
                return () => import('~/core/components/Grid/PresentationCells/GridPresentationImageCell');
            case COLUMN_TYPE.SELECT:
            case COLUMN_TYPE.MULTI_SELECT:
                return () => import('~/core/components/Grid/PresentationCells/GridPresentationSelectCell');
            default:
                return () => import('~/core/components/Grid/PresentationCells/GridPresentationCell');
            }
        },
        infoComponentProps() {
            const { type } = this.column;

            if (type === COLUMN_TYPE.LABEL) {
                if (this.parsedDraftValue === null) {
                    return {
                        cellData: this.cellData,
                        colors: this.column.colors,
                    };
                }

                return {
                    cellData: {
                        key: getKeyByValue(this.column.filter.options, this.parsedDraftValue),
                        value: this.parsedDraftValue,
                    },
                    colors: this.column.colors,
                };
            }

            if (this.parsedDraftValue === null) {
                if (Array.isArray(this.cellData)) {
                    return {
                        value: this.cellData.map((data) => data.value || `#${data.key}`).join(', '),
                    };
                }

                return {
                    value: !this.cellData.value && !this.cellData.key
                        ? ''
                        : this.cellData.value || `#${this.cellData.key}`,
                };
            }

            return { value: this.parsedDraftValue };
        },
        draftValue() {
            if (this.draft && typeof this.draft[this.column.id] !== 'undefined') {
                const languageCode = this.column.language || this.userLanguageCode;

                return this.draft[this.column.id][languageCode];
            }

            return null;
        },
        parsedDraftValue() {
            const { filter } = this.column;

            if (this.draft && typeof this.draft[this.column.id] !== 'undefined') {
                const languageCode = this.column.language || this.userLanguageCode;

                if (filter && filter.options) {
                    const { options } = filter;
                    const draftValue = this.draft[this.column.id][languageCode];

                    if (Array.isArray(draftValue)) {
                        return draftValue.map((val) => options[val.key] || `#${val.key}`).join(', ');
                    }

                    if (draftValue.key) {
                        return options[draftValue.key] || `#${draftValue.key}`;
                    }

                    return '';
                }

                return this.draft[this.column.id][languageCode];
            }

            return null;
        },
        editValue() {
            return this.draftValue || (this.isSelectKind ? this.cellData : this.cellData.value);
        },
        errorValue() {
            const { element_id: elementId } = this.column;
            const { [`${this.rowId}/${elementId}`]: errors } = this.validationErrors;

            return errors || null;
        },
        options() {
            const { filter } = this.column;
            if (!filter || !filter.options) return null;

            const { options } = filter;
            const optionKeys = Object.keys(options);

            return optionKeys.map((key) => ({
                id: key, key, value: options[key], hint: options[key] ? `#${key} ${this.column.language}` : '',
            }));
        },
        parameters() {
            if (hasParams(this.column.type)) {
                return this.column.parameters;
            }

            return null;
        },
    },
    methods: {
        ...mapActions('gridDraft', [
            'removeDraftValue',
            'updateDraftValue',
            'addDraftValue',
        ]),
        onDataCopy({ from, to }) {
            const rowIndex = this.rowIds.findIndex((id) => id === this.rowId);
            const offset = from.row - rowIndex;

            if (from.row < to.row) {
                for (let i = from.row - offset + 1; i < to.row - offset + 1; i += 1) {
                    if (this.rowIds[i]) {
                        this.updateDraftValue({
                            productId: this.rowIds[i],
                            columnId: this.column.id,
                            elementId: this.column.element_id,
                            value: this.editValue,
                            languageCode: this.column.language || this.userLanguageCode,
                        });
                    }
                }
            } else {
                for (let i = to.row - offset; i < from.row - offset; i += 1) {
                    if (this.rowIds[i]) {
                        this.updateDraftValue({
                            productId: this.rowIds[i],
                            columnId: this.column.id,
                            elementId: this.column.element_id,
                            value: this.editValue,
                            languageCode: this.column.language || this.userLanguageCode,
                        });
                    }
                }
            }
        },
        onFocus(isFocused) {
            if (!isFocused) {
                this.setEditingCellCoordinates();
                this.$el.focus();
            }
        },
        onUpdateDraft(value) {
            if ((value.id === '' || value.length === 0) && this.draft !== null) {
                this.removeDraftValue({
                    productId: this.rowId,
                    attributeId: this.column.id,
                });
                return;
            }

            if (Array.isArray(value)) {
                const valueKeys = value.map((val) => val.key);
                if (this.draftValue
                    && isArrayEqualToArray(
                        valueKeys,
                        this.draftValue.map((val) => val.key),
                    )) return;
                if (this.draftValue === null
                    && isArrayEqualToArray(
                        valueKeys,
                        this.cellData.map((val) => val.key),
                    )) return;
            } else if ((this.cellData.key && this.cellData.key === value.key)
                || this.cellData.value === value) return;

            this.updateDraftValue({
                productId: this.rowId,
                columnId: this.column.id,
                elementId: this.column.element_id,
                value,
                languageCode: this.column.language || this.userLanguageCode,
            });
        },
    },
};
</script>
