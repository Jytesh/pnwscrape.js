import axios, { Axios } from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

declare module 'axios' {
  interface AxiosRequestConfig {
    jar?: CookieJar;
  }
}

class PNWClient {
  email: string;
  password: string;
  alliance: string;
  client: Axios;
  loggedIn: boolean;
  constructor(email: string, password: string, alliance: string) {
    this.email = email;
    this.password = password;
    this.alliance = alliance;
    const jar = new CookieJar();
    this.client = wrapper(axios.create({ jar }));
    this.loggedIn = false;
  }
  async login() {
    const res = await this.client.post('https://politicsandwar.com/login', {
      data: {
        email: this.email,
        password: this.password,
        loginform: 'Login',
      },
    });
    if (res.status == 200) this.loggedIn = true;
    else throw new Error('Invalid credentials');
  }
  async withdraw(
    receiver: string,
    receiverType: 'Alliance' | 'Nation',
    resources: Resources,
    note?: string,
  ): Promise<boolean> {
    if (!this.loggedIn) await this.login();
    const data: any = resources.serializeToForm()
    if (note) data.note = note
    data.withtype = receiverType
    data.withrecipient = receiver
    data.withsubmit = 'Withdraw'

    const res = await this.client.post(`https://politicsandwar.com/alliance/id=${this.alliance}&display=bank`, {
      data
    });
    return res.status == 200;
  }
}

class Resources {
  money: number;
  food: number;
  coal: number;
  oil: number;
  uranium: number;
  iron: number;
  bauxite: number;
  lead: number;
  gasoline: number;
  munitions: number;
  steel: number;
  aluminum: number;
  constructor() {
    this.money = 0;
    this.food = 0;
    this.money = 0;
    this.coal = 0;
    this.oil = 0;
    this.uranium = 0;
    this.iron = 0;
    this.bauxite = 0;
    this.lead = 0;
    this.gasoline = 0;
    this.munitions = 0;
    this.steel = 0;
    this.aluminum = 0;
  }
  serialize() {
    return {
      money: this.money,
      food: this.food,
      coal: this.coal,
      oil: this.oil,
      uranium: this.uranium,
      iron: this.iron,
      bauxite: this.bauxite,
      lead: this.lead,
      gasoline: this.gasoline,
      munitions: this.munitions,
      steel: this.steel,
      aluminum: this.aluminum,
    };
  }
  serializeToForm() {
    const obj = this.serialize();
    return Object.fromEntries(
      Object.entries(obj)
        .map(([key, value]) => {
          if (value == 0) return false;
          else return ['with' + key, value];
        })
        .filter(Boolean) as [string, number][],
    );
  }
  // functions to set each resource
  setMoney(amount: number) {
    this.money = amount;
  }
  setFood(amount: number) {
    this.food = amount;
  }
  setCoal(amount: number) {
    this.coal = amount;
  }
  setOil(amount: number) {
    this.oil = amount;
  }
  setUranium(amount: number) {
    this.uranium = amount;
  }
  setIron(amount: number) {
    this.iron = amount;
  }
  setBauxite(amount: number) {
    this.bauxite = amount;
  }
  setLead(amount: number) {
    this.lead = amount;
  }
  setGasoline(amount: number) {
    this.gasoline = amount;
  }
  setMunitions(amount: number) {
    this.munitions = amount;
  }
  setSteel(amount: number) {
    this.steel = amount;
  }
  setAluminum(amount: number) {
    this.aluminum = amount;
  }
}

export default PNWClient;
export { Resources };
