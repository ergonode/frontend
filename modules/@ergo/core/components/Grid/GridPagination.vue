/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="pagination">
        <div :class="['pagination__decrease', {'non-visible': !isLeftArrowVisible}]">
            <FadeTransition>
                <Fab
                    :theme="secondaryTheme"
                    @click.native="toFirstPage">
                    <template #icon="{ color }">
                        <IconArrowPointerBlock :fill-color="color" />
                    </template>
                </Fab>
            </FadeTransition>
            <FadeTransition>
                <Fab
                    :theme="secondaryTheme"
                    @click.native="decrementPage">
                    <template #icon="{ color }">
                        <IconArrowSingle
                            :fill-color="color"
                            :state="arrow.LEFT" />
                    </template>
                </Fab>
            </FadeTransition>
        </div>
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
        <div :class="['pagination__increase', {'non-visible': !isRightArrowVisible}]">
            <FadeTransition>
                <Fab
                    :theme="secondaryTheme"
                    @click.native="incrementPage">
                    <template #icon="{ color }">
                        <IconArrowSingle
                            :fill-color="color"
                            :state="arrow.RIGHT" />
                    </template>
                </Fab>
            </FadeTransition>
            <FadeTransition>
                <Fab
                    :theme="secondaryTheme"
                    @click.native="toLastPage">
                    <template #icon="{ color }">
                        <IconArrowPointerBlock
                            :fill-color="color"
                            :state="arrow.RIGHT" />
                    </template>
                </Fab>
            </FadeTransition>
        </div>
    </div>
</template>

<script>
import { THEME } from '@Core/defaults/theme';
import { ARROW } from '@Core/defaults/icons';

export default {
    name: 'GridPagination',
    components: {
        TextField: () => import('@Core/components/Inputs/TextField'),
        Fab: () => import('@Core/components/Buttons/Fab'),
        IconArrowSingle: () => import('@Core/components/Icons/Arrows/IconArrowSingle'),
        IconArrowPointerBlock: () => import('@Core/components/Icons/Arrows/IconArrowPointerBlock'),
        FadeTransition: () => import('@Core/components/Transitions/FadeTransition'),
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
    .pagination {
        display: grid;
        align-items: center;
        grid-auto-flow: column;
        column-gap: 8px;

        &__text, &__number {
            color: $GRAPHITE_DARK;
        }

        &__icon {
            color: $GRAPHITE_LIGHT;
        }

        &__increase, &__decrease {
            display: flex;
            align-items: center;
        }

        .non-visible {
            visibility: hidden;
        }
    }
</style>
