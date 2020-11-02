/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <img
        ref="img"
        :style="styles"
        :class="classes"
        :src="require('@UI/assets/images/placeholders/no_image.svg')"
        alt="picture">
</template>

<script>
import {
    getImageData,
} from '@Core/models/multimedia';

export default {
    name: 'Picture',
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
            observer: null,
            isLoading: true,
        };
    },
    computed: {
        classes() {
            return [
                'picture',
                {
                    'picture--fab': this.fab,
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
    mounted() {
        this.observer = new IntersectionObserver((entries) => {
            const image = entries[0];
            if (image.isIntersecting) {
                this.getImage();
                this.observer.disconnect();
            }
        });

        this.observer.observe(this.$el);
    },
    beforeDestroy() {
        this.observer.disconnect();
    },
    methods: {
        getImage() {
            this.$axios.$get(this.href, {
                useCache: this.useCache,
                responseType: 'arraybuffer',
                withLanguage: false,
            })
                .then(response => this.onSuccess(response))
                .catch(this.imageLoadOnError);
        },
        onSuccess(response) {
            if (this.$refs.img) {
                this.$refs.img.src = getImageData(response);
            }

            this.isLoading = false;
        },
        imageLoadOnError(error) {
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
    .picture {
        width: 100%;
        max-height: 100%;

        &--fab {
            height: 100%;
            border-radius: 50%;
        }
    }
</style>
