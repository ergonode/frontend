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
                <InputImageController>
                    <Preloader v-show="isPrefetchingData" />
                    <VerticalFixedScroll
                        v-if="!isPrefetchingData && isValue"
                        :style="{
                            width: '100%',
                        }">
                        <List>
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
                        </List>
                    </VerticalFixedScroll>
                    <Button
                        v-if="!disabled && !isValue"
                        :title="title"
                        :size="smallSize"
                        :theme="secondaryTheme"
                        @click.native="onShowModal">
                        <template #prepend="{ color }">
                            <IconAdd :fill-color="color" />
                        </template>
                    </Button>
                </InputImageController>
                <InputLabel
                    v-if="label"
                    :required="required"
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
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    MEDIA_TYPE,
} from '@Media/defaults';
import {
    get,
} from '@Media/services';
import {
    GREEN,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Button from '@UI/components/Button/Button';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';
import InputController from '@UI/components/Input/InputController';
import InputImageController from '@UI/components/Input/InputImageController';
import InputLabel from '@UI/components/Input/InputLabel';
import InputSolidStyle from '@UI/components/Input/InputSolidStyle';
import VerticalFixedScroll from '@UI/components/Layout/Scroll/VerticalFixedScroll';
import Preloader from '@UI/components/Preloader/Preloader';

export default {
    name: 'UploadFiles',
    components: {
        InputImageController,
        Preloader,
        InputController,
        Button,
        IconAdd,
        InputLabel,
        InputSolidStyle,
        VerticalFixedScroll,
        ModalMediaTabBar: () => import('@Media/components/Modal/ModalMediaTabBar'),
        IconFile: () => import('@UI/components/Icons/Others/IconFile'),
        IconFilledClose: () => import('@UI/components/Icons/Window/IconFilledClose'),
        IconButton: () => import('@UI/components/IconButton/IconButton'),
        ListElementDescription: () => import('@UI/components/List/ListElementDescription'),
        ListElementTitle: () => import('@UI/components/List/ListElementTitle'),
        ListElementIcon: () => import('@UI/components/List/ListElementIcon'),
        ListElement: () => import('@UI/components/List/ListElement'),
        ListElementAction: () => import('@UI/components/List/ListElementAction'),
        List: () => import('@UI/components/List/List'),
    },
    props: {
        /**
         * The value of the component
         */
        value: {
            type: Array,
            default: () => [],
        },
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        /**
         * The height of the component
         */
        height: {
            type: String,
            default: 'unset',
        },
        /**
         * The label is a text caption or description for the component
         */
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
        /**
         * Determines if the given field is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isPrefetchingData: false,
            isModalVisible: false,
            localValue: {},
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        greenColor() {
            return GREEN;
        },
        title() {
            return this.$t('@Media.media.components.UploadFiles.title');
        },
        tabs() {
            return [
                {
                    title: this.$t('@Media.media.components.UploadFiles.mediaTabTitle'),
                    content: {
                        component: () => import('@Media/components/Grids/AddMediaGrid'),
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
                    title: this.$t('@Media.media.components.UploadFiles.uploadFilesTabTitle'),
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
    },
};
</script>

<style lang="scss" scoped>
    .centering-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 8px 0;
    }
</style>
