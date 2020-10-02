/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="classes"
        :style="formFieldPosition">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ProductTemplateFormField',
    props: {
        position: {
            type: Object,
            required: true,
        },
        size: {
            type: Object,
            required: true,
        },
        draft: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return [
                'template-form-field',
            ];
        },
        formFieldPosition() {
            const {
                x, y,
            } = this.position;
            const {
                width, height,
            } = this.size;
            const offset = 1;
            const fixedRow = y + offset;
            const fixedColumn = x + offset;

            return {
                gridArea: `${fixedRow} / ${fixedColumn} / ${fixedRow + height} / ${fixedColumn + width}`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .template-form-field {
        display: flex;
    }
</style>
