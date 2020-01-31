/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="pagination">
        <FadeTransition>
            <FabButton
                :class="{'non-visible': !isLeftArrowVisible}"
                :theme="secondaryTheme"
                @click.native="decrementPage">
                <template #icon="{ fillColor }">
                    <IconArrowPointer :fill-color="fillColor" />
                </template>
            </FabButton>
        </FadeTransition>
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
        <FadeTransition>
            <FabButton
                :class="{'non-visible': !isRightArrowVisible}"
                :theme="secondaryTheme"
                @click.native="incrementPage">
                <template #icon="{ fillColor }">
                    <IconArrowPointer
                        :fill-color="fillColor"
                        :state="rightArrow" />
                </template>
            </FabButton>
        </FadeTransition>
    </div>
</template>

<script>
import { THEMES } from '@Core/defaults/buttons';
import { ARROW } from '@Core/defaults/icons';

export default {
    name: 'GridPagination',
    components: {
        TextField: () => import('@Core/components/Inputs/TextField'),
        FabButton: () => import('@Core/components/Buttons/FabButton'),
        IconArrowPointer: () => import('@Core/components/Icons/Arrows/IconArrowPointer'),
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
    data() {
        return {
            rightArrow: ARROW.RIGHT,
        };
    },
    computed: {
        secondaryTheme() {
            return THEMES.SECONDARY;
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

        .non-visible {
            visibility: hidden;
        }
    }
</style>
