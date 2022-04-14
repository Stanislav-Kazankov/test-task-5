<template lang="pug">
    ul(:class="'list list--filter-options'")
        li.filter-option(
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
