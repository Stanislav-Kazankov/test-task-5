<template lang="pug">
    span.base-control(
        :class="{ 'is-visually-hidden': !caption }"
    )
        span.visually-hidden(v-if="description")
            | {{description}}
        span(
            v-if="caption"
            :aria-hidden="!!description"
        )
            | {{caption.text}}
</template>

<script>
import _ from 'lodash';
import { inject } from '@nuxtjs/composition-api';

export default {
    setup() {
        const outerStateDefault = {
            description: '',
            caption: '',
        };
        let outerControlState = inject(
            'outerControlState',
            outerStateDefault,
        );
        outerControlState = _.assign(
            outerStateDefault,
            outerControlState,
        );

        return outerControlState;
    },
};
</script>
