import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFetchStatsQuery, useFetchUserQuery } from '../../redux/features/api';
import { updateCricketCards } from '../../redux/features/cricket-slice';
import CardsGalleryView from '../cards-gallery/CardsGalleryView';


const DashboardView = ({navigation}) => {
  const { data: cricketStats } = useFetchStatsQuery();
  const { data: userData } = useFetchUserQuery()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateCricketCards(userData.games.cricket))
  }, [userData.games.cricket])

  return (
    <>
      <CardsGalleryView stats={cricketStats} type='cricket' navigation={navigation}/>
    </>
  );
}

export default DashboardView;