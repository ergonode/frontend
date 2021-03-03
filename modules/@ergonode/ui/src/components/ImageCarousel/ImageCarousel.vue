/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="image-carousel">
        <LazyImage
            v-for="(id, index) in imageIds"
            :class="currentIndex === index ? 'visible' : 'non-visible'"
            :href="hrefById(id)"
            :value="id"
            :key="id"
            object-fit="contain" />
        <div class="image-carousel__panel">
            <div
                class="image-white-theme"
                v-show="currentIndex > 0">
                <Fab
                    :theme="secondaryTheme"
                    @click.native="onPreviousImage">
                    <template #icon="{ color }">
                        <IconArrowSingle
                            :state="arrowLeft"
                            :fill-color="color" />
                    </template>
                </Fab>
            </div>
            <span
                class="image-carousel__pagination"
                v-text="pagination" />
            <div
                class="image-white-theme"
                v-show="currentIndex < imageIds.length - 1">
                <Fab
                    :theme="secondaryTheme"
                    @click.native="onNextImage">
                    <template #icon="{ color }">
                        <IconArrowSingle
                            :state="arrowRight"
                            :fill-color="color" />
                    </template>
                </Fab>
            </div>
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
import Fab from '@UI/components/Fab/Fab';
import IconArrowSingle from '@UI/components/Icons/Arrows/IconArrowSingle';
import LazyImage from '@UI/components/LazyImage/LazyImage';

export default {
    name: 'ImageCarousel',
    components: {
        LazyImage,
        IconArrowSingle,
        Fab,
    },
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
        imageIds: {
            type: Array,
            default: () => [],
        },
        /**
         * URL of backend endpoint
         */
        href: {
            type: String,
            required: true,
        },
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        secondaryPlainTheme() {
            return THEME.SECONDARY_PLAIN;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        arrowLeft() {
            return ARROW.LEFT;
        },
        arrowRight() {
            return ARROW.RIGHT;
        },
        pagination() {
            return `${this.currentIndex + 1}/${this.imageIds.length}`;
        },
    },
    methods: {
        onPreviousImage() {
            this.$emit('current', this.currentIndex - 1);
        },
        onNextImage() {
            this.$emit('current', this.currentIndex + 1);
        },
        hrefById(id) {
            const replacements = {
                '[[ID]]': id,
            };

            return this.href.replace(/\[\[\w+\]\]/g, key => replacements[key] || key);
        },
    },
};
</script>

<style lang="scss" scoped>
    .image-carousel {
        position: relative;
        display: flex;
        flex: 1;
        height: 100%;

        &__panel {
            position: absolute;
            left: 8px;
            bottom: 8px;
            display: grid;
            grid-auto-flow: column;
            column-gap: 8px;
        }

        &__pagination {
            padding: 8px;
            background-color: $WHITE;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            border-radius: 999px;
        }
    }

    .image-white-theme {
        background-color: $WHITE;
        border-radius: 50%;
    }

    .visible {
        display: initial;
    }

    .non-visible {
        display: none;
    }
</style>
