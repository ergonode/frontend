/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AdvancedFilterContent>
        <AdvancedFilterShowOnly
            :value="value.isEmptyRecord"
            @input="onEmptyRecordChange" />
        <Divider />
        <div
            class="container"
            v-if="!value.isEmptyRecord">
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
import AdvancedFilterShowOnly from '@UI/components/AdvancedFilters/AdvancedFilterShowOnly';
import AdvancedFilterContent from '@UI/components/AdvancedFilters/Content/AdvancedFilterContent';

export default {
    name: 'AdvancedFilterTextContent',
    components: {
        AdvancedFilterContent,
        AdvancedFilterShowOnly,
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
