/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="placeholder-wrapper">
        <client-only>
            <div class="wrapper__section">
                <img
                    class="comet"
                    src="@UI/assets/images/placeholders/error-pages/comet.svg">
                <img
                    class="air"
                    src="@UI/assets/images/placeholders/error-pages/air.svg">
            </div>
            <div class="wrapper__section">
                <img
                    class="delorean"
                    src="@UI/assets/images/placeholders/error-pages/delorean.svg">
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
                        @click.native="$router.push({ name: 'dashboard' })" />
                </div>
            </div>
            <div class="wrapper__section">
                <q class="section__quotation">
                    „Time traveling is just too dangerous. Better that I devote myself<br>
                    to study the other great mystery of the universe: women!”
                </q>
                <a
                    class="section__video-link"
                    aria-label="Video link"
                    href="https://www.youtube.com/watch?v=Dylp3c3_OBQ"
                    target="_blank">
                    Dr. Emmett „Doc” Brown
                </a>
            </div>
        </client-only>
    </div>
</template>

<script>

export default {
    name: 'Placeholder',
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
                    font: $FONT_MEDIUM_24_32;
                }

                .info__text {
                    margin-top: 24px;
                    color: $GRAPHITE_DARK;
                    font: $FONT_MEDIUM_16_24;
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

            .section__quotation, .section__video-link {
                font: $FONT_MEDIUM_16_24;
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
