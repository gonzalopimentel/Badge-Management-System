import React from "react";

import "./styles/BadgeEdit.css";
import header from "../images/platziconf-logo.svg";
import BadgeForm from "../components/BadgeForm";
import Badge from "../components/Badge";
import api from "../api";
import PageLoading from "../components/PageLoading";

class BadgeEdit extends React.Component {
  state = {
    loading: true,
    error: null,
    form: {
      firstName: "",
      lastName: "",
      email: "",
      jobTitle: "",
      twitter: "",
    },
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async (e) => {
    this.setState({ loading: true, error: null });

    try {
      // Call the API to read the badge id
      const data = await api.badges.read(this.props.match.params.badgeId);

      this.setState({ loading: false, form: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  // Fill the state with input changes
  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });

    try {
      // Sending POST to API
      await api.badges.update(this.props.match.params.badgeId, this.state.form);
      this.setState({ loading: false });

      // To go to /badges
      this.props.history.push("/badges");
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }
    return (
      <React.Fragment>
        <div className="BadgeEdit__hero">
          <img
            className="BadgeEdit__hero-image  img-fluid"
            src={header}
            alt=""
          />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12 mb-4 col-md-6">
              <Badge
                firstName={this.state.form.firstName || "FIRST_NAME"}
                lastName={this.state.form.lastName || "LAST_NAME"}
                jobTitle={this.state.form.jobTitle || "JOB_TITLE"}
                twitter={this.state.form.twitter || "TWITTER"}
                email={this.state.form.email || "EMAIL"}
                avatarUrl="https://www.gravatar.com/avatar/b2ac57ad40fd1c0c894c2944823e1d0a?=identicon"
              />
            </div>

            <div className="col-12 col-md-6">
              <h1>Edit Attendant</h1>
              <BadgeForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formValues={this.state.form}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeEdit;
