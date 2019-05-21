/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="group">
        <div
            class="header"
            @click="expandGroup">
            <slot name="headerContent" />
        </div>
        <div
            v-if="isExpanded"
            class="items">
            <slot name="item" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListGroupElement',
    props: {
        index: {
            type: String,
            required: false,
            default: null,
        },
        isExpanded: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    methods: {
        expandGroup() {
            if (!this.isExpanded) {
                this.$emit('group', this.index);
            } else {
                this.$emit('group');
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .group {
        .header {
            position: relative;
            display: flex;
            padding: 8px 16px;
            transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            cursor: pointer;

            &::after {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                box-shadow:
                    0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 3px 1px -2px rgba(0, 0, 0, 0.12),
                    0 1px 5px 0 rgba(0, 0, 0, 0.2);
                transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
                opacity: 0;
                content: "";
            }

            &:hover {
                background-color: $background;
            }

            &:hover::after {
                opacity: 1;
            }
        }

        .items {
            flex: 1;
        }
    }
</style>
