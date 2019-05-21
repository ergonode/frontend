/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="option-values-container">
        <span>Option values</span>
        <TextField
            v-for="(key, index) in optionKeys"
            :key="index"
            :value="optionTranslationsValues[languageCode][index]"
            :label="key"
            solid
            @input="e => updateOptionValue(index, e)" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TextField from '~/components/Inputs/TextField';

export default {
    name: 'AttributeOptionValues',
    components: {
        TextField,
    },
    props: {
        languageCode: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState('attribute', {
            optionKeys: state => state.optionKeys,
        }),
        ...mapState('translations', {
            optionTranslationsValues: state => state.optionTranslationsValues,
        }),
    },
    created() {
        if (!this.optionTranslationsValues[this.languageCode]) {
            this.addOptionTranslation({ languageCode: this.languageCode });
        }
    },
    methods: {
        ...mapActions('attribute', [
            'setAttributeOptionKeyValue',
        ]),
        ...mapActions('translations', [
            'addOptionTranslation',
        ]),
        updateOptionValue(index, value) {
            this.setAttributeOptionKeyValue({
                languageCode: this.languageCode,
                index,
                value,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .option-values-container {
        display: grid;
        grid-gap: 8px;
    }
</style>
