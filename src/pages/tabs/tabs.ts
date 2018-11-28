import { Component } from '@angular/core';
import { CompararPage } from '../comparar/comparar';
import { TotalPage } from '../total/total';
import { FavoritosPage } from '../favoritos/favoritos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CompararPage;
  tab2Root = TotalPage;
  tab3Root = FavoritosPage;

  constructor() {

  }
}
