import styled from "styled-components";

export const Container = styled.View`
  margin-horizontal: 10px;
  flex: 1;
  align-items: center;
`;

export const Card = styled.TouchableOpacity`
  width: 100%;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const UserImgWrapper = styled.View`
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const UserImg = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #000;
`;

export const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 80%;
  border-bottom-color: #cccccc;
`;

export const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-family: "Lato-Bold";
`;

export const PostTime = styled.Text`
  font-size: 11px;
  color: #666;
  font-family: "Lato-Regular";
`;

export const MessageText = styled.Text`
  font-size: 12.5px;
  overflow: hidden;
  flex-wrap: nowrap;
  color: #5c5c5c;
`;
