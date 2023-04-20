import sign from '../src/sign';

describe('sign', () => {
    it('should produce different signatures for different payloads', () => {
        const secret = 'shhhh';
        const jwtOne = sign({
            payload: { name: 'Tom' },
            secret,
            options: { expiresIn: 8.64e7 },
        }).split('.')[2];
        const jwtTwo = sign({
            payload: { name: 'Tom' },
            secret: `${secret}-13323`,
            options: { expiresIn: 8.64e7 },
        }).split('.')[2];

        expect(jwtOne).not.toBe(jwtTwo);
    });

    it('should add the expiry to the payload', () => {
        const secret = 'shhhhhkjfioffnswualkcnoi';
        const options = {
            header: { alg: 'HS256', typ: 'JWT' },
            expiresIn: 8.64e7,
        };
        const token = sign({
            payload: { name: 'Brahm dev singh chauhan' },
            secret,
            options,
        });

        console.log(token);
        const jwtPayload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf-8'));
        expect(typeof jwtPayload.exp).toBe('number');
    });
});
