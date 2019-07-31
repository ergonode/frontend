/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <label :title="hint">
        <IconError />
    </label>
</template>

<script>
import IconError from '~/components/Icon/Feedback/IconError';

export default {
    name: 'ErrorHint',
    components: {
        IconError,
    },
    props: {
        hint: {
            type: String,
            required: true,
        },
    },
};
</script>
