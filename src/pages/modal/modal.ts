import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  private itemAux;
  private item = {
    nome: "",
    preco: {
      steam: null,
      site: null,
      div: null
    }
  };

  constructor(public navParams: NavParams, private view: ViewController) {
  }

  ionViewWillLoad() {
    this.item = this.navParams.get('data');
    this.itemAux = {nome: this.item.nome, preco: {...this.item.preco}}
  }

  closeModal() {
    this.view.dismiss(this.itemAux);
  }

  editItem() {
    this.view.dismiss(this.item);
  }
}
