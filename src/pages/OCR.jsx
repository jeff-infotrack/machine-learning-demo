import classnames from 'classnames';
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
      dragging: false,
      processing: false,
      document: '',
      validDocument: false,
      documentDetails: undefined
    };
  }

  onDropHandler(e) {
    e.preventDefault();
    this.setDragging(false);
    console.log(e);

    const dt = e.dataTransfer;
    // if (dt.items) {
    //   // Use DataTransferItemList interface to access the file(s)
    //   for (let i = 0; i < dt.items.length; i++) {
    //     if (dt.items[i].kind === 'file') {
    //       const f = dt.items[i].getAsFile();
    //       console.log(`item: file[${i}].name = ${f.name}`);
    //     }
    //   }
    // } else {
    //   // Use DataTransfer interface to access the file(s)

    // }

    for (let i = 0; i < dt.files.length; i++) {
      console.log(`file file[${i}].name = ${dt.files[i].name}`);
    }
    if (dt.files) {
      this.setState(
        {
          file: dt.files[0]
        },
        () => {
          $('input:file').files = [this.state.file];
          this.previewImage(this.state.file);
        }
      );
    }
  }

  getDocumentName(document) {
    let name = 'Unknown';

    switch ((document || '').toLowerCase()) {
      case 'driverlicence':
        name = 'Driver Licence';
        break;
      case 'passport':
        name = 'Passport';
        break;
      default:
        break;
    }

    return name;
  }

  setDragging(on = true) {
    if (this.state.dragging !== on) {
      this.setState({
        dragging: on
      });
    }
  }

  setProcessing(on = true) {
    if (this.state.processing !== on) {
      this.setState({
        processing: on
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('handle uploading-', this.state.file);
    this.process();
  }

  handleImageChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    this.previewImage(file);
  }

  previewImage(file) {
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  clearResults() {
    this.setState({
      uploadPercent: undefined,
      document: '',
      documentDetails: undefined
    });
  }

  dragEnterHandler(e) {
    e.preventDefault();
    this.setDragging(true);
    console.log('enter');
  }

  dragOverHandler(e) {
    e.preventDefault();
  }

  dragLeaveHandler(e) {
    e.preventDefault();
    this.setDragging(false);
    console.log('leave');
  }

  async process() {
    this.clearResults();
    const getUrlRes = await getOcrUploadSignedUrl(this.state.file.name);

    if (getUrlRes.status === 200 && getUrlRes.data.url) {
      const { file } = this.state;
      const { key, url } = getUrlRes.data;

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

        this.setProcessing();

        const classRes = await ocrImageClassification(key);
        console.log(classRes);
        if (classRes.status === 200) {
          this.setState({
            document: classRes.data.document
          });
        }

        const textDetectRes = await ocrImageTextDetect(key, this.state.document);
        if (textDetectRes.status === 200) {
          const documentDetails = textDetectRes.data;

          const validDocument = Object
            .keys(documentDetails)
            .reduce((valid, curVal) => valid || documentDetails(curVal));

          this.setState({
            validDocument,
            documentDetails
          });
          console.log(this.state.documentDetails);
        }
      } catch (err) {
        console.log(err);
      }

      this.setProcessing(false);
    }
  }

  render() {
    const {
      imagePreviewUrl, uploadPercent, processing, document, validDocument, documentDetails, dragging
    } = this.state;

    const previewText = dragging ?
      'Please drop the image here to preview.' :
      'Please select an image containing your driver licence / passport for upload, or you can Drag & Drop here to upload.';

    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="License preview" />);
    } else {
      $imagePreview = (
        <div className={styles['previewText']}>{previewText}</div>
      );
    }

    const documentName = this.getDocumentName(document);
    const previewClass = classnames(
      styles['imgPreview'],
      this.state.dragging ? styles['imgPreview-dragging'] : undefined
    );

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
        <div
          className={previewClass}
          onDragEnter={e => this.dragEnterHandler(e)}
          onDragOver={e => this.dragOverHandler(e)}
          onDragLeave={e => this.dragLeaveHandler(e)}
          onDrop={e => this.onDropHandler(e)}
        >
          {$imagePreview}
        </div>
        <span>
          {uploadPercent && (uploadPercent < 100 ? `Upload progress: ${uploadPercent}%` : <strong>Uploaded</strong>)}
        </span>
        {
          processing && <div>Processing...</div>
        }
        {
          !processing &&
          <div>
            {
              document &&
              <h3 className={styles['resultSet']}>
                {documentName}
              </h3>
            }
            {
              validDocument &&
              documentDetails &&
              <div className={styles['resultSet']}>
                {
                  Object.keys(documentDetails).map(key => <div key={key}><strong style={{ color: '#4F4B48' }}>{key}</strong>: {documentDetails[key]}</div>)
                }
              </div>
            }
          </div>
        }

      </div>
    );
  }
}
