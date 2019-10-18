/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="title-bar__actions">
        <NewButton
            v-for="button in buttons"
            :key="button.title"
            size="small"
            :title="button.title"
            :theme="button.theme"
            :inactive="button.inactive"
            :disabled="button.disabled"
            :options="button.options ? optionTitle(button.options) : []"
            @input="(e) => optionAction(e, button.options)"
            @click.native="(button.inactive || button.options) || button.action()">
            <template
                v-if="button.prepend"
                #prepend="{ iconFillColor }">
                <Component
                    :is="button.prepend.component"
                    :color="button.prepend.color"
                    :fill-color="button.prepend.color || iconFillColor" />
            </template>
            <template
                v-if="button.append"
                #append="{ iconFillColor, iconArrowState }">
                <Component
                    :is="button.append.component"
                    :color="button.append.color"
                    :state="iconArrowState"
                    :fill-color="button.append.color || iconFillColor" />
            </template>
        </NewButton>
    </div>
</template>

<script>
export default {
    name: 'TitleBarActions',
    components: {
        NewButton: () => import('~/components/Buttons/NewButton'),
    },
    props: {
        buttons: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        optionTitle(options) {
            return options.map((option) => option.title);
        },
        optionAction(value, options) {
            return options.forEach((option) => {
                if (option.title === value) option.action();
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .title-bar__actions {
        display: flex;
        flex-direction: row-reverse;

        & > * {
            margin-left: 8px;
        }

        & > .btn--primary:first-of-type {
            margin-left: 16px;
        }
    }
</style>
