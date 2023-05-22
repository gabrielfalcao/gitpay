import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import {
  Grid,
  Typography,
  Divider,
  List,
  withStyles,
  ListItem,
} from '@material-ui/core'

import SubscribeForm from '../form/subscribe-form'
import WhoSubscribes from '../welcome/who-subscribes'
import Workflow from '../welcome/workflow'
import TermsOfServicePeople from '../welcome/terms-of-service-people'
import TermsOfServiceCompany from '../welcome/terms-of-service-company'
import WhichCompanies from '../welcome/which-companies'
import Consulting from '../welcome/consulting'
import InfoContainer from '../../containers/info'
import SlackCard from './SlackCard'
import GithubCard from './GithubCard'


import mainStyles from '../styles/style'
import { Container, BaseFooter, SubscribeFromWrapper } from './FooterStyles'

import BottomSectionDialog from '../welcome/components/BottomSectionDialog'
import PrivacyPolicy from '../session/privacy-policy'
import TermsOfService from '../session/terms-of-service'
import CookiePolicy from '../session/cookie-policy'

const logoCompleteGray = require('../../images/logo-complete-gray.png')
const logoWorknEnjoy = require('../../images/worknenjoy-logo.png')

const styles = (theme) => mainStyles(theme)

class Bottom extends Component {
  render () {
    const { classes } = this.props

    return (
      <div className={ classes.secBlock }>
        <Container>
          <Grid container spacing={ 3 }>
            <Grid item xs={ 12 } sm={ 3 }>
              <Typography component='div'>
                <strong>
                  <FormattedMessage
                    id='bottom.header.subheading.primary'
                    defaultMessage='Main menu'
                  />
                </strong>
              </Typography>
              <List component='nav'>
                <ListItem button component='a'>
                  <Typography
                    variant='subtitle1'
                    component='div'
                    style={ { display: 'block', width: '100%' } }
                  >
                    <FormattedMessage
                      id='welcome.how.title'
                      defaultMessage='About us'
                    />
                  </Typography>
                </ListItem>
                <WhoSubscribes classes={ classes } />
                <Workflow classes={ classes } />
                <TermsOfServicePeople classes={ classes } />
              </List>
            </Grid>
            <Grid item xs={ 12 } sm={ 3 }>
              <Typography component='div'>
                <strong>
                  <FormattedMessage
                    id='bottom.header.subheading.secondary'
                    defaultMessage='Legal'
                  />
                </strong>
              </Typography>
              <List component='nav'>
                <BottomSectionDialog
                  classes={ classes }
                  title='Legal'
                  header='Privacy policy'
                  subtitle={ 'Privacy Policy' }
                  content={
                    <PrivacyPolicy extraStyles={false} />
                  }
                />
                <BottomSectionDialog
                  classes={ classes }
                  title='Legal'
                  header='Termos of Service'
                  subtitle={ 'Terms of Service' }
                  content={
                    <TermsOfService extraStyles={false} />
                  }
                />
                <BottomSectionDialog
                  classes={ classes }
                  title='Legal'
                  header='Cookie Policy'
                  subtitle={ 'Cookie Policy' }
                  content={
                    <CookiePolicy extraStyles={false} />
                  }
                />
              </List>
            </Grid>
            <Grid item xs={ 12 } sm={ 2 }>
              <SlackCard />
              <GithubCard />
            </Grid>
            <Grid item xs={ 12 } sm={ 4 }>
              <Typography component='div'>
                <FormattedMessage
                  id='bottom.subheading.newsletter'
                  defaultMessage='If you want to get in touch, leave your e-mail with our news and challenges!'
                />
              </Typography>
              <SubscribeFromWrapper className='subscribe-form'>
                <SubscribeForm render />
              </SubscribeFromWrapper>
              <div style={ { float: 'right' } }>
                <BaseFooter
                  style={ { display: 'flex', alignItems: 'center' } }
                >
                  <div>
                    <img className={ classes.img } src={ logoCompleteGray } width='100' />
                  </div>
                  <Typography
                    component='span'
                    style={ {
                      marginLeft: 10,
                      marginRight: 10,
                      display: 'inline-block',
                    } }
                  >
                    <FormattedMessage
                      id='bottom.company.org'
                      defaultMessage='is part of'
                    />
                  </Typography>
                  <a href='http://worknenjoy.com' target='_blank'>
                    <img className={ classes.img } src={ logoWorknEnjoy } width='100' />
                  </a>
                </BaseFooter>
                <div style={ { textAlign: 'right' } }>
                  <Typography variant={ 'caption' } component='span'>
                    <a href='http://worknenjoy.com'>worknenjoy, Inc.</a> <br />
                    2035 Sunset Lake Road, Suite B-2 <br />
                    Newark, DE 19709 - US
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
          <Divider className={ classes.spacedTop } />
          <InfoContainer />
        </Container>
      </div>
    )
  }
}

Bottom.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Bottom)
