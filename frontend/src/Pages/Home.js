import React, { useEffect } from "react";
import LatestSlider from "../Components/CardSlider/LatestSlider";
import MissionVision from "../Components/MissionVision/MissionVision";
import AlumniYear from "../Components/Slider/AlumniYear";
import Hero from "../Components/Slider/Hero";

import DrawerMenu from "../Components/Header/DrawerMenu";
import LoginModal from "../Components/Authentication/LoginModal";
import { getAllAoy, getAllHero } from "../Redux/Actions/SliderAction";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@chakra-ui/react";
import AoySliderSkeleton from "../Components/Skeleton/AoySliderSkeleton";
import { loadEvent } from "../Redux/Actions/EventAction";
import { loadPosts } from "../Redux/Actions/PostAction";
import { Helmet } from "react-helmet";

function Home() {
  const Dispatch = useDispatch();

  //config
  const { hero, aoy } = useSelector((state) => state.Sliders);
  const { events } = useSelector((state) => state.Event);
  const { posts } = useSelector((state) => state.Posts);

  useEffect(() => {
    Dispatch(loadEvent());
    Dispatch(loadPosts());
  }, []);
  useEffect(() => {
    if (hero && hero.hero) return;
    Dispatch(getAllHero());
    if (aoy && aoy.aoy) return;
    Dispatch(getAllAoy());
    if (hero && hero.hero) return;
  }, [Dispatch]);

  return (
    <>
      <Helmet>
        <title>Angna | Association of Garhwa Navodaya Alumni </title>
        <meta
          name="description"
          content="Welcome to ANGNA. Is is an Association of Garhwa Navodaya Alumni."
        />
        <link rel="canonical" href={window.location.origin + "/"} />
        <meta name="author" content="angna" />
        <meta
          name="keywords"
          content="angna, jnv angna, association of garhwa navodaya alumni, jnv garhwa, live councelling, live contest, live session, jawahar navodaya vidyalaya, nvs, jnv"
        />

        <meta
          property="og:title"
          content="Angna | Association of Garhwa Navodaya Alumni"
        />
        <meta
          property="og:description"
          content="Welcome to ANGNA. Is is an Association of Garhwa Navodaya Alumni."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.origin + "/home"} />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/itzspgautam/image/upload/v1664638573/ANGNA/Og_images/qzo0p9a0poglwhfc5ugx.jpg"
        />
      </Helmet>
      <LoginModal />
      {hero && hero.hero ? (
        <Hero sliderData={hero.hero} />
      ) : (
        <Skeleton
          h={{ base: "30vh", md: "60vh", lg: "100vh" }}
          w="100%"
        ></Skeleton>
      )}

      {aoy && aoy.aoy ? (
        <AlumniYear sliderData={aoy.aoy} />
      ) : (
        <AoySliderSkeleton />
      )}

      <DrawerMenu />

      {posts && (
        <LatestSlider
          title="Latest Updates"
          latestData={posts && posts}
          sm={2}
          md={2}
          lg={4}
          xl={4}
          renderComponent="PostCard"
        />
      )}
      {events && (
        <LatestSlider
          title="Live Sessions"
          latestData={events && events}
          sm={2}
          md={2}
          lg={4}
          xl={4}
          renderComponent="EventCard"
        />
      )}
      <MissionVision />
    </>
  );
}

export default Home;
