/*
* Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
* See LICENSE for license details.
*/
<template>
    <div class="template-grid">
        <slot />
    </div>
</template>

<script>
import { debounce } from 'debounce';

export default {
    name: 'TemplateGridDesigner',
    props: {
        maxRow: {
            type: Number,
            default: 0,
        },
        rowHeight: {
            type: Number,
            default: 62,
        },
    },
    data() {
        return {
            debounceFunc: null,
        };
    },
    created() {
        this.debounceFunc = debounce(this.emitRowsNumber, 100);
    },
    mounted() {
        this.emitRowsNumber();
        window.addEventListener('resize', this.debounceFunc);
    },
    destroyed() {
        window.removeEventListener('resize', this.debounceFunc);
    },
    methods: {
        emitRowsNumber() {
            this.$emit('rowsCount', { key: 'rowsCount', value: this.getTotalRowsInTemplate() });
        },
        getTotalRowsInTemplate() {
            const { clientHeight } = this.$el;
            const visibleRows = Math.ceil(clientHeight / this.rowHeight);

            return Math.max(this.maxRow, visibleRows) + 1;
        },
    },
};
</script>

<style lang="scss" scoped>
    .template-grid {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        min-width: 0;
        margin-left: 24px;
        overflow: auto;
    }
</style>
