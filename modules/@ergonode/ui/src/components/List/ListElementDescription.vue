/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <div
        :style="{ wordBreak: props.wordBreak }"
        class="list-element-description">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'ListElementDescription',
    props: {
        wordBreak: {
            type: String,
            default: 'break-word',
        },
    },
};
</script>

<style lang="scss" scoped>
    .list-element-description {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        margin: 4px;
    }
</style>
