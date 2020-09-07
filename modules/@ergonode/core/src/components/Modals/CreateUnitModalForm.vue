/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="New unit"
        @close="onClose">
        <template #body>
            <UnitForm @submit="onSubmit">
                <template #submitForm>
                    <Button
                        title="CREATE"
                        type="submit">
                        <template
                            v-if="isSubmitting"
                            #append="{ color }">
                            <IconSpinner :fill-color="color" />
                        </template>
                    </Button>
                </template>
                <template #proceedForm>
                    <Button
                        title="CREATE & EDIT"
                        :theme="secondaryTheme"
                        @click.native="onCreateAndEdit">
                        <template
                            v-if="isCreatingAndEdit"
                            #prepend="{ color }">
                            <IconSpinner :fill-color="color" />
                        </template>
                    </Button>
                </template>
            </UnitForm>
        </template>
    </ModalForm>
</template>

<script>
import Button from '@Core/components/Button/Button';
import UnitForm from '@Core/components/Forms/UnitForm';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import ModalForm from '@Core/components/Modal/ModalForm';
import {
    THEME,
} from '@Core/defaults/theme';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CreateUnitModalForm',
    components: {
        ModalForm,
        IconSpinner,
        Button,
        UnitForm,
    },
    data() {
        return {
            isSubmitting: false,
            isCreatingAndEdit: false,
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('unit', [
            'createUnit',
            '__clearStorage',
        ]),
        ...mapActions('dictionaries', [
            'getDictionary',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        async onSubmit() {
            if (this.isSubmitting || this.isCreatingAndEdit) {
                return;
            }
            this.isSubmitting = true;

            try {
                this.removeErrors();
                await this.createUnit();
                await this.getDictionary({
                    dictionaryName: 'units',
                });
                this.$emit('created');
                this.onClose();
            } catch (e) {
                if (e.data) {
                    this.onError(e.data);
                }
            } finally {
                this.isSubmitting = false;
            }
        },
        onClose() {
            this.__clearStorage();
            this.$emit('close');
        },
        async onCreateAndEdit() {
            this.isCreatingAndEdit = true;

            try {
                this.removeErrors();
                const id = await this.createUnit();
                await this.getDictionary({
                    dictionaryName: 'units',
                });
                await this.$router.push({
                    name: 'unit-id-general',
                    params: {
                        id,
                    },
                });
            } catch (e) {
                if (e.data) {
                    this.onError(e.data);
                }
            } finally {
                this.isCreatingAndEdit = false;
            }
        },
    },
};
</script>
