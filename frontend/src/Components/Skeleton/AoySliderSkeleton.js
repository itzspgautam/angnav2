import { Box, HStack, Show, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import React from "react";

const AoySliderSkeleton = () => {
  return (
    <HStack p="2" alignItems={"center"}>
      <Box
        bg="white"
        p="4"
        w="100%"
        borderRadius={"lg"}
        display="flex"
        gap="2"
        alignItems={"center"}
      >
        <Box>
          <SkeletonCircle size={{ base: "100", md: "150" }} />
        </Box>
        <Box flexGrow={1} gap="5">
          <Skeleton h="8" />
          <Skeleton h="2" mt="2" />
          <Skeleton h="2" mt="2" />
          <Skeleton h="2" mt="2" />
          <Skeleton h="2" mt="2" />
          <Skeleton h="2" mt="2" />
        </Box>
      </Box>
      <Show above="md">
        <Box
          bg="white"
          p="4"
          w="100%"
          borderRadius={"lg"}
          display="flex"
          gap="2"
          alignItems={"center"}
        >
          <Box>
            <SkeletonCircle size={{ base: "100", md: "150" }} />
          </Box>
          <Box flexGrow={1} gap="5">
            <Skeleton h="8" />
            <Skeleton h="2" mt="2" />
            <Skeleton h="2" mt="2" />
            <Skeleton h="2" mt="2" />
            <Skeleton h="2" mt="2" />
            <Skeleton h="2" mt="2" />
          </Box>
        </Box>
      </Show>
    </HStack>
  );
};

export default AoySliderSkeleton;
