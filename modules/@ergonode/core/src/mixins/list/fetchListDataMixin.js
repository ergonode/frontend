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
        async fetch() {
            const {
                defaultLanguageCode,
            } = this.$store.state.core;

            await this.getItems(defaultLanguageCode);
        },
        methods: {
            async getItems(languageCode) {
                const filter = this.codeFilter
                    ? `code=${this.codeFilter};${extraFilters}`
                    : extraFilters;

                const {
                    items,
                } = await getListItems({
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
                });

                this.items = {
                    ...this.items,
                    [languageCode]: items,
                };
            },
        },
    };
}
