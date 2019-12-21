/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-container">
        <span
            class="grid-title font--medium-24-32"
            v-text="title" />
        <div
            v-for="item in items"
            :key="item.title"
            class="grid-item">
            <div class="item-wrapper">
                <img
                    :src="require(`~/assets/images/dashboard/${item.icon}`)"
                    :alt="`${item.title} icon`">
                <span
                    class="item-title font--medium-24-32"
                    v-text="item.title" />
                <Button
                    :title="item.actionTitle "
                    @click.native="$router.push(item.action)" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SimpleGrid',
    components: {
        Button: () => import('@Core/components/Buttons/Button'),
    },
    props: {
        items: {
            type: Array,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(3, 251px);
        grid-gap: 49px;
        padding-bottom: 86px;

        .grid-title {
            height: 37px;
            color: $GRAPHITE_DARK;
            text-align: center;
            grid-column: 1/4;
            grid-row: 1;
        }

        .grid-item {
            height: 251px;
            border: $BORDER_1_GREY;
            padding: 20px;
            background-color: $WHITE;

            .item-wrapper {
                display: grid;
                height: 100%;
                justify-items: center;
                grid-gap: 20px;

                .item-title {
                    height: 24px;
                    color: $GRAPHITE_DARK;
                    text-align: center;
                }
            }
        }
    }
</style>
