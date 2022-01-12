/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextField
        :value="translationOptionValue"
        :label="option.key"
        :size="smallSize"
        :disabled="disabled"
        :error-messages="errors[fieldKey]"
        @input="onOptionValueChange" />
</template>

<script>
import {
    OPTION_STATES,
} from '@Attributes/defaults';
import {
    SIZE,
} from '@Core/defaults/theme';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'AttributeOptionValue',
    mixins: [
        formFeedbackMixin,
    ],
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
            return `option_${this.languageCode}_${this.option.id}`;
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
            'setOptionState',
            'setOptionValueForLanguageCode',
        ]),
        onOptionValueChange(value) {
            this.setOptionValueForLanguageCode({
                index: this.index,
                languageCode: this.languageCode,
                value,
            });

            // TODO: Should be improved, When user is updating only the translation, the algo behind will not detect changes and will not update the traslation
            this.setOptionState({
                key: this.index,
                type: OPTION_STATES.EDIT,
                value: this.option.key,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.fieldKey,
                value,
            });
        },
    },
};
</script>
