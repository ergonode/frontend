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
        :action-cell="isActionCell"
        :selected="isSelected"
        :editing="isEditingCell"
        @edit="onEdit">
        <template v-if="!isExtenderColumn">
            <Component
                :is="infoComponent"
                v-if="!isEditingCell || isActionCell"
                v-bind="infoComponentProps" />
            <GridEditActivatorCell
                v-else
                :store-namespace="storeNamespace"
                :is-multi-select="isMultiSelect"
                :type="column.type"
                :value="editValue"
                :options="options"
                :parameters="parameters"
                :error-messages="errorValue"
                :fixed-width="$el.offsetWidth"
                @updateValue="onUpdateDraft" />
        </template>
    </GridCell>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { isArrayEqualToArray } from '~/model/arrayWrapper';
import { hasParams } from '~/model/attributes/AttributeTypes';
import { getKeyByValue } from '~/model/objectWrapper';

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
            type: Object,
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
    beforeCreate() {
        const { type, editable, id } = this.$options.propsData.column;

        this.isActionCell = type === 'CHECK' || type === 'ACTION';
        this.isExtenderColumn = id === 'extender';
        this.isSelectKind = type === 'SELECT' || type === 'MULTI_SELECT' || type === 'LABEL';
        this.isMultiSelect = type === 'MULTI_SELECT';
        this.isEditingAllowed = (editable && this.$options.propsData.editingPrivilegeAllowed)
            || this.isActionCell;
    },
    beforeDestroy() {
        delete this.isActionCell;
        delete this.isExtenderColumn;
        delete this.isSelectKind;
        delete this.isMultiSelect;
        delete this.isEditingAllowed;
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
            case 'ACTION':
                return () => import('~/components/Grid/EditCells/GridEditRowCell');
            case 'LABEL':
                return () => import('~/components/Grid/GridStatusInfoCell');
            case 'IMAGE':
                return () => import('~/components/Grid/GridImageCell');
            case 'CHECK':
                return () => import('~/components/Grid/EditCells/GridEditSelectRowCell');
            case 'SELECT':
            case 'MULTI_SELECT':
                return () => import('~/components/Grid/GridSelectInfoCell');
            default:
                return () => import('~/components/Grid/GridInfoCell');
            }
        },
        infoComponentProps() {
            const { type } = this.column;

            switch (type) {
            case 'ACTION':
                return {
                    params: { id: this.rowId },
                    actionPath: this.editRoutingPath,
                    isSelected: this.isEditingCell,
                    row: this.rowIndex,
                };
            case 'CHECK':
                return {
                    storeNamespace: this.storeNamespace,
                    row: this.rowIndex,
                };
            case 'LABEL':
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
                if (this.parsedDraftValue === null) return { value: this.cellData.value };
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
        editValue() {
            return this.draftValue || (this.isSelectKind ? this.cellData.key : this.cellData.value);
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
            'removeDraftValue',
            'updateDraftValue',
            'addDraftValue',
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
            const isValueArray = Array.isArray(value);
            if ((value === '' || (isValueArray && value.length === 0)) && this.draft) {
                this.removeDraftValue({ productId: this.rowId, attributeId: this.column.id });
            }

            if ((this.isSelectKind
                && ((isValueArray && isArrayEqualToArray(value, this.cellData.key))
                    || this.cellData.key === value))
                || this.cellData.value === value
            ) return;

            this.updateDraftValue({
                productId: this.rowId,
                columnId: this.column.id,
                // FIXME: BE - two different values!!!
                elementId: this.column.element_id || this.column.attribute_id,
                value,
                languageCode: this.column.language || this.userLanguageCode,
            });
        },
    },
};
</script>
