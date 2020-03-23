/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection :title="title">
        <Component
            :is="widgetComponent"
            v-bind="items" />
    </FormSection>
</template>

<script>
import FormSection from '@Core/components/Form/FormSection';

export default {
    name: 'JSONSchemaFormArray',
    components: {
        FormSection,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
        errorMessage: {
            type: String,
            default: '',
        },
        items: {
            type: Object,
            required: true,
        },
        widget: {
            type: String,
            default: '',
        },
    },
    computed: {
        widgetComponent() {
            switch (this.widget) {
            case 'table':
                return () => import('@Core/components/Form/JSONSchemaFormTableWidget');
            default:
                console.error(`Not supported widget: ${this.widget}`);
                return null;
            }
        },
    },
};
</script>
