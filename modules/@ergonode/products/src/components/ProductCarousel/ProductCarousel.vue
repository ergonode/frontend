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
        <ProductCarouselImage
            v-for="(id, index) in value"
            :index="index"
            :product="products[id]"
            :fetching-data-index="fetchingDataIndex"
            :current-index="currentIndex"
            :key="id" />
        <span
            class="product-carousel__pagination"
            v-text="pagination" />
        <div class="product-carousel__panel">
            <Fab
                :size="tinySize"
                :theme="secondaryTheme"
                :disabled="currentIndex === 0"
                @click.native="onPreviousImage">
                <template #icon="{ color }">
                    <IconArrowSingle
                        :state="arrowLeft"
                        :fill-color="color" />
                </template>
            </Fab>
            <div
                v-if="fetchingDataIndex === -1"
                class="product-carousel__label"
                v-text="productTitle"
                @click="onNavigateToRelation" />
            <Fab
                :size="tinySize"
                :theme="secondaryTheme"
                :disabled="currentIndex === value.length - 1"
                @click.native="onNextImage">
                <template #icon="{ color }">
                    <IconArrowSingle
                        :state="arrowRight"
                        :fill-color="color" />
                </template>
            </Fab>
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
import confirmLeaveModalMixin from '@Core/mixins/feedback/confirmLeaveModalMixin';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import ProductCarouselImage from '@Products/components/ProductCarousel/ProductCarouselImage';
import {
    ROUTE_NAME,
} from '@Products/config/routes';
import Fab from '@UI/components/Fab/Fab';
import IconArrowSingle from '@UI/components/Icons/Arrows/IconArrowSingle';
import Preloader from '@UI/components/Preloader/Preloader';

export default {
    name: 'ProductCarousel',
    components: {
        ProductCarouselImage,
        Preloader,
        IconArrowSingle,
        Fab,
    },
    mixins: [
        confirmLeaveModalMixin,
    ],
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
        tinySize() {
            return SIZE.TINY;
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
        productTitle() {
            return this.products[this.value[this.currentIndex]].esa_default_label;
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
                    && !this.fetchingProductIndexes[this.fetchingDataIndex]
                    && productId) {
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
        onNavigateToRelation() {
            const callback = () => {
                this.$router.push({
                    name: ROUTE_NAME.PRODUCT_EDIT_GENERAL,
                    params: {
                        id: this.value[this.currentIndex],
                    },
                });
            };

            this.confirmModal({
                confirmCallback: callback,
                proceedCallback: callback,
            });
        },
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

        &__preloader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &__label {
            text-decoration: none;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>
