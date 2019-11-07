/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :style="{width: `${fixedWidth}px`, height: `${fixedHeight}px`}"
        :value="value"
        solid
        small
        clearable
        :dismissible="false"
        :error-messages="errorMessages"
        autofocus
        :options="rowId ? workflowOptions : options"
        @focus="onFocus"
        @input="onValueChange"
        @apply="onApply">
        <template #selectContent>
            <StatusSelectListContent
                :options="rowId ? workflowOptions : options"
                :selected-option="value"
                :colors="rowId ? workflowColors : colors"
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
        options: {
            type: Array,
            default: null,
        },
        colors: {
            type: Object,
            default: null,
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
        fixedHeight: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            workflowOptions: [],
            workflowColors: {},
        };
    },
    async created() {
        if (this.rowId) {
            await this.$axios.$get(`${this.languageCode}/products/${this.rowId}`).then(({
                workflow = [],
            }) => {
                this.workflowOptions = workflow.map((e) => ({
                    key: e.code,
                    value: e.name,
                }));
                this.workflowColors = workflow.reduce((acc, current) => {
                    const newObject = acc;
                    newObject[current.code] = current.color;
                    return newObject;
                }, {});
            });
        }
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
