import { Container, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect } from "react";

import IconSlider from "../Components/Slider/IconSlider";
import { useDispatch, useSelector } from "react-redux";

import { EventCardSkeleton } from "../Components/Skeleton/EventSkeleton";
import { useParams } from "react-router-dom";
import PostCard from "../Components/Cards/PostCard";
import {
  loadPostCategory,
  loadPosts,
  loadPostsByCategory,
} from "../Redux/Actions/PostAction";

import { Helmet } from "react-helmet";

const Updates = () => {
  const Dispatch = useDispatch();
  const params = useParams();

  const { postLoading, posts, postCategories } = useSelector(
    (state) => state.Posts
  );

  useEffect(() => {
    Dispatch(loadPostCategory());
  }, [Dispatch]);

  useEffect(() => {
    if (params.id) {
      Dispatch(loadPostsByCategory(params.id));
      return;
    }
    Dispatch(loadPosts());
  }, [params.id, Dispatch]);

  return (
    <>
      <Helmet>
        <title>Updates | Angna </title>
        <meta
          name="description"
          content="Stay updated with latest updates, news, results, and achivemnets by
          Association of Garhwa Navodaya Alumni (Angna)"
        />
        <link rel="canonical" href={window.location.origin + "/updates"} />
        <meta name="author" content="angna" />
        <meta
          name="keywords"
          content="angna, news, angna updates, angna results, jnv garhwa, updates"
        />

        <meta property="og:title" content="Updates | Angna" />
        <meta
          property="og:description"
          content="Stay updated with latest updates, news, results, and achivemnets by
          Association of Garhwa Navodaya Alumni (Angna)"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.origin + "/updates"} />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/itzspgautam/image/upload/v1664636598/ANGNA/Og_images/lzose5mu6uqnmfgrvnlw.jpg"
        />
      </Helmet>

      {postCategories && (
        <IconSlider categories={postCategories} cardType="updates" />
      )}
      <Container maxW="6xl" px="1">
        <Grid
          mt="5"
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={2}
        >
          {postLoading ? (
            <EventCardSkeleton />
          ) : (
            posts &&
            posts.map((post) => (
              <GridItem w="100%" key={post._id}>
                <PostCard post={post} />
              </GridItem>
            ))
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Updates;
