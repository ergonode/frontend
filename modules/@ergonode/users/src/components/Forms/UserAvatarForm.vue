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
                    :disabled="!isAllowedToUpdate"
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
        ...mapState('user', {
            avatarId: state => state.avatarId,
            userId: state => state.id,
            languageCode: state => state.languageCode,
        }),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.USER.update,
            ]);
        },
    },
    methods: {
        ...mapActions('user', [
            '__setState',
        ]),
        ...mapActions('authentication', [
            'getUser',
        ]),
        uploadValue(value = '') {
            this.__setState({
                key: 'avatarId',
                value,
            });

            this.getUser();
        },
    },
};
</script>
