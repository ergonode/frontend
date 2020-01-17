/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="grid-header"
        :style="gridColumnTemplateStyle">
        <span
            v-for="index in columns"
            :key="index"
            class="grid-header__title">
            {{ addOrdinalNumberSuffix(index) }} {{ header }}
        </span>
    </div>
</template>
<script>
export default {
    name: 'TemplateGridHeader',
    props: {
        columns: {
            type: Number,
            required: true,
        },
        header: {
            type: String,
            default: 'level',
        },
    },
    computed: {
        gridColumnTemplateStyle() {
            return {
                gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
            };
        },
    },
    methods: {
        addOrdinalNumberSuffix(index) {
            switch (index % 10) {
            case 1:
                return `${index}st`;
            case 2:
                return `${index}nd`;
            case 3:
                return `${index}rd`;
            default:
                return `${index}th`;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-header {
        display: grid;
        height: 40px;
        border: 1px solid $GREY;
        border-left: none;
        box-sizing: border-box;
        background-color: $WHITESMOKE;

        &__title {
            display: flex;
            flex: 1;
            justify-content: space-between;
            align-items: center;
            padding: 8px;
            box-sizing: border-box;
            border-left: 1px solid $GREY;
            color: $GRAPHITE;
            font: $FONT_BOLD_12_16;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
</style>
