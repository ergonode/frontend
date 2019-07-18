/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="date-picker-header">
        <slot name="previous">
            <Button
                icon="arrow-single trans-quarter"
                fab
                color="transparent"
                ripple-color="rgba(235, 235, 236, 1)"
                @click.native="onPrevious" />
        </slot>
        <span
            class="header"
            @click="onClick"
            v-text="header" />
        <slot name="next">
            <Button
                icon="arrow-single trans-three-fourth"
                fab
                color="transparent"
                ripple-color="rgba(235, 235, 236, 1)"
                @click.native="onNext" />
        </slot>
    </div>
</template>

<script>
import Button from '~/components/Buttons/Button';

export default {
    name: 'DatePickerNavigationHeader',
    components: {
        Button,
    },
    props: {
        header: {
            type: [String, Number],
            required: true,
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
            @include setFont(medium, regular, semiRegular, $darkGraphite);

            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
            height: 32px;
            cursor: pointer;

            &:hover {
                box-shadow:
                    0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 3px 1px -2px rgba(0, 0, 0, 0.12),
                    0 1px 5px 0 rgba(0, 0, 0, 0.2);
            }
        }
    }
</style>
