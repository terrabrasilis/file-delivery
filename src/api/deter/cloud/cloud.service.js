import path from 'path';
import config from '../../../config';

const Service = {
  getFile(project, granularity, loi) 
  {
    let fileName = project + "_cloud_" + granularity + "_" + loi + ".json";    
    
    fileName = path.join("cloud", fileName);
    fileName = path.join(project, fileName);
    fileName = path.join(config.filesPath, fileName);

    return fileName
  }
}

export default Service
