/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="color-picker-input-value">
        <WorkflowStatusBadge
            :color="value"
            :default-status="defaultStatus" />
        {{ value }}
    </div>
</template>

<script>
import WorkflowStatusBadge from '@Workflow/components/Badges/WorkflowStatusBadge';

export default {
    name: 'ColorPickerInputValue',
    components: {
        WorkflowStatusBadge,
    },
    props: {
        value: {
            type: String,
            required: true,
            validator: value => /^#([A-Fa-f0-9]{6})$/.test(value),
        },
        defaultStatus: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .color-picker-input-value {
        display: flex;
        align-items: center;
        column-gap: 8px;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_14_20;
    }
</style>
