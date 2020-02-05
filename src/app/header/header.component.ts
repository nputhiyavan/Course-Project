import {Component, EventEmitter, Output} from '@angular/core'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    @Output() FeatureLoaded = new EventEmitter<string>();
    onSelect(Feature: string){
        this.FeatureLoaded.emit(Feature);
    }
}