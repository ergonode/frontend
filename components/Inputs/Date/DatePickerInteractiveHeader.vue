/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="interactive-header">
        <span
            class="font--medium-12-16"
            v-text="header" />
        <TextField
            :value="value"
            :placeholder="dateFormat"
            small
            underline
            center-alignment
            @input="onValueChange" />
    </div>
</template>

<script>
import TextField from '~/components/Inputs/TextField';

export default {
    name: 'DatePickerHeader',
    components: {
        TextField,
    },
    props: {
        header: {
            type: [String, Number],
            required: true,
        },
        value: {
            type: String,
            default: '',
        },
    },
    computed: {
        dateFormat() {
            return 'yyyy-MM-dd';
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>

<style lang="scss" scoped>
    .interactive-header {
        display: grid;
        grid-template-columns: auto 80px;
        grid-auto-flow: column;
        justify-content: center;
        align-items: center;
        column-gap: 8px;
        color: $GRAPHITE;
    }
</style>
