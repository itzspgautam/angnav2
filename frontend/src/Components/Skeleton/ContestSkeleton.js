import {
  Box,
  GridItem,
  Skeleton,
  SkeletonCircle,
  Stack,
} from "@chakra-ui/react";
import React from "react";
const repeat = [1, 2, 3, 4, 5, 6];
export const AllContestSkeleton = () => {
  return (
    <>
      {repeat.map((c) => (
        <GridItem w="100%" key={c} mt="10">
          <Box padding="6" boxShadow="lg" bg="white" borderRadius={"lg"}>
            <SkeletonCircle size="10" />
            <Stack mt="2">
              <Skeleton height="20px" />
              <Skeleton height="10px" />
            </Stack>
          </Box>
        </GridItem>
      ))}
    </>
  );
};
