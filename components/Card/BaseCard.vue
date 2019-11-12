/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="base-card">
        <slot name="header">
            <BaseCardHeader
                v-if="title"
                :title="title" />
        </slot>
        <div class="base-card__content">
            <slot />
        </div>
    </div>
</template>

<script>

export default {
    name: 'BaseCard',
    components: {
        BaseCardHeader: () => import('~/components/Card/BaseCardHeader'),
    },
    props: {
        title: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .base-card {
        &__content {
            display: grid;
            justify-content: center;
            align-items: center;
            grid-gap: 16px;
            grid-template-columns: 352px;
            padding: 24px;
        }
    }
</style>
