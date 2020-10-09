/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-pagination">
        <FadeTransition>
            <div
                class="grid-pagination__decrease"
                v-show="isLeftArrowVisible">
                <Fab
                    :theme="secondaryTheme"
                    @click.native="toFirstPage">
                    <template #icon="{ color }">
                        <IconArrowPointerBlock :fill-color="color" />
                    </template>
                </Fab>
                <Fab
                    :theme="secondaryTheme"
                    @click.native="decrementPage">
                    <template #icon="{ color }">
                        <IconArrowSingle
                            :fill-color="color"
                            :state="arrow.LEFT" />
                    </template>
                </Fab>
            </div>
        </FadeTransition>
        <span class="grid-pagination__text">
            Page
        </span>
        <TextField
            :value="value"
            style="width: 64px;"
            :size="smallSize"
            :alignment="centerAlignment"
            :input="inputNumberType"
            @input="onValueChange" />
        <span class="grid-pagination__text">
            of
        </span>
        <span
            class="grid-pagination__number"
            v-text="maxPage" />
        <FadeTransition>
            <div
                class="grid-pagination__increase"
                v-show="isRightArrowVisible">
                <Fab
                    :theme="secondaryTheme"
                    @click.native="incrementPage">
                    <template #icon="{ color }">
                        <IconArrowSingle
                            :fill-color="color"
                            :state="arrow.RIGHT" />
                    </template>
                </Fab>
                <Fab
                    :theme="secondaryTheme"
                    @click.native="toLastPage">
                    <template #icon="{ color }">
                        <IconArrowPointerBlock
                            :fill-color="color"
                            :state="arrow.RIGHT" />
                    </template>
                </Fab>
            </div>
        </FadeTransition>
    </div>
</template>

<script>
import Fab from '@Core/components/Fab/Fab';
import IconArrowPointerBlock from '@Core/components/Icons/Arrows/IconArrowPointerBlock';
import IconArrowSingle from '@Core/components/Icons/Arrows/IconArrowSingle';
import TextField from '@Core/components/TextField/TextField';
import FadeTransition from '@Core/components/Transitions/FadeTransition';
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    ALIGNMENT,
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'GridPagination',
    components: {
        TextField,
        Fab,
        IconArrowSingle,
        IconArrowPointerBlock,
        FadeTransition,
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
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        centerAlignment() {
            return ALIGNMENT.CENTER;
        },
        arrow() {
            return ARROW;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
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
        toLastPage() {
            this.validateValueOnChange(this.maxPage);
        },
        toFirstPage() {
            this.validateValueOnChange(1);
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
    .grid-pagination {
        display: grid;
        align-items: center;
        grid-auto-flow: column;
        column-gap: 8px;
        margin-right: 8px;

        &__text, &__number {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
        }

        &__increase, &__decrease {
            display: flex;
            align-items: center;
        }
    }
</style>
