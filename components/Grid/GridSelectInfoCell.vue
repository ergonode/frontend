/*
* Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
* See LICENSE for license details.
*/
<template>
    <div class="info-select-cell">
        <GridInfoCell :value="parsedValue" />
        <Icon icon="arrow-triangle" />
    </div>
</template>

<script>
export default {
    name: 'GridSelectInfoCell',
    components: {
        GridInfoCell: () => import('~/components/Grid/GridInfoCell'),
        Icon: () => import('~/components/Icon/Icon'),
    },
    props: {
        value: {
            type: [String, Number, Array],
            required: true,
        },
        filterOptions: {
            type: Object,
            required: true,
        },
    },
    computed: {
        parsedValue() {
            if (Array.isArray(this.value)) {
                return this.value.map(val => this.filterOptions[val] || 'No translation').join(', ');
            }
            if (typeof this.filterOptions[this.value] !== 'undefined') {
                return this.filterOptions[this.value] || 'No translation';
            }

            return this.value;
        },
    },
};
</script>

<style lang="scss" scoped>
    .info-select-cell {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        padding-right: 13px;
    }
</style>
