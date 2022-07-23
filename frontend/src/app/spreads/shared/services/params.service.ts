import { Injectable } from '@angular/core';
import { SpreadParams } from '../models/spread-params.model';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {
  saveParams = (params: SpreadParams) => {
    const saved = this.getParams();
    const toSave = {
      dates: params.dates || saved?.dates || null,
      spreads: params.spreads || saved?.spreads || null,
      settings: params.settings || saved?.settings || null,
    };
    localStorage.setItem('di-spreads-params', JSON.stringify(toSave));
  }

  getParams = (): SpreadParams | null => {
    const data = localStorage.getItem('di-spreads-params');
    return data ? JSON.parse(data) as SpreadParams : null;
  }
}

