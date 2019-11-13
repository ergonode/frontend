/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        class="headline font--medium-16-24"
        v-text="props.title" />
</template>

<script>
export default {
    name: 'Headline',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .headline {
        color: $GRAPHITE_DARK;
    }
</style>
