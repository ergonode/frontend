/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['condition', {'condition--loader': !isCondition}]">
        <template v-if="isCondition">
            <span
                class="condition__name typo-hint txt-fixed txt--graphite"
                v-text="condition.name" />
            <div class="condition__parameters">
                <Component
                    :is="getComponentViaType(element.type)"
                    v-for="(element, index) in setParameters()"
                    :key="index"
                    hint="yyyyy mleczko"
                    solid
                    regular
                    label="label"
                    required
                    :value="getElementValueByCode(element.name, element.type)"
                    :multiselect="element.type === 'MULTI_SELECT'"
                    @input="(value) => setValue(value)"
                />
            </div>
            <span
                class="condition__phrase typo-label txt--graphite txt--centered"
                v-text="conditionPhrase" />
        </template>
    </div>
</template>
<script>
import { isEmpty } from '~/model/objectWrapper';
// import ProductTemplateDate from '~/components/Template/ProductDesigner/ProductTemplateDate';
// import ProductTemplateMultiLine from '~/components/Template/ProductDesigner/ProductTemplateMultiLine';
// import ProductTemplateOptions from '~/components/Template/ProductDesigner/ProductTemplateOptions';
import TextField from '~/components/Inputs/TextField';
import Select from '~/components/Inputs/Select/Select';

export default {
    name: 'ConditionSetItem',
    props: {
        condition: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        placeholders: {
            '[attribute]': 'yyyy tets',
        },
    }),
    computed: {
        isCondition() {
            return !isEmpty(this.condition);
        },
        conditionPhrase() {
            const { phrase } = this.condition;

            return phrase.replace(/\[\w+\]/g, placeholder => this.placeholders[placeholder] || '_____');
        },
        // parsedLanguage() {
        //     return getValueByKey(this.languages, this.language);
        // },
    },
    methods: {
        setParameters() {
            const params = [{
                name: 'cos',
                value: '',
                type: 'TEXT',
            },
            {
                name: 'attribute',
                type: 'SELECT',
                options: {
                    xx: 'xx',
                    yy: 'yy',

                },
            },
            ];
            return params;
        },
        getComponentViaType(type) {
            switch (type) {
            // case 'DATE':
            //     return ProductTemplateDate;
            // case 'TEXTAREA':
            //     return ProductTemplateMultiLine;
            case 'SELECT':
            case 'MULTI_SELECT':
                return Select;
            case 'NUMERIC':
            case 'TEXT':
            case 'UNIT':
            case 'PRICE':
                return TextField;
            default:
                return null;
            }
        },
        setValue(value) {
            console.log(value);
        },
        getElementValueByCode(name, type) {
            console.log(name, type);
            return 'dd';
            // if (!this.draft.attributes[code]) return '';

            // if (type === 'SELECT' || type === 'MULTI_SELECT') {
            //     return this.draft.attributes[code].value;
            // }

            // return this.draft.attributes[code].value[this.languageCode] || '';
        },
    },
};
</script>

<style lang="scss" scoped>
    .condition {
        z-index: 5;
        display: flex;
        flex-direction: column;
        height: 100%;
        border: 1px solid $grey;
        background-color: $background;
        overflow: hidden;

        &--loader {
            border: 1px dashed $primary;
            background-color: $lightGreen;
        }

        &__name {
            padding: 2px;
        }

        &__parameters {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: 1fr;
            grid-gap: 20px;
            flex: 1 1 auto;
            padding: 2px 20px;
            background-color: $white;
        }

        &__phrase {
            padding: 2px;
            border-top: 1px dashed $lightGrey;
        }
    }
</style>
