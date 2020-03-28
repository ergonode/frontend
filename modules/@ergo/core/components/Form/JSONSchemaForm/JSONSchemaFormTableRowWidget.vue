/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="row-widget"
        :style="gridTemplateTemplate">
        <Component
            v-for="element in rowComponents"
            :is="element.component"
            v-bind="element.props"
            :key="element.key"
            @input="onValueChange" />
        <Fab
            :theme="secondaryTheme"
            @click.native="onRemoveRow">
            <template #icon="{ color }">
                <IconDelete :fill-color="color" />
            </template>
        </Fab>
    </div>
</template>

<script>
import { toCapitalize } from '@Core/models/stringWrapper';
import { THEME } from '@Core/defaults/theme';
import { ARROW } from '@Core/defaults/icons';
import IconDelete from '@Core/components/Icons/Actions/IconDelete';
import Fab from '@Core/components/Buttons/Fab';

export default {
    name: 'JSONSchemaFormTableRowWidget',
    components: {
        Fab,
        IconDelete,
    },
    props: {
        properties: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        required: {
            type: Array,
            default: () => [],
        },
        value: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            localValue: {},
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        gridTemplateTemplate() {
            return {
                gridTemplateColumns: this.rowComponents.map((component, index) => (index % 2 === 0 ? '1fr' : 'max-content')).join(' '),
            };
        },
        fieldsKeys() {
            return Object.keys(this.properties);
        },
        rowComponents() {
            const { length } = this.fieldsKeys;
            const components = [];

            for (let i = 0; i < length; i += 1) {
                const key = this.fieldsKeys[i];
                const {
                    type, ...rest
                } = this.properties[key];

                components.push({
                    key,
                    props: {
                        value: this.value[key],
                        small: true,
                        isRequired: this.required.indexOf(key) !== -1,
                        ...rest,
                    },
                    component: () => import(`@Core/components/Form/JSONSchemaForm/JSONSchemaForm${toCapitalize(type)}`),
                });

                if (i % 2 === 0) {
                    components.push({
                        key: `[${i}]-arrow`,
                        props: {
                            state: ARROW.RIGHT,
                        },
                        component: () => import('@Core/components/Icons/Arrows/IconArrowSingle'),
                    });
                }
            }

            return components;
        },
    },
    methods: {
        onValueChange({ key, value }) {
            this.localValue[key] = value;
            this.$emit('input', { index: this.index, value: this.localValue });
        },
        onRemoveRow() {
            this.$emit('remove', this.index);
        },
    },
};
</script>

<style lang="scss" scoped>
    .row-widget {
        display: grid;
        align-items: center;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        grid-column-gap: 4px;

        & > .fab {
            margin-top: 8px;
            margin-left: 4px;
        }

        & > svg {
            margin-top: 8px;
        }
    }
</style>
