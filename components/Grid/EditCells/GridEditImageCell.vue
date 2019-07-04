/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="editable-image-cell">
        <UploadImage
            :value="value"
            @upload="updateValue"
            @remove="updateValue" />
    </div>
</template>

<script>
export default {
    name: 'GridEditImageCell',
    components: {
        UploadImage: () => import('~/components/Inputs/Image/UploadImage'),
    },
    props: {
        value: {
            type: String,
            required: false,
            default: '',
        },
    },
    created() {
        this.imageID = this.value;
    },
    destroyed() {
        if (this.imageID !== this.value) {
            this.$emit('imageid', this.imageID);
        }
    },
    methods: {
        updateValue(value) {
            this.imageID = value || '';
        },
    },
};
</script>

<style lang="scss" scoped>
    .editable-image-cell {
        display: flex;
        width: 200px;
        height: 200px;
    }
</style>
