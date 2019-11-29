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
            <IconDelete @click.native="removeOptionKey(index)" />
            <TextField
                :value="key"
                solid
                required
                small
                :disabled="disabled"
                label="Option code"
                @input="e => updateOptionKey(index, e)"
                @click:append-outer="removeOptionKey(index)" />
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
            optionKeys: (state) => state.optionKeys,
            isMultilingual: (state) => state.isMultilingual,
        }),
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
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
        updateOptionKey(index, key) {
            this.setAttributeOptionKey({ index, key });
        },
        addOptionKey() {
            this.addAttributeOptionKey('');
        },
        removeOptionKey(index) {
            this.removeAttributeOptionKey(index);
        },
    },
};
</script>

<style lang="scss" scoped>
    .options {
        display: grid;
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
