import { Axios } from 'axios';
import { CookieJar } from 'tough-cookie';
declare module 'axios' {
    interface AxiosRequestConfig {
        jar?: CookieJar;
    }
}
declare class PNWClient {
    email: string;
    password: string;
    alliance: string;
    client: Axios;
    loggedIn: boolean;
    constructor(email: string, password: string, alliance: string);
    login(): Promise<void>;
    withdraw(receiver: string, receiverType: 'Alliance' | 'Nation', resources: Resources, note?: string): Promise<boolean>;
}
declare class Resources {
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
    constructor();
    serialize(): {
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
    };
    serializeToForm(): {
        [k: string]: number;
    };
    setMoney(amount: number): void;
    setFood(amount: number): void;
    setCoal(amount: number): void;
    setOil(amount: number): void;
    setUranium(amount: number): void;
    setIron(amount: number): void;
    setBauxite(amount: number): void;
    setLead(amount: number): void;
    setGasoline(amount: number): void;
    setMunitions(amount: number): void;
    setSteel(amount: number): void;
    setAluminum(amount: number): void;
}
export default PNWClient;
export { Resources };
//# sourceMappingURL=index.d.ts.map