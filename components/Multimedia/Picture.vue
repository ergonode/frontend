/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="picture-wrapper">
        <div
            v-if="loading"
            class="loading typo-input txt--dark-grey">
            <img
                width="14"
                src="~assets/images/preloader.gif"
                alt="Loading...">
        </div>
        <img
            v-if="dataUrl && !loading"
            :src="dataUrl"
            :style="imageStyle"
            :class="['picture', {
                'picture--fab': fab,
                'picture--rounded': rounded,
                'picture--shadow': shadow,
            }]">
    </div>
</template>
<script>
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
        rounded: {
            type: Boolean,
            required: false,
            default: false,
        },
        shadow: {
            type: Boolean,
            required: false,
            default: false,
        },
        imageStyle: {
            type: Object,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            loading: true,
            error: null,
            imageData: null,
        };
    },
    computed: {
        dataUrl() {
            if (this.imageData) {
                return getImageData(this.imageData);
            }
            return null;
        },
    },
    watch: {
        imageId: 'fetchData',
    },
    created() {
        this.fetchData();
    },
    methods: {
        onSuccess(response) {
            this.loading = false;
            this.imageData = response;
        },
        onError(e) {
            this.error = e.toString();
        },
        fetchData() {
            this.error = null;
            this.post = null;
            this.loading = true;
            this.$axios.$get(`multimedia/${this.imageId}`, {
                responseType: 'arraybuffer',
            }).then(response => this.onSuccess(response)).catch(e => this.onError(e.data));
        },
    },
};
</script>

<style lang="scss" scoped>
    .picture-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-width: 30%;

        .picture {
            width: 100%;
            height: 100%;
            object-fit: contain;

            &--fab {
                border-radius: 50%;
            }

            &--rounded {
                border-radius: 999px;
            }

            &--shadow {
                box-shadow:
                    0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 3px 1px -2px rgba(0, 0, 0, 0.12),
                    0 1px 5px 0 rgba(0, 0, 0, 0.2);
            }
        }
    }
</style>
