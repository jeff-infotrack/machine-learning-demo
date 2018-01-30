// import axios from 'axios';
import $ from 'jquery';
import * as React from 'react';

import { getOcrUploadSignedUrl, ocrImageClassification, ocrImageTextDetect } from '../api';
import styles from '../styles/pages/ocr.less';

export default class OCR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      uploadPercent: undefined,
      document: ''
    };
  }

  async upload() {
    const getUrlRes = await getOcrUploadSignedUrl(this.state.file.name);

    if (getUrlRes.status === 200 && getUrlRes.data.url) {
      const { file } = this.state;
      const { key, url } = getUrlRes.data;
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

      try {
        await $.ajax({
          async: true,
          url,
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
                  this.setState({
                    uploadPercent: percent
                  });
                }
              }, false);
            }
            return xhr;
          }
        });

        const classRes = await ocrImageClassification(key);
        console.log(classRes);
        if (classRes.status === 200) {
          this.setState({
            document: classRes.data.Document
          });
        }

        // const textDetectRes = await ocrImageTextDetect(key, this.state.document);
        // if (textDetectRes.status === 200) {
        //   this.setstate({

        //   });
        // }
      } catch (err) {
        console.log(err);
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
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
    const { imagePreviewUrl, uploadPercent, document } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="License preview" />);
    } else {
      $imagePreview = (<div className={styles['previewText']}>Please select an image containing your driver licence / passport for preview</div>);
    }

    return (
      <div className={styles['previewComponent']}>
        <h1 className="page-title">
          Driver License / Passport OCR
        </h1>
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
        <span>
          {uploadPercent && `${uploadPercent}%`}
        </span>
        {
          document &&
          <div>
            {document}
          </div>
        }
      </div>
    );
  }
}
