/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <Fab
            :style="{ backgroundColor: whiteColor }"
            :theme="secondaryTheme"
            @click.native="onPreviousItem">
            <template #icon="{ color }">
                <IconArrowSingle
                    :state="arrowLeft"
                    :fill-color="color" />
            </template>
        </Fab>
        <slot />
        <Fab
            :style="{ backgroundColor: whiteColor }"
            :theme="secondaryTheme"
            @click.native="onTextItem">
            <template #icon="{ color }">
                <IconArrowSingle
                    :state="arrowRight"
                    :fill-color="color" />
            </template>
        </Fab>
    </div>
</template>

<script>
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    THEME,
} from '@Core/defaults/theme';
import {
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'CarouselPagination',
    props: {
        currentIndex: {
            type: Number,
            default: 0,
        },
        itemsNumber: {
            type: Number,
            default: 0,
        },
        floating: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return [
                'carousel-pagination',
                {
                    'carousel-pagination--floating': this.floating,
                },
            ];
        },
        whiteColor() {
            return WHITE;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        arrowLeft() {
            return ARROW.LEFT;
        },
        arrowRight() {
            return ARROW.RIGHT;
        },
    },
    methods: {
        onPreviousItem() {
            const previousIndex = this.currentIndex - 1;

            this.$emit('current', previousIndex < 0 ? this.itemsNumber - 1 : previousIndex);
        },
        onTextItem() {
            const nextIndex = this.currentIndex + 1;

            this.$emit('current', nextIndex === this.itemsNumber ? 0 : nextIndex);
        },
    },
};
</script>

<style lang="scss" scoped>
    .carousel-pagination {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &--floating {
            position: absolute;
            left: 4px;
            bottom: 4px;
            right: 4px;
        }

        &:not(&--floating) {
            width: 100%;
            padding: 4px;
            box-sizing: border-box;
        }
    }
</style>
