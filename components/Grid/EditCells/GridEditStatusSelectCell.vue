/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :style="{width: `${fixedWidth}px`}"
        :value="value"
        solid
        clearable
        :dismissible="false"
        :error-messages="errorMessages"
        autofocus
        :options="options"
        @focus="onFocus"
        @input="onValueChange"
        @apply="onApply">
        <template #selectContent>
            <StatusSelectListContent
                :options="options"
                :selected-option="value"
                :colors="colors"
                @value="onValueChange" />
        </template>
    </Select>
</template>

<script>
import { mapState } from 'vuex';
import Select from '~/components/Inputs/Select/Select';
import StatusSelectListContent from '~/components/Inputs/Select/Contents/StatusSelectListContent';

export default {
    name: 'GridEditStatusSelectCell',
    components: {
        Select,
        StatusSelectListContent,
    },
    props: {
        value: {
            type: String,
            required: true,
        },
        rowId: {
            type: [String, Number],
            required: true,
        },
        errorMessages: {
            type: [String, Array],
            default: '',
        },
        fixedWidth: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            options: [],
            colors: {},
        };
    },
    async created() {
        await this.$axios.$get(`${this.languageCode}/products/${this.rowId}`).then(({
            workflow = [],
        }) => {
            this.options = workflow.map((e) => ({
                key: e.code,
                value: e.name,
            }));
            this.colors = workflow.reduce((acc, current) => {
                const newObject = acc;
                newObject[current.code] = current.color;
                return newObject;
            }, {});
        }).catch(() => {});
    },
    computed: {
        ...mapState('authentication', {
            languageCode: (state) => state.user.language,
        }),
    },
    methods: {
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onApply() {
            this.$emit('focus', false);
        },
        onValueChange(value) {
            this.$emit('input', value.key || value);
        },
    },
};
</script>
