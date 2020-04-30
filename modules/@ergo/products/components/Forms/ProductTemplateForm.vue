/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplateGridDesigner
        :row-height="templateRowHeight"
        :max-row="maxRows">
        <div
            class="products-template-grid"
            :style="gridTemplateRows">
            <Component
                v-for="(formField, index) in formFieldComponents"
                :is="formField"
                :key="index"
                v-bind="{
                    ...elements[index],
                    disabled: !isUserAllowedToUpdate,
                    languageCode,
                }"
                @input="onValueChange" />
        </div>
    </TemplateGridDesigner>
</template>

<script>
import { capitalizeAndConcatenationArray } from '@Core/models/stringWrapper';
import TemplateGridDesigner from '@Templates/components/Template/Base/TemplateGridDesigner';

const updateProductDraft = () => import('@Products/services/updateProductDraft.service');

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
        elements: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            formFieldComponents: [],
        };
    },
    computed: {
        templateRowHeight() {
            return 48;
        },
        maxRows() {
            const heights = this.elements.map(({ position, size }) => position.y + size.height);

            if (heights) {
                return Math.max(...heights);
            }

            return 0;
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess(['PRODUCT_UPDATE']);
        },
        gridTemplateRows() {
            return {
                gridTemplateRows: `repeat(${this.maxRows}, ${this.templateRowHeight}px)`,
            };
        },
    },
    created() {
        this.formFieldComponents = this.elements.map(({ type }) => () => import(`@Products/components/Forms/Fields/ProductTemplateForm${capitalizeAndConcatenationArray(type.split('_'))}Field`));
    },
    methods: {
        onValueChange(payload) {
            updateProductDraft().then(async (response) => {
                await response.default({
                    $axios: this.$axios,
                    $store: this.$store,
                    ...payload,
                });

                this.$emit('valueUpdated');
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .products-template-grid {
        display: grid;
        grid-gap: 16px 24px;
        grid-template-columns: repeat(4, 1fr);
        width: 1008px;
        padding: 24px;
    }
</style>
