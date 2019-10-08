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
                alt="template_placeholder icon">
        </div>
        <div class="horizontal-wrapper">
            <span
                class="template-element__title typo-btn--xs txt--dark-graphite"
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
        Picture: () => import('~/components/Inputs/Image/Picture'),
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
            return require('~/assets/images/template-designer/template_placeholder.svg'); // eslint-disable-line global-require, import/no-dynamic-require
        },
    },
    methods: {
        onEditTemplate() {
            this.$router.push({
                name: 'template-edit-id',
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
        border: 1px solid $grey;
        cursor: pointer;

        &:hover {
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);
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
        }
    }
</style>
