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
import debounce from 'debounce';

export default {
    name: 'TemplateGridDesigner',
    props: {
        maxRow: {
            type: Number,
            required: false,
            default: 0,
        },
    },
    data() {
        return {
            rowHeight: 62,
        };
    },
    mounted() {
        this.emitRowsNumber();
        window.addEventListener('resize', this.debounceRowsNumberCalculation);
    },
    destroyed() {
        window.removeEventListener('resize', this.debounceRowsNumberCalculation);
    },
    methods: {
        debounceRowsNumberCalculation(time = 300) {
            debounce(() => {
                this.emitRowsNumber();
            }, time)();
        },
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
        width: 0;
        margin: 12px;
        overflow: auto;
    }
</style>
