import crypto from 'crypto';
import base64url from 'base64url';
export interface Options {
    expiresIn?: number;
}

export interface SignInput {
    payload: object;
    secret: string;
    options?: Options;
    header?: {
        alg: string;
        typ: string;
    };
}

const defaultOptions = {
    expiresIn: 86400, // 1 day
};

interface CreateSignatureInput {
    secret: string;
    encodedHeader: string;
    encodedPayload: string;
}

export function createSignature({
    secret,
    encodedHeader,
    encodedPayload,
}: CreateSignatureInput) {
    const signature = crypto
        .createHmac('sha256', secret)
        .update(encodedHeader + '.' + encodedPayload)
        .digest('base64');

    // Use base64url to encode the signature
    return base64url.fromBase64(signature);
}



function sign({ payload, secret, options = {}, header = { alg: 'HS256', typ: 'JWT' } }: SignInput) {
    const mergedOptions = { ...defaultOptions, ...options };

    // Use base64url to encode the header and payload
    const encodedHeader = base64url.encode(JSON.stringify(header));
    const expiresIn = Math.floor(Date.now() / 1000) + mergedOptions.expiresIn;
    const encodedPayload = base64url.encode(JSON.stringify({ ...payload, exp: expiresIn }));

    const signature = createSignature({ encodedPayload, encodedHeader, secret });

    // Concatenate the encoded header, payload, and signature with periods
    return `${encodedHeader}.${encodedPayload}.${signature}`;
}


export default sign;
