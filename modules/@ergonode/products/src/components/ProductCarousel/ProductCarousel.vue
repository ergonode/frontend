/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="product-carousel">
        <Preloader
            v-show="isPreloaderVisible"
            class="product-carousel__preloader" />
        <!-- TODO: Change relation to `multimedia` href.
            INFO: Secure relationship does not break the application.
        -->
        <template v-for="(id, index) in value">
            <div
                :class="[
                    'product-carousel__image', currentIndex === index && fetchingDataIndex !== index
                        ? 'visible'
                        : 'non-visible'
                ]"
                :key="id">
                <LazyImage
                    v-if="products[id] && products[id].esa_default_image"
                    :href="`multimedia/${products[id].esa_default_image}/download/default`"
                    :value="products[id].esa_default_image"
                    object-fit="contain" />
                <DefaultImage v-else />
            </div>
        </template>
        <span
            class="product-carousel__pagination"
            v-text="pagination" />
        <div class="product-carousel__panel">
            <IconButton
                :size="smallSize"
                :theme="secondaryTheme"
                :disabled="currentIndex === 0"
                @click.native="onPreviousImage">
                <template #icon="{ color }">
                    <IconArrowSingle
                        :state="arrowLeft"
                        :fill-color="color" />
                </template>
            </IconButton>
            <span
                v-if="fetchingDataIndex === -1"
                class="product-carousel__label"
                v-text="products[value[currentIndex]].esa_default_label" />
            <IconButton
                :size="smallSize"
                :theme="secondaryTheme"
                :disabled="currentIndex === value.length - 1"
                @click.native="onNextImage">
                <template #icon="{ color }">
                    <IconArrowSingle
                        :state="arrowRight"
                        :fill-color="color" />
                </template>
            </IconButton>
        </div>
    </div>
</template>

<script>
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import DefaultImage from '@UI/components/DefaultImage/DefaultImage';
import IconButton from '@UI/components/IconButton/IconButton';
import IconArrowSingle from '@UI/components/Icons/Arrows/IconArrowSingle';
import LazyImage from '@UI/components/LazyImage/LazyImage';
import Preloader from '@UI/components/Preloader/Preloader';

export default {
    name: 'ProductCarousel',
    components: {
        Preloader,
        LazyImage,
        IconArrowSingle,
        IconButton,
        DefaultImage,
    },
    props: {
        /**
         * Index of presented image
         */
        currentIndex: {
            type: Number,
            default: 0,
        },
        /**
         * Unique identifiers of images
         */
        value: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            products: {},
            fetchingProductIndexes: {},
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        arrowLeft() {
            return ARROW.LEFT;
        },
        arrowRight() {
            return ARROW.RIGHT;
        },
        pagination() {
            return `${this.currentIndex + 1}/${this.value.length}`;
        },
        fetchingDataIndex() {
            const productId = this.value[this.currentIndex];

            if (typeof this.products[productId] !== 'undefined') {
                return -1;
            }

            return this.currentIndex;
        },
        isPreloaderVisible() {
            return this.fetchingDataIndex !== -1;
        },
    },
    watch: {
        fetchingDataIndex: {
            immediate: true,
            handler() {
                const productId = this.value[this.fetchingDataIndex];

                if (typeof this.products[productId] === 'undefined'
                    && !this.fetchingProductIndexes[this.fetchingDataIndex]) {
                    this.fetchingProductIndexes[this.fetchingDataIndex] = true;

                    const fetchingIndex = this.fetchingDataIndex;
                    const params = {
                        view: 'list',
                        filter: `id=${productId}`,
                        columns: 'esa_default_image,esa_default_label',
                    };

                    getGridData({
                        $route: this.$route,
                        $cookies: this.$userCookies,
                        $axios: this.$axios,
                        path: 'products',
                        params,
                        onSuccess: ({
                            rows,
                        }) => this.onFetchDataSuccess({
                            rows,
                            fetchingIndex,
                        }),
                    });
                }
            },
        },
    },
    methods: {
        onFetchDataSuccess({
            rows,
            fetchingIndex,
        }) {
            if (rows.length) {
                const [
                    product,
                ] = rows;

                this.products = {
                    ...this.products,
                    [product.id]: product,
                };
            }

            this.fetchingProductIndexes[fetchingIndex] = false;
        },
        onPreviousImage() {
            this.$emit('current', this.currentIndex - 1);
        },
        onNextImage() {
            this.$emit('current', this.currentIndex + 1);
        },
    },
};
</script>

<style lang="scss" scoped>
    .product-carousel {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: flex-end;
        width: 100%;
        height: 100%;

        &__panel {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 4px;
            box-sizing: border-box;
        }

        &__pagination {
            position: absolute;
            top: 4px;
            left: 4px;
            padding: 8px;
            background-color: $WHITE;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            border-radius: 999px;
        }

        &__image {
            display: flex;
            flex: 1 1 auto;
            justify-content: center;
            height: 0;
        }

        &__label {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
        }

        &__preloader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .visible {
        display: flex;
    }

    .non-visible {
        display: none;
    }
</style>
