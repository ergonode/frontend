/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
                            <ListLinkElement
                                v-for="file in value"
                                :size="size"
                                :key="file"
                                :to="{
                                    name: resourceRouteName,
                                    params: { id: file }
                                }">
                                <ListElementIcon>
                                    <IconFile :fill-color="greenColor" />
                                </ListElementIcon>
                                <ListElementDescription>
                                    <ListElementTitle :title="localValue[file]" />
                                </ListElementDescription>
                                <ListElementAction
                                    v-if="!disabled"
                                    :size="smallSize">
                                    <Fab
                                        :size="tinySize"
                                        :theme="destructiveTheme"
                                        @click.native="onRemoveFile(file)">
                                        <template #icon="{ color }">
                                            <IconFilledClose :fill-color="color" />
                                        </template>
                                    </Fab>
                                </ListElementAction>
                            </ListLinkElement>
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
    ROUTE_NAME,
} from '@Media/config/routes';
import {
    MEDIA_TYPE,
} from '@Media/defaults';
import {
    get,
} from '@Media/services';
import {
    GREEN,
} from '@UI/assets/scss/_js-variables/colors.scss';
import VerticalFixedScroll from '@UI/components/Layout/Scroll/VerticalFixedScroll';

export default {
    name: 'UploadFiles',
    components: {
        VerticalFixedScroll,
        ModalMediaTabBar: () => import('@Media/components/Modal/ModalMediaTabBar'),
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
        resourceRouteName() {
            return ROUTE_NAME.MEDIA_RESOURCE_EDIT_GENERAL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        destructiveTheme() {
            return THEME.DESTRUCTIVE;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        tinySize() {
            return SIZE.TINY;
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
