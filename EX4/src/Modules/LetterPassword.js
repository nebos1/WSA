import Letter from './Letter.js';
class LetterPassword {
    constructor(password = '') {
        this.symbols = [];
        this.setPassword(password);
    }
    setPassword(password) {
        if (typeof password !== 'string' || !/^[a-zA-Z]*$/.test(password)) {
            throw new Error('Invalid characters for LetterPassword.');
        }
        this.symbols = [];
        for (const symbol of password) {
            this.symbols.push(new Letter(symbol));
        }
    }
    toString() {
        return this.symbols.map((symbol) => symbol.symbol).join('');
    }
    print() {
        console.log(this.toString());
    }
    getType() {
        return 'LetterPassword';
    }
}
export default LetterPassword;
