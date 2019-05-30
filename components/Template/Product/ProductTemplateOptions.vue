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
        <div
            slot="appendIcon"
            class="horizontal-wrapper">
            <Icon :icon="appendStateIcon" />
            <InfoHint
                v-if="hint && !isError"
                :hint="hint" />
            <ErrorHint v-if="isError" />
        </div>
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

<style lang="scss" scoped>
    .horizontal-wrapper {
        display: flex;
        align-items: center;
    }
</style>
