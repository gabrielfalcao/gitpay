import React, { useState, useEffect } from 'react'
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl'

import {
  Typography,
} from '@material-ui/core'

import PaymentDrawer from '../../../design-library/templates/payment-drawer/payment-drawer'

const taskPaymentFormMessages = defineMessages({
  tabPaymentMethodCrediCard: {
    id: 'task.payment.method.card',
    defaultMessage: 'Credit Card'
  },
  tabPaymentMethodPaypal: {
    id: 'task.payment.method.paypal',
    defaultMessage: 'Paypal'
  },
  tabPaymentMethodInvoice: {
    id: 'task.payment.method.invoice',
    defaultMessage: 'Invoice'
  },
})

const AddFundsFormDrawer = ({ intl, open, onClose }) => {
  const [price, setPrice] = useState(0)

  useEffect(() => {
    
  }, [])

  const pickTaskPrice = (price) => {
    setPrice(price)
  }

  return (
    <PaymentDrawer
      title={ <FormattedMessage id='payment.addfunds.headline' defaultMessage='Add funds' />}
      pickupTagListMessagesPrimaryText={<FormattedMessage id='payment.addfunds.headline.bounty.add' defaultMessage='Add a payment in advance and use it to pay for bounties' />}
      pickupTagListMessagesSecondaryText={<FormattedMessage id='payment.addfunds.subheading' defaultMessage='Add funds to your wallet and use it later to pay for bounties' />}
      onChangePrice={(price) => pickTaskPrice(price)}
      open={open}
      onClose={onClose}
      tabs={[
        {
          default: true,
          label: intl.formatMessage(taskPaymentFormMessages.tabPaymentMethodInvoice),
          value: 'invoice',
          component: (
            <div>
              <Typography variant='body1' gutterBottom>
                <FormattedMessage id='task.payment.form.message.invoice.heading' defaultMessage='Invoice payment method' />
              </Typography>
            </div>
          )
        }
      ]}
    />
  )
}

export default injectIntl(AddFundsFormDrawer)
