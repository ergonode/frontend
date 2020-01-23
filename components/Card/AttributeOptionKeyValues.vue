/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ul :class="['options', {'options--disabled': disabled}]">
        <li
            v-for="index in optionIndexes"
            :key="index"
            class="option">
            <IconDelete @click.native="removeAttributeOptionKey(index)" />
            <TextField
                :value="options[index].key"
                solid
                required
                small
                :disabled="disabled"
                label="Option code"
                @input="value => updateAttributeOptionKey({ index, key: value })" />
        </li>
        <div
            class="add-option-wrapper"
            @click="addOptionKey">
            <IconAdd />
            <span class="font--medium-12-16">Add option</span>
        </div>
    </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'AttributeOptionKeyValues',
    components: {
        TextField: () => import('~/core/components/Inputs/TextField'),
        IconDelete: () => import('~/components/Icon/Actions/IconDelete'),
        IconAdd: () => import('~/components/Icon/Actions/IconAdd'),
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
        optionIndexes() {
            return Object.keys(this.options);
        },
    },
    methods: {
        ...mapActions('attribute', [
            'addAttributeOptionKey',
            'removeAttributeOptionKey',
            'updateAttributeOptionKey',
        ]),
        ...mapActions('translations', [
            'addMultilingualOptionTranslation',
        ]),
        addOptionKey() {
            this.addAttributeOptionKey(Object.keys(this.options).length);
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
