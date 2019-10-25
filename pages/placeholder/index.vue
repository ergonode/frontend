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
                    src="~assets/images/placeholders/comet.svg">
                <img
                    class="air"
                    src="~assets/images/placeholders/air.svg">
            </div>
            <div class="wrapper__section">
                <img
                    class="delorean"
                    src="~assets/images/placeholders/delorean.svg">
                <div class="section__info">
                    <h1 class="info__header font--medium-24-32">
                        <Typer :value="['Future', 'Feature']" />
                    </h1>
                    <p class="info__text font--medium-16-24">
                        This feature will be implemented in the near future!
                    </p>
                    <Button
                        class="info__button"
                        large
                        color="success"
                        title="Back to the… Dashboard"
                        @click.native="$router.push('/dashboard');" />
                </div>
            </div>
            <div class="wrapper__section">
                <q class="font--medium-16-24 section__quotation">
                    „Time traveling is just too dangerous. Better that I devote myself<br>
                    to study the other great mystery of the universe: women!”
                </q>
                <a
                    class="section__video-link font--medium-16-24"
                    href="https://www.youtube.com/watch?v=Dylp3c3_OBQ"
                    target="_blank">
                    Dr. Emmett „Doc” Brown
                </a>
            </div>
            <template #placeholder>
                <img
                    class="preloader"
                    width="24"
                    src="~assets/images/preloader.gif"
                    alt="Loading...">
            </template>
        </client-only>
    </div>
</template>

<script>

export default {
    name: 'Placeholder',
    components: {
        Button: () => import('~/components/Buttons/Button'),
        Typer: () => import('~/components/Inputs/Typer'),
    },
};
</script>

<style lang="scss" scoped>
    .placeholder-wrapper {
        display: flex;
        flex: 1 1 auto;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;
        text-align: center;

        .wrapper__section {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;
            max-width: 700px;
            min-width: 370px;
            margin-top: 24px;

            .comet {
                margin: 24px 48px 0 0;
            }

            .air {
                margin-top: 24px;
            }

            .delorean {
                margin: 24px 48px 0 0;
            }

            .section__info {
                display: flex;
                flex-flow: column wrap;
                justify-content: center;
                align-items: center;
                width: 260px;
                margin-top: 24px;

                .info__header {
                    height: 56px;
                    min-width: 1px;
                    color: $GREEN;
                }

                .info__text {
                    margin-top: 24px;
                    color: $GRAPHITE_DARK;
                }

                .info__button {
                    margin-top: 24px;
                }
            }

            .section__quotation {
                max-width: 700px;
                min-width: 370px;
                width: 100%;
                color: $GRAPHITE;
            }

            .section__video-link {
                margin: 24px 0 48px;
            }
        }

        .item-content__preloader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

</style>
