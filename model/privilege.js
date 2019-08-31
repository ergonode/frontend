/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default class Privilege {
    constructor(hasAccess, prefix) {
        if (!hasAccess || !prefix) {
            throw new Error('Class parameters - required');
        }
        this.hasAccess = hasAccess;
        this.prefix = prefix;
        this.privilegesTypes = {
            READ: `${this.prefix}_READ`,
            UPDATE: `${this.prefix}_UPDATE`,
            CREATE: `${this.prefix}_CREATE`,
            DELETE: `${this.prefix}_DELETE`,
        };
    }

    get isReadOnly() {
        return this.hasAccess(this.privilegesTypes.READ)
            && !this.hasAccess(this.privilegesTypes.UPDATE)
            && !this.hasAccess(this.privilegesTypes.CREATE)
            && !this.hasAccess(this.privilegesTypes.DELETE);
    }
}
