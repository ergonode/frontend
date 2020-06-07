/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection title="Option values">
        <AttributeOptionValue
            v-for="(index, i) in optionIndexes"
            :data-cy="`attribute-option_${languageCode}_${i}`"
            :key="index"
            :index="index"
            :option="options[index]"
            :disabled="disabled"
            :language-code="languageCode" />
    </FormSection>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'AttributeOptionValues',
    components: {
        AttributeOptionValue: () => import('@Attributes/components/Forms/Sections/AttributeOptionValue'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
    },
    props: {
        languageCode: {
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
            options: state => state.options,
        }),
        optionIndexes() {
            return Object.keys(this.options);
        },
    },
};
</script>
