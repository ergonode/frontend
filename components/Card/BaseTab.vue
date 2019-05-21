/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="base-tab">
        <slot name="header" />
        <ContentBaseTab>
            <slot name="content" />
        </ContentBaseTab>
        <slot name="footer" />
    </div>
</template>

<script>

export default {
    name: 'BaseTab',
    components: {
        ContentBaseTab: () => import('~/components/Card/ContentBaseTab'),
    },
};
</script>

<style lang="scss" scoped>
    .base-tab {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
    }
</style>
