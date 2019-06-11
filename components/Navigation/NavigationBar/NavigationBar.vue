/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <nav class="navigation-bar">
        <section class="navigation-bar__section left">
            <slot name="leftSectionContent" />
        </section>
        <section class="navigation-bar__section right">
            <slot name="rightSectionContent" />
        </section>
    </nav>
</template>

<script>
export default {
    name: 'NavigationBar',
};
</script>

<style lang="scss">
    @import "~/assets/scss/navigation/navigationbar.scss";
</style>
