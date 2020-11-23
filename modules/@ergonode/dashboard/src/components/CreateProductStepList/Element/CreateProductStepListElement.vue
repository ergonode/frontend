/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li class="progress-list-element">
        <h1
            class="progress-list-element__title"
            v-text="title" />
        <h2
            class="progress-list-element__subtitle"
            v-text="subtitle" />
        <span
            class="progress-list-element__description"
            v-text="description" />
        <div class="progress-list-element__action">
            <slot name="action" />
        </div>
    </li>
</template>

<script>
export default {
    name: 'CreateProductStepListElement',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * The subtitle of the component
         */
        subtitle: {
            type: String,
            default: '',
        },
        /**
         * The description of the component
         */
        description: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .progress-list-element {
        display: flex;
        flex-direction: column;
        padding: 40px;
        box-sizing: border-box;

        &__title, &__subtitle {
            color: $WHITE;
        }

        &__title {
            font: $FONT_SEMI_BOLD_40_48;
        }

        &__subtitle {
            margin-top: 8px;
            font: $FONT_SEMI_BOLD_20_24;
        }

        &__description {
            margin-top: 16px;
            color: $GREY;
            font: $FONT_MEDIUM_14_20;
        }

        &__action {
            margin-top: 24px;
            display: flex;
            justify-content: flex-start;
        }
    }
</style>
