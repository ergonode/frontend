/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="product-template-form"
        :style="gridTemplateRows">
        <Component
            v-for="(element, index) in elements"
            :is="formComponents[element.type].component"
            :key="index"
            v-bind="bindingProps(element)"
            @input="onValueChange" />
    </div>
</template>

<script>
import {
    SCOPE,
} from '@Attributes/defaults';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import {
    capitalizeAndConcatenationArray,
} from '@Core/models/stringWrapper';
import PRIVILEGES from '@Products/config/privileges';
import {
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateForm',
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
            formComponents: {},
        };
    },
    computed: {
        ...mapState('authentication', {
            languagePrivileges: state => state.user.languagePrivileges,
        }),
        ...mapState('product', [
            'drafts',
        ]),
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
                this.elements.forEach(({
                    type,
                }) => {
                    if (typeof this.formComponents[type] === 'undefined') {
                        const extendedField = this.$extendedForm({
                            key: '@Products/components/Forms/ProductTemplateForm',
                            type,
                        });

                        if (Array.isArray(extendedField) && extendedField.length) {
                            const [
                                firstExtendedField,
                            ] = extendedField;

                            this.formComponents[type] = firstExtendedField;
                        } else {
                            this.formComponents[type] = {
                                component: () => import(`@Products/components/Forms/Field/ProductTemplateForm${capitalizeAndConcatenationArray(type.split('_'))}Field`)
                                    .catch(() => import('@Products/components/Forms/Field/ProductTemplateFormNoTypeField')),
                            };
                        }
                    }
                });
            },
        },
    },
    methods: {
        bindingProps(elementProps) {
            const extendedProps = this.formComponents[elementProps.type].props || {};

            return {
                languageCode: this.languageCode,
                errors: this.errors,
                drafts: this.drafts,
                changedValues: this.changeValues,
                disabled: !this.isAllowedToUpdate(elementProps.properties.scope),
                ...elementProps,
                ...extendedProps,
            };
        },
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
                fieldKey: payload.fieldKey,
                value: payload.value,
            });

            this.$emit('input', payload);
        },
    },
};
</script>

<style lang="scss" scoped>
    .product-template-form {
        display: grid;
        grid-gap: 24px;
        grid-template-columns: repeat(4, 1fr);
        width: 1008px;
        padding: 24px;
    }
</style>
