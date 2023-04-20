import decode from './decode';
import { createSignature } from './sign';


export interface verifyInput {
    token: string,
    secret: string
}


const dateInPast = function ({ exp }: { exp: number }) {
    const currentDate = Math.floor(Date.now() / 1000);
    return currentDate > exp;
}



function verify({ token, secret }: verifyInput) {

    const parts = token.split('.')

    if (parts.length !== 3) {
        throw new Error('Invalid token')
    }

    const [encodedHeader, encodedPayload, signature] = parts;

    const cnadidateSignature = createSignature({ encodedHeader, encodedPayload, secret });

    if (signature !== cnadidateSignature) {
        throw new Error('Invalid Signature');
    }

    const decoded = decode({ token })
    const { exp } = decoded

    if (dateInPast({ exp })) {
        throw new Error('Token has expired');
    }

    return decoded;
}
export default verify;