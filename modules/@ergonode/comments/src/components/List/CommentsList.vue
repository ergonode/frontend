/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-list">
        <FadeTransition>
            <slot name="header" />
        </FadeTransition>
        <FadeTransition v-if="isPlaceholder">
            <List>
                <slot name="content" />
            </List>
        </FadeTransition>
        <div
            v-else
            class="grid-list__placeholder">
            <slot name="placeholder" />
        </div>
        <div class="grid-list__footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommentsList',
    components: {
        List: () => import('@Core/components/List/List'),
        FadeTransition: () => import('@Core/components/Transitions/FadeTransition'),
    },
    props: {
        isPlaceholder: {
            type: Boolean,
            default: true,
        },
    },
};
</script>
<style lang="scss" scoped>
    .grid-list {
        width: 560px;
        padding: 24px;

        &__placeholder {
            margin: 25px 0;
        }

        &__footer {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
</style>
