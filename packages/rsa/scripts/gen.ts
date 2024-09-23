import { writeFileSync } from 'fs';
import { gen } from '../src/node';
gen().then(
    ({ publicKey, privateKey }) => {
        writeFileSync(
            'src/key.ts',
            `export const publicKey = \`${publicKey}\`;\nexport const privateKey = \`${privateKey}\`;`
        );
    },
    (err) => {
        throw err;
    }
);
