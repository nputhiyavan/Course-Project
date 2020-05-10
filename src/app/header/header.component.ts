import {Component, OnInit, OnDestroy} from '@angular/core'
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    // @Output() FeatureLoaded = new EventEmitter<string>();
    // onSelect(Feature: string){
    //     this.FeatureLoaded.emit(Feature);
    // }
    private userSub : Subscription;
    isAuthenticated = false;
    constructor(private dataStorageService : DataStorageService, private authService : AuthService){

    }
    ngOnInit(){
      this.userSub = this.authService.user.subscribe(user => {
        //this.isAuthenticated = !user ? false : true;
        this.isAuthenticated = !!user;
      });
    }
    onLogout(){
      this.authService.logout();
    }
    ngOnDestroy(){
      this.userSub.unsubscribe();
    }
    onSaveData(){
      this.dataStorageService.storeRecipes();
    }
    onFetchData(){
      this.dataStorageService.fetchRecipes().subscribe();
    }
}
