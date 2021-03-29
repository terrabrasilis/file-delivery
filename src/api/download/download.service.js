import path from 'path'
import { get, set } from 'lodash'
import { constants } from '../utils'
import config from '../../config'

const Service = {
  getFileBasedOnProfile (userType, project, frequency) {
    const fileFrequency = this.getFileFrequencyName(userType, frequency)
    return path.join(config.filesPath, project, fileFrequency)
  },

  getFileFrequencyName(profile, frequency) {
    let files = {}

    set(files, `${constants.PUBLIC}`, {
      daily: 'daily_d.json',
      monthly: 'month_d.json',
      all_daily: 'all_daily_d.json',
      cloud: 'cloud_m_d.json',
      fof_prodes: 'fof_prodes_d.json',
      fof_car: 'fof_car_d.json',
      shape: 'public.zip'
    })

    set(files, `${constants.AUTHENTICATED}`, {
      daily: 'daily_auth_d.json',
      monthly: 'month_auth_d.json',
      all_daily: 'all_daily_auth_d.json',
      cloud: 'cloud_m_d.json',
      fof_prodes: 'fof_prodes_d.json',
      fof_car: 'fof_car_d.json',
      shape: 'all.zip'
    })

    return get(files, `${profile}.${frequency}`)
  },
 
  requestToAuthApi(resource, bearer) 
  {
    var url = 'http://terrabrasilis.dpi.inpe.br/oauth-api/validate/'+resource;
         
    var request = require('sync-request');
    var res = request('GET', url, {
      headers: {
        'Authorization': bearer,
      },
    });

    return res.getBody();
      
  },
  validateUser(resource, bearer) 
  {
    try {
        const json = Service.requestToAuthApi(resource, bearer);

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
