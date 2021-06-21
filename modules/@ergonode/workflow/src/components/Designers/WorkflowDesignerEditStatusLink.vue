/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NuxtLink
        :class="classes"
        :to="linkTo"
        @mouseenter.native="onMouseEnter"
        @mouseleave.native="onMouseLeave">
        <IconEdit :fill-color="iconFillColor" />
    </NuxtLink>
</template>

<script>
import {
    GREEN,
    GREY,
} from '@UI/assets/scss/_js-variables/colors.scss';
import IconEdit from '@UI/components/Icons/Actions/IconEdit';
import {
    ROUTE_NAME,
} from '@Workflow/config/routes';

export default {
    name: 'WorkflowDesignerEditStatusLink',
    components: {
        IconEdit,
    },
    props: {
        statusId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
        classes() {
            return [
                'workflow-designer-edit-status-link',
                {
                    'workflow-designer-edit-status-link--hovered': this.isHovered,
                },
            ];
        },
        linkTo() {
            return {
                name: ROUTE_NAME.WORKFLOW_STATUS_EDIT_GENERAL,
                params: {
                    id: this.statusId,
                },
            };
        },
        iconFillColor() {
            return this.isHovered ? GREEN : GREY;
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
        opacity: 0;

        &--hovered {
            opacity: 1;
        }
    }
</style>
