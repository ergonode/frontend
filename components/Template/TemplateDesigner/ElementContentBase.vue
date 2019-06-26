<template>
    <div class="element-content">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ElementContentBase',
};
</script>

<style lang="scss" scoped>
    .element-content {
        display: flex;
        flex: 1;
        height: 100%;
        padding-left: 10px;
        background-color: $background;
        overflow: hidden;
        resize: both;
    }
</style>
