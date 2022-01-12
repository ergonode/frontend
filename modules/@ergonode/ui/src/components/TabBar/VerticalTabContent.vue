/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="styles"
        class="vertical-tab-bar-content">
        <div class="vertical-tab-bar-content__container">
            <KeepAlive>
                <Component
                    :is="item.component"
                    v-bind="item.props" />
            </KeepAlive>
        </div>
        <ClientOnly>
            <Resizer
                :parent-reference="$el"
                :min-width="minWidth"
                @width-change="onWidthChange" />
        </ClientOnly>
    </div>
</template>

<script>

export default {
    name: 'VerticalTabContent',
    props: {
        /**
         * Item data model
         */
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            currentWidth: '248px',
        };
    },
    computed: {
        styles() {
            return {
                width: this.currentWidth,
            };
        },
        minWidth() {
            return 248;
        },
    },
    methods: {
        onWidthChange(width) {
            this.currentWidth = width;
        },
    },
};
</script>

<style lang="scss" scoped>
    .vertical-tab-bar-content {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        box-sizing: border-box;

        &__container {
            position: relative;
            flex: 1 1 auto;
            width: 100%;
            height: 0;
        }
    }
</style>
