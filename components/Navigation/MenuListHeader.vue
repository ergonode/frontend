<template>
    <h3
        class="menu-section__title"
        v-text="title" />
</template>

<script>
export default {
    name: 'MenuListHeader',
    props: {
        title: {
            type: String,
            required: false,
            default: '',
        },
    },
};
</script>
