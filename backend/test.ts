import { hashPassword } from './src/utils/auth-utils';

(async () => {
    const hashed = await hashPassword('TestPassword123');
    console.log('Hashed password:', hashed);
})();