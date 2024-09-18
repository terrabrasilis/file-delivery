import { get, set } from 'lodash'
import path from 'path'
import config from '../../config'
import { constants } from '../utils'

const Service = {
  getFileBasedOnProfile (userType, project, frequency) {
    const fileFrequency = this.getFileFrequencyName(userType, frequency)
    return path.join(config.filesPath, project, fileFrequency)
  },

  getFileFrequencyName(profile, frequency) {
    let files = {}

    set(files, `${constants.PUBLIC}`, {
      monthly: 'month_d.json',
      all_daily: 'all_daily_d.json',
      cloud: 'cloud_m_d.json',
      fof_prodes: 'fof_prodes_d.json',
      fof_car: 'fof_car_d.json',
      shape: 'public.zip'
    })

    set(files, `${constants.AUTHENTICATED}`, {
      monthly: 'month_auth_d.json',
      all_daily: 'all_daily_auth_d.json',
      cloud: 'cloud_m_d.json',
      fof_prodes: 'fof_prodes_d.json',
      fof_car: 'fof_car_d.json',
      shape: 'all.zip'
    })

    return get(files, `${profile}.${frequency}`)
  },
 
  requestToAuthApi(ctx, clientId, role, bearer) 
  {
    var url = 'https://terrabrasilis.dpi.inpe.br/oauth-api/validate/'+clientId+'/'+role;

    if(config.oauthAPIURL)
    {
      url = config.oauthAPIURL + 'validate/'+clientId+'/'+role;
    }
    else if(ctx.origin)
    {
      url = ctx.origin + '/oauth-api/validate/'+clientId+'/'+role;
    }    

    console.log('OAuth API URL: ' + url);    
    //var ip = req.headers || req.socket.remoteAddress
         
    var request = require('sync-request');
    var res = request('GET', url, {
      headers: {
        'Authorization': bearer,
      },
    });

    return res.getBody();
      
  },
  validateUser(ctx, clientId, role, bearer) 
  {
    try {
        const json = Service.requestToAuthApi(ctx, clientId, role, bearer);

        console.log('User JSON : ' + json);

        let user = JSON.parse(json);

        if(user.authenticated==true)
        {
          return true;
        }
        else
        {
          console.log('Error validating user over oauth-api: ' + user.error);          
          return false;
        }
    } catch (error) {
        console.error('Error requesting validation of user over oauth-api:' + error);
        return false;
    }
  }

}

export default Service
