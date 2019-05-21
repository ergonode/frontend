/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
class ProductAttributeData {
    constructor(
        id,
        required,
        type,
        name,
        hint,
        placeholder,
        parameters,
        value,
        options,
    ) {
        this.id = id;
        this.required = required;
        this.type = type;
        this.name = name;
        this.hint = hint;
        this.placeholder = placeholder;
        this.parameters = parameters;
        this.value = value;
        this.options = options;
    }
}

export default ProductAttributeData;
