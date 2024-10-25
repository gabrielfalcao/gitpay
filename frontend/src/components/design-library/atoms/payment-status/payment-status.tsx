import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { orange, green } from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';
import { status } from '../../../../consts'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pending: {
      backgroundColor: orange[500],
      color: theme.palette.common.white,
    },
    succeeded: {
      backgroundColor: green[500],
      color: theme.palette.common.white,
    },
    failed: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.common.white,
    },
    unknown: {
      backgroundColor: theme.palette.grey[500],
      color: theme.palette.common.white
    }
  }),
);

type statusProps = {
  orderStatus: string;
}

type GetStatusProps = { label?: string, color?: 'pending' | 'succeeded' | 'failed' }
type GetStatus = (currentStatus:string) => GetStatusProps

export default function PaymentStatus({ orderStatus }:statusProps) {
  const classes = useStyles();

  const getStatus:GetStatus = (currentStatus:string) => {
    const { order } = status;
    let choosenStatus:GetStatusProps = {};
    switch (currentStatus) {
      case `${order.pending}`:
        choosenStatus = {
          label: 'Pending',
          color: 'pending',
        };
      break;
      case `${order.succeeded}`:
        choosenStatus = {
          label: 'Succeeded',
          color: 'succeeded',
        };
      break;
      case order.failed:
        choosenStatus = {
          label: 'Failed',
          color: 'failed',
        };
      break;
    }
    return choosenStatus;
  }

  const currentStatus = getStatus(orderStatus)

  return (
    <Chip size="small" label={currentStatus.label} className={classes[currentStatus.color]} />
  );
}
