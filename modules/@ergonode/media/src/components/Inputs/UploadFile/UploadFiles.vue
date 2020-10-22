/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputSolidStyle
        :size="size"
        :height="height"
        :disabled="disabled">
        <template #activator>
            <InputController>
                <div class="upload-files">
                    <Preloader v-show="isPrefetchingData" />
                    <VerticalFixedScroll v-if="!isPrefetchingData">
                        <List v-if="isValue">
                            <ListElement
                                v-for="file in value"
                                :size="size"
                                :key="file">
                                <ListElementIcon>
                                    <IconFile :fill-color="greenColor" />
                                </ListElementIcon>
                                <ListElementDescription>
                                    <ListElementTitle :title="localValue[file]" />
                                </ListElementDescription>
                                <ListElementAction
                                    v-if="!disabled"
                                    :size="smallSize">
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
                        <div
                            v-if="!disabled"
                            class="centering-container">
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
                    </VerticalFixedScroll>
                </div>
                <InputLabel
                    v-if="label"
                    :style="{ top: 0 }"
                    :required="required"
                    :size="size"
                    :floating="true"
                    :disabled="disabled"
                    :label="label" />
            </InputController>
            <ModalMediaTabBar
                v-if="isModalVisible"
                :tabs="tabs"
                @close="onCloseModal" />
        </template>
    </InputSolidStyle>
</template>

<script>
import {
    GREEN,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Button from '@Core/components/Button/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import InputController from '@Core/components/Input/InputController';
import InputLabel from '@Core/components/Input/InputLabel';
import InputSolidStyle from '@Core/components/Input/InputSolidStyle';
import VerticalFixedScroll from '@Core/components/Layout/Scroll/VerticalFixedScroll';
import Preloader from '@Core/components/Preloader/Preloader';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    MEDIA_TYPE,
} from '@Media/defaults';
import {
    get,
} from '@Media/services/index';

export default {
    name: 'UploadFiles',
    components: {
        Preloader,
        InputController,
        Button,
        IconAdd,
        InputLabel,
        InputSolidStyle,
        VerticalFixedScroll,
        ModalMediaTabBar: () => import('@Media/components/Modal/ModalMediaTabBar'),
        IconFile: () => import('@Core/components/Icons/Others/IconFile'),
        IconFilledClose: () => import('@Core/components/Icons/Window/IconFilledClose'),
        IconButton: () => import('@Core/components/IconButton/IconButton'),
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
        height: {
            type: String,
            default: 'unset',
        },
        label: {
            type: String,
            default: '',
        },
        /**
         * Determines if the given field is required
         */
        required: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isPrefetchingData: false,
            isModalVisible: false,
            currentIndex: 0,
            localValue: {},
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
                        component: () => import('@Media/components/Grid/MediaGrid'),
                        props: {
                            multiple: true,
                            value: this.value,
                            type: MEDIA_TYPE.APPLICATION,
                        },
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
                        component: () => import('@Media/components/Tabs/UploadFileTab'),
                        listeners: {},
                    },
                },
            ];
        },
        isValue() {
            return this.value.length > 0;
        },
    },
    watch: {
        value: {
            immediate: true,
            async handler() {
                const requests = [];

                this.value.forEach((id) => {
                    if (typeof this.localValue[id] === 'undefined') {
                        requests.push(get({
                            $axios: this.$axios,
                            id,
                        }).then(({
                            name,
                        }) => {
                            this.localValue[id] = name;
                        }));
                    }
                });

                if (requests.length) {
                    this.isPrefetchingData = true;

                    await Promise.all(requests);

                    this.isPrefetchingData = false;
                }
            },
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
    .upload-files {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .centering-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 8px 0;
    }
</style>
