/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="placeholder">
        <div class="horizontal-wrapper">
            <img
                class="image"
                src="~/assets/images/icons/404.svg">
            <div class="navigation-section">
                <h1 class="navigation-section__header txt--success">
                    Not found
                </h1>
                <p
                    class="navigation-section__description txt--dark-graphite typo-list">
                    The link you clicked may be broken or the page may have been removed.
                </p>
                <Button
                    large
                    color="success"
                    title="Go to dashboard"
                    @click.native="$router.push('/dashboard');" />
            </div>
        </div>
        <span
            class="error-section typo-list txt--graphite section__quotation">
            The page you were looking for doesn’t exist. If you think this is an
            <br> error, please report it to the system administrator.
        </span>
    </div>
</template>

<script>

export default {
    name: 'Error404',
    components: {
        Button: () => import('~/components/Buttons/Button'),
    },
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

        .error-section {
            margin-top: 64px;
            text-align: center;
        }

        .error-plug {
            justify-self: flex-start;
        }
    }
</style>
