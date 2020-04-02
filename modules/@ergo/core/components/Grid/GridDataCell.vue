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
        :copyable="isEditingAllowed"
        :selected="isSelected"
        @copy="onDataCopy">
        <template #default="{ isEditing }">
            <Component
                :is="infoComponent"
                v-bind="infoComponentProps" />
            <GridEditActivatorCell v-if="isEditing">
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
import { hasParams } from '@Attributes/models/attributeTypes';
import { COLUMN_TYPE } from '@Core/defaults/grid';
import GridPresentationCell from '@Core/components/Grid/PresentationCells/GridPresentationCell';

const getMappedDraftValues = () => import('@Core/models/mappers/getMappedDraftValues');

export default {
    name: 'GridDataCell',
    inject: ['setEditingCellCoordinates'],
    components: {
        GridCell: () => import('@Core/components/Grid/GridCell'),
        GridEditActivatorCell: () => import('@Core/components/Grid/EditCells/GridEditActivatorCell'),
        GridEditDataCell: () => import('@Core/components/Grid/EditCells/GridEditDataCell'),
    },
    props: {
        isEditable: {
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
            validationErrors: state => state.validationErrors,
        }),
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        isMultiSelect() {
            return this.column.type === COLUMN_TYPE.MULTI_SELECT;
        },
        isEditingAllowed() {
            return this.column.editable && this.isEditable;
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
                if (this.isEditingAllowed) {
                    return () => import('@Core/components/Grid/PresentationCells/GridPresentationSelectCell');
                }
                return GridPresentationCell;
            default:
                return GridPresentationCell;
            }
        },
        infoComponentProps() {
            const { type } = this.column;

            const value = this.draftValue === null
                ? this.cellData.presentationValue
                : this.draftValue.presentationValue;

            if (type === COLUMN_TYPE.LABEL) {
                const color = this.draftValue === null
                    ? this.column.colors[this.cellData.editValue.key]
                    : this.column.colors[this.draftValue.editValue.key];

                return {
                    value,
                    color,
                };
            }

            return { value, suffix: this.cellData.suffix };
        },
        draftValue() {
            if (this.draft && typeof this.draft[this.column.id] !== 'undefined') {
                return this.draft[this.column.id];
            }

            return null;
        },
        editValue() {
            if (this.draftValue) return this.draftValue.editValue;

            return this.cellData.editValue;
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

            return optionKeys.map(key => ({
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
        ]),
        onDataCopy({ from, to }) {
            const rowIndex = this.rowIds.findIndex(id => id === this.rowId);
            const offset = from.row - rowIndex;

            getMappedDraftValues().then((response) => {
                const {
                    apiData,
                    presentationValue,
                    editValue,
                } = response.default(this.editValue);

                if (from.row < to.row) {
                    for (let i = from.row - offset + 1; i < to.row - offset + 1; i += 1) {
                        if (this.rowIds[i]) {
                            this.updateDraftValue({
                                productId: this.rowIds[i],
                                columnId: this.column.id,
                                elementId: this.column.element_id,
                                apiData,
                                presentationValue,
                                editValue,
                                suffix: this.cellData.suffix,
                                prefix: this.cellData.prefix,
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
                                apiData,
                                presentationValue,
                                editValue,
                                suffix: this.cellData.suffix,
                                prefix: this.cellData.prefix,
                                languageCode: this.column.language || this.userLanguageCode,
                            });
                        }
                    }
                }
            });
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
                    columnId: this.column.id,
                });

                return;
            }

            getMappedDraftValues().then((response) => {
                const {
                    apiData,
                    presentationValue,
                    editValue,
                } = response.default(value);

                if ((this.cellData.presentationValue === '' && presentationValue !== '')
                    || (this.cellData.presentationValue !== presentationValue
                        || (this.draftValue
                            && this.draftValue.presentationValue !== presentationValue))) {
                    this.updateDraftValue({
                        productId: this.rowId,
                        columnId: this.column.id,
                        elementId: this.column.element_id,
                        apiData,
                        presentationValue,
                        editValue,
                        suffix: this.cellData.suffix,
                        prefix: this.cellData.prefix,
                        languageCode: this.column.language || this.userLanguageCode,
                    });
                }
            });
        },
    },
};
</script>
