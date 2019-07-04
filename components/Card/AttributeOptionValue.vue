/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextField
        :value="translationOptionValue"
        :label="label"
        solid
        @input="value => setOptionValueForLanguageCode({ languageCode, index, value })" />
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'AttributeOptionValue',
    components: {
        TextField: () => import('~/components/Inputs/TextField'),
    },
    props: {
        languageCode: {
            type: String,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState('attribute', {
            optionValues: state => state.optionValues,
            isMultilingual: state => state.isMultilingual,
        }),
        translationOptionValue() {
            if (!this.isMultilingual) {
                const { [this.index]: optionValue } = this.optionValues;
                if (!optionValue) return '';

                return optionValue;
            }

            const { [this.languageCode]: transValue } = this.optionValues;

            if (!transValue || !transValue[this.index]) return '';

            return transValue[this.index];
        },
    },
    methods: {
        ...mapActions('attribute', [
            'setOptionValueForLanguageCode',
        ]),
    },
};
</script>
