import React, {useEffect, useState} from 'react'
import {Typography} from '@mui/material'
import {OfferTypography} from './FoodCard.style'
import {t} from 'i18next'
import CustomImageContainer from '../CustomImageContainer'
import {Box} from '@mui/system'
import {useSelector} from 'react-redux'
import {getAmount, isAvailable} from '../../utils/customFunctions'
import {CustomOverlayBox} from '../../styled-components/CustomStyles.style'
import {useTheme} from '@mui/material/styles'


export const discountChipHandler = (restaurant_discount, languageDirection, discount, discount_type, currencySymbolDirection,
                                    currencySymbol,
                                    digitAfterDecimalPoint) => {
    if (restaurant_discount > 0) {
        // let discountAmount = (price * restaurant_discount) / 100

        return (
            <OfferTypography
                languageDirection={languageDirection}
                sx={{align: 'left'}}
            >
                {restaurant_discount}
                {t('% OFF')}
                {/*{getAmount(*/}
                {/*    discountAmount,*/}
                {/*    currencySymbolDirection,*/}
                {/*    currencySymbol,*/}
                {/*    digitAfterDecimalPoint*/}
                {/*)}*/}
            </OfferTypography>
        )
    } else {
        if (discount > 0) {
            if (discount_type === 'percent') {
                return (
                    <OfferTypography
                        languageDirection={languageDirection}
                        sx={{align: 'left'}}
                    >
                        {discount}
                        {t('% OFF')}
                    </OfferTypography>
                )
            } else {
                return (
                    <OfferTypography
                        languageDirection={languageDirection}
                        sx={{align: 'left'}}
                    >
                        {getAmount(
                            discount,
                            currencySymbolDirection,
                            currencySymbol,
                            digitAfterDecimalPoint
                        )}
                    </OfferTypography>
                )
            }
        }
    }
}
const ProductCardMedia = ({
                              discount,
                              image,
                              height,
                              name,
                              discount_type,
                              restaurant_discount,
                              price,
                              onClick,
                              available_time_starts,
                              available_time_ends,
                          }) => {
    const [languageDirection, setLanguageDirection] = useState('ltr')
    const {global} = useSelector((state) => state.globalSettings)
    const theme = useTheme()
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    useEffect(() => {
        if (localStorage.getItem('direction')) {
            setLanguageDirection(localStorage.getItem('direction'))
        }
    }, [])


    return (
        <>
            {discountChipHandler(restaurant_discount, languageDirection, discount, discount_type, currencySymbolDirection,
                currencySymbol,
                digitAfterDecimalPoint)}
            {image && (
                <Box
                    onClick={onClick}
                    sx={{
                        position: 'relative',
                        maxHeight: '170px',
                        [theme.breakpoints.down('sm')]: {
                            maxHeight: '100px',
                            // height:" 351px"
                        },
                    }}
                >
                    <CustomImageContainer
                        height="170px"
                        smHeight="100px"
                        src={image}
                    />
                    {!isAvailable(
                        available_time_starts,
                        available_time_ends
                    ) && (
                        <CustomOverlayBox>
                            <Typography align="center" variant="h5">
                                {t('Not Available now')}
                            </Typography>
                        </CustomOverlayBox>
                    )}
                </Box>
            )}

            {/*<CustomCardMedia*/}
            {/*    component="img"*/}
            {/*    alt={name}*/}
            {/*    height={height}*/}
            {/*    image={image}*/}

            {/*/>*/}
        </>
    )
}

export default ProductCardMedia
