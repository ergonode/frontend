/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="pagination">
        <Transition
            name="fade"
            mode="out-in">
            <div v-visible="value > 1">
                <Button
                    fab
                    color="transparent"
                    ripple-color="rgba(235, 235, 236, 1)"
                    @click.native="decrementPage">
                    <template v-slot:prepend>
                        <IconArrowPointer />
                    </template>
                </Button>
            </div>
        </Transition>
        <span class="pagination__text">
            Page
        </span>
        <TextField
            :value="value"
            style="width: 64px;"
            solid
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
            <div v-visible="value < maxPage">
                <Button
                    fab
                    color="transparent"
                    ripple-color="rgba(235, 235, 236, 1)"
                    @click.native="incrementPage">
                    <template v-slot:prepend>
                        <IconArrowPointer :state="rightArrow" />
                    </template>
                </Button>
            </div>
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
                return;
            } if (number > this.maxPage) {
                this.$emit('input', this.maxPage);
                return;
            }

            this.$emit('input', number);
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/grid/pagination.scss";
    @import "~assets/scss/fade.scss";
</style>
