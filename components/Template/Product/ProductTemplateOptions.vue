/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="parsedValue"
        solid
        clearable
        :label="label"
        :placeholder="placeholder"
        :multiselect="multiselect"
        :disabled="disabled"
        :error-messages="isError ? [' '] : null"
        :required="required"
        @focus="onFocusChange"
        @input="onValueChange">
        <template #append>
            <ProductTemplateDetailsContent
                :hint="hint"
                :error-messages="errorMessages"
                :is-error="isError">
                <template #append>
                    <IconArrowDropDown :state="dropDownState" />
                </template>
            </ProductTemplateDetailsContent>
        </template>
        <template #selectContent>
            <TranslationMultiselectListContent
                v-if="multiselect"
                :options="parsedOptions"
                :selected-options="localValue || []"
                @value="onValueChange" />
            <TranslationSelectListContent
                v-else
                :options="parsedOptions"
                :selected-option="localValue"
                @value="onValueChange" />
        </template>
    </Select>
</template>

<script>
import { Arrow } from '~/model/icons/Arrow';
import baseProductTemplateElementMixin from '~/mixins/product/baseProductTemplateElementMixin';
import { getValuesByKeys, getValueByKey } from '~/model/objectWrapper';
import IconArrowDropDown from '~/components/Icon/Arrows/IconArrowDropDown';
import TranslationSelectListContent from '~/components/Inputs/Select/Contents/TranslationSelectListContent';
import TranslationMultiselectListContent from '~/components/Inputs/Select/Contents/TranslationMultiselectListContent';
import Select from '~/components/Inputs/Select/Select';

export default {
    name: 'ProductTemplateOptions',
    mixins: [baseProductTemplateElementMixin],
    components: {
        Select,
        TranslationSelectListContent,
        TranslationMultiselectListContent,
        IconArrowDropDown,
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
        parsedOptions: {
            immediate: true,
            handler() {
                this.initializeValues(this.value);
            },
        },
    },
    computed: {
        dropDownState() {
            return this.isFocused
                ? Arrow.UP
                : Arrow.DOWN;
        },
        parsedOptions() {
            const optionKeys = Object.keys(this.options);

            return optionKeys.map((key) => ({ key, value: this.options[key] }));
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
