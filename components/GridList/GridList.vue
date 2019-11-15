/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-list">
        <Transition
            name="fade"
            mode="out-in">
            <slot name="header" />
        </Transition>
        <TransitionGroup
            v-if="isPlaceholder"
            name="fade"
            mode="out-in">
            <slot name="content" />
        </TransitionGroup>
        <div
            v-else
            class="grid-list__placeholder">
            <img
                src="~/assets/images/placeholders/comments_placeholder.svg"
                alt="list placeholder">
        </div>
        <div class="grid-list__footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'GridList',
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
        min-width: 560px;
        padding: 24px;

        &__footer {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        &__placeholder {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 24px 0;

            & > img {
                width: 100%;
            }
        }

        .fade-enter-active, .fade-leave-active {
            transition: opacity 0.3s;
        }

        .fade-enter, .fade-leave-to {
            opacity: 0;
        }
    }
</style>
