/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getListItems } from '@Core/services/list/getList.service';

export default function ({ namespace }) {
    return {
        data() {
            return {
                items: [],
                codeFilter: '',
            };
        },
        async created() {
            const { language: languageCode } = this.$store.state.authentication.user;
            await this.getItems(languageCode);
        },
        methods: {
            getItems(languageCode) {
                const filter = this.codeFilter ? `code=${this.codeFilter}` : '';

                return getListItems({
                    $axios: this.$axios,
                    path: `${languageCode}/${namespace}`,
                    params: {
                        limit: 9999,
                        offset: 0,
                        filter,
                        field: 'code',
                        order: 'ASC',
                    },
                }).then(({ items }) => {
                    this.items = items;
                });
            },
        },
    };
}
