/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="date-picker-header">
        <slot name="previous">
            <FabButton
                theme="secondary"
                @click.native="onPrevious">
                <template #icon="{ color }">
                    <IconArrowSingle
                        :fill-color="color"
                        :state="leftArrow" />
                </template>
            </FabButton>
        </slot>
        <span
            class="header font--medium-14-20"
            @click="onClick"
            v-text="header" />
        <slot name="next">
            <FabButton
                theme="secondary"
                @click.native="onNext">
                <template #icon="{ color }">
                    <IconArrowSingle
                        :fill-color="color"
                        :state="rightArrow" />
                </template>
            </FabButton>
        </slot>
    </div>
</template>

<script>
import { ARROW } from '~/defaults/icons';
import FabButton from '~/components/Buttons/FabButton';
import IconArrowSingle from '~/components/Icon/Arrows/IconArrowSingle';

export default {
    name: 'DatePickerNavigationHeader',
    components: {
        FabButton,
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
