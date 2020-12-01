/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AdvancedFilterContent
        :value="value.isEmptyRecord"
        @input="onEmptyRecordChange">
        <div class="container">
            <TextField
                :value="operatorValue"
                :size="smallSize"
                :type="underlineInputType"
                @input="onValueChange" />
        </div>
    </AdvancedFilterContent>
</template>

<script>
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import AdvancedFilterContent from '@UI/components/AdvancedFilters/Content/AdvancedFilterContent';
import TextField from '@UI/components/TextField/TextField';

export default {
    name: 'AdvancedFilterTextContent',
    components: {
        TextField,
        AdvancedFilterContent,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: Object,
            default: () => ({
                isEmptyRecord: false,
            }),
        },
    },
    computed: {
        underlineInputType() {
            return INPUT_TYPE.UNDERLINE;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        operatorValue() {
            return this.value[FILTER_OPERATOR.EQUAL] || '';
        },
    },
    methods: {
        onValueChange(value) {
            if (value !== this.operatorValue) {
                this.$emit('input', {
                    key: FILTER_OPERATOR.EQUAL,
                    value,
                });
            }
        },
        onEmptyRecordChange(value) {
            this.$emit('input', {
                value,
                key: 'isEmptyRecord',
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .container {
        padding: 8px 12px;
    }
</style>
