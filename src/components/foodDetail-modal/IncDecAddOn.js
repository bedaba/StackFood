import React, {useEffect, useState} from 'react'
import {ButtonGroup, Checkbox, FormControlLabel, Grid, IconButton,} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import {getAmount} from '../../utils/customFunctions'
import {CustomTypographyLabel} from '../../styled-components/CustomTypographies.style'
import {useIsMount} from '../first-render-useeffect-controller/useIsMount'
import {useSelector} from 'react-redux'

const IncDecAddOn = ({
                         changeAddOns,
                         add_on,
                         setAddOns,
                         add_ons,
                         product,
                         cartList,
                     }) => {
    const [checkAddOne, setCheckAddOn] = useState(false)
    const [addOn, setAddOn] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const {global} = useSelector((state) => state.globalSettings)


    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }

    useEffect(() => {
        if (product?.selectedAddons) {
            //if selected addons exist
            setAddOns(product?.selectedAddons)
            let isAddonExist =
                product?.selectedAddons.find(
                    (item) => item.id === add_on.id
                )
            if (isAddonExist) {
                setAddOn({...isAddonExist})
                setQuantity(isAddonExist.quantity)
                setCheckAddOn(true)
            } else {
                setAddOn({...add_on, quantity: quantity})
                setCheckAddOn(false)
                setQuantity(0)
            }
        } else {
            //if no selected addons exist
            setAddOn({...add_on, quantity: quantity})
            setCheckAddOn(false)
            setQuantity(0)
        }
    }, [product, cartList])
    const isMount = useIsMount()
    useEffect(() => {
        if (isMount) {
            //for doing nothing on first render
        } else {
            let newData = add_ons.map((item) =>
                item.id === addOn.id ? {...item, quantity: quantity} : item
            )
            setAddOns(newData)
            if (quantity === 0) {
                setCheckAddOn(false)
            }
        }
    }, [quantity])
    const changeCheckedAddOn = (e) => {
        setCheckAddOn(e.target.checked)
        if (e.target.checked) {
            setQuantity(1)
            changeAddOns(e.target.checked, {
                ...addOn,
                quantity: quantity === 0 ? 1 : quantity,
            })
        } else {
            setQuantity(0)
            changeAddOns(e.target.checked, {
                ...addOn,
                quantity: quantity === 0 ? 1 : quantity,
            })
        }
    }

    const incrementAddOnQty = () => {
        setQuantity((prevState) => prevState + 1)
    }
    const decrementAddOnQty = () => {
        setQuantity((prevState) => prevState - 1)
    }

    return (
        <>
            {addOn && (
                <Grid container alignItems="center" justify="center">
                    <Grid item md={6} sm={5} xs={5}>
                        <FormControlLabel
                            key={addOn?.id}
                            control={
                                <Checkbox
                                    onChange={changeCheckedAddOn}
                                    checked={checkAddOne}
                                />
                            }
                            label={
                                <CustomTypographyLabel>
                                    {addOn?.name}
                                </CustomTypographyLabel>
                            }
                        />
                    </Grid>
                    <Grid item md={3} sm={3} xs={3} justifySelf="flex-end">
                        <CustomTypographyLabel>
                            {getAmount(
                                addOn?.price,
                                currencySymbolDirection,
                                currencySymbol,
                                digitAfterDecimalPoint
                            )}
                        </CustomTypographyLabel>
                    </Grid>
                    <Grid item md={3} sm={4} xs={4} align="right">
                        <ButtonGroup
                            variant="contained"
                            aria-label="contained primary button group"
                            size="small"
                        >
                            <IconButton
                                disabled={!checkAddOne || quantity === 0}
                                aria-label="delete"
                                sx={{margin: '0', padding: '2px'}}
                                onClick={() => {
                                    decrementAddOnQty()
                                }}
                            >
                                <RemoveIcon/>
                            </IconButton>
                            <span
                                style={{
                                    marginTop: '2px',
                                    width: '8px',
                                    textAlign: 'center',
                                }}
                            >
                                {quantity}
                            </span>
                            <IconButton
                                disabled={!checkAddOne}
                                aria-label="add"
                                sx={{margin: '0', padding: '2px'}}
                                onClick={() => incrementAddOnQty()}
                            >
                                <AddIcon/>
                            </IconButton>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default IncDecAddOn
