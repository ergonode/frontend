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
            <Fab
                :theme="secondaryPlainTheme"
                :size="tinySize">
                <IconEdit :fill-color="iconFillColor" />
            </Fab>
        </NuxtLink>
    </FadeTransition>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
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
        tinySize() {
            return SIZE.TINY;
        },
        secondaryPlainTheme() {
            return THEME.SECONDARY_PLAIN;
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
        position: absolute;
        right: 4px;
        background-color: $WHITE;
        border-radius: 12px;
        box-shadow: $ELEVATOR_2_DP;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

        &:hover {
            box-shadow: $ELEVATOR_HOVER_FOCUS;
        }
    }
</style>
