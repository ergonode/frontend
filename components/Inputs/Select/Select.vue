/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="inputStyle">
        <div
            ref="activator"
            :class="activatorClasses"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp">
            <slot name="prepend" />
            <label
                v-if="label"
                :for="associatedLabel"
                :class="floatingLabelClasses"
                :style="floatingLabelTransforms"
                v-text="label" />
            <input
                :id="associatedLabel"
                ref="input"
                :value="parsedInputValue"
                :placeholder="placeholder"
                :disabled="disabled"
                :aria-label="label || 'no description'"
                type="text"
                readonly
                @input="onValueChange"
                @focus="onFocus"
                @blur="onBlur">
            <slot name="append">
                <IconArrowDropDown :state="dropDownState" />
            </slot>
        </div>
        <FadeTransition v-if="isMenuActive">
            <SelectBaseContent
                ref="menu"
                :style="selectBoundingBox"
                :fixed-content="fixedContentWidth">
                <template #body>
                    <slot name="selectContent">
                        <MultiselectListContent
                            v-if="multiselect"
                            :options="options"
                            :selected-options="selectedOptions"
                            @select="onSelectValue" />
                        <SelectListContent
                            v-else
                            :options="options"
                            :selected-option="String(value)"
                            @select="onSelectValue" />
                    </slot>
                </template>
                <template
                    v-if="clearable"
                    #footer>
                    <slot
                        name="footer"
                        :clear="onClear"
                        :apply="onDismiss">
                        <MultiselectContentFooter
                            v-if="multiselect"
                            @clear="onClear"
                            @apply="onDismiss" />
                        <SelectContentFooter
                            v-else
                            @clear="onClear"
                            @apply="onDismiss" />
                    </slot>
                </template>
            </SelectBaseContent>
        </FadeTransition>
        <label
            v-if="informationLabel"
            :class="informationLabelClasses"
            v-text="informationLabel" />
    </div>
</template>

<script>

import baseSelectMixin from '~/mixins/inputs/baseSelectMixin';
import FadeTransition from '~/components/Transitions/FadeTransition';
import SelectBaseContent from '~/components/Inputs/Select/Contents/SelectBaseContent';
import IconArrowDropDown from '~/components/Icon/Arrows/IconArrowDropDown';
import MultiselectContentFooter from '~/components/Inputs/Select/Contents/Footers/MultiselectContentFooter';
import SelectContentFooter from '~/components/Inputs/Select/Contents/Footers/SelectContentFooter';
import MultiselectListContent from '~/components/Inputs/Select/Contents/MultiselectListContent';
import SelectListContent from '~/components/Inputs/Select/Contents/SelectListContent';

export default {
    name: 'Select',
    mixins: [baseSelectMixin],
    components: {
        FadeTransition,
        SelectBaseContent,
        IconArrowDropDown,
        MultiselectContentFooter,
        SelectContentFooter,
        MultiselectListContent,
        SelectListContent,
    },
    props: {
        value: {
            type: [Array, String, Number],
            default: null,
        },
        options: {
            type: Array,
            default: () => [],
        },
        solid: {
            type: Boolean,
            default: false,
        },
        underline: {
            type: Boolean,
            default: false,
        },
        fixedContentWidth: {
            type: Boolean,
            default: true,
        },
        leftAlignment: {
            type: Boolean,
            default: false,
        },
        centerAlignment: {
            type: Boolean,
            default: false,
        },
        dismissible: {
            type: Boolean,
            default: true,
        },
        label: {
            type: String,
            default: null,
        },
        placeholder: {
            type: String,
            default: null,
        },
        errorMessages: {
            type: [String, Array],
            default: '',
        },
        hint: {
            type: String,
            default: '',
        },
        required: {
            type: Boolean,
            default: false,
        },
        autofocus: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        multiselect: {
            type: Boolean,
            default: false,
        },
        small: {
            type: Boolean,
            default: false,
        },
        regular: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        selectedOptions() {
            return this.value ? this.value : [];
        },
        parsedInputValue() {
            return Array.isArray(this.value) ? this.value.join(', ') : this.value;
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/input.scss";
</style>
