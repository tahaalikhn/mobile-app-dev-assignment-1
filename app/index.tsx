
import Exercise from "@/app/Exercise/Exercise";
import { Provider } from "react-redux";
import { store } from "./Store";

export default function Home() {
  

  return (
    <Provider store={store}>
      <Exercise />
    </Provider>
  );
}
