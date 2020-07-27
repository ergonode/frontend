/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
import {
    Doughnut,
} from 'vue-chartjs';

export default {
    extends: Doughnut,
    props: {
        data: {
            type: Object,
            default: null,
        },
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
