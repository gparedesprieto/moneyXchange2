/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `

    <nav class="navbar navbar-default" style="margin-top: 0px;">
      <div class="text-center" style="margin-bottom: 5px;">
        <h1>Money Xchange</h1>
        <!--img alt="Brand" height="40" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAB+0lEQVR4AcyYg5LkUBhG+1X2PdZGaW3btm3btm3bHttWrPomd1r/2Jn/VJ02TpxcH4CQ/dsuazWgzbIdrm9dZVd4pBz4zx2igTaFHrhvjneVXNHCSqIlFEjiwMyyyOBilRgGSqLNF1jnwNQdIvAt48C3IlBmHCiLQHC2zoHDu6zG1iXn6+y62ScxY9AODO6w0pvAqf23oSE4joOfH6OxfMoRnoGUm+de8wykbFt6wZtA07QwtNOqKh3ZbS3Wzz2F+1c/QJY0UCJ/J3kXWJfv7VhxCRRV1jGw7XI+gcO7rEFFRvdYxydwcPsVsC0bQdKScngt4iUTD4Fy/8p7PoHzRu1DclwmgmiqgUXjD3oTKHbAt869qdJ7l98jNTEblPTkXMwetpvnftA0LLHb4X8kiY9Kx6Q+W7wJtG0HR7fdrtYz+x7iya0vkEtUULIzCjC21wY+W/GYXusRH5kGytWTLxgEEhePPwhKYb7EK3BQuxWwTBuUkd3X8goUn6fMHLyTT+DCsQdAEXNzSMeVPAJHdF2DmH8poCREp3uwm7HsGq9J9q69iuunX6EgrwQVObjpBt8z6rdPfvE8kiiyhsvHnomrQx6BxYUyYiNS8f75H1w4/ISepDZLoDhNJ9cdNUquhRsv+6EP9oNH7Iff2A9g8h8CLt1gH0Qf9NMQAFnO60BJFQe0AAAAAElFTkSuQmCC"-->

        <img alt="Brand" height="100" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDM5NC42NTMgMzk0LjY1MyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzk0LjY1MyAzOTQuNjUzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGQ9Ik0xODAuMjU2LDI1MC45OTJjLTkuNTk2LTIuNTg0LTE4LjE4Ni03LjMxMi0yNC4xODgtMTMuMzFjLTIuNTk4LTIuNTkzLTYuMDUxLTQuMDIxLTkuNzIzLTQuMDIxICAgICBjLTMuNjcyLDAtNy4xMjUsMS40MzEtOS43MjUsNC4wMjZsLTEuMDUxLDEuMDVjLTIuNTksMi41ODctNC4wNTksNi4xNzMtNC4wMzMsOS44NGMwLjAyOSwzLjY2MSwxLjU1NSw3LjIyNCw0LjE4OCw5Ljc3NCAgICAgYzExLjcxMywxMS4zNDYsMjguMjU4LDE5LjU0OSw0NS4zOTMsMjIuNTA0bDEuNjYsMC4yODd2MTIuOTg3YzAsNy41ODQsNi4xNywxMy43NTYsMTMuNzU2LDEzLjc1NmgxLjU1OSAgICAgYzcuNTg0LDAsMTMuNzU0LTYuMTcyLDEzLjc1NC0xMy43NTZWMjgwLjg0bDEuNjI3LTAuMzA5YzI4LjQ0MS01LjQxNSw0NS40MjQtMjMuMTkxLDQ1LjQyNC00Ny41MzMgICAgIGMwLjI0OC0zMy4xMDMtMjQuMjcxLTQ1LjE4Ny00NS42NTYtNTIuMDE2bC0xLjM5NS0wLjQ0NFYxMzUuOTVsMi40MywwLjUzMWM2LjMwNSwxLjM3OSwxMS45MzQsMy40ODYsMTYuMjc5LDYuMDk2ICAgICBjMi4xNDEsMS4yODIsNC41ODIsMS45NTksNy4wNjQsMS45NTljNC43ODEsMCw5LjE0NS0yLjQxNywxMS42NzYtNi40NjdsMC42OTctMS4xMTdjMS45MzgtMy4xMDIsMi41NjItNi45MiwxLjcxNS0xMC40NzMgICAgIGMtMC44NDgtMy41NTktMy4xMjktNi42ODctNi4yNTgtOC41ODFjLTguNzY4LTUuMzA1LTIwLjA5OC05LjIyMi0zMS45MDYtMTEuMDI4bC0xLjY5Ny0wLjI2di05LjgyICAgICBjMC03LjU4NS02LjE3LTEzLjc1Ny0xMy43NTQtMTMuNzU3aC0xLjU1OWMtNy41ODYsMC0xMy43NTYsNi4xNzEtMTMuNzU2LDEzLjc1N3YxMC41NDhsLTEuNjA1LDAuMzI0ICAgICBjLTI2LjI4Myw1LjMwMS00MS45NzUsMjEuNzkxLTQxLjk3NSw0NC4xMDljMCwyMy44ODksMTMuODExLDQwLjE4Miw0Mi4yMjMsNDkuODEybDEuMzU3LDAuNDZ2NDkuNjI2TDE4MC4yNTYsMjUwLjk5MnogICAgICBNMjExLjg0NiwyMTEuMzNsMi44MDcsMS4yMjljMTEuMTQ2LDQuODkxLDE1LjI2MiwxMC4zNzUsMTUuMTc2LDIwLjI2M2MwLDguMjM1LTUuMTY2LDE0LjEwNy0xNS4zNTUsMTcuNDU2bC0yLjYyNSwwLjg2ICAgICBMMjExLjg0NiwyMTEuMzNMMjExLjg0NiwyMTEuMzN6IE0xNzkuODMzLDE2OS4yNjZjLTguMzI2LTQuNDQ4LTExLjU3LTkuMzUzLTExLjU3LTE3LjQ5NGMwLTYuMTg4LDMuOTc5LTEwLjc5MiwxMS44MjItMTMuNjg0ICAgICBsMi42OTEtMC45OTN2MzMuNzQyTDE3OS44MzMsMTY5LjI2NnoiIGZpbGw9IiNGRkZGRkYiLz4KCQkJPHBhdGggZD0iTTM4OS44MzQsNzUuODU4Yy00LjA1NS0zLjI0NC05LjY2NC0zLjcyNi0xNC4yMTUtMS4yMjFsLTI3LjAyNSwxNC44ODJDMzE0Ljk2OSwzNy44NTMsMjU3LjUzMSw2LjMyNywxOTUuMjE3LDYuMzI3ICAgICBjLTEwMC45MDYsMC0xODMsODIuMDkzLTE4MywxODNjMCwxMS4wNDYsOC45NTUsMjAsMjAsMjBjMTEuMDQ3LDAsMjAtOC45NTQsMjAtMjBjMC03OC44NTEsNjQuMTUtMTQzLDE0My0xNDMgICAgIGM0Ny42OTMsMCw5MS43NDgsMjMuNjI5LDExOC4yMzQsNjIuNTQzbC0yNS4zMTQsMTMuOTM5Yy00LjU0OSwyLjUwNS03LjE0MSw3LjUwMy02LjU2NCwxMi42NjUgICAgIGMwLjU3MSw1LjE2MSw0LjE5OSw5LjQ2OSw5LjE4OCwxMC45MTRsNjcuODI4LDE5LjY1NWMxLjE3MiwwLjM0LDIuMzczLDAuNTA3LDMuNTcyLDAuNTA3YzIuMTQ2LDAsNC4yNzktMC41MzgsNi4xOTItMS41OTIgICAgIGMyLjk4MS0xLjY0Myw1LjE5LTQuNDAzLDYuMTQtNy42NzNsMTkuNjU0LTY3LjgyOEMzOTUuNTksODQuNDY5LDM5My44ODksNzkuMTAyLDM4OS44MzQsNzUuODU4eiIgZmlsbD0iI0ZGRkZGRiIvPgoJCQk8cGF0aCBkPSJNMzYyLjQzNiwxODUuMzI3Yy0xMS4wNDcsMC0yMCw4Ljk1NC0yMCwyMGMwLDc4Ljg1Mi02NC4xNDksMTQzLTE0My4wMDEsMTQzYy00Ny42OTIsMC05MS43NDgtMjMuNjI5LTExOC4yMzMtNjIuNTQzICAgICBsMjUuMzE0LTEzLjkzOWM0LjU0OS0yLjUwNCw3LjE0MS03LjUwMiw2LjU2Ni0xMi42NjRjLTAuNTcyLTUuMTYxLTQuMTk5LTkuNDctOS4xODgtMTAuOTEzbC02Ny44MjctMTkuNjU1ICAgICBjLTEuMTcyLTAuMzQxLTIuMzczLTAuNTA3LTMuNTcyLTAuNTA3Yy0yLjE0NiwwLTQuMjc5LDAuNTM3LTYuMTkzLDEuNTkyYy0yLjk4MiwxLjY0My01LjE5MSw0LjQwMi02LjEzOSw3LjY3M0wwLjUwOCwzMDUuMTk4ICAgICBjLTEuNDQ1LDQuOTg3LDAuMjU2LDEwLjM1NCw0LjMxMSwxMy41OTljNC4wNTUsMy4yNDQsOS42NjQsMy43MjgsMTQuMjE1LDEuMjIybDI3LjAyNS0xNC44ODIgICAgIGMzMy42MjQsNTEuNjY0LDkxLjA2Miw4My4xOSwxNTMuMzc1LDgzLjE5YzEwMC45MDYsMCwxODMuMDAxLTgyLjA5MywxODMuMDAxLTE4MyAgICAgQzM4Mi40MzYsMTk0LjI4MSwzNzMuNDgsMTg1LjMyNywzNjIuNDM2LDE4NS4zMjd6IiBmaWxsPSIjRkZGRkZGIi8+CgkJPC9nPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
        
      </div>
    </nav>

    <div class="col-md-12" style="margin-bottom: 15px;">

      <div class="col-md-2 col-md-offset-3">

        <ul class="nav nav-pills">
          <li role="presentation" class="active">
            <a [routerLink]=" ['./home'] "
              routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
              Home
            </a>
          </li>
        </ul>

      </div>

      <div class="col-md-2">
        <ul class="nav nav-pills">
          <li role="presentation">
            <a [routerLink]=" ['./detail'] "
            routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
            Products
          </a>
          </li>
        </ul>
      </div>

      <div class="col-md-2">
        <ul class="nav nav-pills">
          <li role="presentation">
            <a [routerLink]=" ['./barrel'] "
            routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
            Services
          </a>
          </li>
        </ul>

      </div>
    
    </div>

    <!--div class="text-center">
      <nav>
        <a [routerLink]=" ['./home'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Inicio
        </a>
        <a [routerLink]=" ['./detail'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Productos
        </a>
        <a [routerLink]=" ['./barrel'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Servicios
        </a>
        <a [routerLink]=" ['./about'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Acerca de nosotros
        </a>
      </nav>
    </div-->

    <main>
      <router-outlet></router-outlet>
    </main>

    <!--pre class="app-state">this.appState.state = {{ appState.state | json }}</pre-->

    <!--div class="col-md-12" style="margin-left: 0px auto;"-->

    <footer>
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-sm-6 footerleft ">
            <div class="logofooter"> Logo</div>
            <p>Gianella Yaiza Jazmin Gianella Yaiza Jazmin Gianella Yaiza Jazmin Gianella Yaiza Jazmin Gianella Yaiza Jazmin Gianella Yaiza Jazmin Gianella Yaiza Jazmin Gianella Yaiza Jazmin.</p>
            <p><i class="fa fa-map-pin"></i> 428, Constructores, Las Acacias de Monterrico, Lima - 12, PERU</p>
            <p><i class="fa fa-phone"></i> celular (Per&uacute;) : +51 989 188 232</p>
            <p><i class="fa fa-envelope"></i> E-mail : gparedes@moneyxchange.com</p>
            
          </div>
          <div class="col-md-2 col-sm-6 paddingtop-bottom">
            <h6 class="heading7">SECTION</h6>
            <ul class="footer-ul">
              <li><a href="#"> Gianella victoria</a></li>
              <li><a href="#"> Yaiza Almendra</a></li>
              <li><a href="#"> Jazmin Alexandra</a></li>
              <li><a href="#"> Gianella</a></li>
              <li><a href="#"> Yaiza</a></li>
              <li><a href="#"> Jazmin</a></li>
              <li><a href="#"> Gianella</a></li>
            </ul>
          </div>
          <div class="col-md-3 col-sm-6 paddingtop-bottom">
            <h6 class="heading7">LATEST POST</h6>
            <div class="post">
              <p>Gianella Yaiza Jazmin Gianella Yaiza Jazmin Gianella Yaiza Jazmin <span>August 16,2017</span></p>
              <p>Gianella Yaiza Jazmin Gianella Yaiza Jazmin Gianella Yaiza Jazmin <span>August 13,2017</span></p>
              <p>Gianella Yaiza Jazmin Gianella Yaiza Jazmin Gianella Yaiza Jazmin <span>August 10,2017</span></p>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 paddingtop-bottom">

            <div class="fb-page" data-href="https://www.facebook.com/facebook" data-tabs="timeline" data-height="300" data-small-header="false" style="margin-bottom:15px;" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
              <div class="fb-xfbml-parse-ignore">
                <blockquote cite="https://www.facebook.com/facebook"><a href="#">Youtube</a></blockquote>
              </div>
            </div>

            <div class="fb-page" data-href="https://www.facebook.com/facebook" data-tabs="timeline" data-height="300" data-small-header="false" style="margin-bottom:15px;" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
              <div class="fb-xfbml-parse-ignore">
                <blockquote cite="https://www.facebook.com/facebook"><a href="#">Facebook</a></blockquote>
              </div>
            </div>

            <div class="fb-page" data-href="https://www.facebook.com/facebook" data-tabs="timeline" data-height="300" data-small-header="false" style="margin-bottom:15px;" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
              <div class="fb-xfbml-parse-ignore">
                <blockquote cite="https://www.facebook.com/facebook"><a href="#">Twitter</a></blockquote>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>

    <div class="copyright">
      <div class="container">
        <div class="col-md-6">
          <p>© 2017 - All Rights with MoneyXchange</p>
        </div>
        <div class="col-md-6">
          <ul class="bottom_ul">
            <li><a href="#">moneyxchange.io</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Faq's</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Site Map</a></li>
          </ul>
        </div>
      </div>
    </div>

  `
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
