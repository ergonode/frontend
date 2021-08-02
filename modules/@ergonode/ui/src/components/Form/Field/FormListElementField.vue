/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li :class="['form-list-element-field', { 'form-list-element-field--disabled': disabled }]">
        <IconDelete
            class="form-list-element-field__delete-field"
            :fill-color="fillColor"
            @click.native="onRemoveField" />
        <slot />
    </li>
</template>

<script>
import {
    GRAPHITE,
    GREY,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'FormListElementField',
    props: {
        /**
         * The key of the field used for emitting
         */
        fieldKey: {
            type: [
                Number,
                String,
            ],
            required: true,
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        fillColor() {
            return this.disabled ? GREY : GRAPHITE;
        },
    },
    methods: {
        onRemoveField() {
            if (!this.disabled) {
                this.$emit('remove', this.fieldKey);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .form-list-element-field {
        $field: &;

        display: grid;
        grid-template-columns: 32px auto;
        align-items: center;

        &--disabled {
            #{$field}__delete-field {
                cursor: not-allowed;
            }
        }

        &:not(&--disabled) {
            #{$field}__delete-field {
                cursor: pointer;
            }
        }
    }
</style>
