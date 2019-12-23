/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="date-picker-header">
        <slot name="previous">
            <Fab
                :theme="secondaryTheme"
                @click.native="onPrevious">
                <template #icon="{ fillColor }">
                    <IconArrowSingle
                        :fill-color="fillColor"
                        :state="leftArrow" />
                </template>
            </Fab>
        </slot>
        <span
            class="header font--medium-14-20"
            @click="onClick"
            v-text="header" />
        <slot name="next">
            <Fab
                :theme="secondaryTheme"
                @click.native="onNext">
                <template #icon="{ fillColor }">
                    <IconArrowSingle
                        :fill-color="fillColor"
                        :state="rightArrow" />
                </template>
            </Fab>
        </slot>
    </div>
</template>

<script>
import { THEMES } from '~/defaults/buttons';
import { ARROW } from '~/defaults/icons';
import Fab from '~/core/components/Buttons/Fab';
import IconArrowSingle from '~/components/Icon/Arrows/IconArrowSingle';

export default {
    name: 'DatePickerNavigationHeader',
    components: {
        Fab,
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
    computed: {
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
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
