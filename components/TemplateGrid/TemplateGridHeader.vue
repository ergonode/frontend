/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="grid-header">
        <label
            v-for="index in columns"
            :key="index"
            class="grid-header__title txt-fixed typo-label--strong txt--graphite">
            {{ addOrdinalNumberSuffix(index) }} {{ headerName }}
        </label>
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
        headerName: {
            type: String,
            required: false,
            default: 'level',
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
        border: 1px solid $grey;
        border-left: none;
        background-color: $background;

        &__title {
            display: flex;
            flex: 1;
            justify-content: space-between;
            align-items: center;
            padding: 8px;
            border-left: 1px solid $grey;
        }
    }
</style>
