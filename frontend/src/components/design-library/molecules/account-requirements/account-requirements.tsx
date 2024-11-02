import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Button, Typography } from '@material-ui/core';
import ReactPlaceholder from 'react-placeholder';
import { Alert } from '../../atoms/alert/alert';
import { validAccount } from '../../../../utils/valid-account';
import api from '../../../../consts';

const AccountRequirements = ({ user, account, intl, onClick }) => {

  const missingRequirements = () => {
    if (account?.data?.requirements?.currently_due?.length > 0) {
      return account?.data?.requirements?.currently_due.map((requirement, index) => {
        return (
          <li key={index}>
            {intl.formatMessage(api.ACCOUNT_FIELDS[requirement])}
          </li>
        )
      })
    }
  }
  return (
    !validAccount(user, account) ?
      <ReactPlaceholder ready={account.completed} type='media' rows={5} showLoadingAnimation={true}>
        <Alert
          style={{ marginBottom: 20 }}
          severity='warning'
          action={
            <Button
              size='small'
              onClick={onClick}
              variant='contained'
              color='secondary'
            >
              <FormattedMessage id='transfers.alert.button' defaultMessage='Update your account' />
            </Button>
          }
        >
          <Typography variant='subtitle1' gutterBottom>
            <FormattedMessage id='profile.transfer.notactive' defaultMessage='Your account is not active, please finish the setup of your account to receive payouts' />
          </Typography>
          {missingRequirements() &&
            <>
              <Typography variant='subtitle1' gutterBottom>
                <FormattedMessage id='profile.transfer.missingrequirements' defaultMessage='Missing requirements:' />
              </Typography>
              <ul>
                {missingRequirements()}
              </ul>
            </>
          }
        </Alert>
      </ReactPlaceholder>
      :
      null
  );
}

export default injectIntl(AccountRequirements);