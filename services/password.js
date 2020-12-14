const crypto = require("crypto");
const pepper = "\xc1\x42\xeb\x05\xd4\xa1\xf0\xbe\x68\xa2\x40\x9c\xc3\xa3\x14\x4e\x81\x57\xeb\x43\x8e\x63\x45\xc5";

const protect = (password, salt) => crypto.scryptSync(pepper + password, salt, 64);
const saltShaker = () => crypto.randomBytes(20);
const generatePassword = () => {
    const lc = 'abcdefghijklmnopqrstuvwxyz';
    const uc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nb = '1234567890';
    const sp = '!@#$%&*=+.';

    const len = lc.length + uc.length + nb.length + sp.length

    const passlen = 10;

    let pass = ""
    pass += lc[~~(Math.random() * lc.length)]
    pass += uc[~~(Math.random() * uc.length)]
    pass += nb[~~(Math.random() * nb.length)]
    pass += sp[~~(Math.random() * sp.length)]

    while(pass.length<passlen){
        let i = ~~(Math.random() * len)
        pass += lc[i] ||
                uc[i - lc.length] ||
                nb[i - lc.length - uc.length] ||
                sp[i - lc.length - uc.length - nb.length]
    }

    let scramble = (s) => s.split('').sort(()=>Math.random()*2-1).join('');
    let count = ~~(Math.random() * 15) + 10
    for (let i = 0; i < count; i++)pass = scramble(pass);
    return pass
}

module.exports = {
    protect,
    saltShaker,
    generatePassword
};
