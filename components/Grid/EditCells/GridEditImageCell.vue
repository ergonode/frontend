/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['image-cell', {'image-cell--has-value': hasValue}]">
        <UploadImage
            :value="value"
            :elevator="!hasValue"
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
            this.$emit('imageid', this.imageId);
        }
    },
    computed: {
        hasValue() {
            return this.imageId !== '';
        },
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
        background-color: $white;

        &--has-value {
            padding: 12px;
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);
        }
    }
</style>
