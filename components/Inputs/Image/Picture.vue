/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <img
        :class="['image', { 'image--fab': fab }]"
        :src="image">
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
            required: false,
            default: false,
        },
    },
    data() {
        return {
            image: null,
        };
    },
    watch: {
        imageId: {
            immediate: true,
            handler() {
                this.getImageById();
            },
        },
    },
    methods: {
        ...mapActions('validations', [
            'onError',
        ]),
        async getImageById() {
            await this.$axios.$get(`multimedia/${this.imageId}`, {
                responseType: 'arraybuffer',
            }).then(response => this.onSuccess(response)).catch(e => this.onError(e.data));
        },
        onSuccess(response) {
            this.image = getImageData(response);
        },
    },
};
</script>

<style lang="scss" scoped>
    .image {
        width: 100%;
        max-height: 100%;
        object-fit: cover;

        &--fab {
            border-radius: 50%;
        }
    }
</style>
