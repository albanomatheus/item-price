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

  private modo = "site";
  private itens = [];
  private item = {
    nome: "",
    preco: {
      steam: null,
      site: null,
      div: null
    } 
  };


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  calculate(item, modo) {
    if(modo == "steam") {
      item.preco.div = (item.preco.steam * 0.85) / item.preco.site;
    } else {
      item.preco.div = (item.preco.steam) / (item.preco.site * 0.8461);
    }

    return item;
  }

  order(modo) {
    if(modo == "steam") {
      this.itens.sort((a, b) => b.preco.div - a.preco.div);
    } else {
      this.itens.sort((a, b) => a.preco.div - b.preco.div);
    }
  }

  addItem() {
    this.calculate(this.item, this.modo);
    this.itens.push({nome: this.item.nome, preco: {...this.item.preco}})
    this.order(this.modo);
  }

  reDo() {
    this.itens = this.itens.map(item => {
      return this.calculate(item, this.modo)
    });
    this.order(this.modo);
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
