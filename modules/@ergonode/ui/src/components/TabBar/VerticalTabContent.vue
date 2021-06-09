/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="vertical-tab-bar-content">
        <div class="vertical-tab-bar-content__container">
            <KeepAlive>
                <Component
                    :is="item.component"
                    v-bind="item.props" />
            </KeepAlive>
        </div>
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
};
</script>

<style lang="scss" scoped>
    .vertical-tab-bar-content {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 248px;
        box-sizing: border-box;

        &__container {
            position: relative;
            flex: 1 1 auto;
            width: 100%;
            height: 0;
        }
    }
</style>
