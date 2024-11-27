import React, { useState } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import MomentComponent from 'moment'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Avatar,
  Card,
  CardHeader,
  Typography,
  Button,
  Fab,
  Tooltip,
  Link,
  Tabs,
  Tab,
  withStyles
} from '@material-ui/core'
import {
  Close as CloseIcon
} from '@material-ui/icons'
import LoginButton from '../session/login-button'
import SendSolutionDialog from '../../containers/send-solution-dialog'
import TaskSolveInstructions from './task-solve-instructions'

import logoGithub from '../../images/github-logo-black.png'
import logoBitbucket from '../../images/bitbucket-logo-blue.png'

const styles = theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    backgroundColor: 'darkgray',
    color: 'white',
    boxShadow: 'none'
  },
  mainBlock: {
    textAlign: 'center',
    padding: 20
  },
  cardHeader: {
    paddingBottom: 0
  },
  cardAvatar: {
    display: 'inline-block'
  },
  avatar: {
    width: 40,
    height: 40
  },
  taskTitle: {
    color: 'black',
    textDecoration: 'none'
  },
})

const TaskSolve = ({ 
  classes,
  task,
  open,
  onClose,
  location,
  logged
}) => {
  const [currentTab, setCurrentTab] = useState(0)

  const handleTabChange = (event, value) => {
    setCurrentTab(value)
  }

  const updatedAtTimeString = task.data.metadata ? MomentComponent(task.data.metadata.issue.updated_at).utc().fromNow() : 'not available'
  const timePlaceholder = (
    <Typography type='subheading' variant='caption' style={{ padding: 10, color: 'gray', marginRight: 10 }}>
      <FormattedMessage id='task.bounties.interested.created' defaultMessage='created' /> {updatedAtTimeString}
    </Typography>
  )

  const renderIssueAuthorLink = () => {
    if (task.data.metadata && task.data.metadata.issue.user.html_url) {
      return (
        <Link
          href={`${task.data.metadata.issue.user.html_url}`}
          target='_blank'>
          <FormattedMessage id='task.status.created.name.short' defaultMessage='by {name}' values={{
            name: task.data.metadata ? task.data.metadata.issue.user.login : 'unknown'
          }} />
        </Link>
      )
    }
    else {
      return (
        <FormattedMessage id='task.status.created.name.short' defaultMessage='by {name}' values={{
          name: task.data.metadata ? task.data.metadata.issue.user.login : 'unknown'
        }} />
      )
    }
  }

  const closeDialogButton = () => {
    return (
      <Fab size='small' aria-label='close' className={ classes.closeButton } onClick={ onClose }>
        <CloseIcon size='small' />
      </Fab>
    )
  }

  const dialogTitleMessage = () => {
    return (
      <DialogTitle id='form-dialog-title'>
        <FormattedMessage id='task.solve.login' defaultMessage='You need to login' />
      </DialogTitle>
    )
  }

  const loginForm = () => {
    return (
      <div>
        { /* <DialogTitle id='form-dialog-title'> */ }
        { dialogTitleMessage() }
        { /* </DialogTitle> */ }
        <DialogContent>
          <div className={ classes.mainBlock }>
            <LoginButton referer={ location } includeForm />
          </div>
        </DialogContent>
      </div>
    )
  }

  return (
    <Dialog
      open={ open }
      onClose={ onClose }
      aria-labelledby='form-dialog-title'
      maxWidth='md'
      size='md'
    >
      { closeDialogButton() }
      <DialogTitle id='form-dialog-title'>
        <FormattedMessage id='task.solve.dialog.title' defaultMessage='How to solve this issue and earn bounties?' />
      </DialogTitle>
      <DialogContent>
      <Tabs
        value={ currentTab }
        onChange={ handleTabChange }
        scrollable
        scrollButtons='on'
        indicatorColor='secondary'
        textColor='secondary'
        style={{marginBottom: 20}}
      >
        <Tab value={ 0 } label='Solve issue' />
        <Tab value={ 1 } label='Send the solution' />
      </Tabs>
      { currentTab === 0 &&
            <>
              { task.data &&
                <>
                  <Card>
                    <CardHeader
                      className={ classes.cardHeader }
                      classes={ { avatar: classes.cardAvatar } }
                      avatar={
                        <FormattedMessage id='task.status.created.name' defaultMessage='Created by {name}' values={ {
                          name: task.data.metadata ? task.data.metadata.issue.user.login : 'unknown'
                        } }>
                          { (msg) => (

                            <Tooltip
                              id='tooltip-github'
                              title={ msg }
                              placement='bottom'
                            >
                              <a
                                href={ `${task.data.metadata ? task.data.metadata.issue.user.html_url : '#'}` }
                                target='_blank' rel="noreferrer"
                              >
                                <Avatar
                                  src={ task.data.metadata ? task.data.metadata.issue.user.avatar_url : '' }
                                  className={ classNames(classes.avatar) }
                                />
                              </a>
                            </Tooltip>
                          ) }
                        </FormattedMessage>
                      }
                      title={
                        <Typography variant='h5' color='primary'>
                          <Link
                            href={ `${task.data.url}` }
                            target='_blank'
                            class={ classes.taskTitle }>
                            { task.data.title }
                            <img width='18' height='18' style={ { marginLeft: 10, verticalAlign: 'middle' } } src={ task.data.provider === 'github' ? logoGithub : logoBitbucket } />
                          </Link>
                        </Typography>
                      }
                      subheader={
                        <Typography variant='body1' style={ { marginTop: 5 } } color='primary'>
                          { renderIssueAuthorLink() }
                        </Typography>
                      }
                      action={
                        <div style={{marginLeft: 22}}>{timePlaceholder}</div>
                      }
                    />
                  </Card>
                  <Typography variant='h6' style={ { marginTop: 20 } }>
                    <FormattedMessage id='task.solve.dialog.instructions' defaultMessage='Instructions' />
                  </Typography>
                  <ol>
                    <li>
                      <Link href={ `${task.data.metadata ? task.data.metadata.repoUrl + '/fork' : '#'}` } target='_blank'>
                        <Typography variant='subtitle2' style={ { marginTop: 10 } } gutterBottom>
                          <FormattedMessage id='task.solve.dialog.instructions.first' defaultMessage='Fork repository' />
                        </Typography>
                      </Link>
                    </li>
                    <li>
                      <Typography variant='subtitle2' style={ { marginTop: 10 } } gutterBottom>
                        <FormattedMessage id='task.solve.dialog.instructions.second' defaultMessage='Create a branch' />
                      </Typography>
                      <div style={{margin: '10px 0'}}>
                        <TaskSolveInstructions instruction={'git checkout -b your-branch-name'} />
                       </div>
                    </li>
                    <li>
                      <Typography variant='subtitle2' style={ { marginTop: 10 } } gutterBottom>
                        <FormattedMessage id='task.solve.dialog.instructions.third' defaultMessage='Make your changes and commit' />
                      </Typography>
                      <div style={{margin: '10px 0'}}>
                        <TaskSolveInstructions instruction={'git commit -am "solving issue"'} />
                      </div>
                    </li>
                    <li>
                      <Typography variant='subtitle2' style={ { marginTop: 10 } } gutterBottom>
                        <FormattedMessage id='task.solve.dialog.instructions.fourth' defaultMessage='Push your changes to the branch' />
                      </Typography>
                      <div style={{margin: '10px 0'}}>
                        <TaskSolveInstructions instruction={'git push origin your-branch-name'} />
                      </div>
                    </li>
                    <li>
                      <Typography variant='subtitle2' style={ { marginTop: 10 } } gutterBottom>
                        <FormattedMessage id='task.solve.dialog.instructions.fifth' defaultMessage='Create a Pull Request' />
                      </Typography>
                    </li>
                    <li>
                      <Typography variant='subtitle2' style={ { marginTop: 10 } } gutterBottom>
                        <FormattedMessage id='task.solve.dialog.instructions.sixth' defaultMessage='Wait for the review' />
                      </Typography>
                    </li>
                    <li>
                      <Button variant='outlined' color='primary' style={ { marginTop: 20, verticalAlign: 'baseline' } } onClick={ () => setCurrentTab(1) }>
                        <FormattedMessage id='task.solve.dialog.instructions.button' defaultMessage='Send solution' />
                      </Button>
                    </li>
                  </ol>
                </>
              }
            </>
          }
          { currentTab === 1 && (<React.Fragment>
            { !logged ? ((loginForm())) : (<SendSolutionDialog assignDialog={ open } handleAssignFundingDialogClose={ onClose } />) }
          </React.Fragment>) }
      </DialogContent>
      
    </Dialog>
  )
}

export default withRouter(injectIntl(withStyles(styles)(TaskSolve)))
