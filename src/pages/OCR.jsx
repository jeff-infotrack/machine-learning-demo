import axios from 'axios';
import $ from 'jquery';
import * as React from 'react';

import { getOcrUploadSignedUrl } from '../api';
import styles from '../styles/pages/ocr.less';

export default class OCR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      uploadPercent: 0
    };
  }

  async upload() {
    const getUrlRes = await getOcrUploadSignedUrl(this.state.file.name);

    if (getUrlRes.status === 200 && getUrlRes.data.url) {
      const { file } = this.state;
      // const data = new FormData();
      // data.append('file', file);

      // const config = {
      //   headers: {
      //     'Content-Type': file.type
      //   },
      //   onUploadProgress: (progressEvent) => {
      //     const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);

      //     this.setState({
      //       uploadPercent: percent
      //     });
      //   }
      // };

      // try {
      //   const uploadRes = await (axios.put(getUrlRes.data.url, data, config));
      //   console.log(uploadRes);
      // } catch (err) {
      //   console.log(err);
      // }

      await $.ajax({
        async: true,
        url: getUrlRes.data.url,
        type: 'PUT',
        data: file,
        processData: false,
        contentType: file.type,
        xhr: () => {
          const xhr = $.ajaxSettings.xhr();
          if (xhr.upload) {
            xhr.upload.addEventListener('progress', (e) => {
              if (e.lengthComputable) {
                const percent = Math.round((e.loaded * 100) / e.total);
                // curUploadProgressBar.css('width', percentage + '%');
                this.setState({
                  uploadPercent: percent
                });
              }
            }, false);
          }
          return xhr;
        }
      });
    }
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
    const { imagePreviewUrl, uploadPercent } = this.state;
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
        <span>{uploadPercent}%</span>
      </div>
    );
  }
}
