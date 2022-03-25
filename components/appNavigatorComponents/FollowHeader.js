import React from "react";
import { View, Text } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchUser } from "../../redux/actions";
function FollowHeader(props) {
  const username = props.currentUser.username;
  return (
    <View style={{ justifyContent: "center" }}>
      <Text style={{ color: "white", fontFamily: "Lato-Bold", fontSize: 17 }}>
        {username}'s
      </Text>
    </View>
  );
}
const mapDispatchProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, mapDispatchProps)(FollowHeader);
