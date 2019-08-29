/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="pagination">
        <Transition
            name="fade"
            mode="out-in">
            <Button
                :class="{'non-visible': !isLeftArrowVisible}"
                fab
                color="transparent"
                @click.native="decrementPage">
                <template v-slot:prepend>
                    <IconArrowPointer />
                </template>
            </Button>
        </Transition>
        <span class="pagination__text">
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
        <span class="pagination__text">
            of
        </span>
        <span
            class="pagination__number"
            v-text="maxPage" />
        <Transition name="fade">
            <Button
                :class="{'non-visible': !isRightArrowVisible}"
                fab
                color="transparent"
                @click.native="incrementPage">
                <template v-slot:prepend>
                    <IconArrowPointer :state="rightArrow" />
                </template>
            </Button>
        </Transition>
    </div>
</template>

<script>
import { Arrow } from '~/model/icons/Arrow';

export default {
    name: 'GridPagination',
    components: {
        TextField: () => import('~/components/Inputs/TextField'),
        Button: () => import('~/components/Buttons/Button'),
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
            rightArrow: Arrow.RIGHT,
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
