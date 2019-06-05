/*
* Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
* See LICENSE for license details.
*/
<template>
    <div class="user-content">
        <div class="header">
            <div class="header__image">
                <Picture
                    v-if="avatarId"
                    fab
                    :image-id="avatarId" />
                <Icon
                    v-else
                    class="user-img"
                    icon="sprite-navbar navbar-user"
                    size="hugh" />
            </div>
            <span
                class="header__initials"
                v-text="initials" />
            <span
                class="header__email"
                v-text="email" />
        </div>
        <Divider />
        <MenuList
            v-for="(item, index) in userMenuElements"
            :key="index"
            :section-title="item.title"
            :section-menu="item.menu" />
        <div class="footer">
            <Button
                theme="dark"
                large
                color="transparent"
                title="LOG OUT"
                @click.native="onLogout" />
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import navigationBarUserMenu from '~/model/navigation/navigationBarUserMenu';

export default {
    name: 'NavigationBarUserSelectContent',
    components: {
        Picture: () => import('~/components/Inputs/Image/Picture'),
        Divider: () => import('~/components/Dividers/Divider'),
        Icon: () => import('~/components/Icon/Icon'),
        MenuList: () => import('~/components/Navigation/MenuList'),
        Button: () => import('~/components/Buttons/Button'),
    },
    props: {
        avatarId: {
            type: String,
            required: false,
            default: '',
        },
        initials: {
            type: String,
            required: false,
            default: '',
        },
        email: {
            type: String,
            required: false,
            default: '',
        },
    },
    data() {
        return {
            userMenuElements: navigationBarUserMenu,
        };
    },
    methods: {
        ...mapActions('authentication', [
            'logout',
        ]),
        onLogout() {
            this.logout();
            this.$router.push('/');
        },
    },
};
</script>

<style lang="scss" scoped>
    .user-content {
        display: flex;
        flex: 1;
        flex-direction: column;

        .header {
            display: grid;
            grid-template-columns: 64px auto;
            grid-column-gap: 24px;
            align-items: center;
            margin: 24px;

            &__image {
                display: flex;
                grid-column: 1;
                grid-row: 1 / 3;

                & > img {
                    height: 64px;
                    object-fit: contain;
                }
            }

            &__initials, &__email {
                grid-column: 2;
            }

            &__initials {
                @include setFont(medium, medium, medium, $darkGraphite, 0.1);
                grid-row: 1;
                align-self: flex-end;
            }

            &__email {
                @include setFont(medium, small, regular, $darkGrey);
                grid-row: 2;
                align-self: flex-start;
            }
        }

        .footer {
            display: flex;
            justify-content: flex-end;
            padding: 16px;
        }
    }
</style>
