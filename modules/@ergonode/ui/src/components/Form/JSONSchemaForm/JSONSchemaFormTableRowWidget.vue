/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="row-widget">
        <Fab
            :theme="secondaryTheme"
            :disabled="disabled"
            @click.native="onRemoveRow">
            <template #icon="{ color }">
                <IconDelete :fill-color="color" />
            </template>
        </Fab>
        <div
            class="row-widget__item"
            :style="gridTemplateColumns">
            <Component
                v-for="element in rowComponents"
                :key="element.key"
                :is="element.component"
                :value="value[element.key]"
                :schema="element.props"
                :required="schema.required"
                :errors="errors[element.key]"
                @input="onValueChange" />
        </div>
    </div>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    toCapitalize,
} from '@Core/models/stringWrapper';
import JSONSchemaFormTableRowArrowWidget from '@UI/components/Form/JSONSchemaForm/JSONSchemaFormTableRowArrowWidget';

export default {
    name: 'JSONSchemaFormTableRowWidget',
    components: {
        JSONSchemaFormTableRowArrowWidget,
    },
    props: {
        /**
         * JSON schema
         */
        schema: {
            type: Object,
            required: true,
        },
        /**
         * Index of given component at the loop
         */
        index: {
            type: Number,
            required: true,
        },
        /**
         * Component value
         */
        value: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The validation errors
         */
        errors: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Is fields disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            rowComponents: [],
            fieldKeys: [],
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        gridTemplateColumns() {
            const gridTemplateColumns = this.rowComponents.map((component, index) => (index % 2 === 0 ? '1fr' : 'max-content')).join(' ');

            return {
                gridTemplateColumns,
            };
        },
    },
    watch: {
        schema: {
            immediate: true,
            handler() {
                this.fieldsKeys = this.getFieldKeys();
                this.rowComponents = this.getComponents();
            },
        },
    },
    methods: {
        getFieldKeys() {
            return this.schema.properties ? Object.keys(this.schema.properties) : [];
        },
        getComponents() {
            const {
                length,
            } = this.fieldsKeys;
            const components = [];

            for (let i = 0; i < length; i += 1) {
                const key = this.fieldsKeys[i];
                const {
                    type, ...rest
                } = this.schema.properties[key];

                components.push({
                    key,
                    props: {
                        disabled: this.disabled,
                        ...rest,
                        size: SIZE.SMALL,
                    },
                    component: () => import(`@UI/components/Form/JSONSchemaForm/JSONSchemaForm${toCapitalize(type)}`),
                });

                if (length > 1 && i % 2 === 0) {
                    components.push({
                        key: `[${i}]-arrow`,
                        props: {},
                        component: JSONSchemaFormTableRowArrowWidget,
                    });
                }
            }

            return components;
        },
        onValueChange({
            key,
            value,
        }) {
            this.$emit('input', {
                index: this.index,
                value: {
                    ...this.value,
                    [key]: value,
                },
            });
        },
        onRemoveRow() {
            this.$emit('remove', this.index);
        },
    },
};
</script>

<style lang="scss" scoped>
    .row-widget {
        display: flex;

        & > .fab {
            margin-right: 4px;
        }

        &__item {
            display: grid;
            flex: 1;
            align-items: center;
            grid-auto-flow: column;
            grid-template-columns: max-content;
            grid-column-gap: 4px;
        }
    }
</style>
