/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="styles"
        :class="classes" />
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
        default: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        styles() {
            return {
                borderColor: this.color,
            };
        },
        classes() {
            return [
                'workflow-status-badge',
                {
                    'workflow-status-badge--default': this.default,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .workflow-status-badge {
        width: 10px;
        height: 10px;
        border-radius: 5px;
        border-width: 5px;
        border-style: solid;
        box-sizing: border-box;
        background-color: $WHITE;

        &--default {
            border-width: 3px;
        }
    }
</style>
