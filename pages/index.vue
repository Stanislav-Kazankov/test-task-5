<template lang="pug">
    .index-page
        h1.visually-hidden Каталог планировок
        the-search-result-block
        the-filter-bar
</template>

<script>
export default {
    async asyncData({ store }) {
        await store.dispatch('homePageDataLoading');
    },
};
</script>

<style lang="scss" scoped>
.index-page {
    display: grid;
    grid-template-columns: 1019px 341px;
}
</style>
