<template lang="pug">
    ul.list--apartment-layout
        li.list__item(
            v-for="(layout, index) in apartmentLayouts"
        )
            article.list__apartment-layout-card
                apartment-layout-image()
                h3.list__h3
                p.list__p
                p.list__p
</template>

<script>
export default {
    data() {
        return {
            apartmentLayouts: [
                {
                    image: {
                        desktop: {
                            notWebp: [

                            ],
                            webp: [

                            ],
                        },
                    },
                    type: 'Студия',
                    area: 27,
                    apartmentCount: 12,
                    minPrice: 3.5,
                },
                {
                    type: 'Студия',
                    area: 27,
                    apartmentCount: 12,
                    minPrice: 3.5,
                },
                {
                    type: 'Студия',
                    area: 27,
                    apartmentCount: 12,
                    minPrice: 3.5,
                },
                {
                    type: 'Студия',
                    area: 27,
                    apartmentCount: 12,
                    minPrice: 3.5,
                },
                {
                    type: 'Студия',
                    area: 27,
                    apartmentCount: 12,
                    minPrice: 3.5,
                },
                {
                    type: 'Студия',
                    area: 27,
                    apartmentCount: 12,
                    minPrice: 3.5,
                },
                {
                    type: 'Студия',
                    area: 27,
                    apartmentCount: 12,
                    minPrice: 3.5,
                },
                {
                    type: 'Студия',
                    area: 27,
                    apartmentCount: 12,
                    minPrice: 3.5,
                },
                {
                    type: 'Студия',
                    area: 27,
                    apartmentCount: 12,
                    minPrice: 3.5,
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.list--apartment-layout {
    row-gap: 17px;
    column-gap: 8px;
    width: 975px;
}
</style>
