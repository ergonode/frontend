/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <main
        :class="['main-content', 'background', toolBarExtraSpace]">
        <slot />
    </main>
</template>

<script>
export default {
    name: 'Content',
    props: {
        login: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        toolBarExtraSpace() {
            return !this.login ? 'tool-bar-space' : 'white';
        },
    },
};
</script>

<style lang="scss" scoped>
    .main-content {
        display: flex;
        flex: 1;
        overflow: hidden;

        &.tool-bar-space {
            padding-top: $toolBarHeight;
        }
    }
</style>
