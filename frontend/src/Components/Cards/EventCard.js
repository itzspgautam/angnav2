import {
  AspectRatio,
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import moment from "moment/moment";
import React from "react";
import { CgCalendarDates, CgUser } from "react-icons/cg";
import { NavLink } from "react-router-dom";

const EventCard = ({ post, type }) => {
  return (
    <Box
      mx="1"
      bg="white"
      h="100%"
      borderRadius="lg"
      boxShadow={"lg"}
      overflow="hidden"
      display={"flex"}
      flexDir="column"
      justifyContent={"space-between"}
    >
      <Box>
        <AspectRatio ratio={1} borderRadius="lg" overflow={"hidden"}>
          <Image
            src={post.poster.url}
            title={post.title}
            alt={post.title}
            loading="eager"
          />
        </AspectRatio>

        <Box p="2">
          {type === "slider" ? (
            ""
          ) : (
            <HStack>
              {post.categories &&
                post.categories.map((category) => (
                  <Badge
                    key={category._id}
                    fontWeight="bold"
                    textTransform="uppercase"
                    size="sm"
                    letterSpacing="wide"
                    colorScheme={"purple"}
                  >
                    {category.name}
                  </Badge>
                ))}
            </HStack>
          )}
          <NavLink to={`/events/${post._id}`}>
            <Text
              mt={1}
              display="block"
              fontWeight="bold"
              noOfLines={2}
              fontSize={{ base: "14px", md: "18px" }}
            >
              {post.title}
            </Text>
          </NavLink>
        </Box>
      </Box>

      <Box>
        <Box p="2">
          <Box display="flex" color="blackAlpha.600" alignItems={"center"}>
            <Text fontWeight="400">
              <CgUser />
            </Text>
            <Text
              noOfLines={1}
              fontSize={{ base: "10px", md: "12px" }}
              fontWeight="400"
            >
              &nbsp; {post.guestSpeaker}
            </Text>
          </Box>
          <Box display="flex" color="blackAlpha.600" alignItems={"center"}>
            <Text fontWeight="400">
              <CgCalendarDates />
            </Text>
            <Text fontSize={{ base: "10px", md: "12px" }} fontWeight="400">
              &nbsp; {moment(post.createdDate).format("MMMM Do, YYYY")}
            </Text>
          </Box>
        </Box>
        <NavLink to={`/events/${post._id}`}>
          <Box display={"flex"} justifyContent="flex-end">
            <Button
              w="100%"
              borderRadius={0}
              colorScheme="teal"
              size={{ base: "sm", md: "md" }}
            >
              View More
            </Button>
          </Box>
        </NavLink>
      </Box>
    </Box>
  );
};

export default EventCard;
