/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="workflow-designer-layout-element"
        :style="elementStyles">
        <div
            class="workflow-designer-layout-element-pointers"
            :style="pointersStyles">
            <slot
                name="content"
                :is-revers="isRevers"
                :element-width="elementWidth" />
        </div>
    </div>
</template>
<script>

export default {
    name: 'WorkflowDesignerLayoutElement',
    components: {},
    props: {
        index: {
            type: Number,
            required: true,
        },
        element: {
            type: Object,
            required: true,
        },
        layoutWidth: {
            type: Number,
            required: true,
        },
    },
    data() {
        const {
            from = null,
            to = null,
        } = this.element;

        return {
            isRevers: from !== null && to !== null ? from > to : false,
            elementWidth: from !== null && to !== null ? Math.abs(from - to) + 1 : 0,
        };
    },
    computed: {
        elementStyles() {
            const {
                row,
            } = this.element;
            const gridRow = row + 2;
            const startColumn = 1;

            return {
                gridArea: `${gridRow} / ${startColumn} / ${gridRow} / ${startColumn + this.layoutWidth}`,
                gridTemplateColumns: `repeat(${this.layoutWidth}, 1fr)`,
            };
        },
        pointersStyles() {
            const {
                from = null,
                to = null,
            } = this.element;
            const gridRow = 1;
            let startColumn = from + 1;

            if (to !== null) {
                startColumn = (this.isRevers ? to : from) + 1;
            }

            return {
                gridArea: `${gridRow} / ${startColumn} / ${gridRow} / ${startColumn + this.elementWidth}`,
                gridTemplateColumns: `repeat(${this.elementWidth}, minmax(144px, max-content))`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .workflow-designer-layout-element {
        position: relative;
        z-index: $Z_INDEX_LVL_0;
        display: grid;

        &-pointers {
            position: relative;
            z-index: $Z_INDEX_LVL_1;
            display: grid;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
        }
    }
</style>
