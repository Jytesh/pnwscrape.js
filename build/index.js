"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resources = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_cookiejar_support_1 = require("axios-cookiejar-support");
const tough_cookie_1 = require("tough-cookie");
class PNWClient {
    constructor(email, password, alliance) {
        this.email = email;
        this.password = password;
        this.alliance = alliance;
        const jar = new tough_cookie_1.CookieJar();
        this.client = (0, axios_cookiejar_support_1.wrapper)(axios_1.default.create({ jar }));
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
        if (res.status == 200)
            this.loggedIn = true;
        else
            throw new Error('Invalid credentials');
    }
    async withdraw(receiver, receiverType, resources, note) {
        if (!this.loggedIn)
            await this.login();
        const data = resources.serializeToForm();
        if (note)
            data.note = note;
        data.withtype = receiverType;
        data.withrecipient = receiver;
        data.withsubmit = 'Withdraw';
        const res = await this.client.post(`https://politicsandwar.com/alliance/id=${this.alliance}&display=bank`, {
            data
        });
        return res.status == 200;
    }
}
class Resources {
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
        return Object.fromEntries(Object.entries(obj)
            .map(([key, value]) => {
            if (value == 0)
                return false;
            else
                return ['with' + key, value];
        })
            .filter(Boolean));
    }
    // functions to set each resource
    setMoney(amount) {
        this.money = amount;
    }
    setFood(amount) {
        this.food = amount;
    }
    setCoal(amount) {
        this.coal = amount;
    }
    setOil(amount) {
        this.oil = amount;
    }
    setUranium(amount) {
        this.uranium = amount;
    }
    setIron(amount) {
        this.iron = amount;
    }
    setBauxite(amount) {
        this.bauxite = amount;
    }
    setLead(amount) {
        this.lead = amount;
    }
    setGasoline(amount) {
        this.gasoline = amount;
    }
    setMunitions(amount) {
        this.munitions = amount;
    }
    setSteel(amount) {
        this.steel = amount;
    }
    setAluminum(amount) {
        this.aluminum = amount;
    }
}
exports.Resources = Resources;
exports.default = PNWClient;
//# sourceMappingURL=index.js.map