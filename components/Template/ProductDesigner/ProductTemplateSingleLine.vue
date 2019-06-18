/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextField
        :value="localValue"
        solid
        :label="name"
        :placeholder="placeholder"
        :error-messages="isError ? [' '] : null"
        :required="required"
        @input="onValueChange">
        <div
            slot="appendIcon"
            class="horizontal-wrapper">
            <span>{{ suffix }}</span>
            <InfoHint
                v-if="hint && !isError"
                :hint="hint" />
            <ErrorHint
                v-if="isError"
                :hint="errorMessages" />
        </div>
    </TextField>
</template>

<script>
import baseProductTemplateElementMixin from '~/mixins/product/baseProductTemplateElementMixin';

export default {
    name: 'ProductTemplateSingleLine',
    mixins: [baseProductTemplateElementMixin],
    components: {
        TextField: () => import('~/components/Inputs/TextField'),
    },
    computed: {
        suffix() {
            if (this.parameters) {
                if (this.parameters.code) {
                    return this.parameters.code;
                }
                if (this.parameters.currency) {
                    return this.parameters.currency;
                }
                return '';
            }
            return '';
        },
    },
};
</script>

<style lang="scss" scoped>
    .horizontal-wrapper {
        display: flex;
        align-items: center;
    }
</style>
