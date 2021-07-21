/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Channels.channel.components.SchedulerForm.title')"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :disabled="!isAllowedToUpdate"
        :errors="errors"
        :change-values="changeValues"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <Toggler
                    :value="isActive"
                    :label="$t('@Channels.channel.components.SchedulerForm.activeLabel')"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors[activeFieldKey]"
                    @input="setIsActiveValue" />
                <Divider />
            </FormSection>
            <FormSection :title="$t('@Channels.channel.components.SchedulerForm.timeRangeSectionTitle')">
                <DatePicker
                    :value="date"
                    :placeholder="format"
                    :format="format"
                    :disabled="!isAllowedToUpdate || !isActive"
                    :error-messages="errors[startFieldKey]"
                    disabled-past
                    required
                    :label="$t('@Channels.channel.components.SchedulerForm.startDateLabel')"
                    @input="setDateChange" />
                <TextField
                    :value="time"
                    :disabled="!isAllowedToUpdate || !isActive"
                    :input="timeInputType"
                    :error-messages="errors[startFieldKey]"
                    required
                    :label="$t('@Channels.channel.components.SchedulerForm.startTimeLabel')"
                    @input="setTimeChange" />
                <Divider />
            </FormSection>
            <FormSubsection :title="$t('@Channels.channel.components.SchedulerForm.recurrenceTimeSectionTitle')">
                <Paragraph
                    class="scheduler-form-paragraph"
                    :title="formParagraphTitle" />
            </FormSubsection>
            <FormSection :columns="2">
                <TextField
                    :value="hour"
                    :disabled="!isAllowedToUpdate || !isActive"
                    :error-messages="errors[hourFieldKey]"
                    required
                    :label="$t('@Channels.channel.components.SchedulerForm.hoursLabel')"
                    v-mask="'#########'"
                    @input="setHourChange" />
                <TextField
                    :value="minute"
                    :disabled="!isAllowedToUpdate || !isActive"
                    :error-messages="errors[minuteFieldKey]"
                    required
                    :label="$t('@Channels.channel.components.SchedulerForm.minutesLabel')"
                    v-mask="minuteMask"
                    @input="setMinuteChange" />
            </FormSection>
            <FormSection v-if="isInformation">
                <Divider />
                <Paragraph
                    class="scheduler-form-paragraph"
                    :title="formParagraphInformation">
                    <template #prepend>
                        <IconInfo
                            :fill-color="blueColor"
                            :width="20"
                            :height="20" />
                    </template>
                    <template #recurrence>
                        <b v-text="recurrenceInfo" />
                    </template>
                    <template #dateTime>
                        <b v-text="dataTime" />
                    </template>
                </Paragraph>
            </FormSection>
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Channels/config/privileges';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import {
    BLUE,
} from '@UI/assets/scss/_js-variables/colors.scss';
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
        blueColor() {
            return BLUE;
        },
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
        hour() {
            const {
                hour,
            } = this.schedulerConfiguration;

            return hour;
        },
        minute() {
            const {
                minute,
            } = this.schedulerConfiguration;

            return minute;
        },
        minuteMask() {
            return [
                /[0-5]/,
                /[0-9]/,
            ];
        },
        dataTime() {
            const {
                start,
            } = this.schedulerConfiguration;

            return start ? formatDate(parseISO(start), DEFAULT_DATE_TIME_FORMAT) : null;
        },
        recurrenceInfo() {
            if (this.timeInfo) {
                return this.timeInfo;
            }

            return this.$t('@Channels.channel.components.SchedulerForm.oneTimeRecurrenceInfo');
        },
        timeInfo() {
            const {
                hour,
                minute,
            } = this.schedulerConfiguration;

            let tmpHour = '';
            let tmpMinute = '';

            if (hour) {
                tmpHour = `${hour} h`;
            }

            if (minute) {
                tmpMinute = `${minute} min`;
            }

            if (!tmpHour && !tmpMinute) {
                return null;
            }

            return `${tmpHour} ${tmpMinute}`;
        },
        isInformation() {
            const {
                active,
                start,
                hour,
                minute,
            } = this.schedulerConfiguration;

            return active && start && !(!hour && !minute);
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
        minuteFieldKey() {
            return 'minute';
        },
        formParagraphTitle() {
            return this.$t('@Channels.channel.components.SchedulerForm.paragraphTitle');
        },
        formParagraphInformation() {
            if (this.timeInfo) {
                return this.$t('@Channels.channel.components.SchedulerForm.paragraphTimeInfo');
            }

            return this.$t('@Channels.channel.components.SchedulerForm.paragraphInfo');
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
            if (value) {
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
            }
        },
        setHourChange(value) {
            const tmpScheduler = {
                ...this.schedulerConfiguration,
                hour: parseInt(value, 10),
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
        setMinuteChange(value) {
            const tmpScheduler = {
                ...this.schedulerConfiguration,
                minute: parseInt(value, 10),
            };

            this.__setState({
                key: 'scheduler',
                value: JSON.stringify(tmpScheduler),
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.minuteFieldKey,
                value,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .scheduler-form-paragraph {
        font: $FONT_MEDIUM_12_16;
    }
</style>
