/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FeedbackProvider
        :errors="errors"
        :change-values="changeValues">
        <template
            #default="{
                hasValueToSave,
                hasSuccess,
                hasError,
            }">
            <TranslatableTitleProvider :title="item.title">
                <template #default="{ translatableTitle }">
                    <div
                        :class="classes"
                        tabindex="-1"
                        @click="onLinkSelect">
                        {{ translatableTitle }}
                        <IconError
                            v-if="hasError"
                            view-box="6 -6 12 36"
                            :fill-color="redColor" />
                        <IconMark
                            v-else-if="hasSuccess"
                            :fill-color="greenColor" />
                        <IconSync
                            v-else-if="hasValueToSave"
                            :fill-color="graphiteDarkColor" />
                    </div>
                </template>
            </TranslatableTitleProvider>
        </template>
    </FeedbackProvider>
</template>

<script>
import TranslatableTitleProvider from '@Core/components/Translation/TranslatableTitleProvider';
import {
    GRAPHITE_DARK,
    GREEN,
    RED,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'HorizontalRoutingTabBarItem',
    components: {
        TranslatableTitleProvider,
    },
    props: {
        /**
         * Index of given component at the loop
         */
        index: {
            type: Number,
            required: true,
        },
        /**
         * Selected index of tab
         */
        selectedIndex: {
            type: Number,
            required: true,
        },
        /**
         * Item data model
         */
        item: {
            type: Object,
            required: true,
        },
        /**
         * Values that have been changes at given context
         */
        changeValues: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The validation errors
         */
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        classes() {
            return [
                'tab-bar-item',
                {
                    'tab-bar-item--error': this.hasError,
                },
            ];
        },
        redColor() {
            return RED;
        },
        greenColor() {
            return GREEN;
        },
        graphiteDarkColor() {
            return GRAPHITE_DARK;
        },
    },
    mounted() {
        this.$emit('init');
    },
    methods: {
        onLinkSelect() {
            if (this.item.route.name !== this.$route.name) {
                this.$emit('select', this.index);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-bar-item {
        display: flex;
        justify-content: center;
        min-width: 176px;
        padding: 6px 16px 0;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_14_20;
        word-break: break-all;
        text-overflow: ellipsis;
        cursor: pointer;
        outline: none;
        overflow: hidden;

        &--error {
            color: $RED;
        }
    }
</style>
