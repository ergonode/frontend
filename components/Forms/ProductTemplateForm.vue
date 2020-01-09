/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplateGridDesigner :row-height="templateRowHeight">
        <div
            class="products-template-grid"
            :style="gridStyle">
            <Component
                :is="getComponentViaType(element.type)"
                v-for="(element, index) in layoutElements"
                :key="index"
                :style="getItemPosition(element)"
                :value="getElementValueByCode(element.code)"
                :multiselect="isMultiSelect(element.type)"
                :disabled="!isUserAllowedToUpdate"
                v-bind="element" />
        </div>
    </TemplateGridDesigner>
</template>

<script>
import { mapState } from 'vuex';
import { TYPES } from '~/defaults/attributes';
import { isObject } from '~/model/objectWrapper';
import { getObjectWithMaxValueInArrayByObjectKey } from '~/model/arrayWrapper';
import TemplateGridDesigner from '~/components/Template/Base/TemplateGridDesigner';
import ProductTemplateSection from '~/components/Template/Product/ProductTemplateSection';
import ProductTemplateDate from '~/components/Template/Product/ProductTemplateDate';
import ProductTemplateImage from '~/components/Template/Product/ProductTemplateImage';
import ProductTemplateMultiLine from '~/components/Template/Product/ProductTemplateMultiLine';
import ProductTemplateOptions from '~/components/Template/Product/ProductTemplateOptions';
import ProductTemplateSingleLine from '~/components/Template/Product/ProductTemplateSingleLine';
import ProductTemplateNumeric from '~/components/Template/Product/ProductTemplateNumeric';

export default {
    name: 'ProductTemplateForm',
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
            templateRowHeight: 48,
        };
    },
    computed: {
        ...mapState('productsDraft', {
            layoutElements: (state) => state.layoutElements,
            draft: (state) => state.draft,
        }),
        maxRows() {
            const layoutElement = getObjectWithMaxValueInArrayByObjectKey(this.layoutElements, 'row');

            if (layoutElement) {
                return layoutElement.row + layoutElement.height;
            }

            return 0;
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess(['PRODUCT_UPDATE']);
        },
        gridStyle() {
            return {
                gridTemplateRows: `repeat(${this.maxRows + 1}, ${this.templateRowHeight}px)`,
            };
        },
    },
    methods: {
        getItemPosition({
            row, column, width, height,
        }) {
            return { gridArea: `${row} / ${column} / ${row + height} / ${column + width}` };
        },
        isMultiSelect(type) {
            return type === TYPES.MULTI_SELECT;
        },
        getComponentViaType(type) {
            switch (type) {
            case TYPES.DATE:
                return ProductTemplateDate;
            case TYPES.IMAGE:
                return ProductTemplateImage;
            case TYPES.TEXTAREA:
                return ProductTemplateMultiLine;
            case TYPES.SELECT:
            case TYPES.MULTI_SELECT:
                return ProductTemplateOptions;
            case TYPES.NUMERIC:
                return ProductTemplateNumeric;
            case TYPES.TEXT:
            case TYPES.UNIT:
            case TYPES.PRICE:
                return ProductTemplateSingleLine;
            case 'SECTION TITLE':
                return ProductTemplateSection;
            default:
                return null;
            }
        },
        getElementValueByCode(code) {
            if (!this.draft.attributes[code]) return '';

            const { value } = this.draft.attributes[code];

            if (isObject(value) && !Array.isArray(value)) {
                return value[this.languageCode] || '';
            }
            return value;
        },
    },
};
</script>

<style lang="scss" scoped>
    .products-template-grid {
        display: grid;
        grid-gap: 24px;
        grid-template-columns: repeat(4, 1fr);
        height: 0;
    }
</style>
