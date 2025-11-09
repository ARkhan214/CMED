import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navber } from "./layout/navber/navber";
import { Footer } from "./layout/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navber, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'prescription_management';
}
