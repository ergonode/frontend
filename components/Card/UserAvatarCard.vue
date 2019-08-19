/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseCard>
        <UploadImage
            :value="avatarId"
            style="height: 180px;"
            title="Profile picture"
            :disabled="!isUserAllowedToUpdate"
            @upload="uploadValue"
            @remove="uploadValue" />
    </BaseCard>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BaseCard from '~/components/Card/BaseCard';
import UploadImage from '~/components/Inputs/Image/UploadImage';

export default {
    name: 'UserAvatarCard',
    components: {
        BaseCard,
        UploadImage,
    },
    computed: {
        ...mapState('users', {
            avatarId: state => state.avatarId,
        }),
        isUserAllowedToUpdate() {
            return this.$canIUse('USER_UPDATE');
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
