/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import NavigateBackFab from '@Core/components/Buttons/NavigateBackFab';

export default {
    components: {
        NavigateBackFab,
    },
    beforeRouteEnter(to, from, next) {
        console.log('before enter');
        next((vm) => {
            if (from.name) {
                // eslint-disable-next-line no-param-reassign
                vm.previousRoute = {
                    ...from,
                };
            }
        });
    },
    data() {
        return {
            previousRoute: null,
        };
    },
};
