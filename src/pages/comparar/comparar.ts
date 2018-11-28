import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CompararPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comparar',
  templateUrl: 'comparar.html',
})
export class CompararPage {

  private item = {
    nome: "",
    preco: {
      steam: "",
      site: ""
    }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  addItem() {
    console.log(this.item);
  }

}
