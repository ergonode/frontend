/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextField
        :value="localValue"
        :input="inputType"
        solid
        regular
        :label="label"
        :placeholder="placeholder"
        :error-messages="isError ? [' '] : null"
        :required="required"
        :disabled="disabled"
        :description="hint"
        @input="onValueChange">
        <template #append>
            <span
                class="suffix font--medium-14-20"
                v-text="suffix" />
        </template>
    </TextField>
</template>

<script>
import productTemplateElementMixin from '~/mixins/product/productTemplateElementMixin';

export default {
    name: 'ProductTemplateSingleLine',
    mixins: [productTemplateElementMixin],
    components: {
        TextField: () => import('~/core/components/Inputs/TextField'),
    },
    computed: {
        suffix() {
            if (this.parameters) {
                return Object.values(this.parameters).join(', ');
            }

            return null;
        },
        inputType() {
            if (this.parameters) {
                return { type: 'number' };
            }

            return { type: 'text' };
        },
    },
    watch: {
        value() {
            this.localValue = this.value;
        },
    },
};
</script>

<style lang="scss" scoped>
    .suffix {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: $GRAPHITE_DARK;
        margin-right: 4px;
    }
</style>
