/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-header">
        <div class="container">
            <span
                class="grid-header__title"
                v-text="title" />
            <Divider vertical />
        </div>
        <div class="container" />
    </div>
</template>

<script>
export default {
    name: 'GridHeader',
    components: {
        Divider: () => import('~/components/Dividers/Divider'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-header {
        display: flex;
        justify-content: space-between;
        border: 1px solid $grey;
        padding: 11px 16px;
        box-sizing: border-box;
        background-color: $white;

        &__title {
            @include setFont(medium, medium, medium, $darkGraphite);
        }
    }

    .container {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 16px;
    }
</style>
