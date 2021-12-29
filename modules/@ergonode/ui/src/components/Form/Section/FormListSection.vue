/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection :title="title">
        <slot />
        <Tooltip
            :title="addListTooltip"
            max-width="100%">
            <Button
                :title="addListTitle"
                :size="smallSize"
                :theme="secondaryTheme"
                :disabled="disabled"
                @click.native="onAddListElement">
                <template #prepend="{ color }">
                    <IconAdd :fill-color="color" />
                </template>
            </Button>
        </Tooltip>
    </FormSection>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'FormListSection',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * The title of the adding new list element button component
         */
        addListTitle: {
            type: String,
            default: '',
        },
        /**
         * Add next option Button tooltip
         */
        addListTooltip: {
            type: String,
            default: '',
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onAddListElement() {
            this.$el.scrollIntoView(true);
            this.$emit('add');
        },
    },
};
</script>
