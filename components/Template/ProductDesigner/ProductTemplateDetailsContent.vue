/*
* Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
* See LICENSE for license details.
*/
<template>
    <div class="details-content">
        <slot name="append" />
        <InfoHint
            v-if="hint && !isError"
            :hint="hint" />
        <ErrorHint
            v-if="isError"
            :hint="errorMessages" />
    </div>
</template>

<script>
import InfoHint from '~/components/Inputs/Hint/InfoHint';
import ErrorHint from '~/components/Inputs/Hint/ErrorHint';

export default {
    name: 'ProductTemplateDetailsContent',
    components: {
        InfoHint,
        ErrorHint,
    },
    props: {
        isError: {
            type: Boolean,
            required: true,
        },
        hint: {
            type: String,
            required: true,
        },
        errorMessages: {
            type: String,
            default: null,
        },
    },
};
</script>

<style lang="scss" scoped>
    .details-content {
        display: flex;
        align-items: center;
    }
</style>
