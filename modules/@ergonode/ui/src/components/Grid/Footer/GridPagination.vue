/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-pagination">
        <GridPageSelectorArrowsPanel :visible="isLeftArrowVisible">
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
        </GridPageSelectorArrowsPanel>
        <GridFooterText title="Page" />
        <TextField
            :value="value"
            style="width: 64px;"
            :size="smallSize"
            :alignment="centerAlignment"
            :input="inputNumberType"
            @input="onValueChange" />
        <GridFooterText title="of" />
        <GridFooterText :title="maxPage" />
        <GridPageSelectorArrowsPanel :visible="isRightArrowVisible">
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
        </GridPageSelectorArrowsPanel>
    </div>
</template>

<script>
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
    }
</style>
