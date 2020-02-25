/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <img
        :class="['image', { 'image--fab': fab, 'image--placeholder': isPlaceholder }]"
        :src="image"
        alt="picture">
</template>

<script>
import { mapActions } from 'vuex';
import { getImageData } from '@Core/models/multimedia';

export default {
    name: 'Picture',
    props: {
        imageId: {
            type: String,
            required: true,
        },
        fab: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isPlaceholder: false,
            image: null,
            observer: null,
        };
    },
    watch: {
        imageId() {
            this.getImageById();
        },
    },
    mounted() {
        this.observer = new IntersectionObserver((entries) => {
            const image = entries[0];
            if (image.isIntersecting) {
                this.getImageById();
                this.observer.disconnect();
            }
        });

        this.observer.observe(this.$el);
    },
    destroyed() {
        this.observer.disconnect();
    },
    methods: {
        ...mapActions('validations', [
            'onError',
        ]),
        getImageById() {
            this.isPlaceholder = true;
            this.image = require('@Core/assets/images/placeholders/no_image.svg'); // eslint-disable-line global-require, import/no-dynamic-require
            this.$axios.$get(`multimedia/${this.imageId}`, {
                responseType: 'arraybuffer',
            }).then(response => this.onSuccess(response)).catch(this.imageLoadOnError);
        },
        onSuccess(response) {
            this.image = getImageData(response);
            this.isPlaceholder = false;
        },
        imageLoadOnError() {
            this.isPlaceholder = true;
            this.image = require('@Core/assets/images/placeholders/image_error.svg'); // eslint-disable-line global-require, import/no-dynamic-require
        },
    },
};
</script>

<style lang="scss" scoped>
    .image {
        flex: 1;
        max-height: 100%;

        &:not(&--fab) {
            width: 100%;
        }

        &:not(&--placeholder) {
            object-fit: cover;
        }

        &--placeholder {
            object-fit: none;
            background-color: $GREY_LIGHT;
        }

        &--fab {
            border-radius: 50%;
        }
    }
</style>
