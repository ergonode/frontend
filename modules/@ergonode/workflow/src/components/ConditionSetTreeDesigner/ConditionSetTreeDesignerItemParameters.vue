/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="styles"
        class="condition-set-tree-designer-item-parameters">
        <template v-for="(parameter, index) in parameters">
            <slot
                name="parameter"
                :index="index"
                :parameter="parameter" />
        </template>
    </div>
</template>

<script>
export default {
    name: 'ConditionSetTreeDesignerItemParameters',
    props: {
        parameters: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        styles() {
            return {
                gridTemplateColumns: `repeat(${this.parameters.length}, minmax(min-content, 33%))`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .condition-set-tree-designer-item-parameters {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 16px;
        margin-top: 12px;
    }
</style>
