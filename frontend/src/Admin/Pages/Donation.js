import React, { useEffect } from "react";
import {
  Avatar,
  Badge,
  Box,
  Center,
  Divider,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  FaEnvelope,
  FaExclamationTriangle,
  FaEye,
  FaFacebook,
  FaFacebookF,
  FaGoogle,
  FaPhone,
  FaUserEdit,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllPayments } from "../../Redux/Actions/PaymentAction";
import moment from "moment";
const Donation = () => {
  const Dispatch = useDispatch();

  const { payments } = useSelector((state) => state.Payment);
  useEffect(() => {
    Dispatch(getAllPayments());
  }, []);

  return (
    <Box>
      <Center
        h="100%"
        bg="white"
        p="5"
        borderRadius={"lg"}
        _hover={{ boxShadow: "sm" }}
        flexDir="column"
        justifyContent="flex-start"
        alignItems={"start"}
      >
        <TableContainer
          pb="10"
          w="100%"
          css={{
            "&::-webkit-scrollbar": {
              width: "2px",
              height: "10px",
            },
            "&::-webkit-scrollbar-track": {
              width: "1px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "teal",
              borderRadius: "24px",
            },
          }}
        >
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Sl.</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Amount(incl. Tax)</Th>
                <Th>Payment Ids</Th>
                <Th>Date |Time</Th>
                <Th isNumeric>View</Th>
              </Tr>
            </Thead>
            <Tbody>
              {payments &&
                payments.map((u, i, arr) => (
                  <Tr>
                    <Td>
                      <Text>{i + 1}</Text>
                    </Td>

                    <Td fontWeight={"medium"}>{u.payer.name}</Td>
                    <Td fontWeight={"medium"}>{u.payer.email}</Td>
                    <Td fontWeight={"medium"}>+{u.payer.phone}</Td>

                    <Td fontWeight={"600"} fontSize="11">
                      <div>Paid: ₹{u.amount / 100}</div>
                      <div>
                        Integration Tax: ₹{(2 / 100) * (u.amount / 100)}
                      </div>
                      <div>
                        GST: ₹
                        {((18 / 100) * (2 / 100) * (u.amount / 100)).toFixed(3)}
                      </div>
                      <Divider />
                      <div>
                        Total Amount :
                        <Badge bg={"yellow.300"} size={"sm"}>
                          ₹
                          {u.amount / 100 -
                            (
                              (2 / 100) * (u.amount / 100) +
                              (18 / 100) * (2 / 100) * (u.amount / 100)
                            ).toFixed(3)}
                        </Badge>
                      </div>
                    </Td>

                    <Td fontWeight={"600"} fontSize="11">
                      <div>PayID: {u.payment_id}</div>
                      <div>OrderID: {u.order_id}</div>
                    </Td>

                    <Td fontWeight={"medium"} fontSize="12">
                      {moment(u.createdAt).format("DD/MM/YY | h:ma")}
                    </Td>

                    <Td isNumeric>
                      <IconButton
                        size={"sm"}
                        icon={<FaEye />}
                        colorScheme="teal"
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
    </Box>
  );
};

export default Donation;
