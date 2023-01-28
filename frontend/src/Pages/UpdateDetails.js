import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { loadPosts, loadSinglePost } from "../Redux/Actions/PostAction";

const UpdateDatails = () => {
  const params = useParams();
  const Dispatch = useDispatch();
  const { postLoading, posts, selectedPost } = useSelector(
    (state) => state.Posts
  );

  function createMarkup(theExactHtmlWithTag) {
    return { __html: theExactHtmlWithTag };
  }

  useEffect(() => {
    Dispatch(loadSinglePost(params.id));
  }, [Dispatch, params.id]);

  useEffect(() => {
    if (posts) return;
    Dispatch(loadPosts());
  }, [Dispatch, posts]);

  return (
    <>
      <Helmet>
        {selectedPost && <title>{selectedPost.title} </title>}
        <meta
          name="description"
          content={selectedPost && selectedPost.description}
        />
        <link
          rel="canonical"
          href={
            window.location.origin +
            `/updates/${selectedPost && selectedPost._id}`
          }
        />
        <meta name="author" content="angna" />
        <meta
          name="keywords"
          content={`angna, ${
            selectedPost && selectedPost.title
          }, contest, live contest, jnv garhwa, jnv garhwa alumni`}
        />

        <meta
          property="og:title"
          content={`Angna ${selectedPost && selectedPost.title}`}
        />
        <meta
          property="og:description"
          content={selectedPost && selectedPost.description}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={
            window.location.origin +
            `/updates/${selectedPost && selectedPost._id}`
          }
        />
        <meta
          property="og:image"
          content={selectedPost && selectedPost.poster.url}
        />
      </Helmet>
      <Box py={{ base: "2", md: "4" }}>
        <Center mx={{ base: "2", md: "15%" }}>
          <Grid templateColumns="repeat(6, 1fr)" gap={2}>
            <GridItem colSpan={{ base: "6", md: "6", lg: "4" }}>
              <Box>
                <Box
                  bg="white"
                  borderRadius={"lg"}
                  boxShadow="sm"
                  p={{ base: "1", md: "2" }}
                >
                  <AspectRatio
                    ratio={2 / 1}
                    borderRadius={"lg"}
                    overflow="hidden"
                  >
                    {postLoading ? (
                      <Skeleton h="100%" w="100%"></Skeleton>
                    ) : (
                      <Image
                        src={selectedPost && selectedPost.poster.url}
                        alt={selectedPost && selectedPost.title}
                        title={selectedPost && selectedPost.title}
                        loading="lazy"
                      />
                    )}
                  </AspectRatio>
                  <Box py={{ base: "2", md: "4" }} px="2">
                    {postLoading ? (
                      <VStack>
                        <Skeleton h="40px" w="100%"></Skeleton>
                        <Skeleton h="40px" w="100%"></Skeleton>
                      </VStack>
                    ) : (
                      <Heading as="h1" fontSize={{ base: "lg", md: "xl" }}>
                        {selectedPost && selectedPost.title}
                      </Heading>
                    )}
                  </Box>
                </Box>

                <Box
                  bg={"white"}
                  borderRadius={"lg"}
                  boxShadow="sm"
                  p={{ base: "1", md: "2" }}
                  mt={{ base: "2", lg: "2" }}
                >
                  <HStack>
                    {postLoading ? (
                      <>
                        <Skeleton h="40px" w="20%"></Skeleton>
                        <Skeleton h="40px" w="20%"></Skeleton>
                        <Skeleton h="40px" w="20%"></Skeleton>
                      </>
                    ) : (
                      selectedPost &&
                      selectedPost.categories.map((cat) => (
                        <Badge key={cat._id} bg={"teal.200"} p="1">
                          {cat.name}
                        </Badge>
                      ))
                    )}
                  </HStack>
                  <Box my={{ base: "1", md: "2" }}>
                    {postLoading ? (
                      <VStack>
                        <Skeleton h="10" w="100%"></Skeleton>
                        <Skeleton h="10" w="100%"></Skeleton>
                        <Skeleton h="5" w="100%"></Skeleton>
                        <Skeleton h="5" w="100%"></Skeleton>
                        <Skeleton h="5" w="100%"></Skeleton>
                        <Skeleton h="5" w="100%"></Skeleton>
                        <Skeleton h="5" w="100%"></Skeleton>
                        <Skeleton h="5" w="100%"></Skeleton>
                        <Skeleton h="5" w="100%"></Skeleton>
                        <Skeleton h="5" w="100%"></Skeleton>
                      </VStack>
                    ) : (
                      <>
                        <Text
                          fontSize="md"
                          fontWeight={"medium"}
                          bg="gray.200"
                          p="2"
                        >
                          "{selectedPost && selectedPost.description}"
                        </Text>

                        <Text fontSize="md" fontWeight={"normal"} mt="2" p="2">
                          <span
                            dangerouslySetInnerHTML={createMarkup(
                              selectedPost && selectedPost.content
                            )}
                          />
                        </Text>
                      </>
                    )}
                  </Box>
                  <Divider />
                  {postLoading ? (
                    <Skeleton h="10" w="50%" borderRadius={"full"}></Skeleton>
                  ) : (
                    <Tag size="lg" bg="teal.200" borderRadius="lg" mt="2">
                      <Avatar
                        src={selectedPost && selectedPost.createdBy.avatar.url}
                        size="xs"
                        name={selectedPost && selectedPost.createdBy.name}
                        ml={-1}
                        mr={2}
                      />
                      <TagLabel fontSize="sm">
                        <b>Posted By:</b>{" "}
                        {selectedPost && selectedPost.createdBy.name}
                      </TagLabel>
                    </Tag>
                  )}
                </Box>
              </Box>
            </GridItem>
            <GridItem colSpan={{ base: "6", md: "6", lg: "2" }}>
              <Box
                h="100%"
                bg="white"
                borderRadius={"lg"}
                boxShadow="sm"
                p={3}
                pt="1"
                mt={{ base: "5", lg: "0" }}
              >
                <Center p="2" mt="2">
                  <Heading as="h2" fontSize={"xl"}>
                    Related Updates
                  </Heading>
                </Center>
                {posts &&
                  posts.map((post) => (
                    <Flex
                      bg="orange.100"
                      p="1"
                      borderRadius={"md"}
                      mt="2"
                      key={post._id}
                    >
                      <NavLink to={`/updates/${post._id}`}>
                        <Avatar borderRadius={"md"} src={post.poster.url} />
                      </NavLink>
                      <Box ml="3">
                        <NavLink to={`/updates/${post._id}`}>
                          <Text
                            fontWeight="semibold"
                            fontSize={"sm"}
                            noOfLines="1"
                          >
                            {post.title}
                          </Text>
                        </NavLink>
                        <Text fontSize="12px" noOfLines={2}>
                          {post.description}
                        </Text>
                      </Box>
                    </Flex>
                  ))}
              </Box>
            </GridItem>
          </Grid>
        </Center>
      </Box>
    </>
  );
};

export default UpdateDatails;
