/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <form class="form">
        <div class="form__content">
            <slot />
        </div>
    </form>
</template>

<script>
export default {
    name: 'BaseForm',
};
</script>

<style lang="scss" scoped>
    .form {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        height: 0;
        overflow: auto;

        &__content {
            display: grid;
            flex: 1;
            justify-content: center;
            align-items: baseline;
            grid-auto-flow: column;
            grid-template-columns: max-content;
            column-gap: 24px;
            margin: 24px 0 0 24px;

            &::after {
                content: "";
            }
        }
    }
</style>
