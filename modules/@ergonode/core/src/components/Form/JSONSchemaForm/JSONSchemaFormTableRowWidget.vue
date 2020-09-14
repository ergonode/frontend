/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="row-widget">
        <Fab
            :theme="secondaryTheme"
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
                @input="onValueChange" />
        </div>
    </div>
</template>

<script>
import Fab from '@Core/components/Fab/Fab';
import JSONSchemaFormTableRowArrowWidget from '@Core/components/Form/JSONSchemaForm/JSONSchemaFormTableRowArrowWidget';
import IconDelete from '@Core/components/Icons/Actions/IconDelete';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    toCapitalize,
} from '@Core/models/stringWrapper';

export default {
    name: 'JSONSchemaFormTableRowWidget',
    components: {
        Fab,
        IconDelete,
        JSONSchemaFormTableRowArrowWidget,
    },
    props: {
        schema: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        value: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            rowComponents: [],
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
        fieldsKeys() {
            return Object.keys(this.schema.properties);
        },
    },
    created() {
        this.rowComponents = this.getComponents();
    },
    methods: {
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
                        isRequired: this.schema.required.indexOf(key) !== -1,
                        ...rest,
                        size: SIZE.SMALL,
                    },
                    component: () => import(`@Core/components/Form/JSONSchemaForm/JSONSchemaForm${toCapitalize(type)}`),
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
            key, value,
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
