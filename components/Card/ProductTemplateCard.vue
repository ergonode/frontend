/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="centering-wrapper">
        <div class="products-template-grid">
            <Component
                :is="getComponentViaName(element.component)"
                v-for="(element, index) in templateLayout"
                :key="index"
                v-bind="getComponentProps(element)"
                :style="{
                    gridColumn: `${element.x} / span ${element.width}`,
                    gridRow: `${element.y} / span ${element.height}`,
                    height: getElementHeight(element)
                }" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductTemplateSection from '~/components/Template/ProductDesigner/ProductTemplateSection';
import ProductTemplateDate from '~/components/Template/ProductDesigner/ProductTemplateDate';
import ProductTemplateImage from '~/components/Template/ProductDesigner/ProductTemplateImage';
import ProductTemplateMultiLine from '~/components/Template/ProductDesigner/ProductTemplateMultiLine';
import ProductTemplateOptions from '~/components/Template/ProductDesigner/ProductTemplateOptions';
import ProductTemplateSingleLine from '~/components/Template/ProductDesigner/ProductTemplateSingleLine';

export default {
    name: 'ProductTemplateCard',
    components: {
        ComponentWrapper: () => import('~/components/Dynamic/ComponentWrapper'),
    },
    props: {
        languageCode: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState('productsDraft', {
            templateLayout: state => state.templateLayout,
        }),
    },
    methods: {
        getComponentViaName(name) {
            switch (name) {
            case 'ProductTemplateDate':
                return ProductTemplateDate;
            case 'ProductTemplateImage':
                return ProductTemplateImage;
            case 'ProductTemplateMultiLine':
                return ProductTemplateMultiLine;
            case 'ProductTemplateOptions':
                return ProductTemplateOptions;
            case 'ProductTemplateSingleLine':
                return ProductTemplateSingleLine;
            case 'ProductTemplateSection':
                return ProductTemplateSection;
            default:
                return null;
            }
        },
        getComponentProps(element) {
            const {
                component,
                name,
                placeholder,
                errorMessages,
                required,
                value,
                attributeId,
                hint,
                parameters,
                options,
            } = element;

            switch (component) {
            case 'ProductTemplateImage':
                return {
                    attributeId,
                    required,
                    name,
                    value: value || '',
                    hint,
                };
            case 'ProductTemplateOptions':
                return {
                    options,
                    placeholder,
                    name,
                    errorMessages,
                    required,
                    value: value || '',
                    attributeId,
                    hint,
                    parameters,
                };
            case 'ProductTemplateDate':
            case 'ProductTemplateMultiLine':
            case 'ProductTemplateSingleLine':
                return {
                    placeholder,
                    name,
                    errorMessages,
                    required,
                    value: value || '',
                    attributeId,
                    hint,
                    parameters,
                };
            case 'ProductTemplateSection':
                return {
                    title: element.title,
                };
            default:
                return null;
            }
        },
        getElementHeight({ component, height }) {
            return component === 'ProductTemplateSection'
                ? '20px'
                : `${(50 * height) + ((height - 1) * 24)}px`;
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
        padding: 48px;
        overflow: auto;

        .products-template-grid {
            display: grid;
            grid-gap: 24px;
            grid-template-columns: repeat(4, minmax(150px, 250px));
            height: 0;
        }
    }
</style>
