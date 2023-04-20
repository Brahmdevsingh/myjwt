import sign from '../src/sign'
import decode from '../src/decode'

describe('decode', () => {
    it('should decode the token payload', () => {
        const token = sign({ payload: { name: 'Brahm dev Singh' }, secret: 'shhhh' })


        const decoded = decode({ token })
        console.log(decoded);
        expect(decoded.name).toBe('Brahm dev Singh');
    });
});