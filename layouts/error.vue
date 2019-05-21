/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <div class="placeholder">
            <div class="horizontal-wrapper">
                <img
                    class="image"
                    :src="errorImage">
                <div class="navigation-section">
                    <h1
                        class="navigation-section__header txt--success"
                        v-text="errorTitle" />
                    <p
                        class="navigation-section__description txt--dark-graphite typo-list">
                        {{ errorDescription }}
                    </p>
                    <Button
                        v-if="isNotFound"
                        large
                        color="success"
                        title="Go to dashboard"
                        @click.native="$router.push('/dashboard');" />
                </div>
            </div>
            <span
                v-if="isNotFound"
                class="error-section typo-list txt--graphite section__quotation">
                The page you were looking for doesn’t exist. If you think this is an
                <br> error, please report it to the system administrator.
            </span>
            <img
                v-else
                class="error-plug"
                src="~assets/images/icons/plug.svg">
        </div>
    </PageWrapper>
</template>

<script>

export default {
    components: {
        Button: () => import('~/components/Buttons/Button'),
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
    },
    props: {
        error: {
            type: [Object, Error],
            required: true,
        },
    },
    data: () => ({
        errorDesc: 'Internal server error. Please contact with the system administrator.',
        notFoundDesc: 'The link you clicked may be broken or the page may have been removed.',
    }),
    computed: {
        isNotFound() {
            const { statusCode } = this.error;
            return statusCode === 404;
        },
        errorImage() {
            const asset = this.isNotFound ? '404' : 'socket';
            return require(`~/assets/images/icons/${asset}.svg`);
        },
        errorTitle() {
            return this.isNotFound ? 'Not found' : 'Error';
        },
        errorDescription() {
            return this.isNotFound ? this.notFoundDesc : this.errorDesc;
        },
        statusCode() {
            return this.isNotFound ? 404 : 500;
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
