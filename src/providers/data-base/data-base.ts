import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataBaseProvider {

  constructor(public storage: Storage) {
  }

  save(key: string, itens: any) {
    this.storage.set(key, itens);
  }

  get(key: string) {
    return this.storage.get(key);
  }

  remove(key: string) {
    this.storage.remove(key);
  }
}
