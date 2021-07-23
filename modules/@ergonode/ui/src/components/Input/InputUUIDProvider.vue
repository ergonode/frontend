/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
import {
    getUUID,
} from '@Core/models/stringWrapper';

export default {
    name: 'InputUUIDProvider',
    data() {
        return {
            uuid: '',
        };
    },
    mounted() {
        this.uuid = getUUID();
    },
    render() {
        return this.$scopedSlots.default({
            uuid: this.uuid,
        });
    },
};
</script>
