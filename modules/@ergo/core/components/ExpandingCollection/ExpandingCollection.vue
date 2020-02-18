/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="expanding-collection">
        <div class="expanding-collection__header">
            <div class="prepend-header">
                <slot name="prependHeader">
                    <span
                        class="prepend-header__title"
                        v-text="collection.title" />
                    <span
                        class="prepend-header__subtitle"
                        v-text="collection.subtitle" />
                    <span
                        class="prepend-header__description"
                        v-text="collection.description"
                        v-if="collection.description" />
                </slot>
            </div>
            <div class="append-header">
                <slot name="appendHeader">
                    <ExpandNumericButton
                        title="PRODUCTS"
                        :number="collection.items.length"
                        :is-expanded="isExpanded"
                        @expand="onExpand" />
                </slot>
            </div>
        </div>
        <div
            class="expanding-collection__body"
            v-show="isExpanded">
            <div
                class="expanding-collection__item"
                v-for="(item, index) in collection.items"
                :key="index">
                <slot
                    name="item"
                    :item="item" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ExpandingCollection',
    components: {
        ExpandNumericButton: () => import('@Core/components/Buttons/ExpandNumericButton'),
    },
    data() {
        return {
            isExpanded: false,
            collection: {
                title: 'Title',
                subtitle: 'Subtitle',
                description: 'Description',
                items: [{
                    title: 'Test title',
                }],
            },
        };
    },
    methods: {
        onExpand(isExpanded) {
            this.isExpanded = isExpanded;
        },
    },
};
</script>

<style lang="scss" scoped>
    .expanding-collection {
        display: flex;
        flex-direction: column;
        border: $BORDER_1_GREY;

        &__header {
            display: flex;
            justify-content: space-between;
            padding: 15px;
            background-color: $WHITESMOKE;
        }

        &__body {
            display: grid;
            grid-gap: 24px;
            padding: 24px;
            border-top: $BORDER_1_GREY;
            box-sizing: border-box;
            background-color: $WHITE;
        }
    }

    .prepend-header {
        display: flex;
        flex-direction: column;

        &__title {
            font: $FONT_MEDIUM_16_24;
        }

        &__subtitle {
            color: $GRAPHITE_LIGHT;
        }

        &__description {
            margin-top: 8px;
        }

        &__subtitle, &__description {
            font: $FONT_MEDIUM_12_16;
        }

        &__title, &__description {
            color: $GRAPHITE_DARK;
        }
    }

    .append-header {
        display: flex;
    }
</style>
