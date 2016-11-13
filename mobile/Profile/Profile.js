import React from 'react';

import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import Header from './Header';
import EditInfo from './EditMode';
import Recommendation from './Recommendation';
import ModularBanner from '../reusableComponents/Banner/ModularBanner';

const { height, width } = Dimensions.get('window');
const bgImg = require('../assets/bluePatternBackground.png');
const profPic = require('./timallen.jpg');

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  },
  info: {
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 34,
  },
  experience: {
    fontSize: 14,
    marginTop: 10,
  },
  contact: {
    color: '#006600',
    alignItems: 'center',
    fontSize: 20,
    marginTop: 10,
  },
  recommendations: {
    width: 0.9 * width,
    marginTop: 20,
  },
  recTitle: {
    fontSize: 20,
  },
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
    // The state is populated with profile information. It will change on edit.
    // Eventually there may need to be a submit button to trigger a PUT request to DB
    this.state = {
      editMode: false,
      nameText: 'Tim da Toolman',
      experienceText: 'This is all of my experience. I have got lots of experience. Hire me because of me and this and that and boom.',
      contactInfo: '(234)567-8910',
    };
    this.clickOnEdit = this.clickOnEdit.bind(this);

    // Populate arrays to send into 'ModularBanner' component which creates icons next to descriptions
    this.icons = ['wrench','globe','clock'];
    this.descriptions = ['handyman', 'Earth', '385 years'];
  }

  // Toggles edit mode for rendering text boxes or regular info
  clickOnEdit() {
    this.setState({
      editMode: !this.state.editMode,
    });
  }

  //The render method is bloated right now. It should be refactored later to simplify (into Header, editable info, Reviews)
  render() {
    return (
      <View style={styles.container}>
        <Header clickOnEdit={this.clickOnEdit} editMode={this.state.editMode} />
        <ScrollView contentContainerStyle={styles.contentContainer} alwaysBounceVertical>
          <View style={styles.info}>
            <ModularBanner
              iconArr={this.icons}
              propertyArr={this.descriptions}
            />
            {this.state.editMode &&
              <View style={{ width }}>
                <EditInfo />
              </View>
            }
            {!this.state.editMode &&
              <View>
                <Text style={styles.name}> {this.state.nameText} </Text>
                <Text style={styles.experience}>
                  {this.state.experienceText}
                </Text>
                <Text style={styles.contact}>
                  <FontAwesome
                    name="phone"
                    size={20}
                    color="#006600"
                  />
                  {`     ${this.state.contactInfo}`}
                </Text>
              </View>
            }
            <View style={styles.recommendations}>
              <Text style={styles.recTitle}>
                Recommendations
              </Text>
              <Recommendation />
              <Recommendation />
              <Recommendation />
              <Recommendation />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Profile;
