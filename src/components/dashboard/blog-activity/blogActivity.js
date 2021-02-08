import React from "react";
import {
    Card,
    CardBody
} from 'reactstrap';


import imageHeader from "../../../assets/images/big/img5.jpg";


const BlogActivity = () => {
    return (
        /*--------------------------------------------------------------------------------*/
        /* Used In Dashboard-1 [Classic]                                                  */
        /*--------------------------------------------------------------------------------*/
        <Card>
            <img className="card-img-top img-fluid auto-height" src={imageHeader} alt="img" />
            <CardBody>
                <h3 className="font-normal">Great news for the new year 2021</h3>
                <span className="badge badge-info badge-pill">Technology</span>
                <p className="mb-0 mt-3 font-16 pb-2">Titudin venenatis ipsum aciat. Vestibu ullamer quam. nenatis ipsum ac feugiat. Ibulum ullamcorper.</p>
                <div className="d-flex mt-4">
                    <a href="/" className="font-16">Read more</a>
                </div>
            </CardBody>
        </Card>
    );
}

export default BlogActivity;
