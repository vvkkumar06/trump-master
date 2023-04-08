import React from 'react';
import { useFetchStatsQuery } from '../../redux/features/api';
import CardsGalleryView from '../cards-gallery/CardsGalleryView';


const DashboardView = ({navigation}) => {
  const { data: cricketStats } = useFetchStatsQuery();

  return (
    <>
      <CardsGalleryView stats={cricketStats} type='cricket' navigation={navigation}/>
    </>
  );
}

export default DashboardView;