import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lenguage',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './lenguage.component.html',
  styleUrl: './lenguage.component.css'
})
export class LenguageComponent {

  translate: TranslateService = inject(TranslateService);

  changeLenguage(lenguage: number) {
    switch (lenguage) {
      case 0: {
        this.translate.use("es")
        break;
      }
      case 1: {
        this.translate.use("en")
        break;
      }
      case 2: {
        this.translate.use("pr")
        break;
      }
    }
  }

}
