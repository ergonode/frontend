/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Transition name="fade">
        <slot />
    </Transition>
</template>

<script>
export default {
    name: 'FadeNavigationSideBarTextTransition',
};
</script>

<style lang="scss" scoped>
    .fade {
        &-enter {
            opacity: 0;

            &-active {
                transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            }
        }

        &-leave {
            &-active {
                transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
                opacity: 0;
            }
        }
    }
</style>
