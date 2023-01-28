import { AspectRatio, Box, Button, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { CgCalendarDates } from "react-icons/cg";
import { NavLink } from "react-router-dom";

const PostCard = ({ post, type }) => {
  return (
    <Box
      mx={type === "slider" ? 1 : 0}
      h="100%"
      flexDirection={"column"}
      justifyContent="space-between"
      boxShadow={"sm"}
      borderRadius="10"
      overflow={"hidden"}
      border="2px solid white"
      bg="white"
    >
      <Box>
        <AspectRatio ratio={1920 / 1080} borderRadius="lg" overflow={"hidden"}>
          <Image
            src={post.poster.url}
            h="100%"
            w="100%"
            alt={post.title}
            title={post.title}
            loading="lazy"
          />
        </AspectRatio>
        <Box display={"flex"} flexDirection="column" m="1">
          <NavLink to={`/updates/${post._id}`}>
            <Text
              fontWeight={"bold"}
              as="h2"
              fontSize={{ base: "14px", md: "18px" }}
              noOfLines="2"
            >
              {post.title}
            </Text>
          </NavLink>
          <Box p="1">
            {type === "slider" ? (
              ""
            ) : (
              <Text fontSize="sm" noOfLines={{ base: 2, md: 3 }}>
                {post.description}
              </Text>
            )}
          </Box>
        </Box>
      </Box>

      <Box w="100%">
        <Box
          display="flex"
          mt="2"
          color="blackAlpha.600"
          alignItems={"center"}
          p="2"
        >
          <Text fontWeight="400">
            <CgCalendarDates />
          </Text>

          <Text fontSize={{ base: "10px", md: "12px" }} fontWeight="400">
            &nbsp; {moment(post.createdDate).format("MMMM Do, YYYY")}
          </Text>
        </Box>
        <NavLink to={`/updates/${post._id}`}>
          <Button
            colorScheme={"orange"}
            mt="1"
            w="100%"
            borderRadius={0}
            size={{ base: "sm", md: "md" }}
          >
            Read More
          </Button>
        </NavLink>
      </Box>
    </Box>
  );
};

export default PostCard;
