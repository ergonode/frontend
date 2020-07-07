/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getListItems,
} from '@Core/services/list/getList.service';

export default function ({
    namespace, extraFilters = null,
}) {
    return {
        data() {
            return {
                items: {},
                codeFilter: '',
            };
        },
        async created() {
            const {
                language: languageCode,
            } = this.$store.state.authentication.user;

            await this.getItems(languageCode);
        },
        methods: {
            getItems(languageCode) {
                const filter = this.codeFilter ? `code=${this.codeFilter};${extraFilters}` : extraFilters;

                return getListItems({
                    $axios: this.$axios,
                    path: `${languageCode}/${namespace}`,
                    params: {
                        limit: 9999,
                        offset: 0,
                        filter,
                        view: 'list',
                        field: 'code',
                        order: 'ASC',
                    },
                }).then(({
                    items,
                }) => {
                    this.items = {
                        ...this.items,
                        [languageCode]: items,
                    };
                });
            },
        },
    };
}
