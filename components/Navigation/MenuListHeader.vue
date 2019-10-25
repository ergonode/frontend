/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <h3
        class="menu-section__title font--medium-12-16"
        v-text="props.title" />
</template>

<script>
export default {
    name: 'MenuListHeader',
    props: {
        title: {
            type: String,
            default: '',
        },
    },
};
</script>
