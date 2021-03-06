import React from 'react';
import { API_ENDPOINT } from '../../lib/constants/api';

import './index.css';

class FileUpload extends React.Component {
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

  uploadFile() {
    const data = new FormData();
    data.append('file', this.fileInput.files[0]);
    data.append('filename', 'image');
    data.append('item_type', 'user');
    data.append('item_id', this.props.item_id);
    // const { postFile } = this.props;
    // postFile(data);
    this.setState({
      loading: true,
      success: false,
    });

    fetch(`${API_ENDPOINT}/attachments`, {
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
      <div className="react-carousel">
        <input ref={(ref) => { this.fileInput = ref; }} type="file" name="file" encType="multipart/form-data" />
        <p onClick={this.uploadFile}>upload</p>
        <div className="feedback">
          {loading ? (
            <p>
              Loading...
            </p>
          ) : (
            null
          )}
          {success ? (
            <p>
              Success!
            </p>
          ) : (
            null
          )}
          {error ? (
            <p>
              {error}
            </p>
          ) : (
            null
          )}
        </div>
      </div>
    );
  }
}

export default FileUpload;
