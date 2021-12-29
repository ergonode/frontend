/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection :title="$t('@Attributes.attributeExtend.components.AttributeOptionValues.optionTitle')">
        <AttributeOptionValue
            v-for="(id, i) in optionsOrder"
            :data-cy="`attribute-option_${languageCode}_${i}`"
            :key="id"
            :index="id"
            :option="options[id]"
            :scope="scope"
            :disabled="disabled"
            :language-code="languageCode" />
    </FormSection>
</template>

<script>
import AttributeOptionValue from '@Attributes/extends/attribute/components/Forms/Sections/AttributeOptionValue';
import {
    mapState,
} from 'vuex';

export default {
    name: 'AttributeOptionValues',
    components: {
        AttributeOptionValue,
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
        scope: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState('attribute', [
            'optionsOrder',
            'options',
        ]),
    },
};
</script>
