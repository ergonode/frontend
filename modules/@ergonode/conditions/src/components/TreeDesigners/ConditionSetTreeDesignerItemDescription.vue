/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="condition-set-tree-designer-item-description">
        <span
            v-if="title"
            class="condition-set-tree-designer-item-description__title"
            v-text="title" />
        <span
            v-if="subtitle"
            class="condition-set-tree-designer-item-description__subtitle"
            v-text="subtitle" />
    </div>
</template>

<script>
export default {
    name: 'ConditionSetTreeDesignerItemDescription',
    props: {
        title: {
            type: String,
            default: '',
        },
        subtitle: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
.condition-set-tree-designer-item-description {
    display: flex;
    flex: 1;
    flex-direction: column;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    &__title {
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_14_20;
    }

    &__subtitle {
        color: $GRAPHITE_LIGHT;
        font: $FONT_MEDIUM_12_16;
    }
}
</style>
