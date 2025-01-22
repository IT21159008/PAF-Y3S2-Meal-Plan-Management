import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const UpdateMealPlanForm = ({
  fetchMealPlans,
  handleCloseModal,
  mealPlanDetails,
}) => {
  const [formData, setFormData] = useState({
    name: mealPlanDetails.name,
    description: mealPlanDetails.description,
    ingredients: mealPlanDetails.ingredients,
    recipe: mealPlanDetails.recipe,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8090/mealplan/${mealPlanDetails.id}`,
        formData
      );
      fetchMealPlans();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating meal plan:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="ingredients">
        <Form.Label>Ingredients</Form.Label>
        <Form.Control
          as="textarea"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="recipe">
        <Form.Label>Recipe</Form.Label>
        <Form.Control
          as="textarea"
          name="recipe"
          value={formData.recipe}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
};

export default UpdateMealPlanForm;
