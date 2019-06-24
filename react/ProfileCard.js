import React from "react";
import PropTypes from "prop-types";
import swal from "sweetalert";
import "./ProfileCardDisable.css";

// import logger from "../../logger";

// const _logger = logger.extend("ProfileCard");

const ProfileCard = props => {
  const handleDelete = () => {
    if (props.deleteProfile) {
      if (props.profile.status) {
        swal({
          title: "Are you sure?",
          text: "Please confirm you want to deactivate user",
          icon: "warning",
          buttons: true,
          dangerMode: true
        }).then(willDelete => {
          if (willDelete) {
            props.deleteProfile(props.profile.id);
          } else {
            swal("User is still acitve!");
          }
        });
      } else {
        swal({
          title: "Are you sure?",
          text: "Please confirm you want to reactivate user",
          icon: "warning",
          buttons: true,
          dangerMode: true
        }).then(willDelete => {
          if (willDelete) {
            props.deleteProfile(props.profile.id);
          } else {
            swal("User is still deacitvated!");
          }
        });
      }
    }
  };

  const handleProfClick = e => {
    e.stopPropagation();
    props.selectProfile(props.profile.id);
  };

  const displayDeleteButton = () => {
    if (props.deleteProfile) {
      if (props.profile.status) {
        return (
          <button
            onClick={handleDelete}
            className="btn btn-secondary float-right"
          >
            <em className="fa-1x fas fa-trash-alt" />
          </button>
        );
      } else if (props.profile.status === 0) {
        return (
          <button
            onClick={handleDelete}
            className="btn btn-secondary float-right"
          >
            Reactivate
          </button>
        );
      }
    }
  };

  const checkAvatarUrl = () => {
    if (props.profile.avatarUrl) {
      return props.profile.avatarUrl;
    } else {
      return "http://chittagongit.com/download/129549";
    }
  };

  const checkDisabled = status => {
    let className = "card card-default list-card col-lg-12 mt-3";
    if (status > 0) {
      return className;
    } else {
      return "card card-default list-card col-lg-12 mt-3 disabled-card";
    }
  };

  return (
    <div className="col-lg-4">
      <div
        className={checkDisabled(props.profile.status)}
        style={{ cursor: "pointer" }}
      >
        <div className="card-body text-center">
          <div className="py-4">
            <img
              className="img-fluid rounded-circle img-thumbnail thumb128"
              src={checkAvatarUrl()}
              alt="profile avatar"
            />
          </div>
          <h3 className="m-0 text-bold">
            {props.profile.firstName + " " + props.profile.lastName}
          </h3>
          <p>{props.profile.email}</p>
          <div className="text-right">{displayDeleteButton()}</div>
          <button
            className="btn btn-secondary float-left"
            onClick={handleProfClick}
          >
            <em className="fa-1x fas fa-edit" />
          </button>
        </div>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
    status: PropTypes.number.isRequired
  }),
  deleteProfile: PropTypes.func,
  selectProfile: PropTypes.func
};
export default ProfileCard;
