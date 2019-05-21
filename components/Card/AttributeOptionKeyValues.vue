/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="options-wrapper">
        <div
            v-for="(key, index) in optionKeys"
            :key="index"
            class="option-wrapper">
            <Icon
                icon="sprite-system system-trash--deactive"
                size="medium"
                @click.native="removeOptionKey(index)" />
            <TextField
                :value="key"
                solid
                required
                label="Option code"
                @input="e => updateOptionKey(index, e)"
                @click:append-outer="removeOptionKey(index)" />
        </div>
        <div
            class="add-option-wrapper"
            @click="addOptionKey">
            <Icon
                icon="sprite-button button-add-grey"
                size="medium" />
            <label class="txt--graphite typo-btn--xs">Add option</label>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'AttributeOptionKeyValues',
    components: {
        TextField: () => import('~/components/Inputs/TextField'),
        Icon: () => import('~/components/Icon/Icon'),
    },
    computed: {
        ...mapState('attribute', {
            optionKeys: state => state.optionKeys,
        }),
    },
    methods: {
        ...mapActions('attribute', [
            'addAttributeOptionKey',
            'removeAttributeOptionKey',
            'setAttributeOptionKey',
        ]),
        updateOptionKey(index, key) {
            this.setAttributeOptionKey({ index, key });
        },
        addOptionKey() {
            this.addAttributeOptionKey({ key: '' });
        },
        removeOptionKey(index) {
            this.removeAttributeOptionKey({ index });
        },
    },
};
</script>

<style lang="scss" scoped>
    .options-wrapper {
        display: grid;
        grid-gap: 8px;

        .option-wrapper {
            display: flex;
            align-items: center;

            & > i {
                margin-left: 8px;
                margin-right: 12px;
            }
        }

        .add-option-wrapper {
            display: flex;
            align-items: center;
            margin-left: 40px;
            cursor: pointer;

            & > label {
                margin-left: 4px;
                cursor: pointer;
            }
        }
    }
</style>
