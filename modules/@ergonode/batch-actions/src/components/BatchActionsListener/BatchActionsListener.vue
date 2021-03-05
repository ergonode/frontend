/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'BatchActionsListener',
    data() {
        return {
            timeout: null,
        };
    },
    computed: {
        ...mapState('batchAction', [
            'actionsQueue',
        ]),
    },
    watch: {
        actionsQueue() {
            if (this.actionsQueue.length) {
                this.getActionStatuses();
            }
        },
    },
    methods: {
        ...mapActions('batchAction', [
            'getActionStatus',
        ]),
        getActionStatuses() {
            if (!this.timeout) {
                this.timeout = setTimeout(async () => {
                    await Promise.all(
                        this.actionsQueue.map(action => this.getActionStatus(action)),
                    );

                    clearTimeout(this.timeout);
                    this.timeout = null;

                    if (this.actionsQueue.length) {
                        this.getActionStatuses();
                    }
                }, 2000);
            }
        },
    },
    render() {
        return this.$slots;
    },
};
</script>
