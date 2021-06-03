import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPosts } from "../../actions/post";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getProfiles } from "../../actions/profile";
import EmergencyBtn from "../layout/EmergencyBtn";
import IncidentModal from "../layout/IncidentModal";

const Posts = ({
  isOpcenAdmin,
  getProfiles,
  getPosts,
  post: { posts, loading },
}) => {
  useEffect(() => {
    getProfiles();
    getPosts();
  }, [getPosts, getProfiles]);

  const [show, setShow] = useState(false);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          paddingBottom: "10px",
        }}
      >
        {isOpcenAdmin && <PostForm />}

        {/* Emergecny button */}
        <div className='emergencybtn' onClick={() => setShow(true)}>
          <img src='/icons/incident/Button.png' alt='' />
        </div>
        <IncidentModal onClose={() => setShow(false)} show={show} />
        {/* <EmergencyBtn /> */}

        <div>
          {posts.map(post => (
            <div className='posts'>
              <PostItem key={post._id} post={post} />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  isOpcenAdmin: PropTypes.bool,
};

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile,
  isOpcenAdmin: state.auth.isOpcenAdmin,
});

export default connect(mapStateToProps, { getPosts, getProfiles })(Posts);
