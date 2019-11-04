/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="pagination">
        <Transition
            name="fade"
            mode="out-in">
            <FabButton
                :class="{'non-visible': !isLeftArrowVisible}"
                theme="secondary"
                @click.native="decrementPage">
                <template #icon="{ color }">
                    <IconArrowPointer :fill-color="color" />
                </template>
            </FabButton>
        </Transition>
        <span class="pagination__text font--medium-12-16">
            Page
        </span>
        <TextField
            :value="value"
            style="width: 64px;"
            solid
            small
            center-alignment
            :input="inputNumberType"
            @input="onValueChange" />
        <span class="pagination__text font--medium-12-16">
            of
        </span>
        <span
            class="pagination__number font--medium-12-16"
            v-text="maxPage" />
        <Transition name="fade">
            <FabButton
                :class="{'non-visible': !isRightArrowVisible}"
                theme="secondary"
                @click.native="incrementPage">
                <template #icon="{ color }">
                    <IconArrowPointer
                        :fill-color="color"
                        :state="rightArrow" />
                </template>
            </FabButton>
        </Transition>
    </div>
</template>

<script>
import { ARROW } from '~/defaults/icons';

export default {
    name: 'GridPagination',
    components: {
        TextField: () => import('~/components/Inputs/TextField'),
        FabButton: () => import('~/components/Buttons/FabButton'),
        IconArrowPointer: () => import('~/components/Icon/Arrows/IconArrowPointer'),
    },
    props: {
        value: {
            type: Number,
            required: true,
        },
        maxPage: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            rightArrow: ARROW.RIGHT,
        };
    },
    computed: {
        isLeftArrowVisible() {
            return this.value > 1;
        },
        isRightArrowVisible() {
            return this.value < this.maxPage;
        },
        inputNumberType() {
            return {
                type: 'number',
                min: 1,
                max: this.maxPage,
            };
        },
    },
    methods: {
        onValueChange(value) {
            this.validateValueOnChange(value);
        },
        incrementPage() {
            this.validateValueOnChange(this.value + 1);
        },
        decrementPage() {
            this.validateValueOnChange(this.value - 1);
        },
        validateValueOnChange(value) {
            const number = Math.trunc(value);

            if (number < 1) {
                this.$emit('input', 1);
            } else if (number > this.maxPage) {
                this.$emit('input', this.maxPage);
            } else {
                this.$emit('input', number);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/grid/pagination.scss";
    @import "~assets/scss/fade.scss";
</style>
