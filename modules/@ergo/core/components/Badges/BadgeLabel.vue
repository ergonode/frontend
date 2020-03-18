/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <span
        class="badge-label"
        v-text="props.label" />
</template>

<script>
export default {
    name: 'BadgeLabel',
    props: {
        label: {
            type: [String, Number],
            default: 'Label',
        },
    },
};
</script>

<style lang="scss" scoped>
    .badge-label {
        font: $FONT_SEMI_BOLD_10_12;
        text-transform: uppercase;
    }
</style>
