import * as React from 'react';

import { getOcrUploadSignedUrl } from '../api';
import styles from '../styles/pages/ocr.less';

export default class OCR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: ''
    };
  }

  async upload() {
    const getUrlRes = await getOcrUploadSignedUrl(this.state.file.name);
  }

  handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
    this.upload();
  }

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="License preview" />);
    } else {
      $imagePreview = (<div className={styles['previewText']}>Please select an Image for Preview</div>);
    }

    return (
      <div className={styles['previewComponent']}>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            className={styles['fileInput']}
            type="file"
            onChange={e => this.handleImageChange(e)}
          />
          <button
            className={styles['submitButton']}
            type="submit"
            onClick={e => this.handleSubmit(e)}
          >
            Upload Image
          </button>
        </form>
        <div className={styles['imgPreview']}>
          {$imagePreview}
        </div>
      </div>
    );
  }
}
