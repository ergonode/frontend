/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default ({
    extendedKey = null, extendedNames = [],
}) => ({
    data() {
        return {
            extendedProps: {},
        };
    },
    async created() {
        extendedNames.forEach((key) => {
            this.extendedProps[key] = {};
        });

        await Promise.all(Object.keys(this.extendedProps).map(async (key) => {
            this.extendedProps[key] = await this.$extendedProps({
                key: extendedKey,
                name: key,
            });
        }));
    },
});
