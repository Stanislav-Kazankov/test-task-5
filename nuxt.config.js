const isProduction = process.env.NODE_ENV === 'production';
const API_URL = '/img'; // 'http://localhost:1337';

export default {
    ssr: true,
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                // include: [path.resolve(__dirname, 'yourAppPath')],
                exclude: [/node_modules/, /bower_components/],
            },
        ],
    },

    target: 'server',

    env: {
        baseURL: API_URL,
        appURL: 'http://localhost:3000',
    },

    render: {
        bundleRenderer: {
            shouldPreload: (file, type) => {
                return ['script', 'style', 'font'].includes(type); // чтобы шрифты тоже в head добавлял (link preload)
            },
        },

        // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-render#http2
        http2: {
            push: true,
            pushAssets: (req, res, publicPath, preloadFiles) => {
                return preloadFiles
                    // .filter(f => f.asType === 'script' && f.file === 'runtime.js')
                    .map(
                        f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}` +
                            f.asType === 'font'
                            ? ' crossorigin;'
                            : '',
                    );
            },
        },
    },
    head: {
        title: 'ГК Железно',
        htmlAttrs: {
            lang: 'ru',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, height=device-height, user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1' },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'theme-color', content: '#131313' },
        ],
        link: [
            { rel: 'shortcut icon', type: 'image/png', href: '/img/favicon.png' },
        ],
    },

    loading: {
        color: '#000',
        failedColor: '#e33b3b',
        height: '3px',
    },

    styleResources: {
        scss: [
            '~/assets/scss/_variables.scss',
            '~/assets/scss/_mixins.scss',
        ],
    },

    css: [
        '@/assets/scss/main.scss',
    ],

    plugins: [
        '@/plugins/noClickOutline.js',
    ],

    components: true,

    buildModules: isProduction
        ? ['@nuxtjs/composition-api/module']
        : [
            '@nuxtjs/eslint-module',
            '@nuxtjs/stylelint-module',
            '@nuxtjs/composition-api/module',
        ],

    modules: [
        '@nuxtjs/markdownit',
        '@nuxtjs/style-resources',
        '@nuxtjs/axios',
    ],

    axios: {
        baseURL: API_URL,
    },

    markdownit: {
        runtime: true,
    },

    build: {
        transpile: [
            'vee-validate/dist/rules',
        ],
        terser: {
            parallel: !isProduction, // настройка для хостинга, иначе сборка падает
        },
    },

    router: {
        linkActiveClass: 'is-active',
        linkExactActiveClass: 'is-active-exact',
        prefetchLinks: false,
    },
    generate: {
        exclude: [
            '/biography', '/paintings', '/creativity',
        ],
    },
};
