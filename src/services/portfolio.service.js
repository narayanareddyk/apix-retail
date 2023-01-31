import http from "./http.service";
import config from "../config/constant";

const getPortfolioDetails = async () => {
  try {
    const reqParams = {
      requestId: "GETBALANCES",
    };
    const response = await http.get(config.portfolio.getBalances, reqParams);
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const PortfolioService = {
  getPortfolioDetails,
};

export default PortfolioService;
