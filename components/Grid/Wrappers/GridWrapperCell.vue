/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCell
        :editing-allowed="column.editable || isActionCell"
        :row="rowIndex"
        :column="columnIndex"
        :locked="isLockedCell"
        :error="isErrorCell"
        :draft="isDraftCell"
        :action-cell="isActionCell"
        :selected="isSelected"
        :on-edit="onEdit">
        <template v-if="!isExtenderColumn">
            <Component
                :is="infoComponent"
                v-if="!isEditingCell || isActionCell"
                v-bind="infoComponentProps" />
            <GridEditActivatorCell
                v-else
                :store-namespace="storeNamespace"
                :is-select-kind="isSelectKind"
                :is-multi-select="isMultiSelect"
                :type="column.type"
                :value="draftValue || row[column.id] || ''"
                :options="options"
                :parameters="parameters"
                :error-messages="errorValue"
                @updateValue="onUpdateDraft" />
        </template>
    </GridCell>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { isArrayEqualToArray } from '~/model/arrayWrapper';
import { hasParams } from '~/model/attributes/AttributeTypes';

export default {
    name: 'GridWrapperCell',
    components: {
        GridCell: () => import('~/components/Grid/GridCell'),
        GridEditActivatorCell: () => import('~/components/Grid/EditCells/GridEditActivatorCell'),
    },
    props: {
        storeNamespace: {
            type: String,
            required: true,
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
        row: {
            type: Object,
            required: true,
        },
        isSelected: {
            type: Boolean,
            required: false,
            default: false,
        },
        draft: {
            type: Object,
            required: false,
            default: null,
        },
        editRoutingPath: {
            type: String,
            required: false,
            default: '',
        },
    },
    computed: {
        ...mapState('validations', {
            validationErrors: state => state.validationErrors,
        }),
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        gridState() {
            return this.$store.state[this.storeNamespace];
        },
        isExtenderColumn() {
            return this.column.id === 'extender';
        },
        isEditingCell() {
            const { row, column } = this.gridState.editingCellCoordinates;

            return this.rowIndex === row && this.columnIndex === column;
        },
        isActionCell() {
            const { type } = this.column;

            return type === 'CHECK' || type === 'ACTION';
        },
        isLockedCell() {
            const { editable } = this.column;

            return !editable && !this.isActionCell;
        },
        isErrorCell() {
            return typeof this.errorValue !== 'undefined';
        },
        isDraftCell() {
            return this.draftValue !== null;
        },
        isSelectKind() {
            const { type } = this.column;

            return type === 'SELECT' || type === 'MULTI_SELECT';
        },
        isMultiSelect() {
            const { type } = this.column;

            return type === 'MULTI_SELECT';
        },
        infoComponent() {
            const { type } = this.column;

            switch (type) {
            case 'ACTION':
                return () => import('~/components/Grid/EditCells/GridEditRowCell');
            case 'IMAGE':
                return () => import('~/components/Grid/GridImageCell');
            case 'CHECK':
                return () => import('~/components/Grid/GridCheckCell');
            case 'SELECT':
            case 'MULTI_SELECT':
                return () => import('~/components/Grid/GridSelectInfoCell');
            default:
                return () => import('~/components/Grid/GridInfoCell');
            }
        },
        infoComponentProps() {
            const { type } = this.column;
            const { id } = this.row;

            switch (type) {
            case 'ACTION':
                return {
                    params: { id },
                    actionPath: this.editRoutingPath,
                    isSelected: this.isEditingCell,
                    row: this.rowIndex,
                };
            case 'CHECK':
                return {
                    storeNamespace: this.storeNamespace,
                    row: this.rowIndex,
                };
            default:
                if (this.parsedDraftValue === null) return { value: this.cellValue };

                return { value: this.parsedDraftValue };
            }
        },
        cellValue() {
            const value = this.row[this.column.id];
            const { filter } = this.column;

            if (typeof value === 'undefined' || value === null) return '';
            if (filter && filter.options) {
                const { options } = filter;

                if (Array.isArray(value)) {
                    return value.map(key => options[key] || 'No translation').join(', ');
                }
                if (typeof options[value] !== 'undefined') {
                    return options[value] || 'No translation';
                }
            }

            if (typeof value === 'boolean') return value ? 'Yes' : 'No';

            return value;
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
                    const value = this.draft[this.column.id][languageCode];

                    if (Array.isArray(value)) {
                        return value.map(val => options[val] || 'No translation').join(', ');
                    }
                    if (typeof options[value] !== 'undefined') {
                        return options[value] || 'No translation';
                    }
                }

                return this.draft[this.column.id][languageCode];
            }

            return null;
        },
        errorValue() {
            const { id } = this.row;
            const { element_id: elementId } = this.column;
            const { [`${id}/${elementId}`]: errors } = this.validationErrors;

            return errors;
        },
        options() {
            const { filter } = this.column;
            if (!filter || !filter.options) return null;

            const { options } = filter;
            const optionKeys = Object.keys(options);

            return optionKeys.map(key => ({ key, value: options[key] }));
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
            'updateDraftValue',
        ]),
        onEdit(isEditing) {
            if (this.column.type === 'CHECK') {
                this.$store.dispatch(`${this.storeNamespace}/setSelectedRow`, { row: this.rowIndex, value: isEditing });
            } else {
                this.$store.dispatch(`${this.storeNamespace}/setEditingCellCoordinates`, isEditing
                    ? { column: this.columnIndex, row: this.rowIndex }
                    : {});
            }
        },
        onUpdateDraft(value) {
            const cellValue = this.row[this.column.id] || '';

            if (cellValue === value
                || (Array.isArray(value) && isArrayEqualToArray(value, cellValue))) return;

            this.updateDraftValue({
                productId: this.row.id,
                columnId: this.column.id,
                elementId: this.column.element_id,
                value,
                languageCode: this.column.language || this.userLanguageCode,
            });
        },
    },
};
</script>
