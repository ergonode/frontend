/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection :title="$t('@Attributes.attributeExtend.components.OptionValues.optionTitle')">
        <OptionValue
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
import OptionValue from '@Attributes/extends/attribute/components/Forms/Sections/OptionValue';
import FormSection from '@UI/components/Form/Section/FormSection';
import {
    mapState,
} from 'vuex';

export default {
    name: 'OptionValues',
    components: {
        OptionValue,
        FormSection,
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
        ...mapState('attribute', [
            'options',
        ]),
        optionIndexes() {
            return Object.keys(this.options);
        },
    },
};
</script>
