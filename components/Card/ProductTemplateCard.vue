/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="centering-wrapper">
        <TemplateGridDesigner
            :row-height="48"
            @rowsCount="onRowsCountChange">
            <div
                class="products-template-grid"
                :style="gridStyle">
                <Component
                    :is="getComponentViaType(element.type)"
                    v-for="(element, index) in layoutElements"
                    :key="index"
                    :style="getItemPosition(element)"
                    :value="draft.attributes[element.id]"
                    v-bind="element" />
            </div>
        </TemplateGridDesigner>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getMaxObjectValueInArrayByObjectKey } from '~/model/arrayWrapper';
import TemplateGridDesigner from '~/components/TemplateGrid/TemplateDesigner/TemplateGridDesigner';
import ProductTemplateSection from '~/components/Template/ProductDesigner/ProductTemplateSection';
import ProductTemplateDate from '~/components/Template/ProductDesigner/ProductTemplateDate';
import ProductTemplateImage from '~/components/Template/ProductDesigner/ProductTemplateImage';
import ProductTemplateMultiLine from '~/components/Template/ProductDesigner/ProductTemplateMultiLine';
import ProductTemplateOptions from '~/components/Template/ProductDesigner/ProductTemplateOptions';
import ProductTemplateSingleLine from '~/components/Template/ProductDesigner/ProductTemplateSingleLine';

export default {
    name: 'ProductTemplateCard',
    components: {
        TemplateGridDesigner,
    },
    props: {
        languageCode: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            columnsNumber: 4,
            maxRows: 0,
        };
    },
    computed: {
        ...mapState('productsDraft', {
            layoutElements: state => state.layoutElements,
            draft: state => state.draft,
        }),
        maxRowOfLayoutElements() {
            const maxElementRow = getMaxObjectValueInArrayByObjectKey(this.layoutElements, 'row');
            const maxVisibleRows = this.columnsNumber * this.maxRows;

            return Math.min(maxElementRow, maxVisibleRows);
        },
        gridStyle() {
            return {
                gridTemplateRows: `repeat(${this.maxRowOfLayoutElements}, 48px)`,
            };
        },
    },
    methods: {
        onRowsCountChange({ value }) {
            this.maxRows = value;
        },
        getItemPosition({
            row, column, width, height,
        }) {
            return { gridArea: `${row} / ${column} / ${row + height} / ${column + width}` };
        },
        getComponentViaType(type) {
            switch (type) {
            case 'DATE':
                return ProductTemplateDate;
            case 'IMAGE':
                return ProductTemplateImage;
            case 'TEXTAREA':
                return ProductTemplateMultiLine;
            case 'SELECT':
            case 'MULTI_SELECT':
                return ProductTemplateOptions;
            case 'NUMBER':
            case 'TEXT':
            case 'UNIT':
            case 'PRICE':
                return ProductTemplateSingleLine;
            case 'SECTION TITLE':
                return ProductTemplateSection;
            default:
                return null;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .centering-wrapper {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        padding: 40px 40px 0;
        overflow: auto;

        .products-template-grid {
            display: grid;
            grid-gap: 24px;
            grid-template-columns: repeat(4, minmax(150px, 250px));
            height: 0;
        }
    }
</style>
