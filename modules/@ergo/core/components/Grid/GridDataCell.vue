/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCell
        :editing-allowed="isEditingAllowed"
        :row="rowIndex"
        :column="columnIndex"
        :locked="!isEditingAllowed"
        :error="isErrorCell"
        :draft="isDraftCell"
        :action-cell="false"
        :selected="isSelected"
        :editing="isEditingCell"
        @edit="onEdit">
        <Component
            :is="infoComponent"
            v-if="!isEditingCell"
            v-bind="infoComponentProps" />
        <GridEditActivatorCell v-else>
            <GridEditDataCell
                :row-id="rowId"
                :multiselect="isMultiSelect"
                :type="column.type"
                :value="editValue"
                :language-code="column.language"
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
    components: {
        GridCell: () => import('@Core/components/Grid/GridCell'),
        GridEditActivatorCell: () => import('@Core/components/Grid/EditCells/GridEditActivatorCell'),
        GridEditDataCell: () => import('@Core/components/Grid/EditCells/GridEditDataCell'),
    },
    props: {
        namespace: {
            type: String,
            required: true,
        },
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
        editRoutingPath: {
            type: String,
            default: '',
        },
    },
    computed: {
        ...mapState('validations', {
            validationErrors: (state) => state.validationErrors,
        }),
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        gridState() {
            return this.$store.state[this.namespace];
        },
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
        isEditingCell() {
            const { row, column } = this.gridState.editingCellCoordinates;

            return this.rowIndex === row && this.columnIndex === column;
        },
        isErrorCell() {
            return typeof this.errorValue !== 'undefined';
        },
        isDraftCell() {
            return this.draftValue !== null;
        },
        infoComponent() {
            const { type } = this.column;

            switch (type) {
            case COLUMN_TYPE.LABEL:
                return () => import('@Core/components/Grid/PresentationCells/GridPresentationColorPickerCell');
            case COLUMN_TYPE.IMAGE:
                return () => import('@Core/components/Grid/PresentationCells/GridPresentationImageCell');
            case COLUMN_TYPE.CHECK:
                return () => import('@Core/components/Grid/EditCells/GridEditSelectRowCell');
            case COLUMN_TYPE.SELECT:
            case COLUMN_TYPE.MULTI_SELECT:
                return () => import('@Core/components/Grid/PresentationCells/GridPresentationSelectCell');
            default:
                return () => import('@Core/components/Grid/PresentationCells/GridPresentationCell');
            }
        },
        infoComponentProps() {
            const { type } = this.column;

            switch (type) {
            case COLUMN_TYPE.ACTION:
                return {
                    params: { id: this.rowId },
                    actionPath: this.editRoutingPath,
                    isSelected: this.isEditingCell,
                    row: this.rowIndex,
                };
            case COLUMN_TYPE.CHECK:
                return {
                    namespace: this.namespace,
                    row: this.rowIndex,
                };
            case COLUMN_TYPE.LABEL:
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
            default:
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
            }
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

            return errors;
        },
        options() {
            const { filter } = this.column;
            if (!filter || !filter.options) return null;

            const { options } = filter;
            const optionKeys = Object.keys(options);

            return optionKeys.map((key) => ({ key, value: options[key] }));
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
        onFocus(isFocused) {
            if (!isFocused) {
                this.$store.dispatch(`${this.namespace}/setEditingCellCoordinates`, {});
                this.$el.focus();
            }
        },
        onEdit(isEditing) {
            if (isEditing) {
                this.$store.dispatch(`${this.namespace}/setEditingCellCoordinates`, { column: this.columnIndex, row: this.rowIndex });
            } else {
                this.$store.dispatch(`${this.namespace}/setEditingCellCoordinates`, {});
            }
        },
        onUpdateDraft(value) {
            const isValueArray = Array.isArray(value);
            if ((value === '' || (isValueArray && value.length === 0)) && this.draft) {
                this.removeDraftValue({ productId: this.rowId, attributeId: this.column.id });
            }

            if (this.isSelectKind) {
                if (isValueArray) {
                    if (this.draftValue
                        && isArrayEqualToArray(
                            value.map((val) => val.key),
                            this.draftValue.map((val) => val.key),
                        )) return;
                    if (this.draftValue === null
                        && isArrayEqualToArray(
                            value.map((val) => val.key),
                            this.cellData.map((val) => val.key),
                        )) return;
                } else if (this.cellData.key === value.key) return;
            } else if (this.cellData.value === value) return;

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
