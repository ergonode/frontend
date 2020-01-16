/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextField
        :value="translationOptionValue"
        :label="label"
        solid
        small
        :disabled="disabled"
        @input="value => setOptionValueForLanguageCode({ languageCode, key: label, value })" />
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'AttributeOptionValue',
    components: {
        TextField: () => import('@Core/components/Inputs/TextField'),
    },
    props: {
        languageCode: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        disabled: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        ...mapState('attribute', {
            options: (state) => state.options,
            isMultilingual: (state) => state.isMultilingual,
        }),
        translationOptionValue() {
            if (this.options[this.label]) {
                if (!this.isMultilingual) {
                    return this.options[this.label];
                }
                return this.options[this.label][this.languageCode] || '';
            }
            return '';
        },
    },
    methods: {
        ...mapActions('attribute', [
            'setOptionValueForLanguageCode',
        ]),
    },
};
</script>
