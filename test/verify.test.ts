import { verify, sign } from '../src'


describe('verify', () => {

    it('should verify and decode a valid token', () => {
        const secret = 'shhhhh';

        const token = sign({ payload: { name: 'Brahm Dev Singh' }, secret })

        const verified = verify({ token, secret })
        console.log(verified, token);
        expect(verified.name).toBe('Brahm Dev Singh')
    })

    it('should throw if the signature is invalid', () => {
        const secretOne = 'shhhhh';
        const secretTwo = 'secretTwo';
        const token = sign({ payload: { name: 'Tom' }, secret: secretOne });

        try {
            verify({ token, secret: secretTwo })

        } catch (e: unknown) {
            expect((e as Error).message).toBe('Invalid Signature')
        }
    })

    it('should throw if the token has expired', () => {
        const secret = 'shhhhh';
        const token = sign({
            payload: { name: 'Brahm Dev Singh' },
            secret,
            options: {
                expiresIn: -8.64e7
            }
        })

        try {
            verify({ token, secret })

        } catch (e: unknown) {
            expect((e as Error).message).toBe('Token has expired')
        }
    })
})