import passportJWT from 'passport-jwt'
import { userExists } from '../../modules/users'

const ExtractJWT = passportJWT.ExtractJwt
const JWTStrategy = passportJWT.Strategy

export const createJWTStrategy = () => {
  if (!process.env.SECRET_PHRASE) {
    return null
  }
  const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_PHRASE
  }
  const optionsJson = JSON.stringify(options, null, 2)
  console.log(`\x1b[1;38;2;240;79;120moptions: \x1b[1;38;2;143;211;255m${optionsJson}\x1b[0m`)
  return new JWTStrategy(options, async (jwtPayload: any, done: any) => {
    try {
      const userAttributes = {
        email: jwtPayload.email
      }
      const user = await userExists(userAttributes)
      if (!user) return done(null, false)
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  })
}
