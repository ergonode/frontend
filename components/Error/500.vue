/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="placeholder">
        <div class="horizontal-wrapper">
            <img
                class="image"
                src="~/assets/images/icons/socket.svg">
            <div class="navigation-section">
                <h1 class="navigation-section__header">
                    Error
                </h1>
                <p
                    class="navigation-section__description font--medium-l-3">
                    Internal server error. Please contact with the system administrator.
                </p>
            </div>
        </div>
        <div class="plug-wrapper">
            <img
                class="plug"
                src="~assets/images/icons/plug.svg">
            <div class="cable" />
        </div>
    </div>
</template>

<script>

export default {
    name: 'Error500',
    props: {
        error: {
            type: [Object, Error],
            default: () => {},
        },
    },
};
</script>

<style lang="scss" scoped>
    .placeholder {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;

        .horizontal-wrapper {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            .image {
                margin-right: 64px;
            }

            .navigation-section {
                width: 285px;

                &__header {
                    color: $GREEN;
                    font: bold 56px/56px "Inter UI";
                }

                &__description {
                    margin: 8px 0 16px;
                    color: $GRAPHITE_DARK;
                }

                &__header, &__description {
                    text-align: center;
                }
            }
        }

        .plug-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;

            .cable {
                position: absolute;
                bottom: 0;
                width: 12px;
                height: 35%;
                align-self: center;
                justify-self: center;
                background-color: $GRAPHITE;
            }
        }
    }
</style>
