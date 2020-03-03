/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="image-cell">
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
        UploadImage: () => import('@Core/components/Inputs/Image/UploadImage'),
    },
    props: {
        value: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            imageId: this.value,
        };
    },
    destroyed() {
        if (this.imageId !== this.value) {
            this.$emit('input', this.imageId);
        }
    },
    methods: {
        updateValue(value) {
            this.imageId = value || '';
        },
    },
};
</script>

<style lang="scss" scoped>
    .image-cell {
        width: 300px;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_6_DP;
    }
</style>
