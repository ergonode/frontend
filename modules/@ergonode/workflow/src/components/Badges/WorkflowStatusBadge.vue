/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <div
            :style="badgeStyles"
            class="workflow-status-badge__badge" />
    </div>
</template>

<script>
export default {
    name: 'WorkflowStatusBadge',
    props: {
        color: {
            type: String,
            required: true,
            validator: value => /^#([A-Fa-f0-9]{6})$/.test(value),
        },
        defaultStatus: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        badgeStyles() {
            return {
                borderColor: this.color,
            };
        },
        classes() {
            return [
                'workflow-status-badge',
                {
                    'workflow-status-badge--default': this.defaultStatus,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .workflow-status-badge {
        $parent: &;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;

        &__badge {
            width: 10px;
            height: 10px;
            border-radius: 5px;
            border-width: 5px;
            border-style: solid;
            box-sizing: border-box;
            background-color: $WHITE;
        }

        &--default {
            #{$parent}__badge {
                border-width: 3px;
            }
        }
    }
</style>
