import { combineReducers } from "redux";
import { ContestReducer } from "./ContestReducers";
import { EventReducers } from "./EventReducers";
import { MeetReducers } from "./MeetReducers";
import { ParticipateReducers } from "./ParticipateReducers";
import { PaymentReducers } from "./PaymentReducers";
import { PostReducers } from "./postReducers";
import { SliderReducers } from "./SliderReducers";
import { UserReducers } from "./UserReducers";

const RootReducers = combineReducers({
  Contests: ContestReducer,
  User: UserReducers,
  Participation: ParticipateReducers,
  Event: EventReducers,
  Posts: PostReducers,
  Sliders: SliderReducers,
  Payment: PaymentReducers,
  Meet: MeetReducers,
});

export default RootReducers;
