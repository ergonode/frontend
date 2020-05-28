/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="picture-carousel">
        <Picture
            v-for="(id, index) in imageIds"
            :class="currentIndex === index ? 'visible' : 'non-visible'"
            :key="id"
            object-fit="none"
            :image-id="id" />
        <div class="picture-carousel__panel">
            <div
                class="image-white-theme"
                v-show="currentIndex > 0">
                <Fab
                    :theme="secondaryTheme"
                    @click.native="onPreviousPicture">
                    <template #icon="{ color }">
                        <IconArrowSingle
                            :state="arrowLeft"
                            :fill-color="color" />
                    </template>
                </Fab>
            </div>
            <span
                class="picture-carousel__pagination"
                v-text="pagination" />
            <div
                class="image-white-theme"
                v-show="currentIndex < imageIds.length - 1">
                <Fab
                    :theme="secondaryTheme"
                    @click.native="onNextPicture">
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
import { ARROW } from '@Core/defaults/icons';
import { THEME, SIZE } from '@Core/defaults/theme';
import Picture from '@Core/components/Multimedia/Picture';
import IconArrowSingle from '@Core/components/Icons/Arrows/IconArrowSingle';
import Fab from '@Core/components/Buttons/Fab';

export default {
    name: 'PictureCarousel',
    components: {
        Picture,
        IconArrowSingle,
        Fab,
    },
    props: {
        imageIds: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            currentIndex: 0,
        };
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
        onPreviousPicture() {
            this.currentIndex -= 1;

            this.$emit('current', this.currentIndex);
        },
        onNextPicture() {
            this.currentIndex += 1;

            this.$emit('current', this.currentIndex);
        },
    },
};
</script>

<style lang="scss" scoped>
    .picture-carousel {
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
