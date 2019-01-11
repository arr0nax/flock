require('es6-promise').polyfill();
require('fetch-everywhere');
import * as React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import Env from 'mobile/env';
import { ImagePicker } from 'expo';

class ImageUpload
 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      loading: false,
      error: '',
      files: null,
    };

    this.uploadFile = this.uploadFile.bind(this);
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.uploadFile(result)
      this.setState({ image: result.uri });
    }
  };

  uploadFile(image) {
    const data = new FormData();
    data.append('file', {uri: image.uri, name: 'image.jpg', type: 'multipart/form-data'});
    data.append('filename', 'image');
    data.append('item_type', 'user');
    data.append('item_id', 0);
    // const { postFile } = this.props;
    // postFile(data);
    this.setState({
      loading: true,
      success: false,
    });

    console.log(image);

    fetch(`${Env.API_ENDPOINT}/attachments`, {
      method: 'POST',
      body: data,
      headers: {
        'Authorization': 'Bearer ' + this.props.auth,
      }

    }).then((response) => {
      response.json().then(() => {
        this.setState({
          success: true,
          loading: false,
        });
      })
        .catch((e) => {
          this.setState({
            success: false,
            loading: false,
            error: e,
          });
        });
    });
  }

  render() {
    const { success, error, loading } = this.state;
    return (
      <View style={{ width: 50, height: 50 }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        <Text onClick={this.uploadFile}>upload</Text>
        <View className="feedback">
          {loading ? (
            <Text>
              Loading...
            </Text>
          ) : (
            null
          )}
          {success ? (
            <Text>
              Success!
            </Text>
          ) : (
            null
          )}
          {error ? (
            <Text>
              {error}
            </Text>
          ) : (
            null
          )}
        </View>
      </View>
    );
  }
}

export default ImageUpload
;
