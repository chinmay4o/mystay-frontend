import React from 'react'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import HotTubIcon from '@mui/icons-material/HotTub';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import DiningIcon from '@mui/icons-material/Dining';
import TvIcon from '@mui/icons-material/Tv';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';


const Amenties = ({type})=>{
    switch(type){
        case 'lockers':
            return <VpnKeyIcon/>
        case 'wifi':
            return <WifiIcon/>
        case 'air-conditioning':
            return <AcUnitIcon/>
        case 'tv':
            return <TvIcon/>
        case '24/7 reception':
            return <RoomServiceIcon/>
        case 'hot water':
            return <HotTubIcon/>
        case 'water dispenser':
            return <LocalDrinkIcon/>
        case 'cafe':
            return <DiningIcon/>
        default:
            return <AccessibilityNewIcon/>
    }
}

const AmenitiesIcons = ({type}) => {
  return (
    <>
    <Amenties type={type.toLowerCase()}/>
    </>
  )
}

export default AmenitiesIcons