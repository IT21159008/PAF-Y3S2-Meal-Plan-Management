import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Modal, Row, Col, Form } from "react-bootstrap";
import AddMealPlanForm from "./AddMealPlanForm";
import UpdateMealPlanForm from "./UpdateMealPlanForm";
import { BiSolidLike } from "react-icons/bi";
import { PiShareFatFill } from "react-icons/pi";
import { FaRegCommentDots } from "react-icons/fa6";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import "./MealPlanPage.css";

const MealPlanPage = () => {
  const [show, setShow] = useState(false);
  const [mealPlans, setMealPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const [showAddMealPlanForm, setShowAddMealPlanForm] = useState(false);
  const [updateMealPlanDetails, setUpdateMealPlanDetails] = useState(null);
  const [likedMealPlans, setLikedMealPlans] = useState({});

  useEffect(() => {
    fetchMealPlans();
  }, []);

  const fetchMealPlans = () => {
    axios
      .get("http://localhost:8090/mealplan")
      .then((response) => {
        setMealPlans(response.data);
        // Initialize liked meal plans with default values
        const defaultLikes = response.data.reduce((acc, mealPlan) => {
          acc[mealPlan.id] = 0;
          return acc;
        }, {});
        setLikedMealPlans(defaultLikes);
      })
      .catch((error) => console.error("Error fetching meal plans:", error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUpdateMealPlanDetails(null);
  };

  const handleShowModal = (showAddForm) => {
    setShowModal(true);
    setShowAddMealPlanForm(showAddForm);
  };

  const handleCardClick = (mealPlan) => {
    setSelectedMealPlan(mealPlan);
    setShowAddMealPlanForm(false);
    setShowModal(true);
  };

  const handleUpdate = () => {
    setUpdateMealPlanDetails(selectedMealPlan);
    setShowAddMealPlanForm(false);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8090/mealplan/${selectedMealPlan.id}`
      );
      fetchMealPlans();
      handleCloseModal();
      alert("delete success");
    } catch (error) {
      console.error("Error deleting meal plan:", error);
    }
  };

  const handleLike = (mealPlanId) => {
    setLikedMealPlans((prevLikedMealPlans) => ({
      ...prevLikedMealPlans,
      [mealPlanId]: prevLikedMealPlans[mealPlanId] + 1,
    }));
  };

  const handleShareWhatsApp = () => {
    if (selectedMealPlan) {
      const message = `Check out this meal plan: ${selectedMealPlan.name}\nDescription: ${selectedMealPlan.description}`;
      const encodedMessage = encodeURIComponent(message);
      const url = `https://api.whatsapp.com/send?text=${encodedMessage}`;
      window.open(url, "_blank");
    }
  };

  const handleShareFacebook = () => {
    if (selectedMealPlan) {
      const url = encodeURIComponent(window.location.href);
      const quote = encodeURIComponent(
        `Check out this meal plan: ${selectedMealPlan.name}`
      );
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`;
      window.open(facebookShareUrl, "_blank");
    }
  };

  const handleShareTwitter = () => {
    if (selectedMealPlan) {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(
        `Check out this meal plan: ${selectedMealPlan.name}`
      );
      const twitterShareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      window.open(twitterShareUrl, "_blank");
    }
  };

  return (
    <div className="meal-plan-page">
      <h1>Meal Plans</h1>
      <br />
      <Button
        className="add-meal-plan-button"
        onClick={() => handleShowModal(true)}
      >
        Add New Meal Plan
      </Button>
      <br />
      <br />
      <div className="meal-plan-container">
        {mealPlans.map((mealPlan) => (
          <Card key={mealPlan.id} className="meal-plan-card">
            <Card.Body>
              <Card.Title onClick={() => handleCardClick(mealPlan)}>
                {mealPlan.name}
              </Card.Title>
              <Card.Text>{mealPlan.description}</Card.Text>
              <Card.Img variant="top" src={mealPlan.image} />
              <div
                className="card-buttons"
                style={{ alignItems: "center", marginLeft: "-11px" }}
              >
                <button
                  className={`fb-button like-button ${
                    likedMealPlans[mealPlan.id] > 0 ? "liked" : ""
                  }`}
                  onClick={() => handleLike(mealPlan.id)}
                >
                  <BiSolidLike />
                  <span className="like-count">
                    {likedMealPlans[mealPlan.id]}
                  </span>
                  Like
                </button>
                <button className="fb-button comment-button">
                  <FaRegCommentDots />
                  <i className="far fa-comment"></i> Comment
                </button>

                <button
                  className="fb-button share-button"
                  onClick={() => setShow(true)}
                >
                  <PiShareFatFill />
                  <i className="fas fa-share"></i> Share
                </button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      {/* share model */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Share Your Meal Plan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button
              onClick={handleShareWhatsApp}
              style={{
                border: "none",
                background: "none",
                color: "#25D366",
              }}
            >
              <FaWhatsappSquare size={30} />
            </button>
            <button
              onClick={handleShareFacebook}
              style={{ border: "none", background: "none", color: "#3b5998" }}
            >
              <FaFacebookSquare size={30} />
            </button>
            <button
              onClick={handleShareTwitter}
              style={{ border: "none", background: "none", color: "#1DA1F2" }}
            >
              <FaTwitterSquare size={30} />
            </button>
            <button
              style={{ border: "none", background: "none", color: "#E1306C" }}
            >
              <FaInstagramSquare size={30} />
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {showAddMealPlanForm ? "Add New Meal Plan" : "Meal Plan Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAddMealPlanForm ? (
            <AddMealPlanForm
              fetchMealPlans={fetchMealPlans}
              handleCloseModal={handleCloseModal}
            />
          ) : updateMealPlanDetails !== null ? (
            <UpdateMealPlanForm
              fetchMealPlans={fetchMealPlans}
              handleCloseModal={handleCloseModal}
              mealPlanDetails={updateMealPlanDetails}
            />
          ) : (
            selectedMealPlan && (
              <div>
                <h2>{selectedMealPlan.name}</h2>
                <p>Description: {selectedMealPlan.description}</p>
                <p>Ingredients: {selectedMealPlan.ingredients}</p>
                <p>Recipe: {selectedMealPlan.recipe}</p>
                <center>
                  <Row>
                    <Col>
                      <Button variant="primary" onClick={handleUpdate}>
                        Update
                      </Button>
                    </Col>
                    <Col>
                      <Button variant="danger" onClick={handleDelete}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </center>
              </div>
            )
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MealPlanPage;
