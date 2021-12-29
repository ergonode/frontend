/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="date-picker-header">
        <slot name="previous">
            <Fab
                :theme="secondaryTheme"
                @click.native="onPrevious">
                <template #icon="{ color }">
                    <IconArrowSingle
                        :fill-color="color"
                        :state="leftArrow" />
                </template>
            </Fab>
        </slot>
        <span
            class="date-picker-header__title"
            @click="onClick"
            v-text="title" />
        <slot name="next">
            <Fab
                :theme="secondaryTheme"
                @click.native="onNext">
                <template #icon="{ color }">
                    <IconArrowSingle
                        :fill-color="color"
                        :state="rightArrow" />
                </template>
            </Fab>
        </slot>
    </div>
</template>

<script>
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'DatePickerNavigationHeader',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
    },
    data() {
        return {
            leftArrow: ARROW.LEFT,
            rightArrow: ARROW.RIGHT,
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onClick() {
            this.$emit('change-calendar-type');
        },
        onPrevious() {
            this.$emit('previous-date');
        },
        onNext() {
            this.$emit('next-date');
        },
    },
};
</script>

<style lang="scss" scoped>
    .date-picker-header {
        display: flex;
        align-items: center;

        &__title {
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
            height: 32px;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_14_20;
            cursor: pointer;

            &:hover {
                box-shadow: $ELEVATOR_HOVER_FOCUS;
            }
        }
    }
</style>
