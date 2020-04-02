import { Component, Vue } from 'vue-property-decorator';
import WithRender from './support.html';

@WithRender

@Component({})
export default class Support extends Vue {
    data() {
        return {
            text: 'This is support page',
        }
    };
};