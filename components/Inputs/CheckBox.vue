/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

<template>
    <div class="checkbox">
        <input
            id="checkbox_1"
            type="checkbox"
            @input="onValueChange">
        <label for="checkbox_1">TEST</label>
    </div>
</template>

<script>

export default {
    name: 'CheckBox',
    props: {
        value: {
            type: [Boolean, Number],
            default: false,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        iconClass() {
            if (this.isDisabled) {
                if (this.value) {
                    return 'sprite-checkbox checkbox-checked--disabled';
                }
                return 'sprite-checkbox checkbox-default--disabled';
            }

            if (Number.isInteger(this.value)) {
                // Is multi state checkbox
                switch (this.value) {
                case 0:
                    return 'sprite-checkbox checkbox-default';
                case 1:
                    return 'sprite-checkbox checkbox-checked';
                default:
                    return 'sprite-checkbox checkbox-checked-any';
                }
            }

            return this.value
                ? 'sprite-checkbox checkbox-checked'
                : 'sprite-checkbox checkbox-default';
        },
    },
    methods: {
        onValueChange() {
            console.log('value changed');
        },
        onClick() {
            if (!this.isDisabled) {
                if (Number.isInteger(this.value)) {
                    if (this.value === 2) {
                        this.$emit('input', 0);
                    } else {
                        this.$emit('input', this.value === 0 ? this.value + 1 : this.value - 1);
                    }
                } else {
                    this.$emit('input', !this.value);
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .checkbox {
        position: relative;
        display: flex;
        align-items: center;

        & input[type="checkbox"] {
            position: absolute;
            opacity: 0;
        }

        & label {
            position: relative;
            padding-left: 22px;

            &::before, &::after {
                position: absolute;
                content: "";
            }

            &::before {
                top: 0;
                left: 0;
                width: 16px;
                height: 16px;
                border: 1px solid $grey;
            }
        }
    }

    /*.checkbox label::before,*/
    /*.checkbox label::after {*/
    /*    position: absolute;*/
    /*    content: "";*/

    /*    !*Needed for the line-height to take effect*!*/
    /*    display: inline-block;*/
    /*}*/

    /*Outer box of the fake checkbox*/
    /*.checkbox label::before{*/
    /*    height: 16px;*/
    /*    width: 16px;*/

    /*    border: 1px solid;*/
    /*    left: 0px;*/

    /*    top: 3px;*/
    /*}*/

    /*Checkmark of the fake checkbox*/
    /*.checkbox label::after {*/
    /*    height: 5px;*/
    /*    width: 9px;*/
    /*    border-left: 2px solid;*/
    /*    border-bottom: 2px solid;*/

    /*    transform: rotate(-45deg);*/

    /*    left: 4px;*/
    /*    top: 7px;*/
    /*}*/

    /*Hide the checkmark by default*/
    /*.checkbox input[type="checkbox"] + label::after {*/
    /*    content: none;*/
    /*}*/

    /*Unhide on the checked state*/
    /*.checkbox input[type="checkbox"]:checked + label::after {*/
    /*    content: "";*/
    /*}*/

    /*Adding focus styles on the outer-box of the fake checkbox*/
    /*.checkbox input[type="checkbox"]:focus + label::before {*/
    /*    outline: rgb(59, 153, 252) auto 5px;*/
    /*}*/
</style>
