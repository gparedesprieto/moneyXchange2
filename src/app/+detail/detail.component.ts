import {
  Component,
  OnInit,
} from '@angular/core';
/**
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Detail` component loaded asynchronously');

@Component({
  selector: 'detail',
  template: `

    <div class="menufix2">
      <h2>&nbsp;</h2>
    </div>

    <div class="container">
      <div class="panel panel-danger">
        <div class="panel-heading">Products</div>
        <div class="panel-body">
          Detalle
        </div>
      </div>
    </div>

    <!--h1>Hello from Detail</h1>
    <span>
      <a [routerLink]=" ['./child-detail'] ">
        Child Detail
      </a>
    </span>
    <router-outlet></router-outlet-->
  `,
})
export class DetailComponent implements OnInit {

  public ngOnInit() {
    console.log('hello `Detail` component');
  }

}
