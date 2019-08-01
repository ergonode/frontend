/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['select-content', {'select-content--fixed': fixedContent}]">
        <slot />
        <div
            v-if="clearable"
            :class="['horizontal-wrapper', {'horizontal-wrapper--space-between': multiselect}]">
            <Button
                v-if="multiselect"
                small
                title="OK"
                @click.native="onApplyClick" />
            <Button
                theme="dark"
                small
                :title="clearButtonTitle"
                color="transparent"
                @click.native="onClearClick" />
        </div>
    </div>
</template>

<script>

export default {
    name: 'SelectContent',
    components: {
        Button: () => import('~/components/Buttons/Button'),
    },
    props: {
        multiselect: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: true,
        },
        fixedContent: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        clearButtonTitle() {
            return this.multiselect ? 'Clear all' : 'Clear';
        },
    },
    methods: {
        onClearClick() {
            this.$emit('clear');
        },
        onApplyClick() {
            this.$emit('apply');
        },
    },
};
</script>

<style lang="scss" scoped>
    .select-content {
        position: fixed;
        z-index: 999;
        display: flex;
        flex-direction: column;
        background-color: $white;
        box-shadow:
            0 2px 2px 0 rgba(0, 0, 0, 0.14),
            0 3px 1px -2px rgba(0, 0, 0, 0.12),
            0 1px 5px 0 rgba(0, 0, 0, 0.2);

        &--fixed {
            max-height: 200px;
        }

        .horizontal-wrapper {
            display: flex;
            flex-shrink: 0;
            justify-content: flex-end;
            align-items: center;
            padding: 8px 12px;
            background-color: $background;
            box-shadow: 0 -5px 5px -5px rgba(0, 0, 0, 0.12);

            &--space-between {
                justify-content: space-between;
            }
        }
    }
</style>
