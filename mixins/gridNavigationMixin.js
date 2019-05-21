/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mapState, mapActions } from 'vuex';

export default {
    props: {
        row: {
            type: Number,
            required: true,
        },
        column: {
            type: Number,
            required: true,
        },
        isEditingAllowed: {
            type: Boolean,
            required: false,
            default: true,
        },
        isSelected: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data: () => ({
        isFocused: false,
        isAction: false,
    }),
    computed: {
        ...mapState('grid', {
            editingCellCoordinates: state => state.editingCellCoordinates,
        }),
        isEditing() {
            const { column, row } = this.editingCellCoordinates;

            return column === this.column && row === this.row;
        },
    },
    methods: {
        ...mapActions('grid', [
            'setEditingCellCoordinates',
        ]),
        setEditingCellState() {
            if (this.isEditing) {
                this.setEditingCellCoordinates();
            } else {
                this.setEditingCellCoordinates({ column: this.column, row: this.row });
            }
        },
        onFocus() {
            this.isFocused = true;
        },
        onFocusLost() {
            this.isFocused = false;
        },
        onClick() {
            if (!this.isEditing) {
                this.setEditingCellCoordinates();
            }
        },
        onDblClick() {
            if (this.isEditingAllowed && !this.isEditing) {
                const element = document.querySelector(`.keyboard-navigable-${this.column}-${this.row}`);
                element.blur();

                this.setEditingCellState();
            }
        },
        onKeyDown(event) {
            const { keyCode } = event;
            let element;

            // const test = this.$parent
            switch (keyCode) {
            case 13:
                // Key: ENTER
                if (this.isEditingAllowed) {
                    element = document.querySelector(`.keyboard-navigable-${this.column}-${this.row}`);
                    this.setEditingCellState();
                    if (!this.isFocused) {
                        element.focus();
                    }
                    this.isAction = !this.isAction;
                }
                event.preventDefault();
                break;
            case 37:
                // Key: LEFT
                element = document.querySelector(`.keyboard-navigable-${this.column - 1}-${this.row}`);
                this.setEditingCellCoordinates();
                event.preventDefault();
                break;
            case 38:
                // Key: UP
                element = document.querySelector(`.keyboard-navigable-${this.column}-${this.row - 1}`);
                this.setEditingCellCoordinates();
                event.preventDefault();
                break;
            case 39:
            case 9:
                // Key: RIGHT || TAB
                element = document.querySelector(`.keyboard-navigable-${this.column + 1}-${this.row}`);
                if (!element) {
                    // We get out of bounds - go to the next line
                    element = document.querySelector(`.keyboard-navigable-0-${this.row + 1}`);
                }
                this.setEditingCellCoordinates();
                event.preventDefault();
                break;
            case 40:
                // Key: DOWN
                element = document.querySelector(`.keyboard-navigable-${this.column}-${this.row + 1}`);
                this.setEditingCellCoordinates();
                event.preventDefault();
                break;
            default: break;
            }

            if (keyCode !== 13) {
                if (element) {
                    element.focus();
                }
            }
        },
    },
};
