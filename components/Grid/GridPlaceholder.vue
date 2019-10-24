/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="placeholder-wrapper">
        <div class="description-wrapper">
            <span class="typo-title txt--centered txt--graphite">
                Nothing to see here
            </span>
            <span class="typo-label txt--centered txt--light-graphite">
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
    .placeholder-wrapper {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        align-items: center;
        background: $WHITESMOKE url("~assets/images/icons/placeholder_noresults.svg") no-repeat;
        padding-top: 80px;
        border-left: 1px solid $GREY;
        border-right: 1px solid $GREY;

        .description-wrapper {
            display: flex;
            flex-direction: column;
            padding: 16px;
            max-width: 280px;
        }
    }
</style>
