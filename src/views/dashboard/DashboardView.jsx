import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFetchCricketCollectionQuery, useFetchStatsQuery } from '../../redux/features/api';
import { updateCricketCards } from '../../redux/features/cricket-slice';
import CardsGalleryView from '../cards-gallery/CardsGalleryView';
import { io } from "socket.io-client";
const socket = io("http://192.168.29.168:8080");

const DashboardView = () => {
  const {data: cricketStats} = useFetchStatsQuery();
  const {data: cricketCollection} = useFetchCricketCollectionQuery();
  const dispatch = useDispatch();

  socket.on("connect", () => {
    console.log(socket.id);
  });
  
  useEffect(() => {
    socket.on("start", (args, cb) => {
      console.log("Starting Game");
      console.log("Loading complete");
      cb(socket.id);

      socket.on('question1', (args, cb) => {
        console.log(args)
      })
    });
  }, []);

  useEffect(() => {
    dispatch(updateCricketCards(cricketCollection))
  }, [cricketCollection])
  
  return (
    <>
    <CardsGalleryView stats={cricketStats} type='cricket' socket={socket}/>
  </>
  );
}

export default DashboardView;