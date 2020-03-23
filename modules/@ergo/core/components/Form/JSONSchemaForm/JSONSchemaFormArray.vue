/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection :title="title">
        <Component
            :is="arrayComponent"
            v-bind="items" />
    </FormSection>
</template>

<script>
import { toCapitalize } from '@Core/models/stringWrapper';
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
        arrayComponent() {
            if (this.widget && this.widget === 'table') {
                return () => import('@Core/components/Form/JSONSchemaForm/JSONSchemaFormTableWidget');
            }

            return () => import(`@Core/components/Form/JSONSchemaForm/JSONSchemaForm${toCapitalize(this.items.type)}`);
        },
    },
};
</script>
