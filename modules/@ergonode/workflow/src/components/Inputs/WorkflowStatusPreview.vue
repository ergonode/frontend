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
                    :style="{
                        top: '10px',
                        left: '12px',
                    }"
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
import WorkflowStatusBadge from '@Modules/@ergonode/workflow/src/components/Badges/WorkflowStatusBadge';
import InputController from '@UI/components/Input/InputController';
import InputLabel from '@UI/components/Input/InputLabel';
import InputSolidStyle from '@UI/components/Input/InputSolidStyle';

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
        justify-content: center;
        align-items: center;

        &__title {
            display: flex;
            align-items: center;
            column-gap: 8px;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
        }
    }
</style>
