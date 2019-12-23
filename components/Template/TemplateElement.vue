/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="template-element"
        @click="onEditTemplate">
        <div class="vertical-wrapper">
            <Picture
                v-if="image"
                style="height: 165px;"
                :image-id="image" />
            <img
                v-else
                :src="getImage"
                alt="template icon">
        </div>
        <div class="horizontal-wrapper">
            <span
                class="template-element__title font--medium-12-16"
                v-text="title" />
            <IconEdit />
        </div>
    </div>
</template>

<script>
export default {
    name: 'TemplateElement',
    components: {
        IconEdit: () => import('~/components/Icon/Actions/IconEdit'),
        Picture: () => import('~/core/components/Multimedia/Picture'),
    },
    props: {
        index: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
            default: '',
        },
        title: {
            type: String,
            required: true,
        },
    },
    computed: {
        getImage() {
            return require('~/assets/images/placeholders/template.svg'); // eslint-disable-line global-require, import/no-dynamic-require
        },
    },
    methods: {
        onEditTemplate() {
            this.$router.push({
                name: 'product-template-edit-id-general',
                params: {
                    id: this.index,
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .template-element {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: $BORDER_1_GREY;
        cursor: pointer;

        &:hover {
            box-shadow: $ELEVATOR_2_DP;
        }

        .vertical-wrapper {
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
        }

        .horizontal-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px;
        }

        &__title {
            margin-left: 8px;
            color: $GRAPHITE_DARK;
        }
    }
</style>
