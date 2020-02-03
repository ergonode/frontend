/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="input__append">
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
import InfoHint from '@Core/components/Hints/InfoHint';
import ErrorHint from '@Core/components/Hints/ErrorHint';

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
            default: '',
        },
        errorMessages: {
            type: String,
            default: null,
        },
    },
};
</script>
