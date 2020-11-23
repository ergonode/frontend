/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Configuration"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :errors="errors"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <Toggler
                    :value="isActive"
                    label="Is active"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors[activeFieldKey]"
                    @input="setIsActiveValue" />
                <DatePicker
                    :value="date"
                    :placeholder="format"
                    :format="format"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors[startFieldKey]"
                    label="Date"
                    @input="setDateChange" />
                <TextField
                    :value="time"
                    :disabled="!isAllowedToUpdate"
                    :input="timeInputType"
                    label="Started on"
                    @input="setTimeChange" />
                <Divider />
                <TextField
                    :value="recurrency"
                    :disabled="!isAllowedToUpdate"
                    :input="timeInputType"
                    :error-messages="errors[hourFieldKey]"
                    label="Recurrency"
                    hint="The time interval determining how often process would be executed"
                    @input="setRecurrencyChange" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Channels/config/privileges';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import DatePicker from '@UI/components/DatePicker/DatePicker';
import Divider from '@UI/components/Dividers/Divider';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import TextField from '@UI/components/TextField/TextField';
import Toggler from '@UI/components/Toggler/Toggler';
import {
    DEFAULT_DATE_TIME_FORMAT,
    DEFAULT_FORMAT,
    DEFAULT_HOUR_FORMAT,
} from '@UI/models/calendar';
import {
    format as formatDate,
    formatISO,
    parse as parseDate,
    parseISO,
} from 'date-fns';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'SchedulerForm',
    components: {
        Form,
        FormSection,
        DatePicker,
        TextField,
        Toggler,
        Divider,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    data() {
        return {
            schedulerConfiguration: {},
        };
    },
    computed: {
        ...mapState('channel', [
            'scheduler',
        ]),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CHANNEL.update,
            ]);
        },
        isActive() {
            const {
                active,
            } = this.schedulerConfiguration;

            return active;
        },
        date() {
            const {
                start,
            } = this.schedulerConfiguration;

            return start ? parseISO(start) : null;
        },
        time() {
            const {
                start,
            } = this.schedulerConfiguration;

            return start ? formatDate(parseISO(start), DEFAULT_HOUR_FORMAT) : null;
        },
        recurrency() {
            const {
                hour,
                minute,
            } = this.schedulerConfiguration;

            if (typeof hour !== 'undefined' && typeof minute !== 'undefined') {
                const parseTime = parseDate(`${hour}:${minute}`, DEFAULT_HOUR_FORMAT, new Date());

                return hour !== null && minute !== null
                    ? formatDate(parseTime, DEFAULT_HOUR_FORMAT)
                    : null;
            }

            return null;
        },
        format() {
            return DEFAULT_FORMAT;
        },
        timeInputType() {
            return {
                type: 'time',
            };
        },
        activeFieldKey() {
            return 'active';
        },
        startFieldKey() {
            return 'start';
        },
        hourFieldKey() {
            return 'hour';
        },
    },
    watch: {
        scheduler: {
            immediate: true,
            handler() {
                this.schedulerConfiguration = this.scheduler ? JSON.parse(this.scheduler) : {};
            },
        },
    },
    methods: {
        ...mapActions('channel', [
            '__setState',
        ]),
        setIsActiveValue(value) {
            const tmpScheduler = {
                ...this.schedulerConfiguration,
                active: value,
            };

            this.__setState({
                key: 'scheduler',
                value: JSON.stringify(tmpScheduler),
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.activeFieldKey,
                value,
            });
        },
        setDateChange(value) {
            let date = value ? formatISO(value) : null;

            if (this.time && value) {
                date = formatISO(parseDate(`${formatDate(value, DEFAULT_FORMAT)} ${this.time}`, DEFAULT_DATE_TIME_FORMAT, new Date()));
            }

            this.__setState({
                key: 'scheduler',
                value: JSON.stringify({
                    ...this.schedulerConfiguration,
                    start: date,
                }),
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.startFieldKey,
                value: date,
            });
        },
        setTimeChange(value) {
            const {
                start,
            } = this.schedulerConfiguration;
            const strDate = `${formatDate(start ? parseISO(start) : new Date(), DEFAULT_FORMAT)} ${value}`;
            const date = formatISO(parseDate(strDate, DEFAULT_DATE_TIME_FORMAT, new Date()));

            this.__setState({
                key: 'scheduler',
                value: JSON.stringify({
                    ...this.schedulerConfiguration,
                    start: date,
                }),
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'time',
                value: date,
            });
        },
        setRecurrencyChange(value) {
            const [
                hour,
                minute,
            ] = value.split(':');
            const tmpScheduler = {
                ...this.schedulerConfiguration,
                hour: hour ? parseInt(hour, 10) : 0,
                minute: minute ? parseInt(minute, 10) : 0,
            };

            this.__setState({
                key: 'scheduler',
                value: JSON.stringify(tmpScheduler),
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.hourFieldKey,
                value,
            });
        },
    },
};
</script>
