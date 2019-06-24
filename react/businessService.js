import axios from "axios";
import * as serviceHelper from "./serviceHelpers";
// import logger from "../logger";
// const _logger = logger.extend("businessService");

const url = serviceHelper.API_HOST_PREFIX;
//#region CRUD
const submitBusiness = payload => {
  const config = {
    method: "POST",
    url: `${url}/api/businessventures`,
    data: payload,
    withCredentials: true,
    crossDomain: true
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const updateBusinessProfile = (id, payload) => {
  const config = {
    method: "PUT",
    url: `${url}/api/businessventures/${id}`,
    data: payload,
    withCredentials: true,
    crossDomain: true
  };
  return axios(config)
    .then(response => {
      return {
        data: response.data,
        payload
      };
    })
    .catch(serviceHelper.onGlobalError);
};

const getBusinessById = id => {
  const config = {
    method: "GET",
    url: `${url}/api/businessventures/${id}`,
    withCredentials: true,
    crossDomain: true
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const getBusinessByUserId = () => {
  const config = {
    method: "GET",
    url: `${url}/api/businessventures/current`,
    withCredentials: true,
    crossDomain: true
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const getBusinessProfiles = () => {
  const config = {
    method: "GET",
    url: `${url}/api/businessventures`,
    withCredentials: true,
    crossDomain: true
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const deleteBusinessProfile = id => {
  const config = {
    method: "DELETE",
    url: `${url}/api/businessventures/${id}`,
    withCredentials: true,
    crossDomain: true
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};
//#endregion

//#region Pagination/Search
const displayBusinessVentures = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${url}/api/businessventures/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossDomain: true
  };

  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const searchBusinessVentures = (pageIndex, pageSize, query) => {
  const config = {
    method: "GET",
    url: `${url}/api/businessventures/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    withCredentials: true,
    crossDomain: true
  };

  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};
//#endregion

//#region Business/Status/Industry Types
const getBusinessTypes = () => {
  const config = {
    method: "GET",
    url: `${url}/api/businessventures/businesstype`,
    withCredentials: true,
    crossDomain: true
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const getIndustryType = () => {
  const config = {
    method: "GET",
    url: `${url}/api/businessventures/industrytype`,
    withCredentials: true,
    crossDomain: true
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const getBusinessesStatus = () => {
  const config = {
    method: "GET",
    url: `${url}/api/businessventures/status`,
    withCredentials: true,
    crossDomain: true
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};
//#endregion

//#region Year Count
const getBusinessTypesTotalCountByYear = year => {
  const config = {
    method: "GET",
    url: `${url}/api/businessventures/monthly/count/${year}`,
    withCredentials: true,
    crossDomain: true
  };

  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};
//#endregion

export {
  submitBusiness,
  updateBusinessProfile,
  getBusinessById,
  getBusinessByUserId,
  getBusinessProfiles,
  deleteBusinessProfile,
  getBusinessTypes,
  getBusinessesStatus,
  getIndustryType,
  displayBusinessVentures,
  searchBusinessVentures,
  getBusinessTypesTotalCountByYear
};
