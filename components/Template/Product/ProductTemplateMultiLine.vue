/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextArea
        :value="value"
        solid
        :label="name"
        :placeholder="placeholder"
        :required="required"
        :error-messages="errorMessages"
        @input="onValueChange">
        <div
            slot="appendIcon"
            class="horizontal-wrapper">
            <InfoHint
                v-if="hint && !isError"
                :hint="hint" />
            <ErrorHint
                v-if="isError"
                :hint="errorMessages" />
        </div>
    </TextArea>
</template>

<script>
import baseProductTemplateElementMixin from '~/mixins/product/baseProductTemplateElementMixin';

export default {
    name: 'ProductTemplateMultiLine',
    mixins: [baseProductTemplateElementMixin],
    components: {
        TextArea: () => import('~/components/Inputs/TextArea'),
    },
};
</script>

<style lang="scss" scoped>
    .horizontal-wrapper {
        display: flex;
        align-items: center;
    }
</style>
