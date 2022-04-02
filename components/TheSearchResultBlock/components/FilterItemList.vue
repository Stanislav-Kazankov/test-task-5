<template lang="pug">
    ul(:class="'list list--filter-items'")
        li.list__item.filter-item(
            v-for="\
                (filterItemCaption, index)\
                    in selectedFilterItemCaptions\
            "
        )
            | {{filterItemCaption}}
</template>

<script>
export default {
    data() {
        return {
            selectedFilterItemCaptions: [
                'До 50 м²',
                'Готовое жилье',
                'Два санузла',
                'Балкон',
                'Дом сдан',
            ],
        };
    },
};
</script>
