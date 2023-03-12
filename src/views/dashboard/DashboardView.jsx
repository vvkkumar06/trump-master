import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFetchCricketCollectionQuery, useFetchStatsQuery } from '../../redux/features/api';
import { updateCricketCards } from '../../redux/features/cricket-slice';
import CardsGalleryView from '../cards-gallery/CardsGalleryView';


const DashboardView = ({navigation}) => {
  const { data: cricketStats } = useFetchStatsQuery();
  const { data: cricketCollection } = useFetchCricketCollectionQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateCricketCards(cricketCollection))
  }, [cricketCollection])

  return (
    <>
      <CardsGalleryView stats={cricketStats} type='cricket' navigation={navigation}/>
    </>
  );
}

export default DashboardView;