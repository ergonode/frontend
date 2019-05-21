/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="image-cell">
        <img
            v-if="value"
            :src="image"
            class="image-cell__image">
    </div>
</template>

<script>
import { getImageData } from '~/model/multimedia';

export default {
    name: 'GridImageCell',
    props: {
        value: {
            type: String,
            required: false,
            default: '',
        },
    },
    data() {
        return {
            image: null,
        };
    },
    watch: {
        value() {
            if (this.value) {
                this.$axios.$get(`multimedia/${this.value}`, {
                    responseType: 'arraybuffer',
                }).then(response => this.onSuccess(response)).catch(e => this.onError(e.data));
            }
        },
    },
    methods: {
        onSuccess(response) {
            this.image = getImageData(response);
        },
        onError(e) {
            console.log(e);
        },
    },
};
</script>

<style lang="scss" scoped>
    .image-cell {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 8px;

        &__image {
            width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    }
</style>
