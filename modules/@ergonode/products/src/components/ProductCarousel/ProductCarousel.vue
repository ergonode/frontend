/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Carousel
        :current-index="currentIndex"
        :items="value"
        @current="onCurrentIndexChange">
        <Preloader
            v-show="isPreloaderVisible"
            class="product-carousel__preloader" />
        <template #item="{ item }">
            <ProductCarouselImage
                v-if="fetchingDataIndex !== currentIndex"
                :product="products[item]" />
        </template>
        <template #itemTitle>
            <div
                v-if="fetchingDataIndex === -1"
                class="product-carousel__label"
                v-text="productTitle"
                @click="onNavigateToRelation" />
        </template>
    </Carousel>
</template>

<script>
import confirmLeaveModalMixin from '@Core/mixins/feedback/confirmLeaveModalMixin';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import ProductCarouselImage from '@Products/components/ProductCarousel/ProductCarouselImage';
import {
    ROUTE_NAME,
} from '@Products/config/routes';

export default {
    name: 'ProductCarousel',
    components: {
        ProductCarouselImage,
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
        onCurrentIndexChange(index) {
            this.$emit('current', index);
        },
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
    },
};
</script>

<style lang="scss" scoped>
    .product-carousel {
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
