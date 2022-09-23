import * as bcrypt from 'bcrypt';


export function checkIfUnencryptedPasswordIsValid(uncryptedPassword: string, cryptedPassword: string) {
    return bcrypt.compareSync(uncryptedPassword, cryptedPassword)
}

