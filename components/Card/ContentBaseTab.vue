<template>
    <div class="content">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ContentBaseTab',
};
</script>

<style lang="scss" scoped>
    .content {
        display: flex;
        flex-grow: 1;
        flex-wrap: wrap;
        justify-content: center;
        height: 0;
        overflow: auto;
    }
</style>
