/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        :class="classes"
        type="button"
        @click="onRemove">
        <span
            :class="titleClasses"
            v-text="attribute.value || attribute.key" />
        <IconCancel />
    </button>
</template>

<script>
import IconCancel from '@UI/components/Icons/Actions/IconCancel';

export default {
    name: 'BindingAttribute',
    components: {
        IconCancel,
    },
    props: {
        index: {
            type: Number,
            required: true,
        },
        attribute: {
            type: Object,
            required: true,
        },
    },
    computed: {
        classes() {
            return [
                'binding-attribute',
            ];
        },
        titleClasses() {
            return [
                'binding-attribute__title',
            ];
        },
    },
    methods: {
        onRemove() {
            this.$emit('remove', this.index);
        },
    },
};
</script>

<style lang="scss" scoped>
.binding-attribute {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 32px;
    border: none;
    padding: 4px 4px 4px 10px;
    box-sizing: border-box;
    background-color: $WHITESMOKE;
    cursor: pointer;
    outline: none;

    &__title {
        margin-right: 4px;
        color: $GRAPHITE_DARK;
        font: $FONT_BOLD_12_16;
    }
}
</style>
