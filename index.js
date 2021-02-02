const {BigQuery} = require('@google-cloud/bigquery');
const projectId = 'long-star-302013';
 
const bigquery = new BigQuery({
  projectId: projectId,
});
 
const datasetName = 'salih';  
const tableName = 'codeway';


exports.logData = (req,res) => {

  const data = req.body;

  if(Array.isArray(data)){
    data.forEach(_data=>{
      _data.event_time = new Date(_data.event_time);
      bigquery
      .dataset(datasetName)
      .table(tableName)
      .insert(_data)
      .catch(err => {
         return res.status(400).json(err);
      }) 
    })
    return res.status(200).json({
        "message" : "records successfully added"
    })
  }else{
    data.event_time = new Date(data.event_time);
    bigquery
    .dataset(datasetName)
    .table(tableName)
    .insert(data)
    .then(resp=>{
        return res.status(200).json({
          "message" : "records successfully added"
        })     
    })
    .catch(err => {
      return res.status(400).json(err);
    })
  }
}
