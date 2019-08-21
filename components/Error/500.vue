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
                <h1 class="navigation-section__header txt--success">
                    Error
                </h1>
                <p
                    class="navigation-section__description txt--dark-graphite typo-list">
                    Internal server error. Please contact with the system administrator.
                </p>
            </div>
        </div>
        <img
            class="error-plug"
            src="~assets/images/icons/plug.svg">
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
                    font: bold 56px/56px "Inter UI";
                }

                &__description {
                    margin: 8px 0 16px;
                }

                &__header, &__description {
                    text-align: center;
                }
            }
        }

        .error-plug {
            justify-self: flex-start;
        }
    }
</style>
