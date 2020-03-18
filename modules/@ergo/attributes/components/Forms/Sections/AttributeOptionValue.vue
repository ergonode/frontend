/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextField
        :value="translationOptionValue"
        :label="option.key"
        solid
        small
        :disabled="disabled"
        @input="value => setOptionValueForLanguageCode({
            index,
            languageCode,
            value,
        })" />
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'AttributeOptionValue',
    components: {
        TextField: () => import('@Core/components/Inputs/TextField'),
    },
    props: {
        index: {
            type: String,
            required: true,
        },
        languageCode: {
            type: String,
            required: true,
        },
        option: {
            type: Object,
            required: true,
        },
        disabled: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        ...mapState('attribute', {
            isMultilingual: state => state.isMultilingual,
        }),
        translationOptionValue() {
            if (!this.isMultilingual) {
                return this.option.value;
            }

            if (this.option.value) {
                return this.option.value[this.languageCode];
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
