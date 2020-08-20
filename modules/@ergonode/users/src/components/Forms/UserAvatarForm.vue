/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form>
        <template #body>
            <FormSection>
                <UploadAvatar
                    :value="avatarId"
                    :user-id="userId"
                    :language-code="languageCode"
                    label="Profile picture"
                    height="152px"
                    :disabled="!isUserAllowedToUpdate"
                    @upload="uploadValue"
                    @remove="uploadValue" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import UploadAvatar from '@Users/components/Inputs/UploadAvatar';
import PRIVILEGES from '@Users/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UserAvatarForm',
    components: {
        UploadAvatar,
        Form,
        FormSection,
    },
    computed: {
        ...mapState('users', {
            avatarId: state => state.avatarId,
            userId: state => state.id,
            languageCode: state => state.languageCode,
        }),
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.USER.update,
            ]);
        },
    },
    methods: {
        ...mapActions('users', [
            '__setState',
        ]),
        uploadValue(value = '') {
            this.__setState({
                key: 'avatarId',
                value,
            });
        },
    },
};
</script>
