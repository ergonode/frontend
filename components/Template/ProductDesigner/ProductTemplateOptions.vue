/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="parsedValue"
        solid
        :label="label"
        :placeholder="placeholder"
        :multiselect="multiselect"
        :dismissible="!multiselect"
        :error-messages="isError ? [' '] : null"
        :required="required"
        @focus="onFocusChange">
        <template v-slot:appendIcon>
            <ProductTemplateDetailsContent
                :hint="hint"
                :error-messages="errorMessages"
                :is-error="isError">
                <template v-slot:append>
                    <Icon :icon="appendStateIcon" />
                </template>
            </ProductTemplateDetailsContent>
        </template>
        <template v-slot:selectContent>
            <TranslationMultiselectListContent
                v-if="multiselect"
                :options="parsedOptions"
                :selected-options="localValue || []"
                @values="onValueChange" />
            <TranslationSelectListContent
                v-else
                :options="parsedOptions"
                :selected-option="localValue"
                @value="onValueChange" />
        </template>
    </Select>
</template>

<script>
import baseProductTemplateElementMixin from '~/mixins/product/baseProductTemplateElementMixin';
import { getValuesByKeys, getValueByKey } from '~/model/objectWrapper';

export default {
    name: 'ProductTemplateOptions',
    mixins: [baseProductTemplateElementMixin],
    components: {
        Select: () => import('~/components/Inputs/Select/Select'),
        TranslationSelectListContent: () => import('~/components/Inputs/Select/Contents/TranslationSelectListContent'),
        TranslationMultiselectListContent: () => import('~/components/Inputs/Select/Contents/TranslationMultiselectListContent'),
        Icon: () => import('~/components/Icon/Icon'),
    },
    props: {
        options: {
            type: Object,
            required: true,
        },
        multiselect: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            isFocused: false,
            parsedValue: '',
        };
    },
    watch: {
        parsedOptions() {
            this.initializeValues(this.value);
        },
    },
    created() {
        this.initializeValues(this.value);
    },
    computed: {
        appendStateIcon() {
            return this.isFocused
                ? 'arrow-triangle trans-half'
                : 'arrow-triangle';
        },
        parsedOptions() {
            const optionKeys = Object.keys(this.options);

            return optionKeys.map(key => ({ key, value: this.options[key] }));
        },
    },
    methods: {
        initializeValues(value) {
            this.parsedValue = Array.isArray(value)
                ? getValuesByKeys(this.options, value)
                : getValueByKey(this.options, value);

            this.localValue = value;
        },
        onFocusChange(isFocused) {
            this.isFocused = isFocused;
        },
        onValueChange(value) {
            if (Array.isArray(value)) {
                this.localValue = value;
                this.parsedValue = getValuesByKeys(this.options, value);
            } else {
                this.localValue = value.key;
                this.parsedValue = value.value;
            }

            this.debounceFunc(this.localValue);
        },
    },
};
</script>
