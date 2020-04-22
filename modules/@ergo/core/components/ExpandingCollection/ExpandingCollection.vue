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
                        :number="collection.itemsCount"
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
                v-for="(item, itemIndex) in collection.items"
                :key="itemIndex">
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
    props: {
        index: {
            type: Number,
            default: 0,
        },
        collection: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isExpanded: false,
        };
    },
    methods: {
        onExpand(isExpanded) {
            this.isExpanded = isExpanded;
            if (this.isExpanded && this.collection.itemsCount !== this.collection.items.length) {
                this.$emit('fetch', { id: this.collection.id, index: this.index });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .expanding-collection {
        display: flex;
        flex-direction: column;
        width: inherit;
        border: $BORDER_1_GREY;

        &__header {
            display: grid;
            grid-template-columns: 80% 20%;
            padding: 15px;
            background-color: $WHITESMOKE;
        }

        &__body {
            display: grid;
            grid-template-columns: repeat(4, minmax(50px, 1fr));
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
            white-space: pre-wrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
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
        justify-content: center;
    }
</style>
