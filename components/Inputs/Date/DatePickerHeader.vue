/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <div class="header font--medium-s-1">
        <span v-text="props.header" />
    </div>
</template>

<script>
export default {
    name: 'DatePickerHeader',
    props: {
        header: {
            type: [String, Number],
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        color: $GRAPHITE;
    }
</style>
