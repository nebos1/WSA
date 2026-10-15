import NumericPassword from './NumericPassword.js';
import LetterPassword from './LetterPassword.js';

function generatePassord(length, type) {
    if (!Number.isInteger(length) || length < 1) {
        throw new Error('Length must be a positive integer.');
    }
    if (type !== 'digits' && type !== 'letters') {
        throw new Error('Choose digits or letters.');
    }
    let characters = '0123456789';
    if (type === 'letters') {
        characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }
    if (type === 'digits') {
        return new NumericPassword(password);
    }
    return new LetterPassword(password);
}

function passwordStrength(password) {
    const length = password.toString().length;
    if (length < 5) {
        return 0;
    }
    if (length <= 10) {
        return 1;
    }
    return 2;
}
export { generatePassord, generatePassord as generatePassword, passwordStrength };
