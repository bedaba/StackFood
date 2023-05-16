import React, { useEffect } from 'react'
import {
    alpha,
    Box,
    Button,
    Container,
    Grid,
    Pagination,
    Stack,
    Typography,
} from '@mui/material'
import PastImg from '../../../public/static/order/image 29.png'
import ActiveImg from '../../../public/static/order/image 29 (1).png'
import onData from '../../../public/static/nodata.png'

import {
    PastButtion,
    ActiveButtonGrid,
    ActiveButtion,
    ButtonGrid,
    OrderPegination,
    TopButtonTypography,
    Image,
} from './OrderHistory.style'
import OrderHist from './OrderHist'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { OrderApi } from '../../hooks/react-query/config/orderApi'
import Loading from '../custom-loading/Loading'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import CustomShimmerCard from '../customShimmerForProfile/CustomShimmerCard'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import { CustomTypography } from '../custom-tables/Tables.style'
import CustomePagination from '../pagination/Pagination'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useTheme } from '@mui/material/styles'
import { setOrderType } from '../../redux/slices/orderType'
import useMediaQuery from '@mui/material/useMediaQuery'
import { onErrorResponse, onSingleErrorResponse } from '../ErrorResponse'
import TopButtons from "./TopButtons";

const OrderHistoryPage = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const { t } = useTranslation()
    const { orderType } = useSelector((state) => state.orderType)
    // const [orderType, setOrderType] = useState('running-orders')
    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(1)

    const { isLoading, data, refetch } = useQuery(
        [
            orderType === 'orders-list',
            orderType,
            limit,
            offset,
        ],
        () => OrderApi.orderHistory(orderType, limit, offset),
        {
            onError: onSingleErrorResponse,
        }
    )
    const handleOrderType = (value) => {
        setOffset(1)
        dispatch(setOrderType(value))
    }
    useEffect(() => {
        dispatch(setOrderType(orderType ? orderType : 'running-orders'))
        orderType && refetch()
    }, [])
    const isXs = useMediaQuery('(max-width:700px)')
    return (
        <Container>
            <Box minHeight="90vh" mb="2rem">
                <TopButtons handleOrderType={handleOrderType} orderType={orderType} theme={theme} t={t}/>
                <CustomPaperBigCard>
                    {isLoading ? (
                        <Box mb="1rem">
                            <CustomShimmerCard />
                        </Box>
                    ) : (
                        <Grid container spacing={2}>
                            {data?.data?.orders?.map((order) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={isXs ? 12 : 6}
                                    md={6}
                                    lg={6}
                                    key={order.id}
                                >
                                    <OrderHist {...order} />
                                </Grid>
                            ))}
                            {data?.data?.orders?.length === 0 && (
                                <CustomEmptyResult
                                    image={onData}
                                    label="No Orders Found"
                                />
                            )}
                        </Grid>
                    )}
                    {data?.data?.total_size > 10 && (
                        <CustomePagination
                            total_size={data?.data?.total_size}
                            page_limit={limit}
                            offset={offset}
                            setOffset={setOffset}
                        />
                    )}
                </CustomPaperBigCard>
            </Box>
        </Container>
    )
}

export default OrderHistoryPage
