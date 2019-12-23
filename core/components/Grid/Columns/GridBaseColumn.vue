/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="column">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'GridBaseColumn',
};
</script>

<style lang="scss" scoped>
    .column {
        position: relative;
        display: grid;
        box-sizing: border-box;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            box-shadow: $ELEVATOR_2_DP;
            opacity: 0;
            pointer-events: none;
            content: "";
        }

        &--hovered {
            z-index: 999;

            &::after {
                opacity: 1;
            }
        }
    }
</style>
