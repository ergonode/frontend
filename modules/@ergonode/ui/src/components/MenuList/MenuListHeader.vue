/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <h3
        class="menu-section__title"
        v-text="props.title" />
</template>

<script>
export default {
    name: 'MenuListHeader',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
    },
};
</script>
