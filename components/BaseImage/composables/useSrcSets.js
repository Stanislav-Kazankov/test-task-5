import _ from 'lodash';
import { ref } from '@nuxtjs/composition-api';
import get1xWidths from '../utils/get1xWidths';
import { createSrcSet, createRestSrcSets } from '../utils/srcSets';
import getRestSrcs from '../utils/getRestSrcs';
import devices from '@/modules/devices';

export default (image, dimensions) => {
    let zero1xWidth;
    if (dimensions[devices[0]]) {
        zero1xWidth = dimensions[devices[0]].x1Width;
    }
    const restDimensions = _(dimensions)
        .pickBy(
            (dimension, key) => key !== devices[0],
        )
        .value();
    const rest1xWidths = get1xWidths(restDimensions);
    const zeroNotWebpSrcSet = ref(
        dimensions[devices[0]]
            ? createSrcSet(
                _(image[devices[0]].notWebp)
                    .slice(1).value(),
                zero1xWidth,
            )
            : null,
    );
    const restNotWebpSrcSets = ref(
        _(
            createRestSrcSets(
                getRestSrcs(image, 'notWebp'),
                rest1xWidths,
            ),
        ).reverse().value(),
    );
    const zeroWebpSrcSet = ref(
        dimensions[devices[0]]
            ? [
                createSrcSet(
                    image[devices[0]].webp,
                    zero1xWidth,
                ),
            ]
            : [],
    );
    const webpSrcSets = ref(
        _(zeroWebpSrcSet.value)
            .concat(
                createRestSrcSets(
                    getRestSrcs(image, 'webp'),
                    rest1xWidths,
                ),
            )
            .reverse()
            .value(),
    );
    return {
        webpSrcSets,
        restNotWebpSrcSets,
        zeroNotWebpSrcSet,
    };
};
