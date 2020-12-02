/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <!--    <div class="fixed-height-container">-->
    <!--        <div class="fixed-height-container__expander">-->
    <!--            <slot />-->
    <!--        </div>-->
    <!--    </div>-->
    <div>
        <!--        <div>-->
        <slot />
        <!--        </div>-->
    </div>
</template>

<script>
export default {
    name: 'FixedHeightContainer',
};
</script>

<style lang="scss" scoped>
    .fixed-height-container {
        display: flex;
        flex-direction: column;

        &__expander {
            flex: 1 1 auto;
            height: 0;
        }
    }
</style>
