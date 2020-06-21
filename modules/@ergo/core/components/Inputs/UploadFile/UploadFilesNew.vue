/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UploadFileNew
        :label="label"
        :required="required"
        :disabled="disabled"
        :fixed-height="fixedHeight">
        <template #activator>
            <List v-if="isValue">
                <ListElement
                    v-for="file in value"
                    :size="size"
                    :key="file">
                    <ListElementIcon>
                        <IconFile :fill-color="greenColor" />
                    </ListElementIcon>
                    <ListElementDescription>
                        <ListElementTitle :title="file" />
                    </ListElementDescription>
                    <ListElementAction :size="smallSize">
                        <IconButton
                            :size="smallSize"
                            :theme="secondaryTheme"
                            @click.native="onRemoveFile(file)">
                            <template #icon="{ color }">
                                <IconFilledClose :fill-color="color" />
                            </template>
                        </IconButton>
                    </ListElementAction>
                </ListElement>
            </List>
            <div class="horizontal-wrapper">
                <Button
                    :title="title"
                    :size="smallSize"
                    :theme="secondaryTheme"
                    @click.native="onShowModal">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </Button>
            </div>
            <ModalTabBar
                v-if="isModalVisible"
                :items="tabs"
                @close="onCloseModal" />
        </template>
    </UploadFileNew>
</template>

<script>
import {
    GREEN,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Button from '@Core/components/Buttons/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import UploadFileNew from '@Core/components/Inputs/UploadFile/UploadFileNew';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'UploadImageFilesNew',
    components: {
        UploadFileNew,
        Button,
        IconAdd,
        ModalTabBar: () => import('@Core/components/Modal/ModalTabBar'),
        IconFile: () => import('@Core/components/Icons/Others/IconFile'),
        IconFilledClose: () => import('@Core/components/Icons/Window/IconFilledClose'),
        IconButton: () => import('@Core/components/Buttons/IconButton'),
        ListElementDescription: () => import('@Core/components/List/ListElementDescription'),
        ListElementTitle: () => import('@Core/components/List/ListElementTitle'),
        ListElementIcon: () => import('@Core/components/List/ListElementIcon'),
        ListElement: () => import('@Core/components/List/ListElement'),
        ListElementAction: () => import('@Core/components/List/ListElementAction'),
        List: () => import('@Core/components/List/List'),
    },
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        label: {
            type: String,
            default: '',
        },
        required: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        fixedHeight: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isModalVisible: false,
            currentIndex: 0,
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        secondaryPlainTheme() {
            return THEME.SECONDARY_PLAIN;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        greenColor() {
            return GREEN;
        },
        title() {
            return 'Add Files';
        },
        tabs() {
            return [
                {
                    title: 'Media',
                    content: {
                        component: () => import('@Media/components/Tabs/MediaGridTab'),
                        listeners: {
                            input: (value) => {
                                this.$emit('input', value);
                            },
                        },
                    },
                },
                {
                    title: 'Upload files',
                    content: {
                        component: () => import('@Core/components/Inputs/UploadFile/UploadFileTab'),
                        listeners: {},
                    },
                },
            ];
        },
        isValue() {
            return this.value.length > 0;
        },
    },
    methods: {
        onShowModal() {
            this.isModalVisible = true;
        },
        onRemoveFile(file) {
            this.$emit('input', this.value.filter(id => id !== file));
        },
        onCloseModal() {
            this.isModalVisible = false;
        },
        onSelectSetting(option) {
            option.action();
        },
    },
};
</script>

<style lang="scss" scoped>
    .image-container {
        position: relative;
        height: 100%;
    }

    .image-settings {
        position: absolute;
        top: 8px;
        right: 8px;
        background-color: $WHITE;
        border-radius: 50%;
    }

    .horizontal-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 8px;
    }
</style>
