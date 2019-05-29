<template>
    <span v-text="txt" />
</template>

<script>
export default {
    name: 'Typer',
    props: {
        value: {
            type: [Array],
            required: true,
        },
    },
    data() {
        return {
            loopNum: 0,
            period: 1000,
            txt: '',
            isDeleting: false,
            ticker: null,
        };
    },
    created() {
        this.tick();
    },
    destroyed() {
        clearTimeout(this.ticker);
    },
    methods: {
        tick() {
            const i = this.loopNum % this.value.length;
            const { [i]: currentWord } = this.value;

            if (this.isDeleting) {
                this.txt = currentWord.substring(0, this.txt.length - 1);
            } else {
                this.txt = currentWord.substring(0, this.txt.length + 1);
            }
            let delta = 200 - Math.random() * 100;

            if (this.isDeleting) delta /= 2;

            if (!this.isDeleting && this.txt === currentWord) {
                delta = this.period;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum += 1;
                delta = 500;
            }

            this.ticker = setTimeout(() => {
                this.tick();
            }, delta);
        },
    },
};
</script>
