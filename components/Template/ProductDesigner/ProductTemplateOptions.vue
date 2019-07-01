/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="localValue"
        solid
        :label="name"
        :placeholder="placeholder"
        :options="options"
        :error-messages="isError ? [' '] : null"
        :required="required"
        @focus="onFocusChange">
        <ProductTemplateDetailsContent
            slot="appendIcon"
            :hint="hint"
            :error-messages="errorMessages"
            :is-error="isError">
            <template v-slot:append>
                <Icon :icon="appendStateIcon" />
            </template>
        </ProductTemplateDetailsContent>
        <TranslationSelectListContent
            slot="selectContent"
            :options="options"
            @value="onValueChange" />
    </Select>
</template>

<script>
import baseProductTemplateElementMixin from '~/mixins/product/baseProductTemplateElementMixin';

export default {
    name: 'ProductTemplateOptions',
    mixins: [baseProductTemplateElementMixin],
    components: {
        Select: () => import('~/components/Inputs/Select/Select'),
        TranslationSelectListContent: () => import('~/components/Inputs/Select/Contents/TranslationSelectListContent'),
        Icon: () => import('~/components/Icon/Icon'),
    },
    props: {
        options: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
    data() {
        return {
            isFocused: false,
        };
    },
    computed: {
        appendStateIcon() {
            return this.isFocused
                ? 'arrow-triangle trans-half'
                : 'arrow-triangle';
        },
    },
    methods: {
        onFocusChange(isFocused) {
            this.isFocused = isFocused;
        },
    },
};
</script>
