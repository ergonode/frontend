/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="date-picker-header">
        <slot name="previous">
            <IconFabButton
                theme="secondary"
                @click.native="onPrevious">
                <template #icon="{ iconFillColor }">
                    <IconArrowSingle
                        :fill-color="iconFillColor"
                        :state="leftArrow" />
                </template>
            </IconFabButton>
        </slot>
        <span
            class="header font--medium-14-20"
            @click="onClick"
            v-text="header" />
        <slot name="next">
            <IconFabButton
                theme="secondary"
                @click.native="onNext">
                <template #icon="{ iconFillColor }">
                    <IconArrowSingle
                        :fill-color="iconFillColor"
                        :state="rightArrow" />
                </template>
            </IconFabButton>
        </slot>
    </div>
</template>

<script>
import { ARROW } from '~/defaults/icons';
import IconFabButton from '~/components/Buttons/IconFabButton';
import IconArrowSingle from '~/components/Icon/Arrows/IconArrowSingle';

export default {
    name: 'DatePickerNavigationHeader',
    components: {
        IconFabButton,
        IconArrowSingle,
    },
    props: {
        header: {
            type: [String, Number],
            required: true,
        },
    },
    data() {
        return {
            leftArrow: ARROW.LEFT,
            rightArrow: ARROW.RIGHT,
        };
    },
    methods: {
        onClick() {
            this.$emit('changeCalendarType');
        },
        onPrevious() {
            this.$emit('previousDate');
        },
        onNext() {
            this.$emit('nextDate');
        },
    },
};
</script>

<style lang="scss" scoped>
    .date-picker-header {
        display: flex;
        align-items: center;

        .header {
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
            height: 32px;
            color: $GRAPHITE_DARK;
            cursor: pointer;

            &:hover {
                box-shadow: $ELEVATOR_2_DP;
            }
        }
    }
</style>
