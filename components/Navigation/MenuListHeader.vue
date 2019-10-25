/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <h3
        class="menu-section__title font--medium-s-1"
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
