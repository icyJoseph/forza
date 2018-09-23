import axios from "axios";

import { onFetchLeagueData, onSuccessLeagueData } from "../ducks/leagues";

const url = "http://192.168.0.4:1337/";

export const fetchLeagues = dispatch => {
  dispatch(onFetchLeagueData);
  return axios
    .get(url)
    .then(({ data: { leagues } }) => leagues)
    .then(res => {
      console.log(res);
      return res;
    })
    .then(res => dispatch(onSuccessLeagueData(res)))
    .catch(() => console.log("Error"));
};
