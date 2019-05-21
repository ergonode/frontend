/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="[
            'data-cell',
            {
                'data-cell--error': isError,
                'data-cell--success': isDraft,
                'data-cell--locked': isLocked,
                'data-cell--focused': isFocused,
            },
        ]">
        <Icon
            v-if="isDraft || isLocked || isError"
            :icon="informationIconSprite"
            class="data-cell__icon" />
        <GridEditableCell
            v-if="isEditingState"
            :is-select-kind="isSelectKind"
            :is-multi-select="isMultiSelect"
            :type="columnType"
            :value="draftValue"
            :options="options"
            :error-messages="errorMessages"
            @updateDraft="updateDraftWrapper" />
        <Component
            :is="displayingCell"
            v-else
            v-bind="displayingCellData" />
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
    name: 'GridDataCell',
    components: {
        Icon: () => import('~/components/Icon/Icon'),
        GridEditableCell: () => import('~/components/Grid/GridEditableCell'),
    },
    props: {
        draft: {
            type: Object,
            required: false,
            default: null,
        },
        actionPath: {
            type: String,
            required: true,
        },
        columnType: {
            type: String,
            required: true,
        },
        isFocused: {
            type: Boolean,
            required: true,
        },
        isEditing: {
            type: Boolean,
            required: true,
        },
        isAction: {
            type: Boolean,
            required: true,
        },
        isEditable: {
            type: Boolean,
            required: true,
        },
        row: {
            type: Number,
            required: true,
        },
        cellValue: {
            type: [String, Number, Array, Boolean],
            required: false,
            default: '',
        },
        rowId: {
            type: String,
            required: true,
        },
        filter: {
            type: Object,
            required: false,
            default: () => {},
        },
        columnId: {
            type: String,
            required: true,
        },
        languageCode: {
            type: String,
            required: false,
            default: null,
        },
        elementId: {
            type: String,
            required: false,
            default: null,
        },
    },
    data: () => ({
        isEditingCell: false,
    }),
    computed: {
        ...mapState('validations', {
            validationErrors: state => state.validationErrors,
        }),
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        isEditingState() {
            return this.isEditing && this.columnType !== 'CHECK' && this.columnType !== 'ACTION';
        },
        informationIconSprite() {
            if (this.isLocked) {
                return 'sprite-cell cell-locked';
            } if (this.isDraft) {
                return 'sprite-cell cell-draft';
            }
            return 'sprite-cell cell-error';
        },
        value() {
            if (!this.cellValue) return '';

            if (this.filter && this.filter.options) {
                if (Array.isArray(this.cellValue)) {
                    return this.cellValue.map(val => this.filter.options[val]);
                }
                return this.filter.options[this.cellValue];
            }

            return this.cellValue;
        },
        draftValue() {
            // Product draft ID
            if (this.draft && this.draft[this.columnId]) {
                return this.draft[this.columnId];
            }

            return this.value;
        },
        options() {
            if (!this.filter || !this.filter.options) return null;

            const optionKeys = Object.keys(this.filter.options);

            return optionKeys.map(key => ({ key, value: this.filter.options[key] }));
        },
        isSelectKind() {
            return this.columnType === 'SELECT' || this.columnType === 'MULTI_SELECT';
        },
        isMultiSelect() {
            return this.columnType === 'MULTI_SELECT';
        },
        errorMessages() {
            const { [`${this.rowId}/${this.elementId}`]: errors } = this.validationErrors;

            return errors;
        },
        isError() {
            return this.errorMessages || '';
        },
        isDraft() {
            if (!this.draft || this.isError) {
                return false;
            }

            if (this.draft[this.columnId]) {
                return this.draft[this.columnId] !== this.value;
            }

            return false;
        },
        isLocked() {
            return !this.isEditable && this.isFocused && !this.isActionKindCell && this.columnId !== 'extender';
        },
        isActionKindCell() {
            // For now we only have Edit, Mass Action
            return this.columnType === 'ACTION' || this.columnType === 'CHECK';
        },
        displayingCell() {
            switch (this.columnType) {
            case 'ACTION':
                return () => import('~/components/Grid/GridActionCell');
            case 'IMAGE':
                return () => import('~/components/Grid/GridImageCell');
            case 'CHECK':
                return () => import('~/components/Grid/GridCheckCell');
            default:
                return () => import('~/components/Grid/GridInfoCell');
            }
        },
        displayingCellData() {
            const notNullValue = this.draftValue !== null
                ? this.draftValue
                : '';

            switch (this.columnType) {
            case 'ACTION':
                return {
                    params: { id: this.rowId },
                    actionPath: this.actionPath,
                    isSelected: this.isAction,
                };
            case 'CHECK':
                return {
                    row: this.row,
                    isSelected: this.isAction,
                };
            default:
                return {
                    value: String(notNullValue),
                    isSelectKind: this.isSelectKind,
                    isEditable: this.isEditable,
                };
            }
        },
    },
    watch: {
        isEditing() {
            if (this.isEditing) {
                if (!this.draft) {
                    // If we doesn't have draft, fetch it
                    this.getDraft({
                        id: this.rowId,
                        languageCode: this.languageCode || this.userLanguageCode,
                        onError: () => {},
                    });
                }
            }
        },
    },
    methods: {
        ...mapActions('gridDraft', [
            'getDraft',
            'updateDraftValue',
        ]),
        ...mapActions('grid', [
            'setEditingCellCoordinates',
        ]),
        updateDraftWrapper(newValue) {
            // We won't update draft value if it is the same as original value of product
            if (newValue !== this.value || newValue !== this.draftValue) {
                this.setEditingCellCoordinates();
                this.updateDraftValue({
                    productId: this.rowId,
                    columnId: this.columnId,
                    elementId: this.elementId,
                    value: newValue,
                    languageCode: this.userLanguageCode,
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .data-cell {
        position: relative;
        display: flex;
        flex: 1;
        height: 100%;

        &__icon {
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: 1;
            display: flex;
        }

        &--success {
            background-color: $lightGreen;
        }

        &--error {
            background-color: $lightRed;
            box-shadow: inset 0 0 0 2px $error;
        }

        &--focused {
            box-shadow: inset 0 0 0 2px $primary;
        }

        &--locked {
            box-shadow: inset 0 0 0 2px $lightGraphite;
        }
    }
</style>
