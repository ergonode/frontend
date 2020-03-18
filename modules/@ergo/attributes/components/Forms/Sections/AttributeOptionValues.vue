/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormGroup title="Option values">
        <AttributeOptionValue
            v-for="index in optionIndexes"
            :key="index"
            :index="index"
            :option="options[index]"
            :disabled="disabled"
            :language-code="languageCode" />
    </FormGroup>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'AttributeOptionValues',
    components: {
        AttributeOptionValue: () => import('@Attributes/components/Forms/Sections/AttributeOptionValue'),
        FormGroup: () => import('@Core/components/Form/FormGroup'),
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
