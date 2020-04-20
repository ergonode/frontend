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
            <IconDelete
                class="option__remove-icon"
                @click.native="removeAttributeOptionKey({ index, id: options[index].id })" />
            <FormValidatorField :field-key="`code_${index}`">
                <template #validator="{ errorMessages }">
                    <TextField
                        :value="options[index].key"
                        solid
                        required
                        small
                        :disabled="disabled"
                        label="Option code"
                        :error-messages="errorMessages"
                        @input="value => updateAttributeOptionKey({
                            index,
                            id: options[index].id,
                            key: value,
                        })" />
                </template>
            </FormValidatorField>
        </li>
        <div
            class="options__add"
            ref="addOption">
            <Button
                title="Add option"
                :size="smallSize"
                :theme="secondaryTheme"
                @click.native="addOptionKey">
                <template #prepend="{ color }">
                    <IconAdd :fill-color="color" />
                </template>
            </Button>
        </div>
    </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { SIZE, THEME } from '@Core/defaults/theme';
import FormValidatorField from '@Core/components/Form/Field/FormValidatorField';

export default {
    name: 'AttributeOptionKeyValues',
    components: {
        FormValidatorField,
        TextField: () => import('@Core/components/Inputs/TextField'),
        IconDelete: () => import('@Core/components/Icons/Actions/IconDelete'),
        IconAdd: () => import('@Core/components/Icons/Actions/IconAdd'),
        Button: () => import('@Core/components/Buttons/Button'),
    },
    props: {
        disabled: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        ...mapState('attribute', {
            options: state => state.options,
        }),
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
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
            this.$refs.addOption.scrollIntoView(true);
            this.addAttributeOptionKey(Object.keys(this.options).length);
        },
    },
};
</script>

<style lang="scss" scoped>
    .options {
        position: relative;
        display: grid;
        padding: 16px 0;
        grid-gap: 8px;

        &__add {
            margin-left: 32px;
        }

        &--disabled {
            pointer-events: none;
        }

        .option {
            display: grid;
            grid-template-columns: 32px auto;
            align-items: center;

            &__remove-icon {
                cursor: pointer;
            }
        }
    }
</style>
