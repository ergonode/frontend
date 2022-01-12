/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        class="condition-set-tree-designer-no-type-item-parameter"
        v-text="placeholderTitle" />
</template>

<script>
export default {
    name: 'ConditionSetTreeDesignerNoTypeItemParameter',
    props: {
        parameter: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        placeholderTitle() {
            return this.$t('@Workflow.workflow.components.ConditionSetTreeDesignerNoTypeItemParameter.placeholderTitle', {
                info: this.parameter.type,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .condition-set-tree-designer-no-type-item-parameter {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        height: 32px;
        border: $BORDER_1_GREY;
        padding: 10px 8px 10px 12px;
        box-sizing: border-box;
        background-color: $WHITE;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_12_16;
    }
</style>
