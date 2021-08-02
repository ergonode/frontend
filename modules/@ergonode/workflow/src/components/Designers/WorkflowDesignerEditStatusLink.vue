/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <NuxtLink
            v-show="visible"
            class="workflow-designer-edit-status-link"
            :to="linkTo"
            @mouseenter.native="onMouseEnter"
            @mouseleave.native="onMouseLeave">
            <IconEdit :fill-color="iconFillColor" />
        </NuxtLink>
    </FadeTransition>
</template>

<script>
import {
    GRAPHITE_LIGHT,
    GREEN,
} from '@UI/assets/scss/_js-variables/colors.scss';
import {
    ROUTE_NAME,
} from '@Workflow/config/routes';

export default {
    name: 'WorkflowDesignerEditStatusLink',
    props: {
        statusId: {
            type: String,
            required: true,
        },
        visible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
        linkTo() {
            return {
                name: ROUTE_NAME.WORKFLOW_STATUS_EDIT_GENERAL,
                params: {
                    id: this.statusId,
                },
            };
        },
        iconFillColor() {
            return this.isHovered ? GREEN : GRAPHITE_LIGHT;
        },
    },
    methods: {
        onMouseEnter() {
            this.isHovered = true;
        },
        onMouseLeave() {
            this.isHovered = false;
        },
    },
};
</script>

<style lang="scss" scoped>
    .workflow-designer-edit-status-link {
        display: flex;
        align-items: center;
        width: 24px;
        height: 24px;
        transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        will-change: opacity;
    }
</style>
