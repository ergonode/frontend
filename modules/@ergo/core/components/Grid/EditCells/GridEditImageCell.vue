/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="image-cell">
        <UploadImageFile
            :value="value"
            height="unset"
            @upload="updateValue"
            @remove="updateValue" />
    </div>
</template>

<script>
export default {
    name: 'GridEditImageCell',
    components: {
        UploadImageFile: () => import('@Core/components/Inputs/UploadFile/UploadImageFile'),
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
        background-color: $WHITE;
        box-shadow: $ELEVATOR_6_DP;
    }
</style>
