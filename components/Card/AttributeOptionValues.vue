/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="option-values-container">
        <span>Option values</span>
        <AttributeOptionValue
            v-for="(key, index) in optionKeys"
            :key="index"
            :index="index"
            :label="key"
            :disabled="disabled"
            :language-code="languageCode" />
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'AttributeOptionValues',
    components: {
        AttributeOptionValue: () => import('~/components/Card/AttributeOptionValue'),
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
            optionKeys: (state) => state.optionKeys,
            optionValues: (state) => state.optionValues,
        }),
    },
};
</script>

<style lang="scss" scoped>
    .option-values-container {
        display: grid;
        grid-gap: 8px;
    }
</style>
