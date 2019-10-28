/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="date-picker-header">
        <slot name="previous">
            <Button
                fab
                color="transparent"
                @click.native="onPrevious">
                <template #prepend>
                    <IconArrowSingle :state="leftArrow" />
                </template>
            </Button>
        </slot>
        <span
            class="header font--medium-14-20"
            @click="onClick"
            v-text="header" />
        <slot name="next">
            <Button
                fab
                color="transparent"
                @click.native="onNext">
                <template #prepend>
                    <IconArrowSingle :state="rightArrow" />
                </template>
            </Button>
        </slot>
    </div>
</template>

<script>
import { ARROW } from '~/defaults/icons';
import Button from '~/components/Buttons/Button';
import IconArrowSingle from '~/components/Icon/Arrows/IconArrowSingle';

export default {
    name: 'DatePickerNavigationHeader',
    components: {
        Button,
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
