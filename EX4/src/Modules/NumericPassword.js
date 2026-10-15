import Digit from './Digit.js';
class NumericPassword {
    constructor(password = '') {
        this.symbols = [];
        this.setPassword(password);
    }
    setPassword(password) {
        if (typeof password !== 'string' || !/^[0-9]*$/.test(password)) {
            throw new Error('Invalid characters for NumericPassword.');
        }
        this.symbols = [];
        for (const symbol of password) {
            this.symbols.push(new Digit(symbol));
        }
    }
    toString() {
        return this.symbols.map((symbol) => symbol.symbol).join('');
    }
    print() {
        console.log(this.toString());
    }
    getType() {
        return 'NumericPassword';
    }
}
export default NumericPassword;
