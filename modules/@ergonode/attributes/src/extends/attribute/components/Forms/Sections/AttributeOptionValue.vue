/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <!--    TODO: ERROR MESSAGES     -->
    <TextField
        :value="translationOptionValue"
        :label="option.key"
        :size="smallSize"
        :disabled="disabled"
        :error-messages="''"
        @input="onOptionValueChange" />
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'AttributeOptionValue',
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
        fieldKey() {
            return `option_${this.languageCode}_${this.index}`;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        translationOptionValue() {
            if (this.option.value) {
                return this.option.value[this.languageCode] || '';
            }

            return '';
        },
    },
    methods: {
        ...mapActions('attribute', [
            'setOptionValueForLanguageCode',
        ]),
        onOptionValueChange(value) {
            this.setOptionValueForLanguageCode({
                index: this.index,
                languageCode: this.languageCode,
                value,
                id: this.option.id,
            });
        },
    },
};
</script>
