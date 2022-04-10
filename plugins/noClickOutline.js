import $ from 'jquery';

export default () => {
    if (process.client) {
        let isFocusWithTab = false;

        const $document = $(document);

        $document.on('keydown', ({ key }) => {
            if (key === 'Tab') {
                isFocusWithTab = true;
            }
        });

        $document.on('mousedown', ({ target }) => {
            const $activeElement = $(':focus');
            if ($activeElement.has(target)) {
                $activeElement.css('outline', 'none');
            }
            isFocusWithTab = false;
        });

        $document.on('focusin', ({ target }) => {
            const $target = $(target);
            if (isFocusWithTab) {
                if ($target.prop('tagName') !== 'INPUT') {
                    $target.css(
                        'outline',
                        '2px solid #a5a5a5',
                    );
                } else {
                    $(`label[for=${$target.attr('id')}]`)
                        .css('outline', '2px solid #a5a5a5');
                }
            } else {
                $target.css('outline', 'none');
            }
        });

        $document.on('blur', '*', ({ target }) => {
            const $target = $(target);
            if ($target.prop('tagName') !== 'INPUT') {
                $target.css('outline', 'none');
            } else {
                $(`label[for=${$target.attr('id')}]`)
                    .css('outline', 'none');
            }
        });
    }
};
