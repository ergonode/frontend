/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form>
        <FormGroup>
            <UploadImage
                :value="avatarId"
                label="Profile picture"
                :disabled="!isUserAllowedToUpdate"
                border
                @upload="uploadValue"
                @remove="uploadValue" />
        </FormGroup>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UploadImage from '@Core/components/Inputs/Image/UploadImage';

export default {
    name: 'UserAvatarForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormGroup: () => import('@Core/components/Form/FormGroup'),
        UploadImage,
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
