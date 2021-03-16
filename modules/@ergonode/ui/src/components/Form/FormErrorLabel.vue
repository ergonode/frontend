/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        class="form-error-label"
        v-text="props.errorMessages" />
</template>

<script>
export default {
    name: 'FormErrorLabel',
    props: {
        /**
         * The error messages are messages which comes from validation process
         */
        errorMessages: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .form-error-label {
        color: $RED;
        font: $FONT_MEDIUM_12_16;
        word-break: break-word;
    }
</style>
