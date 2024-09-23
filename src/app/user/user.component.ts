import { Component } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, RegisterComponent],
  templateUrl: './user.component.html',
  styles: ``
})
export class UserComponent {

}
