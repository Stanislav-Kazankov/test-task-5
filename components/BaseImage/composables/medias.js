import _ from 'lodash';
import minBreakpoints from '@/modules/minBreakpoints';
import devices from '@/modules/devices';

export const useMedias = dimensions => _(minBreakpoints)
    .filter(
        (media, index) =>
            _(dimensions).has(devices[index]),
    )
    .map(
        minBreakpoint =>
            (minBreakpoint > 0)
                ? `(min-width: ${minBreakpoint}px)`
                : null,
    )
    .reverse()
    .value();

export default { useMedias };
