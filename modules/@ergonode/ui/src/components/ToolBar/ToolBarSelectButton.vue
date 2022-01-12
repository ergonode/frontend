/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ToolBarButton
        ref="toolBarButton"
        :selected="isFocused"
        @click.native="onClick">
        <slot name="input" />
        <Dropdown
            v-if="isReadyToRender"
            :parent-reference="$refs.toolBarButton"
            :visible="isFocused"
            @click-outside="onClickOutside">
            <slot
                name="dropdown"
                :visible="isFocused" />
        </Dropdown>
    </ToolBarButton>
</template>

<script>

export default {
    name: 'ToolBarSelectButton',
    data() {
        return {
            isFocused: false,
            isReadyToRender: false,
            isClickedOutside: false,
        };
    },
    methods: {
        onClick() {
            if (!this.isReadyToRender) {
                this.isReadyToRender = true;
            }

            this.isFocused = !this.isFocused;

            this.$emit('focus', this.isFocused);
        },
        onClickOutside({
            isClickedOutside,
        }) {
            if (isClickedOutside) {
                this.isFocused = false;

                this.$emit('focus', this.isFocused);
            }
        },
    },
};
</script>
