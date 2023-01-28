import { Box, GridItem, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
const repeat = [1, 2, 3, 4, 5, 6, 7, 8];
export const EventCardSkeleton = () => {
  return (
    <>
      {repeat.map((c) => (
        <GridItem w="100%" key={c}>
          <Box padding="2" boxShadow="lg" bg="white" borderRadius={"lg"}>
            <Skeleton h="40" w="100%" borderRadius={"lg"} />
            <Stack flexGrow={1} mt="2">
              <Skeleton height="20px" /> <Skeleton height="20px" />
              <Skeleton height="5px" />
              <Skeleton height="5px" />
              <Skeleton height="5px" />
              <Skeleton height="5px" />
              <Skeleton height="5px" />
            </Stack>
            <Stack pt={"2"}>
              <Skeleton height="30px" borderRadius={"lg"} />
            </Stack>
          </Box>
        </GridItem>
      ))}
    </>
  );
};
