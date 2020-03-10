/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="placeholder-wrapper">
        <client-only>
            <div class="wrapper__section">
                <img
                    class="comet"
                    src="@Core/assets/images/placeholders/error-pages/comet.svg">
                <img
                    class="air"
                    src="@Core/assets/images/placeholders/error-pages/air.svg">
            </div>
            <div class="wrapper__section">
                <img
                    class="delorean"
                    src="@Core/assets/images/placeholders/error-pages/delorean.svg">
                <div class="section__info">
                    <h1 class="info__header">
                        <ClientOnly>
                            <Typer :value="['Future', 'Feature']" />
                        </ClientOnly>
                    </h1>
                    <p class="info__text">
                        This feature will be implemented in the near future!
                    </p>
                    <Button
                        class="info__button"
                        title="Back to the… Dashboard"
                        @click.native="$router.push({ name: 'dashboard' });" />
                </div>
            </div>
            <div class="wrapper__section">
                <q class="section__quotation">
                    „Time traveling is just too dangerous. Better that I devote myself<br>
                    to study the other great mystery of the universe: women!”
                </q>
                <a
                    class="section__video-link"
                    href="https://www.youtube.com/watch?v=Dylp3c3_OBQ"
                    target="_blank">
                    Dr. Emmett „Doc” Brown
                </a>
            </div>
            <template #placeholder>
                <img
                    class="preloader"
                    width="24"
                    src="@Core/assets/images/preloader.gif"
                    alt="Loading...">
            </template>
        </client-only>
    </div>
</template>

<script>
export default {
    name: 'Placeholder',
    components: {
        Button: () => import('@Core/components/Buttons/Button'),
        Typer: () => import('@Core/components/Inputs/Typer'),
    },
};
</script>

<style lang="scss" scoped>
    @import "@Core/assets/scss/placeholder/placeholder.scss";
</style>
