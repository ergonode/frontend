/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <div class="dropdown-placeholder__description">
            <span
                class="dropdown-placeholder__title"
                v-text="title" />
            <span
                class="dropdown-placeholder__subtitle"
                v-text="subtitle" />
        </div>
        <div
            class="dropdown-placeholder__action"
            v-if="isActionSlotVisible">
            <slot name="action" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'DropdownPlaceholder',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: 'Nothing to see here',
        },
        /**
         * The subtitle of the component
         */
        subtitle: {
            type: String,
            default: 'There are no records in the system.',
        },
    },
    computed: {
        classes() {
            return [
                'dropdown-placeholder',
                `dropdown-placeholder--${this.layoutOrientation}`,
            ];
        },
        isActionSlotVisible() {
            return !!this.$slots.action;
        },
    },
};
</script>

<style lang="scss" scoped>
.dropdown-placeholder {
    display: flex;
    flex-direction: column;
    padding: 24px;
    box-sizing: border-box;
    background-color: $WHITESMOKE;
    color: $GRAPHITE_DARK;
    overflow: hidden;

    &__title {
        font: $FONT_SEMI_BOLD_20_24;
    }

    &__subtitle {
        font: $FONT_MEDIUM_14_20;
        margin-top: 8px;
    }

    &__description {
        display: flex;
        flex-direction: column;
    }

    &__action {
        margin-top: 16px;
    }
}
</style>
