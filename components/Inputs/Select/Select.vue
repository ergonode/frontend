/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputBase
        :value="parsedInputValue"
        :append-icon="appendStateIcon"
        :prepend-icon="prependIcon"
        :solid="solid"
        :underline="underline"
        :left-alignment="leftAlignment"
        :center-alignment="centerAlignment"
        :label="label"
        :placeholder="placeholder"
        :error-messages="errorMessages"
        :hint="hint"
        :required="required"
        :autofocus="autofocus"
        :disabled="disabled"
        :dismissible="dismissible"
        :small="small"
        :regular="regular"
        @focus="onFocus">
        <input
            slot="input"
            :value="parsedInputValue"
            :placeholder="placeholder"
            :disabled="disabled"
            :aria-label="label || 'no description'"
            type="text"
            readonly>
        <slot
            slot="appendIcon"
            name="appendIcon" />
        <FadeTransition
            v-if="isFocused"
            slot="select"
            slot-scope="{ isFocused, dismissSelect }">
            <slot
                name="select"
                :is-focused="isFocused"
                :dismiss-select="dismissSelect">
                <SelectContent
                    :style="selectBoundingBox"
                    :multiselect="multiselect"
                    :clearable="clearable"
                    @clear="onClear"
                    @apply="dismissSelect">
                    <slot
                        name="selectContent"
                        :options="options">
                        <MultiselectListContent
                            v-if="multiselect"
                            :options="options"
                            :selected-options="selectedOptions"
                            @values="emitValue" />
                        <SelectListContent
                            v-else
                            :options="options"
                            :selected-option="String(value)"
                            @value="emitValue" />
                    </slot>
                </SelectContent>
            </slot>
        </FadeTransition>
    </InputBase>
</template>

<script>
import InputBase from '~/components/Inputs/InputBase';
import SelectContent from '~/components/Inputs/Select/Contents/SelectContent';
import FadeTransition from '~/components/Transitions/FadeTransition';

export default {
    name: 'Select',
    components: {
        InputBase,
        SelectContent,
        FadeTransition,
        MultiselectListContent: () => import('~/components/Inputs/Select/Contents/MultiselectListContent'),
        SelectListContent: () => import('~/components/Inputs/Select/Contents/SelectListContent'),
    },
    props: {
        value: {
            type: [Array, String, Number],
            required: false,
            default: null,
        },
        options: {
            type: Array,
            required: false,
            default: () => [],
        },
        appendIcon: {
            type: String,
            required: false,
            default: 'arrow-triangle',
        },
        prependIcon: {
            type: String,
            required: false,
            default: null,
        },
        solid: {
            type: Boolean,
            required: false,
            default: false,
        },
        underline: {
            type: Boolean,
            required: false,
            default: false,
        },
        leftAlignment: {
            type: Boolean,
            required: false,
            default: false,
        },
        centerAlignment: {
            type: Boolean,
            required: false,
            default: false,
        },
        dismissible: {
            type: Boolean,
            required: false,
            default: true,
        },
        label: {
            type: String,
            required: false,
            default: null,
        },
        placeholder: {
            type: String,
            required: false,
            default: null,
        },
        errorMessages: {
            type: [String, Array],
            required: false,
            default: '',
        },
        hint: {
            type: String,
            required: false,
            default: '',
        },
        required: {
            type: Boolean,
            required: false,
            default: false,
        },
        autofocus: {
            type: Boolean,
            required: false,
            default: false,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        clearable: {
            type: Boolean,
            required: false,
            default: false,
        },
        multiselect: {
            type: Boolean,
            required: false,
            default: false,
        },
        small: {
            type: Boolean,
            required: false,
            default: false,
        },
        regular: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            focused: false,
            selectBoundingBox: {},
        };
    },
    computed: {
        appendStateIcon() {
            return this.focused
                ? `${this.appendIcon} trans-half`
                : this.appendIcon;
        },
        selectedOptions() {
            return this.value === '' ? [] : this.value;
        },
        parsedInputValue() {
            return Array.isArray(this.value) ? this.value.join(', ') : this.value;
        },
    },
    methods: {
        emitValue(value) {
            this.$emit('input', value);
        },
        onFocus(isFocused) {
            if (isFocused) {
                this.selectBoundingBox = this.getSelectBoundingBox();
            }
            this.focused = isFocused;
            this.$emit('focus', isFocused);
        },
        onClear() {
            this.$emit('input', []);
        },
        getSelectBoundingBox() {
            const { $el } = this;
            const boundingRect = $el.getBoundingClientRect();
            const {
                top,
                left,
                height,
                width,
            } = boundingRect;
            const { innerHeight } = window;
            const maxHeight = 200;

            if (innerHeight - top < maxHeight) {
                const offsetBottom = innerHeight - top;

                return {
                    left: `${left}px`,
                    bottom: `${offsetBottom + 1}px`,
                    width: `${width}px`,
                };
            }

            return {
                left: `${left}px`,
                top: `${top + height + 2}px`,
                width: `${width}px`,
            };
        },
    },
};
</script>
