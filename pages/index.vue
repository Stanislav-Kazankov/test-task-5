<template lang="pug">
    .index-page
        h1.visually-hidden Каталог квартир
        the-search-result
        the-filter-bar
</template>

<script>
import $ from 'jquery';

export default {
    async asyncData({ store }) {
        await store.dispatch('homePageDataLoading');
    },
    mounted() {
        // скрипт подключается здесь, а не в nuxt.config.js для того,
        // чтобы при переходе с другого лэйаута в режиме no-lazy loading
        // блок "Поделиться" также загружался
        $('script[src=\'https://yastatic.net/share2/share.js\']')
            .remove();
        $('<script>', {
            src: 'https://yastatic.net/share2/share.js',
        }).appendTo('head');
    },
};
</script>

<style lang="scss" scoped>
.index-page {
    display: grid;
    grid-template-columns: 1019px 341px;
}
</style>
