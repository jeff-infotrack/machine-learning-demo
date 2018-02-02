import axios from 'axios';

const api1 = 'http://10.70.193.118:5000';
const api2 = 'http://10.70.193.118:5001';
const api3 = 'http://10.70.193.123:5001';

export const getSearchSuggestion = async keyword => axios.post(`${api1}/search_box/search_suggestion`, {
  key_word: keyword
});

export const getPopularServices = async keywordName =>
  axios.get(`${api2}/nbo_model/popular_service`, {
    params: { keyword_name: keywordName }
  }).then((res) => {
    if (res.data) {
      res.data = res.data
        .map((s) => {
          const service = s;
          if (!service.profile) {
            service.profile = s.keyword_name;
            service.keyword_name = undefined;
          }
          return service;
        })
        .sort((a, b) => {
          const aDesc = (a.service_desc || '').toLowerCase();
          const bDesc = (b.service_desc || '').toLowerCase();
          if (aDesc < bDesc) {
            return -1;
          }
          if (aDesc > bDesc) {
            return 1;
          }
          return 0;
        });
    }
    return res;
  });

export const getNboSuggestions = async serviceId => axios.get(`${api2}/nbo_model/nbo_suggestion`, {
  params: { serviceid: serviceId }
});

export const getOcrUploadSignedUrl = async fileName => axios.post(`${api3}/get-s3-upload-url`, {
  Key: fileName
});
export const ocrImageClassification = async s3Key => axios.post(`${api3}/image-classifier`, {
  Key: s3Key
}, {
  validateStatus: status => status < 500
});
export const ocrImageTextDetect = async (s3Key, docType) => axios.post(`${api3}/image-text-detect`, {
  Key: s3Key,
  DocType: docType
}, {
  validateStatus: status => status < 500
});
