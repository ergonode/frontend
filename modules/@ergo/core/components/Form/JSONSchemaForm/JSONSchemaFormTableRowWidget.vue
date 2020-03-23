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
            :key="element.key" />
        <IconDelete />
    </div>
</template>

<script>
import { toCapitalize } from '@Core/models/stringWrapper';
import IconDelete from '@Core/components/Icons/Actions/IconDelete';
import Button from '@Core/components/Buttons/Button';

export default {
    name: 'JSONSchemaFormTableRowWidget',
    components: {
        Button,
        IconDelete,
    },
    props: {
        properties: {
            type: Object,
            required: true,
        },
    },
    computed: {
        gridTemplateTemplate() {
            return {
                gridTemplateColumns: this.fieldsKeys.map(() => '1fr').join(' '),
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
                    props: rest,
                    component: () => import(`@Core/components/Form/JSONSchemaForm/JSONSchemaForm${toCapitalize(type)}`),
                });
            }

            return components;
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
        grid-column-gap: 8px;
    }
</style>
