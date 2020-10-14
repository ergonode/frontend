/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="comments-list">
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
            class="comments-list__placeholder">
            <slot name="placeholder" />
        </div>
        <div class="comments-list__footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<script>
import List from '@Core/components/List/List';
import FadeTransition from '@Core/components/Transitions/FadeTransition';

export default {
    name: 'CommentsList',
    components: {
        List,
        FadeTransition,
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
    .comments-list {
        width: 560px;
        padding: 24px;

        &__placeholder {
            margin: 24px 0;
        }

        &__footer {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
</style>
