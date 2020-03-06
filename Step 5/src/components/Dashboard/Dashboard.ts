import { Component, Vue } from 'vue-property-decorator';
import WithRender from './dashboard.html';

@WithRender

@Component
export default class Dashboard extends Vue {

}

// @Component({})
// export default class DashboardTypeScript extends Vue {
//   data(){
//     return {
//       text: 'I\'m an alligator!'
//     }
//   };

//   baz(){
//     console.log('clicked!');
//   }
// };