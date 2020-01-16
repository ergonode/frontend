/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['options', {'options--disabled': disabled}]">
        <div
            v-for="(key, index) in optionKeys"
            :key="index"
            class="option">
            <IconDelete @click.native="removeOptionKey(key)" />
            <TextField
                :value="key"
                solid
                required
                small
                :disabled="disabled"
                label="Option code"
                @input="e => updateOptionKey(key, e)"
                @click:append-outer="removeOptionKey(key)" />
        </div>
        <div
            class="add-option-wrapper"
            @click="addOptionKey">
            <IconAdd />
            <span class="font--medium-12-16">Add option</span>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'AttributeOptionKeyValues',
    components: {
        TextField: () => import('@Core/components/Inputs/TextField'),
        IconDelete: () => import('@Core/components/Icons/Actions/IconDelete'),
        IconAdd: () => import('@Core/components/Icons/Actions/IconAdd'),
    },
    props: {
        disabled: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        ...mapState('attribute', {
            options: (state) => state.options,
        }),
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        optionKeys() {
            return Object.keys(this.options);
        },
    },
    methods: {
        ...mapActions('attribute', [
            'addAttributeOptionKey',
            'removeAttributeOptionKey',
            'setAttributeOptionKey',
        ]),
        ...mapActions('translations', [
            'addMultilingualOptionTranslation',
        ]),
        updateOptionKey(oldKey, newKey) {
            this.setAttributeOptionKey({ oldKey, newKey });
        },
        addOptionKey() {
            this.addAttributeOptionKey('');
        },
        removeOptionKey(key) {
            this.removeAttributeOptionKey(key);
        },
    },
};
</script>

<style lang="scss" scoped>
    .options {
        display: grid;
        padding: 16px 0;
        grid-gap: 8px;

        &--disabled {
            pointer-events: none;
        }

        .option {
            display: grid;
            grid-template-columns: 32px auto;
            align-items: center;
        }

        .add-option-wrapper {
            display: flex;
            align-items: center;
            margin-left: 28px;
            cursor: pointer;

            & > label {
                margin-left: 4px;
                color: $GRAPHITE;
                cursor: pointer;
            }
        }
    }
</style>
