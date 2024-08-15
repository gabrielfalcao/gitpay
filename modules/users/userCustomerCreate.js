const Promise = require('bluebird')
const models = require('../../models')
const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_KEY)

module.exports = Promise.method(function userCustomerCreate(id, customerParameters) {
  return models.User
    .findOne(
      {
        where: { id }
      }
    )
    .then(data => {
      if (data.dataValues.customer_id) {
        return stripe.customers.retrieve(data.dataValues.customer_id).then(customer => {
          return new Error('customer.exists')
        }).catch(e => {
          // eslint-disable-next-line no-console
          console.log('could not finde customer', e)
          return e
        })
      } else {
        return stripe.customers.create({
          email: customerParameters.email,
          name: customerParameters.name,
          description: customerParameters.description,
          phone: customerParameters.phone,
          address: {
            line1: customerParameters.line1,
            line2: customerParameters.line2,
            city: customerParameters.city,
            postal_code: customerParameters.postal_code,
            state: customerParameters.state,
            country: customerParameters.country
          },
          metadata: {
            'user_id': id
          }
        }).then(customer => {
          return data.update({
            customer_id: customer.id
          },
          {
            where: { id },
            returning: true,
          }
          ).then(userUpdated => {
            return customer
          })
        })
      }
    }).catch(error => {
      // eslint-disable-next-line no-console
      console.log(error)
      return false
    })
})
