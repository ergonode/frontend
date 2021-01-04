/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IntersectionObserver
        observe-once
        @intersect="onIntersect">
        <img
            ref="img"
            :style="styles"
            :class="classes"
            :src="require('@UI/assets/images/placeholders/no_image.svg')"
            alt="Image loaded asynchronously">
    </IntersectionObserver>
</template>

<script>
import {
    getImageData,
} from '@Core/models/multimedia';
import IntersectionObserver from '@UI/components/Observers/IntersectionObserver';

export default {
    name: 'LazyImage',
    components: {
        IntersectionObserver,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: String,
            required: true,
        },
        /**
         * URL of backend endpoint
         */
        href: {
            type: String,
            required: true,
        },
        /**
         * Determines if the component is of fab style
         */
        fab: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the result of api request should be cached
         */
        useCache: {
            type: Boolean,
            default: true,
        },
        /**
         * Determines image objectFit property
         */
        objectFit: {
            type: String,
            default: 'cover',
        },
    },
    data() {
        return {
            isLoading: true,
        };
    },
    computed: {
        classes() {
            return [
                'lazy-image',
                {
                    'lazy-image--fab': this.fab,
                },
            ];
        },
        styles() {
            return {
                objectFit: this.isLoading ? 'unset' : this.objectFit,
            };
        },
    },
    watch: {
        value() {
            this.getImage();
        },
    },
    methods: {
        onIntersect(isIntersecting) {
            if (isIntersecting) {
                this.getImage();
            }
        },
        async getImage() {
            try {
                const response = await this.$axios.$get(this.href, {
                    useCache: this.useCache,
                    responseType: 'arraybuffer',
                    withLanguage: false,
                });
                this.onSuccess(response);
            } catch (e) {
                this.onError(e);
            }
        },
        onSuccess(response) {
            if (this.$refs.img) {
                this.$refs.img.src = getImageData(response);
            }

            this.isLoading = false;
        },
        onError(error) {
            if (this.$axios.isCancel(error)) {
                return;
            }

            if (this.$refs.img) {
                this.$refs.img.src = require('@UI/assets/images/placeholders/image_error.svg'); // eslint-disable-line global-require, import/no-dynamic-require
            }

            this.isLoading = false;
        },
    },
};
</script>

<style lang="scss" scoped>
    .lazy-image {
        width: 100%;
        max-height: 100%;

        &--fab {
            height: 100%;
            border-radius: 50%;
        }
    }
</style>
