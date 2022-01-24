/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="rowStyles"
        class="designer-virtual-overlay__column-row">
        <slot
            name="appendRowBody"
            :column="columnIndex" />
    </div>
</template>
<script>

export default {
    name: 'WorkflowDesignerVirtualOverlayRow',
    props: {
        row: {
            type: Object,
            required: true,
        },
        columnIndex: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        rowStyles() {
            const {
                row,
            } = this.row;

            return {
                gridRowStart: row + 1,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .designer-virtual-overlay__column-row {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
</style>
