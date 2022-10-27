import Vue from "vue";
import Vuetify from 'vuetify/lib'
import { Resize, Touch } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
    directives: {
        Resize,
        Touch,
    },
})

export default new Vuetify({
    icons: {
        iconfont: 'mdiSvg',
    },
    theme: {
        themes: {
            light: {
                primary: '#ff0000',
            },
        },
    },
})
