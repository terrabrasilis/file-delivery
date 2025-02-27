import path from 'path';
import config from '../../../config';

const Service = {
  getFileBasedOnProfile (userType, project, granularity, loi) 
  {
    let fileName = project + "_" + granularity + "_" + loi + "_" + userType+".json";    
    
    fileName = path.join("data", fileName);
    fileName = path.join(project, fileName);
    fileName = path.join(config.filesPath, fileName);

    return fileName
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
