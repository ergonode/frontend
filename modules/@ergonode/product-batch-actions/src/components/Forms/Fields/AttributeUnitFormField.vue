/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextField
        :value="value"
        :input="{ type: 'number' }"
        :hint="hint"
        :placeholder="placeholder"
        :label="label"
        :error-messages="errorMessages"
        @focus="onFocus"
        @input="onValueChange">
        <template #append>
            <IconSpinner
                v-if="isFetchingData"
                :fill-color="graphiteColor" />
            <TextFieldSuffix
                v-else
                :suffix="unit" />
        </template>
    </TextField>
</template>

<script>
import {
    GRAPHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributeUnitFormField',
    props: {
        value: {
            type: [
                String,
                Number,
            ],
            default: '',
        },
        attribute: {
            type: Object,
            default: () => ({}),
        },
        languageCode: {
            type: String,
            required: true,
        },
        errorMessages: {
            type: String,
            default: '',
        },
    },
    async fetch() {
        this.isFetchingData = true;

        await this.getInitialDictionaries({
            keys: [
                'units',
            ],
        });

        this.isFetchingData = false;
    },
    data() {
        return {
            isFetchingData: false,
        };
    },
    computed: {
        ...mapState('dictionaries', [
            'units',
        ]),
        graphiteColor() {
            return GRAPHITE;
        },
        label() {
            return this.attribute.label[this.languageCode] || `#${this.attribute.code}`;
        },
        placeholder() {
            return this.attribute.placeholder[this.languageCode];
        },
        hint() {
            return this.attribute.hint[this.languageCode];
        },
        unit() {
            const unit = this.units.find(({
                id,
            }) => id === this.attribute.parameters.unit);

            if (!unit) {
                return '';
            }

            return `${unit.name} (${unit.symbol})`;
        },
    },
    mounted() {
        this.onValueChange('');
    },
    methods: {
        ...mapActions('dictionaries', [
            'getInitialDictionaries',
        ]),
        onValueChange(value) {
            this.$emit('input', {
                key: this.attribute.id,
                value,
                languageCode: this.languageCode,
            });
        },
        onFocus(isFocused) {
            if (!isFocused) {
                this.$emit('blur', {
                    key: this.attribute.id,
                    value: this.value,
                    languageCode: this.languageCode,
                });
            }
        },
    },
};
</script>
