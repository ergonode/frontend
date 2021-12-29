/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
import {
    Doughnut,
} from 'vue-chartjs';

export default {
    extends: Doughnut,
    props: {
        /**
         * Data used for filling chart
         */
        data: {
            type: Object,
            default: null,
        },
        /**
         * Component variances that user can choose from
         */
        options: {
            type: Object,
            default: null,
        },
    },
    mounted() {
        this.renderChart(this.data, this.options);
    },
};
</script>
