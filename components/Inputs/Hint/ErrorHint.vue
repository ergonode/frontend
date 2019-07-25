/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon
        size="medium"
        icon="sprite-cell cell-error"
        :title="hint" />
</template>

<script>
import Icon from '~/components/Icon/Icon';

export default {
    name: 'ErrorHint',
    components: {
        Icon,
    },
    props: {
        hint: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>

</style>
