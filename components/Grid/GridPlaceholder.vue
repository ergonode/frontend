/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-placeholder">
        <div class="grid-placeholder__description">
            <span class="grid-placeholder__title font--medium-24-32">
                Nothing to see here
            </span>
            <span class="grid-placeholder__subtitle font--semi-bold-12-16">
                You have used too many filters or there are no records in the system
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GridPlaceholder',
};
</script>

<style lang="scss" scoped>
    .grid-placeholder {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        align-items: center;
        background: $WHITESMOKE url("~assets/images/placeholders/noresults.svg") no-repeat;
        padding-top: 80px;
        border-left: 1px solid $GREY;
        border-right: 1px solid $GREY;

        &__description {
            display: flex;
            flex-direction: column;
            padding: 16px;
            max-width: 280px;
        }

        &__title, &__subtitle {
            color: $GRAPHITE_DARK;
            text-align: center;
        }

        &__title {
            font: $FONT_MEDIUM_24_32;
        }

        &__subtitle {
            font: $FONT_MEDIUM_12_16;
        }
    }
</style>
