import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, Modal} from 'ionic-angular';
import { DataBaseProvider } from '../../providers/data-base/data-base';

@IonicPage()
@Component({
  selector: 'page-comparar',
  templateUrl: 'comparar.html',
  providers: [
    DataBaseProvider
  ]
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
              private modal: ModalController,
              private dataBase: DataBaseProvider) {
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
    this.dataBase.save("itens", this.itens);
    this.dataBase.save("modo", this.modo);
  }

  getItens() {
    this.dataBase.get("itens").then(val => {
      this.itens = val ? val : [];
      this.reDo()
    })
  }

  getModo() {
    this.dataBase.get("modo").then(val => {
      this.modo = val ? val : "site";
    })
  }

  openModal(i) {
    const myModal: Modal = this.modal.create("ModalPage", {data: this.itens[i]});
    myModal.present();
    myModal.onDidDismiss(data => {
      console.log(data)
      this.itens[i] = {nome: data.nome, preco: {...data.preco}};
      this.calculate(this.itens[i], this.modo)
      this.save()
    })
  }
}
