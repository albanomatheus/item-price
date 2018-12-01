import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-comparar',
  templateUrl: 'comparar.html',
})
export class CompararPage {

  private itemAux;
  private editando;
  private modo;
  private itens;
  private item = {
    nome: "",
    preco: {
      steam: null,
      site: null,
      div: null
    }
  };


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage) {
  }

  ionViewDidLoad() {
    this.getModo();
    this.getItens();
  }

  calculate(item, modo) {
    if (modo == "steam") {
      item.preco.div = (item.preco.steam * 0.85) / item.preco.site;
    } else {
      item.preco.div = (item.preco.steam) / (item.preco.site * 0.8461);
    }

    return item;
  }

  order(modo) {
    if (modo == "steam") {
      this.itens.sort((a, b) => b.preco.div - a.preco.div);
    } else {
      this.itens.sort((a, b) => a.preco.div - b.preco.div);
    }
  }

  addItem() {
    this.calculate(this.item, this.modo);
    this.itens.push({nome: this.item.nome, preco: {...this.item.preco}})
    this.order(this.modo);
    this.save()
  }

  editItem() {
    this.editando = false;
    this.reDo()
  }

  cancelEdit() {
    this.editando = false;
    this.itens[this.itemAux.index] = {nome: this.itemAux.nome, preco: {...this.itemAux.preco}}
    this.save()
    this.clearItem();
  }

  placeItem(item, index) {
    this.editando = true;
    this.itemAux = {nome: item.nome, preco: {...item.preco}, index: index};
    this.item = item;
  }

  reDo() {
    this.itens = this.itens.map(item => {
      return this.calculate(item, this.modo)
    });
    this.order(this.modo);
    this.save();
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
    this.save();
  }

  save() {
    this.storage.set("itens", this.itens);
    this.storage.set("modo", this.modo);
  }

  getItens() {
    this.storage.get("itens").then(val => {
      this.itens = val ? val : [];
      this.reDo()
    })
  }

  getModo() {
    this.storage.get("modo").then(val => {
      this.modo = val ? val : "site";
    })
  }
}
