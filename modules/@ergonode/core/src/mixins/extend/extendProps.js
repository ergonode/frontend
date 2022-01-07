/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
        await Promise.all(extendedNames.map(async (key) => {
            this.extendedProps[key] = await this.$extendedProps({
                key: extendedKey,
                name: key,
            });
        }));
    },
});
