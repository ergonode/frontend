/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="placeholder">
        <div class="horizontal-wrapper">
            <img
                class="image"
                src="@UI/assets/images/placeholders/error-pages/404.svg">
            <div class="navigation-section">
                <h1 class="navigation-section__header">
                    Not found
                </h1>
                <p
                    class="navigation-section__description">
                    The link you clicked may be broken or the page may have been removed.
                </p>
                <Button
                    title="Go to dashboard"
                    @click.native="$router.push({ name: 'dashboard' })" />
            </div>
        </div>
        <span
            class="error-section section__quotation">
            The page you were looking for doesn’t exist. If you think this is an
            <br> error, please report it to the system administrator.
        </span>
    </div>
</template>

<script>
import Button from '@UI/components/Button/Button';

export default {
    name: 'Error404',
    components: {
        Button,
    },
};
</script>

<style lang="scss" scoped>
    .placeholder {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;

        .horizontal-wrapper {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            .image {
                margin-right: 64px;
            }

            .navigation-section {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 285px;

                &__header {
                    color: $GREEN;
                    font: bold 56px/56px "Inter UI";
                }

                &__description {
                    margin: 8px 0 16px;
                    color: $GRAPHITE_DARK;
                    font: $FONT_MEDIUM_16_24;
                }

                &__header, &__description {
                    text-align: center;
                }
            }
        }

        .error-section {
            margin-top: 64px;
            color: $GRAPHITE;
            font: $FONT_MEDIUM_16_24;
            text-align: center;
        }

        .error-plug {
            justify-self: flex-start;
        }
    }
</style>
