/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TemplateGrid :update-button="updateButton" />
</template>

<script>
import TemplateGrid from '~/components/Grid/Template/TemplateGrid';

export default {
    name: 'TemplateDesignerTab',
    components: { TemplateGrid },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
};
</script>
