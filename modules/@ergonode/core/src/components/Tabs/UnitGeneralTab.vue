/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <UnitForm @submit="onSubmit">
                <template #submitForm>
                    <Button
                        title="SAVE CHANGES"
                        type="submit">
                        <template
                            v-if="isSubmitting"
                            #append="{ color }">
                            <IconSpinner :fill-color="color" />
                        </template>
                    </Button>
                </template>
            </UnitForm>
        </template>
    </CenterViewTemplate>
</template>

<script>
import Button from '@Core/components/Button/Button';
import UnitForm from '@Core/components/Forms/UnitForm';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'UnitGeneralTab',
    components: {
        Button,
        IconSpinner,
        UnitForm,
        CenterViewTemplate,
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    methods: {
        ...mapActions('unit', [
            'updateUnit',
        ]),
        ...mapActions('dictionaries', [
            'getDictionary',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        async onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            try {
                this.removeErrors();
                await this.updateUnit();
                await this.getDictionary({
                    dictionaryName: 'units',
                });
            } catch (e) {
                if (e.data) {
                    this.onError(e.data);
                }
            } finally {
                this.isSubmitting = false;
            }
        },
    },
};
</script>
