/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form>
        <template #body>
            <FormSection>
                <UploadImageFile
                    :value="avatarId"
                    label="Profile picture"
                    :fixed-height="true"
                    :disabled="!isUserAllowedToUpdate"
                    @upload="uploadValue"
                    @remove="uploadValue" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UploadImageFile from '@Core/components/Inputs/UploadFile/UploadImageFile';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';

export default {
    name: 'UserAvatarForm',
    components: {
        Form,
        FormSection,
        UploadImageFile,
    },
    computed: {
        ...mapState('users', {
            avatarId: state => state.avatarId,
        }),
        isUserAllowedToUpdate() {
            return this.$hasAccess(['USER_UPDATE']);
        },
    },
    methods: {
        ...mapActions('users', [
            'setAction',
        ]),
        uploadValue(value = '') {
            this.setAction({ key: 'avatarId', value });
        },
    },
};
</script>

<style lang="scss" scoped>
    .user-avatar-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 21px;

        .container__card {
            width: 500px;

            .content__image {
                width: 80%;
                margin: 10px auto;
            }
        }
    }
</style>
