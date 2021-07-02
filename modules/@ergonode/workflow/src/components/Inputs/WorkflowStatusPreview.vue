/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputSolidStyle
        :disabled="true"
        height="80px">
        <template #activator>
            <InputController>
                <InputLabel
                    :floating="true"
                    :disabled="true"
                    label="Status preview" />
                <div class="workflow-status-preview">
                    <div class="workflow-status-preview__title">
                        <WorkflowStatusBadge
                            v-if="color"
                            :color="color"
                            :default-status="defaultStatus" />
                        {{ label }}
                    </div>
                </div>
            </InputController>
        </template>
    </InputSolidStyle>
</template>

<script>
import InputController from '@UI/components/Input/InputController';
import InputLabel from '@UI/components/Input/InputLabel';
import InputSolidStyle from '@UI/components/Input/InputSolidStyle';
import WorkflowStatusBadge from '@Workflow/components/Badges/WorkflowStatusBadge';

export default {
    name: 'WorkflowStatusPreview',
    components: {
        InputLabel,
        InputSolidStyle,
        InputController,
        WorkflowStatusBadge,
    },
    props: {
        color: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        defaultStatus: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .workflow-status-preview {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;

        &__title {
            display: flex;
            align-items: center;
            column-gap: 4px;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
        }
    }
</style>
