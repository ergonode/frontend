<template>
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
</template>

<script>
export default {
    name: 'NavigationBarUserSelectContentHeader',
    props: {
        initials: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        avatarId: {
            type: String,
            required: false,
            default: '',
        },
    },
    components: {
        Picture: () => import('~/components/Inputs/Image/Picture'),
        Icon: () => import('~/components/Icon/Icon'),
    },
};
</script>

<style lang="scss" scoped>
    .header {
        display: grid;
        grid-template-columns: 72px auto;
        grid-column-gap: 24px;
        align-items: center;
        margin: 24px;

        &__image {
            display: flex;
            grid-column: 1;
            grid-row: 1 / 3;

            & > img {
                height: 72px;
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
</style>
