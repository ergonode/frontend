/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <img
        ref="img"
        :src="require('@Core/assets/images/placeholders/no_image.svg')"
        :class="[
            'image',
            {
                'image--fab': fab,
                'image--placeholder': isPlaceholder,
            }
        ]"
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
    beforeDestroy() {
        this.observer.disconnect();
    },
    methods: {
        ...mapActions('validations', [
            'onError',
        ]),
        getImageById() {
            this.isPlaceholder = true;
            this.$axios.$get(`multimedia/${this.imageId}`, {
                responseType: 'arraybuffer',
            }).then(response => this.onSuccess(response)).catch(this.imageLoadOnError);
        },
        onSuccess(response) {
            if (this.$refs.img) {
                this.$refs.img.src = getImageData(response);
            }
            this.isPlaceholder = false;
        },
        imageLoadOnError() {
            this.isPlaceholder = true;
            if (this.$refs.img) {
                this.$refs.img.src = require('@Core/assets/images/placeholders/image_error.svg'); // eslint-disable-line global-require, import/no-dynamic-require
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .image {
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
