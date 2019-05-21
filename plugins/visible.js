export default {
    update(el, binding) {
        const { value } = binding;
        const element = el;

        if (value) element.style.visibility = 'visible';
        else element.style.visibility = 'hidden';
    },
};
