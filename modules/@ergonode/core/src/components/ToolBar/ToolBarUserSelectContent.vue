/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        data-cy="tool-bar-content"
        class="tool-bar-user-select-content">
        <ToolBarUserSelectContentHeader />
        <Divider />
        <MenuList
            v-for="(item, index) in navigationBarUserMenu"
            :key="index"
            :title="item.title"
            :menu="item.menu" />
        <div class="footer">
            <Button
                data-cy="logout-button"
                :theme="secondaryTheme"
                :title="$t('@Core.core.components.ToolBarUserSelectContent.logout')"
                @click.native="onLogout" />
        </div>
    </div>
</template>

<script>
import {
    ROUTE_NAME,
} from '@Authentication/config/routes';
import ToolBarUserSelectContentHeader from '@Core/components/ToolBar/ToolBarUserSelectContentHeader';
import {
    THEME,
} from '@Core/defaults/theme';
import navigationBarUserMenu from '@Core/models/navigation/navigationBarUserMenu';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ToolBarUserSelectContent',
    components: {
        ToolBarUserSelectContentHeader,
    },
    data() {
        return {
            extendMenu: [],
        };
    },
    computed: {
        navigationBarUserMenu() {
            return navigationBarUserMenu
                .concat(this.extendMenu)
                .reduce((acc, current) => {
                    const tmpArray = acc;
                    const index = tmpArray.findIndex(c => c.title === current.title);

                    if (index !== -1) {
                        tmpArray[index] = {
                            title: tmpArray[index].title,
                            menu: [
                                ...tmpArray[index].menu,
                                ...current.menu,
                            ],
                        };
                    } else {
                        tmpArray.push(current);
                    }
                    return tmpArray;
                }, []);
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    async mounted() {
        const extendMenu = await this.$getExtendMethod('@Core/components/ToolBar/ToolBarMenu', {
            $this: this,
        });

        extendMenu.forEach((extend) => {
            this.extendMenu.push(...extend);
        });
    },
    methods: {
        ...mapActions('authentication', [
            '__setState',
        ]),
        onLogout() {
            this.__setState({
                key: 'isLogged',
                value: false,
            });
            this.$router.push({
                name: ROUTE_NAME.INDEX,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .tool-bar-user-select-content {
        display: flex;
        flex-direction: column;
        width: 320px;

        .footer {
            display: flex;
            justify-content: flex-end;
            padding: 16px;
        }
    }
</style>
