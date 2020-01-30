import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang-course-app';
  loadedFeature = 'recipe';
  OnNavigate(feature: string){
    this.loadedFeature = feature;
  }
}
