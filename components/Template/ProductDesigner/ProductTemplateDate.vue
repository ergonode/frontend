/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="value"
        solid
        :label="name"
        :placeholder="parameters.format"
        :error-messages="errorMessages"
        :dismissible="false"
        :required="required"
        @focus="onSelectFocus">
        <div
            slot="appendIcon"
            class="horizontal-wrapper">
            <Icon :icon="appendStateIcon" />
            <InfoHint
                v-if="hint && !isError"
                :hint="hint" />
            <ErrorHint
                v-if="isError"
                :hint="errorMessages" />
        </div>
        <DatePickerContent
            slot="select"
            slot-scope="{ dismissSelect }"
            :style="selectBoundingBox"
            :selected-date="new Date(value)"
            @apply="e => onApplyDate(e, dismissSelect)"
            @clear="onClearDate" />
    </Select>
</template>

<script>
import moment from 'moment';
import Select from '~/components/Inputs/Select/Select';
import DatePickerContent from '~/components/Inputs/Select/Contents/DatePickerContent';
import baseProductTemplateElementMixin from '~/mixins/product/baseProductTemplateElementMixin';

export default {
    name: 'ProductTemplateDate',
    mixins: [baseProductTemplateElementMixin],
    components: {
        Select,
        DatePickerContent,
        Icon: () => import('~/components/Icon/Icon'),
    },
    data() {
        return {
            selectBoundingBox: {},
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
        onApplyDate(date, dismissSelect) {
            dismissSelect();

            this.debounceFunc(this.formatDate(date));
        },
        onClearDate() {
            this.debounceFunc('');
        },
        formatDate(date) {
            if (!date) return null;
            const { format } = this.parameters;

            return moment(date).format(format);
        },
        onSelectFocus(isFocused) {
            if (isFocused) {
                this.selectBoundingBox = this.getSelectBoundingBox();
            }
        },
        getSelectBoundingBox() {
            const { $el } = this;
            const boundingRect = $el.getBoundingClientRect();
            const {
                top,
                left,
                height,
            } = boundingRect;
            const { innerHeight } = window;
            const maxHeight = 300;

            if (innerHeight - top < maxHeight) {
                const offsetBottom = innerHeight - top;

                return {
                    left: `${left}px`,
                    bottom: `${offsetBottom + 1}px`,
                };
            }

            return {
                left: `${left}px`,
                top: `${top + height + 2}px`,
            };
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
