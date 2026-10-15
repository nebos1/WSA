class BaseSymbol {
    constructor(symbol) {
        this.symbol = String(symbol);
    }
    toUpper() {
        this.symbol = this.symbol.toUpperCase();
    }
    toLower() {
        this.symbol = this.symbol.toLowerCase();
    }
    print() {
        console.log(this.symbol);
    }
    getType() {
        return 'BaseSymbol';
    }
}
export default BaseSymbol;
