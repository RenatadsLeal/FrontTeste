import './style.css';
import { useState } from "react";
import { Modal } from "react-bootstrap"
import ImageGallery from 'react-image-gallery';
import { useProductContext } from '../../../../contexts/ProductContext';

import { useMediaQuery } from 'react-responsive';

const Image = () => {

    const { product } = useProductContext();

    const displayImages = product.images?.slice(0, 5);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const mediaQuery = useMediaQuery({ maxWidth: 825 });

    return (
        <div>
            {mediaQuery && product.images ?

                <ImageGallery
                    items={product.images}
                    showThumbnails={false}
                    thumbnailPosition={"bottom"}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    showIndex={true}
                    autoPlay={true}
                    slideDuration={3000}
                    
                />

                :

                <div id="galleryImage">
                    <div id="galleryThumbnail">

                        {
                            displayImages?.map((productImage, index) => {
                               
                                return (
                                    <div className={`thumbnailProduct${index + 1}`} key={index}>
                                        <img loading="lazy" className="thumbnailImage" src={productImage.original} alt="" />
                                    </div>
                                )
                            })
                        }

                        <button className="modalButton" variant="primary" onClick={handleShow}>
                            Ver mais
                        </button>
                    </div>

                    <div id="galleryModal">
                        <Modal show={show} onHide={handleClose} size="lg" centered>

                            <Modal.Header bsPrefix="modal-header" closeButton></Modal.Header>

                            <Modal.Body bsPrefix="modal-body">

                                <ImageGallery
                                    items={product.images}
                                    showThumbnails={true}
                                    thumbnailPosition={"bottom"}
                                    showPlayButton={false}
                                    showFullscreenButton={true}
                                    showIndex={true}
                                />
                            </Modal.Body>

                        </Modal>
                    </div>
                </div>
            }
        </div>
    )

}

export default Image;