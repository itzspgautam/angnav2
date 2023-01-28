import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Center, HStack, Stack, Text } from "@chakra-ui/layout";
import moment from "moment/moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPArticipation } from "../../Redux/Actions/ParticipateAction";
import { FaEye } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const ParticipationTab = () => {
  const Dispatch = useDispatch();
  const { myParticipation, partLoading } = useSelector(
    (state) => state.Participation
  );

  useEffect(() => {
    Dispatch(getMyPArticipation());
  }, []);

  return (
    <Box mt="1">
      <HStack
        justifyContent={"space-evenly"}
        p="2"
        bg="orange"
        borderRadius={"10px 10px 0 0"}
      >
        <Box fontWeight={"bold"} width="10%">
          Sl. No
        </Box>
        <Box width="60%" fontWeight={"bold"}>
          Contest
        </Box>
        <Box width="20%" fontWeight={"bold"}>
          Date
        </Box>
        <Box width="10%" fontWeight={"bold"}>
          View
        </Box>
      </HStack>
      {myParticipation && myParticipation.length < 1 ? (
        <Center flexDirection={"column"} p="5">
          You haven't participated in any contest.{" "}
          <NavLink to="/contests">
            <Button size="sm" colorScheme={"green"}>
              Click Here to participate
            </Button>
          </NavLink>
        </Center>
      ) : (
        myParticipation &&
        myParticipation.map((con, i, arr) => (
          <HStack
            key={con._id}
            justifyContent={"space-evenly"}
            p="2"
            bg="gray.200"
            _hover={{ bg: "gray.400" }}
          >
            <Box width="10%">{i + 1}</Box>
            <Box width="60%">{con.contest.title}</Box>
            <Box width="20%">
              {moment(con.submission_time).format("MMM Do, Y")}
            </Box>
            <Box width="10%">
              <NavLink to={`/contests/${con.contest._id}/participate`}>
                <IconButton colorScheme={"yellow"} icon={<FaEye />} />
              </NavLink>
            </Box>
          </HStack>
        ))
      )}
    </Box>
  );
};

export default ParticipationTab;
