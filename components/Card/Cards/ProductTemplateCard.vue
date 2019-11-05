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
                    :value="getElementValueByCode(element.code, element.type)"
                    :multiselect="element.type === 'MULTI_SELECT'"
                    :disabled="!isUserAllowedToUpdate"
                    v-bind="element" />
                <div
                    :style="gridExtenderStyle"
                    class="extender" />
            </div>
        </TemplateGridDesigner>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getObjectWithMaxValueInArrayByObjectKey } from '~/model/arrayWrapper';
import TemplateGridDesigner from '~/components/Template/Base/TemplateGridDesigner';
import ProductTemplateSection from '~/components/Template/Product/ProductTemplateSection';
import ProductTemplateDate from '~/components/Template/Product/ProductTemplateDate';
import ProductTemplateImage from '~/components/Template/Product/ProductTemplateImage';
import ProductTemplateMultiLine from '~/components/Template/Product/ProductTemplateMultiLine';
import ProductTemplateOptions from '~/components/Template/Product/ProductTemplateOptions';
import ProductTemplateSingleLine from '~/components/Template/Product/ProductTemplateSingleLine';

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
            layoutElements: (state) => state.layoutElements,
            draft: (state) => state.draft,
        }),
        maxRowOfLayoutElements() {
            const maxVisibleRows = this.columnsNumber * this.maxRows;
            const layoutElement = getObjectWithMaxValueInArrayByObjectKey(this.layoutElements, 'row');

            if (layoutElement) {
                const { row, height } = layoutElement;
                const maxElementRow = row + height;

                return Math.min(maxElementRow, maxVisibleRows);
            }

            return maxVisibleRows;
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess('PRODUCT_UPDATE');
        },
        gridStyle() {
            return {
                gridTemplateRows: `repeat(${this.maxRowOfLayoutElements + 1}, 46px)`,
            };
        },
        gridExtenderStyle() {
            return {
                gridArea: `${this.maxRowOfLayoutElements} / 1 / ${this.maxRowOfLayoutElements + 1} / 4`,

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
            case 'NUMERIC':
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
        getElementValueByCode(code, type) {
            if (!this.draft.attributes[code]) return '';

            if (type === 'SELECT' || type === 'MULTI_SELECT') {
                return this.draft.attributes[code].value;
            }

            return this.draft.attributes[code].value[this.languageCode] || '';
        },
    },
};
</script>

<style lang="scss" scoped>
    .centering-wrapper {
        display: flex;
        flex: 1;
        flex-direction: column;
        overflow: auto;

        .products-template-grid {
            display: grid;
            grid-gap: 24px;
            grid-template-columns: repeat(4, 1fr);
            height: 0;
            margin: 0 200px;
            padding-top: 48px;
        }
    }
</style>
