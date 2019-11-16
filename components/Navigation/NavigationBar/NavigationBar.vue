/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <nav class="navigation-bar">
        <section class="navigation-bar__section">
            <slot name="leftSection" />
        </section>
        <section class="navigation-bar__section">
            <slot name="rightSection" />
        </section>
    </nav>
</template>

<script>
export default {
    name: 'NavigationBar',
};
</script>

<style lang="scss" scoped>
    @import "~/assets/scss/navigation/navigationbar.scss";
</style>
