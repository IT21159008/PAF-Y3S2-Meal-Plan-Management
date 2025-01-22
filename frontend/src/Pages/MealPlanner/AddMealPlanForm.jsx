import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import "./AddMealPlanForm.css";

const AddMealPlanForm = ({ fetchMealPlans, handleCloseModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    recipe: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > 150) {
      // If description exceeds 50 characters, truncate it
      setFormData({ ...formData, [name]: value.slice(0, 50) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8090/mealplan", formData);
      fetchMealPlans();
      handleCloseModal();
    } catch (error) {
      console.error("Error adding meal plan:", error);
    }
  };

  return (
    <div className="add-meal-plan-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description (Max 150 characters)</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={150}
            required
          />
        </Form.Group>
        <Form.Group controlId="ingredients">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control
            as="textarea"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="recipe">
          <Form.Label>Recipe</Form.Label>
          <Form.Control
            as="textarea"
            name="recipe"
            value={formData.recipe}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Meal Plan
        </Button>
      </Form>
    </div>
  );
};

export default AddMealPlanForm;
