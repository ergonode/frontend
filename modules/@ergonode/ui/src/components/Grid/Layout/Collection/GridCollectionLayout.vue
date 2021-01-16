/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-collection-layout">
        <Preloader v-if="isPrefetchingData" />
        <div
            v-else
            :style="gridTemplateColumns"
            class="grid-collection-layout__body">
            <GridCollectionCell
                v-for="(element, index) in data"
                :key="index"
                :data="element"
                :drafts="drafts"
                :object-fit="objectFit"
                :extended-data-cell="extendedComponents.dataCells
                    && extendedComponents.dataCells[element.type]"
                @row-action="onRowAction"
                @cell-value="onCellValueChange" />
        </div>
    </div>
</template>

<script>
import GridCollectionCell from '@UI/components/Grid/Layout/Collection/Cells/GridCollectionCell';
import Preloader from '@UI/components/Preloader/Preloader';

export default {
    name: 'GridCollectionLayout',
    components: {
        Preloader,
        GridCollectionCell,
    },
    props: {
        /**
         * List of rows presented at Grid
         */
        rows: {
            type: Array,
            default: () => [],
        },
        /**
         * List of row ids
         */
        rowIds: {
            type: Array,
            default: () => [],
        },
        /**
         * The drafts are unsaved changes, cached changed data at given time
         */
        drafts: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Number of columns
         */
        columnsNumber: {
            type: Number,
            required: true,
        },
        /**
         * The model of data at which collection layout cells are going to be binded with data of Grid
         */
        collectionCellBinding: {
            type: Object,
            required: true,
        },
        /**
        * Determines image objectFit property
        */
        objectFit: {
            type: String,
            required: true,
        },
        /**
         * The data model of extended collection layout components
         */
        extendedComponents: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Determines if data is loaded asynchronously
         */
        isPrefetchingData: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        gridTemplateColumns() {
            return {
                gridTemplateColumns: `repeat(${this.columnsNumber}, 1fr)`,
            };
        },
        data() {
            const {
                imageColumn,
                type,
                descriptionColumn,
                additionalColumns,
            } = this.collectionCellBinding;

            if (!(imageColumn && descriptionColumn)) {
                return [];
            }

            return this.rows
                .map((row, index) => {
                    const additionalData = {};

                    if (additionalColumns) {
                        additionalColumns.forEach((columnId) => {
                            additionalData[columnId] = row[columnId] ? row[columnId].value : '';
                        });
                    }

                    return {
                        id: this.rowIds[index],
                        image: row[imageColumn] ? row[imageColumn].value : '',
                        description: row[descriptionColumn] ? row[descriptionColumn].value : '',
                        type,
                        actions: row._links ? row._links.value : '',
                        ...additionalData,
                    };
                });
        },
    },
    methods: {
        onRowAction(payload) {
            this.$emit('row-action', payload);
        },
        onCellValueChange(payload) {
            this.$emit('cell-value', payload);
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-collection-layout {
        display: flex;
        flex: 1;
        flex-direction: column;

        &__body {
            display: grid;
            flex: 1 1 auto;
            grid-template-rows: 190px;
            grid-gap: 24px;
            height: 0;
            padding: 24px;
            box-sizing: border-box;
            overflow: auto;
        }
    }
</style>
