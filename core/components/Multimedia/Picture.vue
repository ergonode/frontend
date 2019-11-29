/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <img
        :class="['image', { 'image--fab': fab, 'image--broke': brokenImage }]"
        :src="image"
        alt="picture">
</template>

<script>
import { mapActions } from 'vuex';
import { getImageData } from '~/model/multimedia';

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
    watch: {
        imageId: {
            immediate: true,
            handler() {
                this.getImageById();
            },
        },
    },
    data() {
        return {
            brokenImage: false,
            image: null,
        };
    },
    methods: {
        ...mapActions('validations', [
            'onError',
        ]),
        async getImageById() {
            await this.$axios.$get(`multimedia/${this.imageId}`, {
                responseType: 'arraybuffer',
            }).then((response) => this.onSuccess(response)).catch(this.imageLoadOnError);
        },
        onSuccess(response) {
            this.image = getImageData(response);
        },
        imageLoadOnError() {
            this.brokenImage = true;
            this.image = require('~/assets/images/placeholders/image_error.svg'); // eslint-disable-line global-require, import/no-dynamic-require
        },
    },
};
</script>

<style lang="scss" scoped>
    .image {
        flex: 1;
        width: 100%;
        max-height: 100%;
        object-fit: cover;

        &--broke {
            flex: 0 0 auto;
            width: 50%;
            height: 50%;
        }

        &--fab {
            border-radius: 50%;
        }
    }
</style>
