/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default function (onSuccess) {
    window.onscroll = () => {
        const { scrollTop, offsetHeight } = document.documentElement;
        const isBottomOfWindow = (
            scrollTop + window.innerHeight === offsetHeight
        );

        if (isBottomOfWindow) {
            onSuccess();
        }
    };
}
