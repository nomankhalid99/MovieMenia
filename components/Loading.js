import { View, useWindowDimensions } from "react-native";
import * as Progress from "react-native-progress";

const Loading = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  return (
    <View
      style={{ width: windowWidth, height: windowHeight }}
      className="absolute flex-row justify-center items-center "
    >
      <Progress.CircleSnail thickness={12} size={160} color={"#E6A706"}/>
    </View>
  );
};

export default Loading;
