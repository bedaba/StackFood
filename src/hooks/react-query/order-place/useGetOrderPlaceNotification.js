import MainApi from "../../../api/MainApi";
import {useQuery} from "react-query";

export const getData = async () => {
    const { data } = await MainApi.get('/api/v1/customer/order/send-notification/101649')
    return data
}
export const useGetOrderPlaceNotification = () => {
    return useQuery('api-for-notification-count', () => getData(), {
        enabled:false,
    })
}