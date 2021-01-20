/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplateGridDesigner
        :row-height="templateRowHeight"
        :max-row="maxRows">
        <div
            class="product-template-grid"
            :style="gridTemplateRows">
            <Component
                v-for="(element, index) in elements"
                :is="formComponents[element.type]"
                :key="index"
                :disabled="!isAllowedToUpdate(element.properties.scope)"
                :language-code="languageCode"
                :errors="errors"
                v-bind="elements[index]"
                @input="onValueChange" />
        </div>
    </TemplateGridDesigner>
</template>

<script>
import {
    SCOPE,
} from '@Attributes/defaults/attributes';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import {
    capitalizeAndConcatenationArray,
} from '@Core/models/stringWrapper';
import PRIVILEGES from '@Products/config/privileges';
import TemplateGridDesigner from '@Templates/components/Template/Base/TemplateGridDesigner';
import {
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateForm',
    components: {
        TemplateGridDesigner,
    },
    mixins: [
        formFeedbackMixin,
    ],
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
            formComponents: {},
        };
    },
    computed: {
        ...mapState('authentication', {
            languagePrivileges: state => state.user.languagePrivileges,
        }),
        ...mapGetters('core', [
            'rootLanguage',
        ]),
        templateRowHeight() {
            return 40;
        },
        maxRows() {
            const heights = this.elements.map(({
                position, size,
            }) => position.y + size.height);

            if (heights) {
                return Math.max(...heights);
            }

            return 0;
        },
        gridTemplateRows() {
            return {
                gridTemplateRows: `repeat(${this.maxRows}, ${this.templateRowHeight}px)`,
            };
        },
    },
    watch: {
        elements: {
            immediate: true,
            handler() {
                this.elements.forEach((element) => {
                    const {
                        type,
                    } = element;
                    if (typeof this.formComponents[type] === 'undefined') {
                        this.formComponents[type] = () => import(`@Products/components/Forms/Field/ProductTemplateForm${capitalizeAndConcatenationArray(type.split('_'))}Field`);
                    }
                });
            },
        },
    },
    methods: {
        isAllowedToUpdate(scope) {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ])
                && this.languagePrivileges[this.languageCode].edit
                && (this.rootLanguage.code === this.languageCode || scope === SCOPE.LOCAL);
        },
        onValueChange(payload) {
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: `${payload.languageCode}|${payload.fieldKey}`,
                value: payload.value,
            });

            this.$emit('input', payload);
        },
    },
};
</script>

<style lang="scss" scoped>
    .product-template-grid {
        display: grid;
        grid-gap: 24px;
        grid-template-columns: repeat(4, 1fr);
        width: 1008px;
        padding: 24px;
    }
</style>
