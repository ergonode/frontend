/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default function ({
    $axios,
    $store,
    productId,
    columnId,
    elementId,
    value,
}) {
    const [, languageCode] = columnId.split(':');
    const path = `${languageCode}/products/${productId}/draft/${elementId}/value`;

    return $axios.$put(path, { value }).then(() => {
        $store.dispatch(
            'validations/removeValidationError',
            `${productId}/${columnId}`,
            { root: true },
        );
    }).catch((e) => {
        const { code: statusCode, errors } = e.data;

        if (errors) {
            $store.dispatch(
                'validations/onError',
                {
                    code: statusCode,
                    errors,
                    fieldKey: `${productId}/${columnId}`,
                },
                { root: true },
            );
        } else {
            const internalServerError = { value: [e.statusText] };
            $store.dispatch(
                'validations/onError',
                {
                    code: statusCode,
                    errors: internalServerError,
                    fieldKey: `${productId}/${columnId}`,
                },
                { root: true },
            );
        }
    });
}
