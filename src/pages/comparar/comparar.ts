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
      steam: null,
      site: null,
      div: null
    } 
  };

  private itens = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  addItem() {
    this.item.preco.div = (this.item.preco.steam * 0.85) / this.item.preco.site;
    this.itens.push({nome: this.item.nome, preco: {...this.item.preco}})
    this.itens.sort((a, b) => b.preco.div - a.preco.div);
  }

  clearItem() {
    this.item = {
      nome: "",
      preco: {
        steam: null,
        site: null,
        div: null
      } 
    }
  }

  removeItem(index) {
    this.itens.splice(index, 1);
  }
}
