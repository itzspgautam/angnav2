import { Container, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import EventCard from "../Components/Cards/EventCard";

import IconSlider from "../Components/Slider/IconSlider";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCategory,
  loadEvent,
  loadEventByCategory,
} from "../Redux/Actions/EventAction";
import { EventCardSkeleton } from "../Components/Skeleton/EventSkeleton";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const Events = () => {
  const Dispatch = useDispatch();
  const params = useParams();
  const { eventLoading, events, categories } = useSelector(
    (state) => state.Event
  );

  useEffect(() => {
    Dispatch(loadCategory());
  }, [Dispatch]);

  useEffect(() => {
    if (params.id) {
      Dispatch(loadEventByCategory(params.id));
      return;
    }
    Dispatch(loadEvent());
  }, [params.id, Dispatch]);

  return (
    <>
      <Helmet>
        <title>Events | Angna </title>
        <meta
          name="description"
          content="Explore live sessions, live councelling, musical, funny sessions including various types of categories like Medical, Engineering etc."
        />
        <link rel="canonical" href={window.location.origin + "/events"} />
        <meta name="author" content="angna" />
        <meta
          name="keywords"
          content="angna, live councelling, live session, free carrer councelling, online events, jnv Garhwa"
        />

        <meta property="og:title" content="Events | Angna" />
        <meta
          property="og:description"
          content="Explore live sessions, live councelling, musical, funny sessions including various types of categories like Medical, Engineering etc."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.origin + "/contest"} />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/itzspgautam/image/upload/v1664638573/ANGNA/Og_images/usinwkcmr0bwkkxemiff.jpg"
        />
      </Helmet>

      {categories && <IconSlider categories={categories} cardType="events" />}
      <Container maxW="6xl" px="1">
        <Grid
          mt="5"
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={{ base: "5", md: "2" }}
        >
          {eventLoading ? (
            <EventCardSkeleton />
          ) : (
            events &&
            events.map((post) => (
              <GridItem key={post._id} w="100%">
                <EventCard post={post} />
              </GridItem>
            ))
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Events;
