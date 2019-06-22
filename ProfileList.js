import React from "react";
import * as profileService from "../../services/profileService";
import * as usersService from "../../services/usersService";
import ProfileCard from "./ProfileCard";
import {
  Row,
  Col,
  Button,
  InputGroup,
  InputGroupAddon,
  Input
} from "reactstrap";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
// import logger from "../../logger";

// const _logger = logger.extend("ProfileList");

class ProfileList extends React.Component {
  state = {
    list: {},
    componentList: [],
    redirect: false,
    query: "",
    selectId: 0,
    pageIndex: 0,
    pageSize: 6,
    totalPages: 0,
    pageNumber: 0
  };

  componentDidMount = () => {
    profileService
      .getProfiles(this.state.pageIndex, this.state.pageSize)
      .then(this.onGetSuccess)
      .catch(this.onGetError);
  };

  onGetSuccess = resp => {
    this.setState(() => {
      return {
        list: resp.item,
        componentList: resp.item.pagedItems.map(this.mapList),
        totalPages: resp.item.totalPages
      };
    });
  };

  mapList = profile => {
    return (
      <ProfileCard
        profile={profile}
        key={profile.id}
        deleteProfile={this.deleteProfile}
        selectProfile={this.selectProfile}
      />
    );
  };

  onGetError = () => {
    swal("No profiles found");
  };

  deleteProfile = id => {
    profileService
      .getById(id)
      .then(this.onGetProfileSuccess)
      .catch(this.onDeleteByIdError);
  };

  onGetProfileSuccess = resp => {
    usersService
      .deactivateUser(resp.item.userId)
      .then(this.onDeleteByIdSuccess)
      .catch(this.onDeleteByIdError);
  };

  onDeleteByIdSuccess = () => {
    if (this.state.query) {
      profileService
        .searchProfiles(
          this.state.pageNumber,
          this.state.pageSize,
          this.state.query
        )
        .then(this.onGetSuccess)
        .catch(this.onError);
    } else {
      profileService
        .getProfiles(this.state.pageIndex, this.state.pageSize)
        .then(this.onGetSuccess)
        .catch(this.onError);
    }
  };

  onDeleteByIdError = err => {
    swal("There was an error deleting, please try again", err);
  };

  selectProfile = id => {
    this.setState(() => {
      return {
        redirect: true,
        selectId: id
      };
    });
  };

  changeHandler = evt => {
    let key = evt.target.name;
    let val = evt.target.value;
    this.setState(() => {
      return {
        [key]: val
      };
    });
  };

  searchClickHandler = () => {
    let pageNumber = 0;
    profileService
      .searchProfiles(pageNumber, this.state.pageSize, this.state.query)
      .then(this.onGetSuccess)
      .catch(this.onGetError);
  };

  keyPress = e => {
    if (e.keyCode === 13) {
      let pageNumber = 0;
      profileService
        .searchProfiles(pageNumber, this.state.pageSize, this.state.query)
        .then(this.onGetSuccess)
        .catch(this.onGetError);
    }
  };

  clearSearch = () => {
    this.setState({ query: "", pageIndex: 0, pageNumber: 0 }, () => {
      profileService
        .getProfiles(this.state.pageIndex, this.state.pageSize)
        .then(this.onGetSuccess)
        .catch(this.onGetError);
    });
  };

  nextClick = () => {
    if (this.state.list.hasNextPage) {
      this.setState(
        () => {
          return {
            pageIndex: this.state.pageIndex + 1
          };
        },
        () => {
          if (this.state.query) {
            this.setState(
              () => {
                return { pageNumber: this.state.pageNumber + 1 };
              },
              () => {
                if (this.state.totalPages > this.state.pageNumber) {
                  profileService
                    .searchProfiles(
                      this.state.pageNumber,
                      this.state.pageSize,
                      this.state.query
                    )
                    .then(this.onGetSuccess)
                    .catch(this.onGetError);
                }
              }
            );
          } else {
            profileService
              .getProfiles(this.state.pageIndex, this.state.pageSize)
              .then(this.onGetSuccess)
              .catch(this.onGetError);
          }
        }
      );
    }
  };

  prevClick = () => {
    if (this.state.list.hasPreviousPage) {
      this.setState(
        () => {
          return {
            pageIndex: this.state.pageIndex - 1
          };
        },
        () => {
          if (this.state.query) {
            this.setState(
              () => {
                return { pageNumber: this.state.pageNumber - 1 };
              },
              () => {
                if (this.state.pageNumber >= 0) {
                  profileService
                    .searchProfiles(
                      this.state.pageNumber,
                      this.state.pageSize,
                      this.state.query
                    )
                    .then(this.onGetSuccess)
                    .catch(this.onGetError);
                }
              }
            );
          } else {
            profileService
              .getProfiles(this.state.pageIndex, this.state.pageSize)
              .then(this.onGetSuccess)
              .catch(this.onGetError);
          }
        }
      );
    }
  };

  render() {
    if (this.state.redirect === true) {
      return (
        <Redirect
          to={{
            pathname: `/admin/users/profiles/edit/${this.state.selectId}`,
            state: { id: { ...this.state.selectId } }
          }}
        />
      );
    }

    return (
      <div className="content-wrapper">
        <div className="ml-3 mr-3">
          <Row className="px-3">
            <InputGroup>
              <Input
                bsSize="lg"
                placeholder="Search by Company Name, Description, Business Type, or Resource Type"
                onChange={this.changeHandler}
                name="query"
                onKeyDown={this.keyPress}
                value={this.state.query}
              />
              <InputGroupAddon addonType="append">
                <Button
                  outline
                  color="secondary"
                  onClick={this.searchClickHandler}
                >
                  <em className="fas fa-search" />
                </Button>
              </InputGroupAddon>
              <InputGroupAddon addonType="append">
                <Button outline color="secondary" onClick={this.clearSearch}>
                  <em className="fas fa-undo-alt" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Row>
          <div>
            <Row>{this.state.componentList}</Row>
          </div>
          <Row>
            <Col xs="3">
              <Button
                className="button4 list-card"
                size="lg"
                block
                onClick={this.prevClick}
              >
                Previous
              </Button>
            </Col>
            <Col xs="6" />
            <Col xs="3">
              <Button
                className="button4 list-card"
                size="lg"
                block
                onClick={this.nextClick}
              >
                Next
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

ProfileList.propTypes = {
  history: PropTypes.object
};

export default ProfileList;
